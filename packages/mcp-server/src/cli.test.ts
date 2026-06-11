import { describe, expect, test } from "vitest";

import { parseCliArgs } from "./cli.js";

describe("parseCliArgs", () => {
  test("help by default and for help aliases", () => {
    expect(parseCliArgs([]).kind).toBe("help");
    expect(parseCliArgs(["help"]).kind).toBe("help");
    expect(parseCliArgs(["--help"]).kind).toBe("help");
  });

  test("memory op with and without JSON args", () => {
    expect(parseCliArgs(["memory", "load_memory"])).toMatchObject({
      kind: "memory",
      op: "load_memory",
      params: {},
    });
    expect(parseCliArgs(["memory", "search_memory", '{"query":"stripe"}'])).toMatchObject({
      kind: "memory",
      op: "search_memory",
      params: { query: "stripe" },
    });
    expect(parseCliArgs(["memory"]).error).toMatch(/needs an operation/);
    expect(parseCliArgs(["memory", "save_fact", "{not json"]).error).toMatch(/Could not parse/);
    expect(parseCliArgs(["memory", "save_fact", '["array"]']).error).toMatch(/must be an object/);
  });

  test("call endpoint with params", () => {
    expect(parseCliArgs(["call", "weather_current", '{"city":"Sydney"}'])).toMatchObject({
      kind: "call",
      endpointId: "weather_current",
      params: { city: "Sydney" },
    });
    expect(parseCliArgs(["call"]).error).toMatch(/needs an endpoint id/);
  });

  test("runner modes and flags", () => {
    expect(parseCliArgs(["runner", "once"])).toMatchObject({ kind: "runner", runnerMode: "once" });
    expect(parseCliArgs(["runner", "once", "--now", "2026-06-11T05:00:00Z"])).toMatchObject({
      runnerMode: "once",
      now: "2026-06-11T05:00:00Z",
    });
    expect(parseCliArgs(["runner", "start", "--interval", "120"])).toMatchObject({
      runnerMode: "start",
      intervalSeconds: 120,
    });
    expect(parseCliArgs(["runner"]).error).toMatch(/once.*start/);
    expect(parseCliArgs(["runner", "start", "--interval", "5"]).error).toMatch(/minimum 30/);
    expect(parseCliArgs(["runner", "once", "--bogus"]).error).toMatch(/Unknown runner flag/);
  });

  test("unknown command falls back to help with an error", () => {
    const cmd = parseCliArgs(["frobnicate"]);
    expect(cmd.kind).toBe("help");
    expect(cmd.error).toMatch(/Unknown command/);
  });
});
