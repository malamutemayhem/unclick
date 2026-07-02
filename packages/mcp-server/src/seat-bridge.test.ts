import { describe, it, expect, vi } from "vitest";
import {
  buildCliPlan,
  extractAnswer,
  parseClaudeOutput,
  parseCodexJsonl,
  parseJsonField,
  parseSeatBridgeArgs,
  resolveOwnServerEntry,
  runSeatBridgeOnce,
  type BuildPlanOpts,
  type SeatBridgeConfig,
} from "./seat-bridge.js";
import { decideSeatToolCall } from "./tool-mode-policy.js";

const baseOpts: BuildPlanOpts = {
  system: "SYS RULES",
  prompt: "PROMPT",
  workDir: "/tmp/unclick-seat-x",
  lastMessagePath: "/tmp/unclick-seat-x/last-message.txt",
  imagePaths: [],
  toolMode: "read",
  apiKey: "uc_test_key",
  baseUrl: "https://unclick.world",
  serverEntry: "/opt/unclick/dist/index.js",
};

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
        item: { id: "item_3", type: "agent_message", text: "Hello from Codex." },
      }),
    ].join("\n");
    expect(parseCodexJsonl(stdout)).toBe("Hello from Codex.");
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

describe("parseJsonField", () => {
  it("reads the field from a clean single JSON object (gemini .response)", () => {
    const stdout = JSON.stringify({ response: "Gemini answer", stats: { total: 1 } });
    expect(parseJsonField(stdout, "response")).toBe("Gemini answer");
  });

  it("tolerates startup noise before the JSON object", () => {
    const stdout = `Loaded cached credentials.\n${JSON.stringify({ response: "after noise" })}`;
    expect(parseJsonField(stdout, "response")).toBe("after noise");
  });

  it("reads cursor's .result shape", () => {
    const stdout = JSON.stringify({
      type: "result",
      subtype: "success",
      is_error: false,
      result: "Cursor answer",
      session_id: "s1",
    });
    expect(parseJsonField(stdout, "result")).toBe("Cursor answer");
  });

  it("returns empty on garbage", () => {
    expect(parseJsonField("no json at all", "response")).toBe("");
    expect(parseJsonField("", "response")).toBe("");
  });
});

describe("extractAnswer", () => {
  it("dispatches per runtime", () => {
    expect(extractAnswer("claude-code", JSON.stringify({ result: "c" }))).toBe("c");
    expect(
      extractAnswer(
        "codex-cli",
        JSON.stringify({ type: "item.completed", item: { type: "agent_message", text: "x" } }),
      ),
    ).toBe("x");
    expect(extractAnswer("gemini-cli", JSON.stringify({ response: "g" }))).toBe("g");
    expect(extractAnswer("cursor-cli", JSON.stringify({ result: "u" }))).toBe("u");
    expect(extractAnswer("copilot-cli", "  plain copilot reply \n")).toBe("plain copilot reply");
  });
});

describe("buildCliPlan: claude-code", () => {
  it("wires json output, system flag, strict MCP config file, and server-level allowlist", () => {
    const plan = buildCliPlan("claude-code", baseOpts);
    expect(plan.command).toBe("claude");
    expect(plan.stdin).toBe("PROMPT");
    expect(plan.args[plan.args.indexOf("--append-system-prompt") + 1]).toBe("SYS RULES");
    expect(plan.args).toContain("--strict-mcp-config");

    const mcpConfigPath = plan.args[plan.args.indexOf("--mcp-config") + 1];
    expect(mcpConfigPath).toBe("/tmp/unclick-seat-x/mcp-config.json");
    const file = plan.files[mcpConfigPath];
    expect(file.mode).toBe(0o600);
    const config = JSON.parse(file.content) as {
      mcpServers: { unclick: { args: string[]; env: Record<string, string> } };
    };
    expect(config.mcpServers.unclick.args).toEqual(["/opt/unclick/dist/index.js"]);
    expect(config.mcpServers.unclick.env.UNCLICK_API_KEY).toBe("uc_test_key");
    expect(config.mcpServers.unclick.env.UNCLICK_SEAT_TOOL_MODE).toBe("read");

    // The key must NEVER appear in argv (process-list leak).
    expect(plan.args.join(" ")).not.toContain("uc_test_key");

    const allowed = plan.args[plan.args.indexOf("--allowedTools") + 1];
    expect(allowed).toBe("mcp__unclick");
  });

  it("adds a path-scoped Read rule and an image note only when images attach", () => {
    const plan = buildCliPlan("claude-code", {
      ...baseOpts,
      imagePaths: ["/tmp/unclick-seat-x/1-a.png"],
    });
    const allowed = plan.args[plan.args.indexOf("--allowedTools") + 1];
    expect(allowed).toBe("mcp__unclick,Read(/tmp/unclick-seat-x/**)");
    expect(plan.stdin).toContain("Attached images");
    expect(plan.stdin).toContain("/tmp/unclick-seat-x/1-a.png");
  });
});

