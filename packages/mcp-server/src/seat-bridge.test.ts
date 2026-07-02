import { describe, it, expect, vi } from "vitest";
import {
  buildCliInvocation,
  composeCliStdin,
  parseClaudeOutput,
  parseCodexJsonl,
  parseSeatBridgeArgs,
  runSeatBridgeOnce,
  type SeatBridgeConfig,
} from "./seat-bridge.js";

describe("parseClaudeOutput", () => {
  it("takes result from claude -p --output-format json", () => {
    const stdout = JSON.stringify({
      type: "result",
      result: "The answer is 42.",
      session_id: "abc",
    });
    expect(parseClaudeOutput(stdout)).toBe("The answer is 42.");
  });

  it("falls back to raw stdout when not JSON", () => {
    expect(parseClaudeOutput("plain text answer\n")).toBe("plain text answer");
    expect(parseClaudeOutput("   ")).toBe("");
  });
});

describe("parseCodexJsonl", () => {
  it("reads item.completed agent message text (current schema)", () => {
    const stdout = [
      JSON.stringify({ type: "item.started", item: { type: "reasoning" } }),
      JSON.stringify({
        type: "item.completed",
        item: { type: "agent_message", text: "Hello from Codex." },
      }),
    ].join("\n");
    expect(parseCodexJsonl(stdout)).toBe("Hello from Codex.");
  });

  it("reads msg.agent_message shape (older schema)", () => {
    const stdout = JSON.stringify({
      id: "0",
      msg: { type: "agent_message", message: "Older shape answer." },
    });
    expect(parseCodexJsonl(stdout)).toBe("Older shape answer.");
  });

  it("keeps the LAST agent message and ignores junk lines", () => {
    const stdout = [
      "codex booting...",
      JSON.stringify({ type: "item.completed", item: { type: "agent_message", text: "first" } }),
      "{not json",
      JSON.stringify({ type: "item.completed", item: { type: "agent_message", text: "second" } }),
    ].join("\n");
    expect(parseCodexJsonl(stdout)).toBe("second");
  });

  it("returns empty when nothing matches", () => {
    expect(parseCodexJsonl("no events here")).toBe("");
  });
});

describe("composeCliStdin / buildCliInvocation", () => {
  it("claude gets the system block as a flag, not in stdin", () => {
    const { command, args } = buildCliInvocation("claude-code", "SYS RULES", "/tmp/x");
    expect(command).toBe("claude");
    expect(args).toContain("--append-system-prompt");
    expect(args[args.indexOf("--append-system-prompt") + 1]).toBe("SYS RULES");
    expect(composeCliStdin("claude-code", "SYS RULES", "PROMPT")).toBe("PROMPT");
  });

  it("codex gets the system block prepended to stdin and reads prompt from -", () => {
    const { command, args } = buildCliInvocation("codex-cli", "SYS RULES", "/tmp/last.txt");
    expect(command).toBe("codex");
    expect(args[0]).toBe("exec");
    expect(args).toContain("--output-last-message");
    expect(args[args.length - 1]).toBe("-");
    expect(composeCliStdin("codex-cli", "SYS RULES", "PROMPT")).toBe("SYS RULES\n\nPROMPT");
  });
});

describe("parseSeatBridgeArgs", () => {
  const env = { UNCLICK_API_KEY: "uc_test_key" };

  it("parses a valid invocation", () => {
    const cfg = parseSeatBridgeArgs(
      ["--runtime", "claude-code", "--handle", "claude-sub", "--label", "Claude (sub)"],
      env,
    );
    expect("error" in cfg).toBe(false);
    if (!("error" in cfg)) {
      expect(cfg.runtime).toBe("claude-code");
      expect(cfg.handle).toBe("claude-sub");
      expect(cfg.apiKey).toBe("uc_test_key");
      expect(cfg.label).toBe("Claude (sub)");
    }
  });

  it("rejects missing runtime, bad handle, and missing key", () => {
    expect(parseSeatBridgeArgs(["--handle", "x"], env)).toHaveProperty("error");
    expect(
      parseSeatBridgeArgs(["--runtime", "claude-code", "--handle", "Bad Handle"], env),
    ).toHaveProperty("error");
    expect(
      parseSeatBridgeArgs(["--runtime", "codex-cli", "--handle", "gpt-sub"], {}),
    ).toHaveProperty("error");
  });
});

