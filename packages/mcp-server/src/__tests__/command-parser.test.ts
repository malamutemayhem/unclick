import { describe, it, expect } from "vitest";
import { parseArgs, validateArgs, generateHelp } from "../command-parser.js";

describe("parseArgs", () => {
  it("parses command and args", () => {
    const result = parseArgs(["deploy", "prod", "us-east"]);
    expect(result.command).toBe("deploy");
    expect(result.args).toEqual(["prod", "us-east"]);
  });

  it("parses long options", () => {
    const result = parseArgs(["run", "--verbose", "--port", "3000"]);
    expect(result.options.verbose).toBe(true);
    expect(result.options.port).toBe("3000");
  });

  it("parses --key=value", () => {
    const result = parseArgs(["cmd", "--name=Alice"]);
    expect(result.options.name).toBe("Alice");
  });

  it("parses short flags", () => {
    const result = parseArgs(["cmd", "-v"]);
    expect(result.options.v).toBe(true);
  });

  it("handles --no-xxx", () => {
    const result = parseArgs(["cmd", "--no-color"]);
    expect(result.options.color).toBe(false);
  });

  it("handles -- rest args", () => {
    const result = parseArgs(["cmd", "--flag", "--", "extra", "args"]);
    expect(result.rest).toEqual(["extra", "args"]);
  });

  it("coerces typed options", () => {
    const defs = [{ name: "port", type: "number" as const }];
    const result = parseArgs(["cmd", "--port", "3000"], defs);
    expect(result.options.port).toBe(3000);
  });

  it("uses default values", () => {
    const defs = [{ name: "level", type: "string" as const, default: "info" }];
    const result = parseArgs(["cmd"], defs);
    expect(result.options.level).toBe("info");
  });
});

describe("validateArgs", () => {
  it("validates required options", () => {
    const errors = validateArgs(
      { command: "cmd", args: [], options: {}, rest: [] },
      { name: "cmd", options: [{ name: "key", type: "string", required: true }] },
    );
    expect(errors.length).toBe(1);
    expect(errors[0]).toContain("--key");
  });

  it("passes when all present", () => {
    const errors = validateArgs(
      { command: "cmd", args: ["x"], options: { key: "val" }, rest: [] },
      { name: "cmd", options: [{ name: "key", type: "string", required: true }] },
    );
    expect(errors).toEqual([]);
  });
});

describe("generateHelp", () => {
  it("generates help text", () => {
    const help = generateHelp({
      name: "deploy",
      description: "Deploy the app",
      options: [
        { name: "env", alias: "e", type: "string", description: "Target environment", required: true },
      ],
    });
    expect(help).toContain("deploy");
    expect(help).toContain("Target environment");
    expect(help).toContain("-e");
  });
});
