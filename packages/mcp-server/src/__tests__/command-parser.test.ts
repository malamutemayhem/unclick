import { describe, it, expect } from "vitest";
import { parseCommand } from "../command-parser.js";

describe("command-parser", () => {
  it("parses simple command", () => {
    const result = parseCommand("git status");
    expect(result.command).toBe("git");
    expect(result.args).toEqual(["status"]);
  });

  it("parses long flags with values", () => {
    const result = parseCommand("deploy --env production --verbose");
    expect(result.command).toBe("deploy");
    expect(result.flags).toEqual({ env: "production", verbose: true });
  });

  it("parses flags with = syntax", () => {
    const result = parseCommand("run --port=3000");
    expect(result.flags).toEqual({ port: "3000" });
  });

  it("parses short flags", () => {
    const result = parseCommand("ls -l -a");
    expect(result.flags).toEqual({ l: true, a: true });
  });

  it("parses short flag with value", () => {
    const result = parseCommand("ssh -p 22 host");
    expect(result.flags).toEqual({ p: "22" });
    expect(result.args).toEqual(["host"]);
  });

  it("handles quoted strings", () => {
    const result = parseCommand('echo "hello world" done');
    expect(result.args).toEqual(["hello world", "done"]);
  });

  it("handles single-quoted strings", () => {
    const result = parseCommand("echo 'hello world'");
    expect(result.args).toEqual(["hello world"]);
  });

  it("handles escaped characters in quotes", () => {
    const result = parseCommand('echo "say \\"hi\\""');
    expect(result.args).toEqual(['say "hi"']);
  });

  it("returns empty for empty input", () => {
    const result = parseCommand("");
    expect(result.command).toBe("");
    expect(result.args).toEqual([]);
  });

  it("mixes args and flags", () => {
    const result = parseCommand("test file.js --watch --timeout 5000 extra");
    expect(result.command).toBe("test");
    expect(result.args).toEqual(["file.js", "extra"]);
    expect(result.flags).toEqual({ watch: true, timeout: "5000" });
  });
});