describe("runSeatBridgeOnce", () => {
  const baseCfg: Omit<SeatBridgeConfig, "fetchFn" | "runCli"> = {
    apiKey: "uc_test",
    handle: "claude-sub",
    runtime: "claude-code",
    baseUrl: "https://unclick.example",
    log: () => {},
  };

  function jsonResponse(body: unknown): Response {
    return new Response(JSON.stringify(body), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  it("returns idle when the queue is empty (heartbeat only)", async () => {
    const fetchFn = vi.fn(async () => jsonResponse({ job: null }));
    const outcome = await runSeatBridgeOnce({ ...baseCfg, fetchFn });
    expect(outcome).toBe("idle");
    expect(fetchFn).toHaveBeenCalledTimes(1);
    const [url, init] = fetchFn.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://unclick.example/api/chat-bridge?action=poll");
    expect((init.headers as Record<string, string>).Authorization).toBe("Bearer uc_test");
    const body = JSON.parse(String(init.body));
    expect(body.handle).toBe("claude-sub");
    expect(body.runtime).toBe("claude-code");
  });

  it("claims a job, runs the CLI, and completes with the answer", async () => {
    const calls: Array<{ url: string; body: Record<string, unknown> }> = [];
    const fetchFn = vi.fn(async (url: string | URL | Request, init?: RequestInit) => {
      const u = String(url);
      const body = JSON.parse(String(init?.body ?? "{}")) as Record<string, unknown>;
      calls.push({ url: u, body });
      if (u.includes("action=poll")) {
        return jsonResponse({
          job: {
            id: "11111111-2222-3333-4444-555555555555",
            system: "SYS",
            prompt: "PROMPT",
            thread_id: null,
            runtime: "claude-code",
          },
        });
      }
      return jsonResponse({ ok: true });
    });
    const runCli = vi.fn(async () => ({ content: "the reply" }));
    const outcome = await runSeatBridgeOnce({
      ...baseCfg,
      fetchFn: fetchFn as unknown as typeof fetch,
      runCli,
    });
    expect(outcome).toBe("handled");
    expect(runCli).toHaveBeenCalledWith({
      runtime: "claude-code",
      system: "SYS",
      prompt: "PROMPT",
      timeoutMs: expect.any(Number),
    });
    const complete = calls.find((c) => c.url.includes("action=complete"));
    expect(complete?.body).toEqual({
      job_id: "11111111-2222-3333-4444-555555555555",
      content: "the reply",
    });
  });

  it("reports a CLI failure as a job error instead of going silent", async () => {
    const calls: Array<{ url: string; body: Record<string, unknown> }> = [];
    const fetchFn = vi.fn(async (url: string | URL | Request, init?: RequestInit) => {
      const u = String(url);
      calls.push({ url: u, body: JSON.parse(String(init?.body ?? "{}")) });
      if (u.includes("action=poll")) {
        return jsonResponse({
          job: { id: "11111111-2222-3333-4444-555555555555", system: "", prompt: "P", thread_id: null, runtime: "codex-cli" },
        });
      }
      return jsonResponse({ ok: true });
    });
    const runCli = vi.fn(async () => ({ error: "codex is not installed on this machine" }));
    const outcome = await runSeatBridgeOnce({
      ...baseCfg,
      runtime: "codex-cli",
      fetchFn: fetchFn as unknown as typeof fetch,
      runCli,
    });
    expect(outcome).toBe("handled");
    const complete = calls.find((c) => c.url.includes("action=complete"));
    expect(complete?.body.error).toContain("not installed");
    expect(complete?.body.content).toBeUndefined();
  });

  it("returns error on a failed poll without crashing", async () => {
    const fetchFn = vi.fn(async () => new Response("{}", { status: 401 }));
    const outcome = await runSeatBridgeOnce({
      ...baseCfg,
      fetchFn: fetchFn as unknown as typeof fetch,
    });
    expect(outcome).toBe("error");
  });
});