describe("buildCliPlan: codex-cli", () => {
  it("puts the stdin positional before image flags and forwards env by name only", () => {
    const plan = buildCliPlan("codex-cli", {
      ...baseOpts,
      toolMode: "build",
      imagePaths: ["/tmp/unclick-seat-x/1-a.png", "/tmp/unclick-seat-x/2-b.png"],
    });
    expect(plan.command).toBe("codex");
    expect(plan.args[0]).toBe("exec");
    expect(plan.args[1]).toBe("-");
    expect(plan.args.indexOf("-i")).toBeGreaterThan(1);
    expect(plan.args.filter((a) => a === "-i")).toHaveLength(2);
    expect(plan.args).toContain("--skip-git-repo-check");
    expect(plan.args).toContain("--output-last-message");
    expect(plan.stdin).toBe("SYS RULES\n\nPROMPT");

    const joined = plan.args.join(" ");
    expect(joined).toContain('mcp_servers.unclick.env_vars=["UNCLICK_API_KEY"');
    // env_vars forwards by NAME; the key value itself never rides argv.
    expect(joined).not.toContain("uc_test_key");
    expect(joined).toContain('mcp_servers.unclick.args=["/opt/unclick/dist/index.js"]');
    expect(Object.keys(plan.files)).toHaveLength(0);
  });
});

describe("buildCliPlan: basic tier", () => {
  it("gemini pipes context on stdin, instructs via -p, asks for json, injects @images", () => {
    const plan = buildCliPlan("gemini-cli", {
      ...baseOpts,
      imagePaths: ["/tmp/unclick-seat-x/1-a.png"],
    });
    expect(plan.command).toBe("gemini");
    expect(plan.stdin).toBe("SYS RULES\n\nPROMPT");
    expect(plan.args[0]).toBe("-p");
    expect(plan.args[1]).toContain("@/tmp/unclick-seat-x/1-a.png");
    expect(plan.args).toContain("--output-format");
    expect(plan.env.NO_COLOR).toBe("1");
    expect(plan.args.join(" ")).not.toContain("mcp");
  });

  it("copilot carries the whole prompt in argv (stdin is ignored with -p) plus attachments", () => {
    const plan = buildCliPlan("copilot-cli", {
      ...baseOpts,
      imagePaths: ["/tmp/unclick-seat-x/1-a.png"],
    });
    expect(plan.command).toBe("copilot");
    expect(plan.stdin).toBe("");
    expect(plan.args[plan.args.indexOf("-p") + 1]).toBe("SYS RULES\n\nPROMPT");
    expect(plan.args).toContain("-s");
    expect(plan.args).toContain("--no-ask-user");
    expect(plan.args[plan.args.indexOf("--attachment") + 1]).toBe("/tmp/unclick-seat-x/1-a.png");
  });

  it("cursor uses print mode with json output and image paths in the prompt", () => {
    const plan = buildCliPlan("cursor-cli", {
      ...baseOpts,
      imagePaths: ["/tmp/unclick-seat-x/1-a.png"],
    });
    expect(plan.command).toBe("cursor-agent");
    expect(plan.args[0]).toBe("-p");
    expect(plan.args[1]).toContain("SYS RULES");
    expect(plan.args[1]).toContain("/tmp/unclick-seat-x/1-a.png");
    expect(plan.args).toContain("--output-format");
    // No --force: print mode must stay non-mutating.
    expect(plan.args).not.toContain("--force");
  });

  it("refuses unknown runtimes instead of guessing a binary", () => {
    expect(buildCliPlan("chatgpt-web", baseOpts).command).toBe("");
  });
});

describe("seat child tool gate (tool-mode-policy)", () => {
  it("read mode allows reads and memory, blocks writes", () => {
    expect(decideSeatToolCall("read", "gmail_search").allowed).toBe(true);
    expect(decideSeatToolCall("read", "search_memory").allowed).toBe(true);
    expect(decideSeatToolCall("read", "save_fact").allowed).toBe(true);
    expect(decideSeatToolCall("read", "gmail_send_email").allowed).toBe(false);
    expect(decideSeatToolCall("read", "higgsfield_generate_image").allowed).toBe(false);
    expect(decideSeatToolCall("read", "unclick_call", "dropbox_delete_file").allowed).toBe(false);
    expect(decideSeatToolCall("read", "unclick_call", "gmail.search").allowed).toBe(true);
  });

  it("build mode allows non-destructive creates but never high-risk verbs", () => {
    expect(decideSeatToolCall("build", "higgsfield_generate_image").allowed).toBe(true);
    expect(decideSeatToolCall("build", "unclick_call", "notion_create_page").allowed).toBe(true);
    expect(decideSeatToolCall("build", "gmail_send_email").allowed).toBe(false);
    expect(decideSeatToolCall("build", "unclick_call", "github_merge_pull_request").allowed).toBe(false);
    expect(decideSeatToolCall("build", "unclick_call", "stripe_charge_customer").allowed).toBe(false);
  });
});

