import { describe, expect, it } from "vitest";
import {
  buildXGateHookNodeScript,
  generateClaudeCodeHook,
  generateCursorHook,
} from "./client-hooks.js";

describe("XGate client hook generators", () => {
  it("emits a Claude Code PreToolUse config that calls xgate-check", () => {
    const config = JSON.parse(generateClaudeCodeHook({ endpointUrl: "https://example.test/api/xgate-check" }));

    expect(config.hooks.PreToolUse[0].matcher).toContain("Bash");
    expect(config.hooks.PreToolUse[0].hooks[0].command).toContain("https://example.test/api/xgate-check");
    expect(config.hooks.PreToolUse[0].hooks[0].command).toContain("XGATE_BEARER");
  });

  it("emits a Cursor delegated hook config with the coverage boundary", () => {
    const config = JSON.parse(generateCursorHook({ endpointUrl: "https://example.test/api/xgate-check" }));

    expect(config.client).toBe("cursor");
    expect(config.endpoint).toBe("https://example.test/api/xgate-check");
    expect(config.boundary).toContain("not a universal hard pre-tool interceptor");
    expect(config.command).toContain("XGate unavailable");
  });

  it("maps client tool names into XGate action classes inside the script", () => {
    const script = buildXGateHookNodeScript("claude-code");

    expect(script).toContain("actionClass");
    expect(script).toContain("'filesystem'");
    expect(script).toContain("'git'");
    expect(script).toContain("'network'");
  });
});
