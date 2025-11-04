// types/terminal.ts

export type TerminalLineType = "input" | "output";

export interface TerminalLine {
  type: TerminalLineType;
  content: string;
}