describe("parseSeatBridgeArgs", () => {
  const env = { UNCLICK_API_KEY: "uc_test_key" };

  it("parses the single-seat form", () => {
    const cfg = parseSeatBridgeArgs(
      ["--runtime", "claude-code", "--handle", "claude-sub", "--label", "Claude (sub)"],
      env,
    );
    expect("error" in cfg).toBe(false);
    if (!("error" in cfg)) {
      expect(cfg.seats).toEqual([
        { handle: "claude-sub", runtime: "claude-code", label: "Claude (sub)" },
      ]);
      expect(cfg.apiKey).toBe("uc_test_key");
    }
  });

  it("parses the multi-seat form across all runtimes", () => {
    const cfg = parseSeatBridgeArgs(
      [
        "--seat", "claude-sub=claude-code",
        "--seat", "gemini-sub=gemini-cli",
        "--seat", "copilot-sub=copilot-cli",
        "--seat", "cursor-sub=cursor-cli",
      ],
      env,
    );
    expect("error" in cfg).toBe(false);
    if (!("error" in cfg)) {
      expect(cfg.seats.map((seat) => seat.runtime)).toEqual([
        "claude-code",
        "gemini-cli",
        "copilot-cli",
        "cursor-cli",
      ]);
    }
  });

  it("rejects bad runtimes, bad handles, duplicates, and a missing key", () => {
    expect(parseSeatBridgeArgs(["--seat", "x=chatgpt-web"], env)).toHaveProperty("error");
    expect(parseSeatBridgeArgs(["--seat", "Bad Handle=claude-code"], env)).toHaveProperty("error");
    expect(
      parseSeatBridgeArgs(["--seat", "a=claude-code", "--seat", "a=codex-cli"], env),
    ).toHaveProperty("error");
    expect(parseSeatBridgeArgs(["--seat", "a=claude-code"], {})).toHaveProperty("error");
    expect(parseSeatBridgeArgs([], env)).toHaveProperty("error");
  });
});

describe("resolveOwnServerEntry", () => {
  it("points at the sibling index entry of this package", () => {
    expect(resolveOwnServerEntry()).toMatch(/[/\\]index\.(js|ts)$/);
  });
});

describe("runSeatBridgeOnce", () => {
  const baseCfg: Omit<SeatBridgeConfig, "fetchFn" | "runCli"> = {
    apiKey: "uc_test",
    seats: [{ handle: "claude-sub", runtime: "claude-code" }],
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
    const fetchFn = vi.fn(async (_url: string | URL | Request, _init?: RequestInit) =>
      jsonResponse({ job: null }),
    );
    const outcome = await runSeatBridgeOnce({
      ...baseCfg,
      fetchFn: fetchFn as unknown as typeof fetch,
    });
    expect(outcome).toBe("idle");
    expect(fetchFn).toHaveBeenCalledTimes(1);
    const [url, init] = fetchFn.mock.calls[0];
    expect(String(url)).toBe("https://unclick.example/api/chat-bridge?action=poll");
    expect((init?.headers as Record<string, string>).Authorization).toBe("Bearer uc_test");
    const body = JSON.parse(String(init?.body));
    expect(body.handle).toBe("claude-sub");
    expect(body.runtime).toBe("claude-code");
  });

  it("claims a job, runs the CLI with mode + attachments, and completes", async () => {
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
            tool_mode: "build",
            attachments: [{ name: "a.png", media_type: "image/png", data: "QUJD" }],
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
      toolMode: "build",
      attachments: [{ name: "a.png", media_type: "image/png", data: "QUJD" }],
      apiKey: "uc_test",
      baseUrl: "https://unclick.example",
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
          job: {
            id: "11111111-2222-3333-4444-555555555555",
            system: "",
            prompt: "P",
            thread_id: null,
            runtime: "codex-cli",
          },
        });
      }
      return jsonResponse({ ok: true });
    });
    const runCli = vi.fn(async () => ({ error: "codex is not installed on this machine" }));
    const outcome = await runSeatBridgeOnce(
      {
        ...baseCfg,
        seats: [{ handle: "gpt-sub", runtime: "codex-cli" }],
        fetchFn: fetchFn as unknown as typeof fetch,
        runCli,
      },
    );
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
