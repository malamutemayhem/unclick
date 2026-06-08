import { describe, it, expect } from "vitest";
import { BrainfuckInterpreter } from "../brainfuck-interp.js";

describe("BrainfuckInterpreter", () => {
  const bf = new BrainfuckInterpreter();

  it("outputs a single character", () => {
    const result = bf.execute("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.");
    expect(result.output).toBe("B");
  });

  it("hello world (simplified)", () => {
    const prog = "++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.";
    const result = bf.execute(prog);
    expect(result.output).toBe("Hello World!\n");
  });

  it("handles input", () => {
    const result = bf.execute(",.", "A");
    expect(result.output).toBe("A");
  });

  it("counts steps", () => {
    const result = bf.execute("+++");
    expect(result.steps).toBe(3);
  });

  it("respects max steps", () => {
    const bf2 = new BrainfuckInterpreter(10);
    const result = bf2.execute("+[+]");
    expect(result.steps).toBe(10);
  });

  it("validate detects unmatched brackets", () => {
    expect(BrainfuckInterpreter.validate("[]").valid).toBe(true);
    expect(BrainfuckInterpreter.validate("[").valid).toBe(false);
    expect(BrainfuckInterpreter.validate("]").valid).toBe(false);
  });

  it("handles wrapping memory values", () => {
    const result = bf.execute("-.");
    expect(result.memory[0]).toBe(255);
  });
});
