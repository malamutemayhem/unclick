import { describe, it, expect } from "vitest";
import { parseArgv, tokenizeCommand } from "../argv-parser.js";

describe("parseArgv", () => {
  it("collects positional arguments", () => {
    const result = parseArgv(["hello", "world"]);
    expect(result.positional).toEqual(["hello", "world"]);
  });

  it("parses long flags", () => {
    const result = parseArgv(["--verbose", "--dry-run"]);
    expect(result.flags).toEqual({ verbose: true, "dry-run": true });
  });

  it("parses long options with next-arg value", () => {
    const result = parseArgv(["--name", "alice"]);
    expect(result.options).toEqual({ name: "alice" });
  });

  it("parses long options with = value", () => {
    const result = parseArgv(["--name=alice"]);
    expect(result.options).toEqual({ name: "alice" });
  });

  it("parses short flags bundled", () => {
    const result = parseArgv(["-abc"]);
    expect(result.flags).toEqual({ a: true, b: true, c: true });
  });

  it("parses short option with value", () => {
    const result = parseArgv(["-n", "5"]);
    expect(result.options).toEqual({ n: "5" });
  });

  it("stops parsing after --", () => {
    const result = parseArgv(["--verbose", "--", "--not-a-flag", "file.txt"]);
    expect(result.flags).toEqual({ verbose: true });
    expect(result.positional).toEqual(["--not-a-flag", "file.txt"]);
  });

  it("handles mixed args", () => {
    const result = parseArgv(["cmd", "--force", "-n", "3", "file.txt", "--output=out.json"]);
    expect(result.positional).toEqual(["cmd", "file.txt"]);
    expect(result.flags).toEqual({ force: true });
    expect(result.options).toEqual({ n: "3", output: "out.json" });
  });

  it("handles empty input", () => {
    const result = parseArgv([]);
    expect(result.positional).toEqual([]);
    expect(result.flags).toEqual({});
    expect(result.options).toEqual({});
  });
});

describe("tokenizeCommand", () => {
  it("splits on spaces", () => {
    expect(tokenizeCommand("hello world")).toEqual(["hello", "world"]);
  });

  it("handles double quotes", () => {
    expect(tokenizeCommand('echo "hello world"')).toEqual(["echo", "hello world"]);
  });

  it("handles single quotes", () => {
    expect(tokenizeCommand("echo 'hello world'")).toEqual(["echo", "hello world"]);
  });

  it("handles escaped characters", () => {
    expect(tokenizeCommand("echo hello\\ world")).toEqual(["echo", "hello world"]);
  });

  it("handles multiple spaces", () => {
    expect(tokenizeCommand("a   b   c")).toEqual(["a", "b", "c"]);
  });

  it("handles empty string", () => {
    expect(tokenizeCommand("")).toEqual([]);
  });

  it("handles mixed quotes", () => {
    expect(tokenizeCommand(`he said "it's fine"`)).toEqual(["he", "said", "it's fine"]);
  });
});
