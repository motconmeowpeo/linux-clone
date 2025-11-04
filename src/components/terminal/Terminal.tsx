// "use client";
// import { useState } from "react";
// import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";

// const TerminalController = () => {
//   const [terminalLineData, setTerminalLineData] = useState([
//     <TerminalOutput></TerminalOutput>,
//   ]);

//   // Terminal has 100% width by default, so it should usually be wrapped in a container div
//   return (
//     <div className="container">
//       <Terminal
//         name="Terminal"
//         colorMode={ColorMode.Dark}
//         onInput={(terminalInput) =>
//           setTerminalLineData([
//             ...terminalLineData,
//             <TerminalOutput>{`The term '${terminalInput}' is not recognized as the name of a cmdlet`}</TerminalOutput>,
//           ])
//         }
//       >
//         {terminalLineData}
//       </Terminal>
//     </div>
//   );
// };

// export default TerminalController;

// components/Terminal.tsx
"use client";

import { ROUTE_PATH } from "@/core/constants/route.constant";
import { TerminalLine } from "@/core/model/terminal.model";
import { JSX } from "@emotion/react/jsx-runtime";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaTerminal } from "react-icons/fa";

// --- Type-safe prompt function ---
const PS1 = (path: string) => (
  <>
    <span className="text-green-400">user@nextjs-dev</span>
    <span className="text-white">:</span>
    <span className="text-blue-400">{path}</span>
    <span className="text-white">$ </span>
  </>
);

// --- Initial state ---
const initialHistory: TerminalLine[] = [
  {
    type: "output",
    content:
      "Welcome to the Next.js Terminal UI Simulation (TypeScript Edition)!",
  },
  {
    type: "output",
    content: 'Type "help" to see available commands (UI-only).',
  },
  { type: "input", content: "ls -l" },
  { type: "output", content: "drwxr-xr-x Documents" },
  { type: "output", content: "drwxr-xr-x Downloads" },
];

const Terminal: FC = () => {
  const [command, setCommand] = useState<string>("");
  const [history, setHistory] = useState<TerminalLine[]>(initialHistory);
  const [currentPath, setCurrentPath] = useState<string>("~");
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const navigate = useRouter();
  const [isMaximized, setIsMaximized] = useState(false);

  // Focus and Scroll Effects
  useEffect(() => {
    inputRef.current?.focus();
    outputRef.current?.scrollTo(0, outputRef.current.scrollHeight);
  }, [history]);

  // --- Core Command Processing Logic ---
  const processCommand = useCallback(
    (cmd: string) => {
      const trimmedCmd = cmd.trim();
      const newHistory: TerminalLine[] = [
        ...history,
        { type: "input", content: trimmedCmd },
      ];

      // Command simulation logic (UI-only)
      if (trimmedCmd === "clear") {
        setHistory([]);
        setCommand("");
        return;
      } else if (trimmedCmd.startsWith("cd ")) {
        const target = trimmedCmd.substring(3).trim();
        const newPath = target === ".." ? "~" : `~/${target}`;
        newHistory.push({
          type: "output",
          content: `Changing directory to ${newPath}`,
        });
        setCurrentPath(newPath);
      } else if (trimmedCmd === "help") {
        newHistory.push({
          type: "output",
          content:
            "Available commands: ls, cd [path], echo [text], clear, help.",
        });
        newHistory.push({
          type: "output",
          content:
            "This is a UI simulation. No actual shell commands are executed.",
        });
      } else if (trimmedCmd.startsWith("echo ")) {
        newHistory.push({ type: "output", content: trimmedCmd.substring(5) });
      } else if (trimmedCmd.length > 0) {
        newHistory.push({
          type: "output",
          content: `bash: ${trimmedCmd}: command not found (UI-only)`,
        });
      }

      setHistory(newHistory);
      setCommand("");
    },
    [history]
  ); // Dependency on history to get the latest state

  // --- Event Handlers (Typed) ---
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      processCommand(command);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCommand(e.target.value);
  };

  const handleMinimize = () => navigate.push(ROUTE_PATH.Desktop);
  const handleClose = () => navigate.push(ROUTE_PATH.Desktop);

  // Renders a single line of output or input
  const renderLine = (item: TerminalLine, index: number): JSX.Element => (
    <div key={index} className="flex font-mono text-sm leading-6">
      {item.type === "input" && PS1(currentPath)}
      <span className={item.type === "input" ? "text-white" : "text-gray-200"}>
        {item.content}
      </span>
    </div>
  );

  return (
    <div
      className={`bg-black text-white ${isMaximized ? "h-[80vh] w-[80vw]" : "h-[40vh] w-[40vw]"}  mx-auto mt-10 rounded-lg shadow-2xl flex flex-col`}
    >
      {/* Window Title Bar */}
      <header className="flex justify-between items-center bg-gray-800 text-gray-200 p-2 rounded-t-lg">
        <span className="flex items-center text-sm">
          <FaTerminal className="mr-2 text-green-500" />
          Terminal - {currentPath}
        </span>
        {/* Window Controls */}
        <div className="flex space-x-2">
          <span
            className="w-3 h-3 bg-red-500 rounded-full cursor-pointer"
            title="Close"
            onClick={handleClose}
          ></span>
          <span
            className="w-3 h-3 bg-yellow-500 rounded-full cursor-pointer"
            title="Minimize"
            onClick={handleMinimize}
          ></span>
          <span
            className="w-3 h-3 bg-green-500 rounded-full cursor-pointer"
            title="Maximize"
            onClick={() => setIsMaximized((prev) => !prev)}
          ></span>
        </div>
      </header>

      {/* Terminal Output Area */}
      <div
        ref={outputRef}
        className="flex-1 p-4 overflow-y-auto custom-scrollbar"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map(renderLine)}

        {/* Current Input Line */}
        <div className="flex font-mono text-sm leading-6 items-center">
          {PS1(currentPath)}
          <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="bg-black text-white focus:outline-none flex-1 caret-white"
            autoFocus
            spellCheck="false"
          />
          {/* Simulated cursor */}
          <span className="animate-blink block w-2 h-4 bg-white ml-0.5"></span>
        </div>
      </div>

      {/* Tailwind utility for blinking effect (moved to global CSS in a real app) */}
      <style jsx global>{`
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        .animate-blink {
          animation: blink 1s step-start infinite;
        }
      `}</style>
    </div>
  );
};

export default Terminal;
