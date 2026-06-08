import { describe, it, expect } from "vitest";
import { parseCommand } from "../command-parser.js";

describe("command-parser", () => {
  it("parses simple command with args", () => {
    const result = parseCommand("git commit file.txt");
    expect(result.command).toBe("git");
    expect(result.args).toEqual(["commit", "file.txt"]);
  });

  it("parses long flags", () => {
    const result = parseCommand("cmd --verbose --name test");
    expect(result.flags.verbose).toBe(true);
    expect(result.flags.name).toBe("test");
  });

  it("parses long flags with =", () => {
    const result = parseCommand("cmd --name=test");
    expect(result.flags.name).toBe("test");
  });

  it("parses short flags", () => {
    const result = parseCommand("cmd -v -n test");
    expect(result.flags.v).toBe(true);
    expect(result.flags.n).toBe("test");
  });

  it("parses combined short flags", () => {
    const result = parseCommand("cmd -abc");
    expect(result.flags.a).toBe(true);
    expect(result.flags.b).toBe(true);
    expect(result.flags.c).toBe(true);
  });

  it("handles quoted strings", () => {
    const result = parseCommand('cmd "hello world" \'single quotes\'');
    expect(result.args).toEqual(["hello world", "single quotes"]);
  });

  it("handles escaped quotes", () => {
    const result = parseCommand('cmd "hello \\"world\\""');
    expect(result.args).toEqual(['hello "world"']);
  });

  it("empty input", () => {
    const result = parseCommand("");
    expect(result.command).toBe("");
    expect(result.args).toEqual([]);
  });
});
