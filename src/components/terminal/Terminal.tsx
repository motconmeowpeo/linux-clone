"use client";
import { useState } from "react";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";

const TerminalController = () => {
  const [terminalLineData, setTerminalLineData] = useState([
    <TerminalOutput></TerminalOutput>,
  ]);

  // Terminal has 100% width by default, so it should usually be wrapped in a container div
  return (
    <div className="container">
      <Terminal
        name="Terminal"
        colorMode={ColorMode.Dark}
        onInput={(terminalInput) =>
          setTerminalLineData([
            ...terminalLineData,
            <TerminalOutput>{`The term '${terminalInput}' is not recognized as the name of a cmdlet`}</TerminalOutput>,
          ])
        }
      >
        {terminalLineData}
      </Terminal>
    </div>
  );
};

export default TerminalController;
