// ─── Subscription seat bridge ─────────────────────────────────────────────────
// Lets chat seats on unclick.world/admin/chat answer on the user's OWN
// consumer plans instead of API keys, by driving the official CLI that is
// already signed in on this machine. Runtimes come from
// seat-bridge-runtimes.ts:
//
//   full tier   claude-code (Claude Pro/Max via Claude Code CLI)
//               codex-cli   (ChatGPT Plus/Pro via Codex CLI)
//               - UnClick MCP tools attached per turn, gated by the chat's
//                 Read/Build mode (enforced in-process by tool-mode-policy.ts)
//   basic tier  gemini-cli, copilot-cli, cursor-cli
//               - real subscription compute, no UnClick tools yet
//   images      all five runtimes accept image attachments, each through
//               its own verified mechanism (see buildCliPlan)
//
// Run it with:  npx @unclick/mcp-server seat-bridge \
//                 --seat claude-sub=claude-code --seat gpt-sub=codex-cli
//               (or the single-seat form: --runtime claude-code --handle claude-sub)
// Auth:         UNCLICK_API_KEY env var (uc_/agt_), or --api-key.
// Server:       UNCLICK_API_URL overrides https://unclick.world (previews).
//
// Loop: poll /api/chat-bridge?action=poll per seat (heartbeat + claim one
// job), run the CLI headless with the job's prompt, POST the reply to
// action=complete. The bridge never sees or sends any provider credential;
// the CLI holds its own login. If the CLI is not installed or not signed
// in, the job fails with an honest error that surfaces in the chat UI.
//
// Secret handling: the UnClick key reaches the tool child through a 0600
// config file inside the per-job temp dir (claude) or codex's env_vars
// forwarding (codex spawns MCP children with a whitelisted env, NOT full
// inheritance). It is never placed in argv, so it cannot leak via the
// process list.

import { spawn } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  findBridgeRuntime,
  isBridgeRuntimeId,
} from "./seat-bridge-runtimes.js";

export type SeatBridgeRuntime = string;
export type SeatToolMode = "read" | "build";

export interface SeatBridgeAttachment {
  name: string;
  media_type: string;
  data: string; // base64
}

export interface SeatBridgeJob {
  id: string;
  system: string | null;
  prompt: string;
  thread_id: string | null;
  runtime: string;
  tool_mode?: string;
  attachments?: SeatBridgeAttachment[];
}

export interface CliResult {
  content?: string;
  error?: string;
}

export interface SeatSpec {
  handle: string;
  runtime: SeatBridgeRuntime;
  label?: string;
}

export interface RunCliArgs {
  runtime: SeatBridgeRuntime;
  system: string;
  prompt: string;
  timeoutMs: number;
  toolMode: SeatToolMode;
  attachments: SeatBridgeAttachment[];
  apiKey: string;
  baseUrl: string;
}

export interface SeatBridgeConfig {
  apiKey: string;
  seats: SeatSpec[];
  baseUrl?: string;
  pollIntervalMs?: number;
  cliTimeoutMs?: number;
  /** Injection points for tests. */
  fetchFn?: typeof fetch;
  runCli?: (args: RunCliArgs) => Promise<CliResult>;
  log?: (line: string) => void;
}

export const DEFAULT_POLL_INTERVAL_MS = 5_000;
export const DEFAULT_CLI_TIMEOUT_MS = 5 * 60 * 1000;
const MAX_CAPTURE_BYTES = 2 * 1024 * 1024;

// ─── output parsing (pure, tested) ────────────────────────────

// `claude -p --output-format json` prints one JSON object whose `result`
// field is the final answer. Anything unparseable falls back to raw stdout.
export function parseClaudeOutput(stdout: string): string {
  const raw = stdout.trim();
  if (!raw) return "";
  try {
    const parsed = JSON.parse(raw) as { result?: unknown };
    if (typeof parsed.result === "string" && parsed.result.trim()) {
      return parsed.result.trim();
    }
  } catch {
    /* fall through to raw */
  }
  return raw;
}

// `codex exec --json` emits JSONL events. Current schema: the final agent
// message is {"type":"item.completed","item":{"type":"agent_message","text":...}}.
// Older msg.agent_message rows are kept for drift tolerance. Keep the LAST
// match; the --output-last-message file remains the primary source.
export function parseCodexJsonl(stdout: string): string {
  let last = "";
  for (const line of stdout.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("{")) continue;
    try {
      const evt = JSON.parse(trimmed) as {
        type?: string;
        item?: { type?: string; item_type?: string; text?: unknown };
        msg?: { type?: string; message?: unknown; last_agent_message?: unknown };
      };
      const item = evt.item;
      if (
        item &&
        typeof item.text === "string" &&
        item.text.trim() &&
        /agent|assistant/.test(String(item.type ?? item.item_type ?? ""))
      ) {
        last = item.text.trim();
        continue;
      }
      const msg = evt.msg;
      if (msg && msg.type === "agent_message" && typeof msg.message === "string" && msg.message.trim()) {
        last = msg.message.trim();
        continue;
      }
      if (msg && typeof msg.last_agent_message === "string" && msg.last_agent_message.trim()) {
        last = msg.last_agent_message.trim();
      }
    } catch {
      /* skip non-JSON lines */
    }
  }
  return last;
}

// Extract a string field from the last parseable JSON object in stdout.
// Gemini (`--output-format json`, field "response") is documented to print
// one object but has known startup-noise issues; Cursor (`--output-format
// json`, field "result") prints one result object. Scanning from the end
// tolerates leading noise lines.
export function parseJsonField(stdout: string, field: string): string {
  const raw = stdout.trim();
  if (!raw) return "";
  const tryParse = (candidate: string): string => {
    try {
      const parsed = JSON.parse(candidate) as Record<string, unknown>;
      const value = parsed[field];
      return typeof value === "string" && value.trim() ? value.trim() : "";
    } catch {
      return "";
    }
  };
  const whole = tryParse(raw);
  if (whole) return whole;
  // Fall back: first "{" onward (noise printed before the JSON object),
  // then line-by-line from the end (JSONL-ish output).
  const fromBrace = raw.indexOf("{");
  if (fromBrace > 0) {
    const tail = tryParse(raw.slice(fromBrace));
    if (tail) return tail;
  }
  const lines = raw.split("\n");
  for (let i = lines.length - 1; i >= 0; i -= 1) {
    const line = lines[i].trim();
    if (!line.startsWith("{")) continue;
    const value = tryParse(line);
    if (value) return value;
  }
  return "";
}

// Best-effort answer extraction per runtime, shared by the normal close
// path and the timeout path (a hung CLI may already have printed the
// answer; salvage beats discarding).
export function extractAnswer(runtime: SeatBridgeRuntime, stdout: string): string {
  if (runtime === "claude-code") return parseClaudeOutput(stdout);
  if (runtime === "codex-cli") return parseCodexJsonl(stdout);
  if (runtime === "gemini-cli") return parseJsonField(stdout, "response");
  if (runtime === "cursor-cli") return parseJsonField(stdout, "result");
  // copilot-cli runs with -s (response-only stdout).
  return stdout.trim();
}

// ─── CLI invocation plans (pure, tested) ──────────────────────

// Resolve this package's own MCP server entry (dist/index.js next to the
// compiled seat-bridge). The tool child is literally this package, spawned
// by the CLI as a stdio MCP server.
export function resolveOwnServerEntry(): string {
  return fileURLToPath(new URL("./index.js", import.meta.url));
}

export interface CliPlan {
  command: string;
  args: string[];
  stdin: string;
  /** Files to create in the workdir before spawning: path -> {content, mode}. */
  files: Record<string, { content: string; mode?: number }>;
  /** Extra env for the spawned CLI (merged over process.env). */
  env: Record<string, string>;
}

export interface BuildPlanOpts {
  system: string;
  prompt: string;
  workDir: string;
  lastMessagePath: string;
  imagePaths: string[];
  toolMode: SeatToolMode;
  apiKey: string;
  baseUrl: string;
  serverEntry: string;
}

// Build the exact CLI invocation per runtime, using only flag syntax
// verified against each vendor's current docs or source (2026-07).
export function buildCliPlan(
  runtime: SeatBridgeRuntime,
  opts: BuildPlanOpts,
): CliPlan {
  const spec = findBridgeRuntime(runtime);
  const withTools = spec?.tier === "full";
  const systemAndPrompt = opts.system.trim()
    ? `${opts.system.trim()}\n\n${opts.prompt}`
    : opts.prompt;

  if (runtime === "claude-code") {
    // Verified: stdin prompt; --output-format json (answer in .result);
    // --append-system-prompt; --mcp-config accepts a file; --strict-mcp-config;
    // --allowedTools with server-level MCP rules and path-scoped Read rules.
    const args = ["-p", "--output-format", "json"];
    if (opts.system.trim()) args.push("--append-system-prompt", opts.system.trim());
    const files: CliPlan["files"] = {};
    const allowed: string[] = [];
    if (withTools) {
      // The key rides in a 0600 file inside the per-job temp dir, never in
      // argv. PATH/HOME ride along in case the CLI does not inherit env
      // into MCP children.
      const mcpConfigPath = join(opts.workDir, "mcp-config.json");
      files[mcpConfigPath] = {
        mode: 0o600,
        content: JSON.stringify({
          mcpServers: {
            unclick: {
              type: "stdio",
              command: process.execPath,
              args: [opts.serverEntry],
              env: {
                UNCLICK_API_KEY: opts.apiKey,
                UNCLICK_SEAT_TOOL_MODE: opts.toolMode,
                UNCLICK_API_URL: opts.baseUrl,
                PATH: process.env.PATH ?? "",
                HOME: process.env.HOME ?? "",
              },
            },
          },
        }),
      };
      args.push("--strict-mcp-config", "--mcp-config", mcpConfigPath);
      allowed.push("mcp__unclick");
    }
    if (opts.imagePaths.length > 0) allowed.push(`Read(${opts.workDir}/**)`);
    if (allowed.length > 0) args.push("--allowedTools", allowed.join(","));
    let stdin = opts.prompt;
    if (opts.imagePaths.length > 0) {
      stdin += `\n\nAttached images (view them with the Read tool):\n${opts.imagePaths.map((p) => `- ${p}`).join("\n")}`;
    }
    return { command: "claude", args, stdin, files, env: {} };
  }

  if (runtime === "codex-cli") {
    // Verified: "-" forces stdin prompt and must come BEFORE -i (multi-value
    // flag); --json JSONL (item.completed/agent_message); --output-last-message;
    // --skip-git-repo-check; -c TOML overrides define MCP servers; MCP child
    // env is a whitelist, so env_vars forwards the named variables from
    // codex's own env (set at spawn). JSON.stringify emits TOML-safe strings.
    const args = [
      "exec",
      "-",
      "--json",
      "--output-last-message",
      opts.lastMessagePath,
      "--skip-git-repo-check",
    ];
    for (const imagePath of opts.imagePaths) args.push("-i", imagePath);
    if (withTools) {
      args.push(
        "-c",
        `mcp_servers.unclick.command=${JSON.stringify(process.execPath)}`,
        "-c",
        `mcp_servers.unclick.args=[${JSON.stringify(opts.serverEntry)}]`,
        "-c",
        'mcp_servers.unclick.env_vars=["UNCLICK_API_KEY","UNCLICK_SEAT_TOOL_MODE","UNCLICK_API_URL"]',
      );
    }
    return { command: "codex", args, stdin: systemAndPrompt, files: {}, env: {} };
  }

  if (runtime === "gemini-cli") {
    // Verified: -p forces non-interactive and its text is appended AFTER
    // piped stdin (stdin is context); --output-format json answers in
    // .response; @path in the -p text injects files (read_file supports
    // images, no approval needed); mutating tools auto-deny headless.
    let instruction =
      "Reply to the newest human message in the chat transcript provided above. Reply with the answer only.";
    if (opts.imagePaths.length > 0) {
      instruction += ` The user attached these images: ${opts.imagePaths.map((p) => `@${p}`).join(" ")}`;
    }
    return {
      command: "gemini",
      args: ["-p", instruction, "--output-format", "json"],
      stdin: systemAndPrompt,
      files: {},
      env: { NO_COLOR: "1" },
    };
  }

  if (runtime === "copilot-cli") {
    // Verified: -p runs programmatically and IGNORES piped stdin, so the
    // whole prompt rides argv; -s prints the response only; --no-color for
    // clean capture; --no-ask-user stops dead-end clarification calls;
    // --attachment per image. Mutating tools stay approval-gated (denied
    // headless), which is what we want with no UnClick tools attached.
    const args = ["-p", systemAndPrompt, "-s", "--no-color", "--no-ask-user"];
    for (const imagePath of opts.imagePaths) args.push("--attachment", imagePath);
    return { command: "copilot", args, stdin: "", files: {}, env: {} };
  }

  if (runtime === "cursor-cli") {
    // Verified: -p print mode; --output-format json answers in .result;
    // image paths referenced in the prompt text are auto-read; without
    // --force nothing mutates. Known headless hangs are covered by the
    // timeout + stdout salvage in the runner.
    let prompt = systemAndPrompt;
    if (opts.imagePaths.length > 0) {
      prompt += `\n\nAttached images:\n${opts.imagePaths.map((p) => `- ${p}`).join("\n")}`;
    }
    return {
      command: "cursor-agent",
      args: ["-p", prompt, "--output-format", "json"],
      stdin: "",
      files: {},
      env: {},
    };
  }

  // Unknown runtime: refuse loudly rather than guess a binary.
  return { command: "", args: [], stdin: "", files: {}, env: {} };
}

// ─── CLI runner (spawns the signed-in local CLI) ──────────────

async function spawnPlan(
  plan: CliPlan,
  opts: {
    runtime: SeatBridgeRuntime;
    workDir: string;
    lastMessagePath: string;
    timeoutMs: number;
    toolMode: SeatToolMode;
    baseUrl: string;
    commandOverride?: string;
  },
): Promise<CliResult & { enoent?: boolean }> {
  const command = opts.commandOverride ?? plan.command;
  return new Promise((resolve) => {
    const child = spawn(command, plan.args, {
      cwd: opts.workDir,
      stdio: ["pipe", "pipe", "pipe"],
      env: {
        ...process.env,
        ...plan.env,
        UNCLICK_SEAT_TOOL_MODE: opts.toolMode,
        UNCLICK_API_URL: opts.baseUrl,
      },
    });
    let stdout = "";
    let stderr = "";
    let settled = false;

    const finish = async (kind: "close" | "timeout", code: number | null) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);

      // Primary source for codex is the --output-last-message file.
      let content = "";
      if (opts.runtime === "codex-cli") {
        try {
          content = (await readFile(opts.lastMessagePath, "utf8")).trim();
        } catch {
          /* file may not exist on failure */
        }
      }
      if (!content) content = extractAnswer(opts.runtime, stdout);

      if (kind === "timeout") {
        // A hung CLI may have already printed the answer; salvage it.
        child.kill("SIGKILL");
        if (content) return resolve({ content });
        return resolve({
          error: `${command} timed out after ${Math.round(opts.timeoutMs / 1000)}s`,
        });
      }

      // Basic-tier raw-stdout runtimes only count as answered on exit 0;
      // JSON-parsing runtimes trust a parsed answer.
      const rawStdoutRuntime = opts.runtime === "copilot-cli";
      if (content && (!rawStdoutRuntime || code === 0)) {
        return resolve({ content });
      }
      return resolve({
        error: `${command} exited ${code ?? "?"} with no usable answer${stderr ? `: ${stderr.slice(0, 300)}` : ""}`,
      });
    };

    const timer = setTimeout(() => {
      void finish("timeout", null);
    }, opts.timeoutMs);

    child.stdout.on("data", (chunk: Buffer) => {
      if (stdout.length < MAX_CAPTURE_BYTES) stdout += chunk.toString("utf8");
    });
    child.stderr.on("data", (chunk: Buffer) => {
      if (stderr.length < MAX_CAPTURE_BYTES) stderr += chunk.toString("utf8");
    });
    child.on("error", (err: NodeJS.ErrnoException) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(
        err.code === "ENOENT"
          ? {
              enoent: true,
              error: `${command} is not installed on this machine (or not on PATH). Install and sign in first.`,
            }
          : { error: `${command} failed to start: ${err.message}` },
      );
    });
    child.on("close", (code) => {
      void finish("close", code);
    });

    child.stdin.write(plan.stdin);
    child.stdin.end();
  });
}

async function runCliHeadless(args: RunCliArgs): Promise<CliResult> {
  if (!isBridgeRuntimeId(args.runtime)) {
    return { error: `unknown runtime "${args.runtime}"` };
  }
  let workDir: string | null = null;
  try {
    workDir = await mkdtemp(join(tmpdir(), "unclick-seat-"));
    const lastMessagePath = join(workDir, "last-message.txt");

    // Materialise image attachments for the CLI.
    const imagePaths: string[] = [];
    for (const [index, attachment] of args.attachments.entries()) {
      const safeName = attachment.name.replace(/[^\w.-]/g, "_").slice(0, 80);
      const imagePath = join(workDir, `${index + 1}-${safeName}`);
      await writeFile(imagePath, Buffer.from(attachment.data, "base64"), { mode: 0o600 });
      imagePaths.push(imagePath);
    }

    const plan = buildCliPlan(args.runtime, {
      system: args.system,
      prompt: args.prompt,
      workDir,
      lastMessagePath,
      imagePaths,
      toolMode: args.toolMode,
      apiKey: args.apiKey,
      baseUrl: args.baseUrl,
      serverEntry: resolveOwnServerEntry(),
    });
    if (!plan.command) {
      return { error: `unknown runtime "${args.runtime}"` };
    }
    for (const [path, file] of Object.entries(plan.files)) {
      await writeFile(path, file.content, { mode: file.mode ?? 0o600 });
    }

    const spawnOpts = {
      runtime: args.runtime,
      workDir,
      lastMessagePath,
      timeoutMs: args.timeoutMs,
      toolMode: args.toolMode,
      baseUrl: args.baseUrl,
    };
    let result = await spawnPlan(plan, spawnOpts);
    // Cursor renamed its binary from cursor-agent to agent; try the new
    // name before failing on machines that only have the rename.
    if (result.enoent && args.runtime === "cursor-cli") {
      result = await spawnPlan(plan, { ...spawnOpts, commandOverride: "agent" });
    }
    return { content: result.content, error: result.error };
  } catch (err) {
    return { error: `bridge runner error: ${err instanceof Error ? err.message : String(err)}` };
  } finally {
    if (workDir) await rm(workDir, { recursive: true, force: true }).catch(() => {});
  }
}

// ─── bridge loop ──────────────────────────────────────────────

function apiBase(cfg: SeatBridgeConfig): string {
  return (cfg.baseUrl ?? process.env.UNCLICK_API_URL ?? "https://unclick.world").replace(/\/$/, "");
}

/**
 * One poll cycle for one seat: heartbeat + claim, run the CLI when a job
 * arrives, post the result back. Returns what happened so the outer loop
 * (and tests) can pace themselves.
 */
export async function runSeatBridgeOnce(
  cfg: SeatBridgeConfig,
  seat: SeatSpec = cfg.seats[0],
): Promise<"idle" | "handled" | "error"> {
  const doFetch = cfg.fetchFn ?? fetch;
  const runCli = cfg.runCli ?? runCliHeadless;
  const log = cfg.log ?? ((line: string) => process.stderr.write(`${line}\n`));
  const base = apiBase(cfg);
  const headers = {
    Authorization: `Bearer ${cfg.apiKey}`,
    "Content-Type": "application/json",
  };

  let job: SeatBridgeJob | null;
  try {
    const poll = await doFetch(`${base}/api/chat-bridge?action=poll`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        handle: seat.handle,
        runtime: seat.runtime,
        label: seat.label ?? null,
      }),
    });
    if (!poll.ok) {
      const body = (await poll.json().catch(() => ({}))) as { error?: string };
      log(`seat-bridge[${seat.handle}]: poll failed (${poll.status})${body.error ? `: ${body.error}` : ""}`);
      return "error";
    }
    const parsed = (await poll.json()) as { job?: SeatBridgeJob | null };
    job = parsed.job ?? null;
  } catch (err) {
    log(`seat-bridge[${seat.handle}]: poll error: ${err instanceof Error ? err.message : String(err)}`);
    return "error";
  }

  if (!job) return "idle";

  const toolMode: SeatToolMode = job.tool_mode === "build" ? "build" : "read";
  const attachments = Array.isArray(job.attachments) ? job.attachments : [];
  log(
    `seat-bridge[${seat.handle}]: claimed job ${job.id}, running ${seat.runtime}` +
      ` (${toolMode} mode${attachments.length ? `, ${attachments.length} image(s)` : ""})...`,
  );
  const result = await runCli({
    runtime: seat.runtime,
    system: job.system ?? "",
    prompt: job.prompt,
    timeoutMs: cfg.cliTimeoutMs ?? DEFAULT_CLI_TIMEOUT_MS,
    toolMode,
    attachments,
    apiKey: cfg.apiKey,
    baseUrl: base,
  });

  try {
    const complete = await doFetch(`${base}/api/chat-bridge?action=complete`, {
      method: "POST",
      headers,
      body: JSON.stringify(
        result.content
          ? { job_id: job.id, content: result.content }
          : { job_id: job.id, error: result.error ?? "CLI returned no answer" },
      ),
    });
    if (!complete.ok) {
      log(`seat-bridge[${seat.handle}]: complete failed (${complete.status}) for job ${job.id}`);
      return "error";
    }
  } catch (err) {
    log(`seat-bridge[${seat.handle}]: complete error: ${err instanceof Error ? err.message : String(err)}`);
    return "error";
  }

  log(
    result.content
      ? `seat-bridge[${seat.handle}]: job ${job.id} answered (${result.content.length} chars)`
      : `seat-bridge[${seat.handle}]: job ${job.id} failed: ${result.error}`,
  );
  return "handled";
}

/** Run the bridge forever over all configured seats, backing off on errors. */
export async function startSeatBridge(cfg: SeatBridgeConfig): Promise<never> {
  const log = cfg.log ?? ((line: string) => process.stderr.write(`${line}\n`));
  const baseInterval = cfg.pollIntervalMs ?? DEFAULT_POLL_INTERVAL_MS;
  let errorStreak = 0;
  log(
    `seat-bridge: online against ${apiBase(cfg)} serving ${cfg.seats
      .map((seat) => `@${seat.handle} (${seat.runtime})`)
      .join(", ")}. Answers run on this machine's signed-in CLIs; keep it open.`,
  );
  for (;;) {
    let anyHandled = false;
    let anyError = false;
    for (const seat of cfg.seats) {
      const outcome = await runSeatBridgeOnce(cfg, seat);
      if (outcome === "handled") anyHandled = true;
      if (outcome === "error") anyError = true;
    }
    errorStreak = anyError ? errorStreak + 1 : 0;
    // After a handled job, sweep again immediately: more turns may be queued.
    if (anyHandled) continue;
    const backoff = Math.min(baseInterval * 2 ** Math.min(errorStreak, 4), 60_000);
    await new Promise((resolve) => setTimeout(resolve, errorStreak > 0 ? backoff : baseInterval));
  }
}

// ─── CLI arg parsing for `npx @unclick/mcp-server seat-bridge` ─

const HANDLE_RE = /^[a-z0-9][a-z0-9_-]{0,39}$/;

export function parseSeatBridgeArgs(
  argv: string[],
  env: Record<string, string | undefined> = process.env,
): { error: string } | SeatBridgeConfig {
  const flags = new Map<string, string>();
  const seatFlags: string[] = [];
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith("--")) continue;
    const next = argv[i + 1];
    const value = next === undefined || next.startsWith("--") ? "true" : next;
    if (next !== undefined && !next.startsWith("--")) i += 1;
    if (arg === "--seat") {
      seatFlags.push(value);
    } else {
      flags.set(arg.slice(2), value);
    }
  }

  // Multi-seat form: repeated --seat handle=runtime. Single-seat form
  // (--runtime + --handle) stays supported.
  const seats: SeatSpec[] = [];
  for (const seatFlag of seatFlags) {
    const [handle, runtime] = seatFlag.split("=", 2).map((part) => (part ?? "").trim());
    if (!HANDLE_RE.test(handle)) {
      return { error: `--seat "${seatFlag}": handle must be 1-40 chars of a-z 0-9 - _` };
    }
    if (!isBridgeRuntimeId(runtime)) {
      return {
        error: `--seat "${seatFlag}": runtime must be one of claude-code, codex-cli, gemini-cli, copilot-cli, cursor-cli`,
      };
    }
    seats.push({ handle, runtime });
  }
  if (seats.length === 0) {
    const runtime = flags.get("runtime") ?? "";
    const handle = (flags.get("handle") ?? "").trim();
    if (!isBridgeRuntimeId(runtime)) {
      return {
        error:
          "Pass --seat <handle>=<runtime> (repeatable), or --runtime plus --handle. Runtimes: claude-code, codex-cli, gemini-cli, copilot-cli, cursor-cli.",
      };
    }
    if (!HANDLE_RE.test(handle)) {
      return { error: "Pass --handle (1-40 chars of a-z 0-9 - _), e.g. --handle claude-sub." };
    }
    const seat: SeatSpec = { handle, runtime };
    const label = flags.get("label");
    if (label) seat.label = label;
    seats.push(seat);
  }
  const dupes = new Set<string>();
  for (const seat of seats) {
    if (dupes.has(seat.handle)) return { error: `duplicate seat handle "${seat.handle}"` };
    dupes.add(seat.handle);
  }

  const apiKey = (flags.get("api-key") ?? env.UNCLICK_API_KEY ?? "").trim();
  if (!apiKey.startsWith("uc_") && !apiKey.startsWith("agt_")) {
    return { error: "Set UNCLICK_API_KEY (uc_/agt_) or pass --api-key." };
  }

  const cfg: SeatBridgeConfig = { apiKey, seats };
  const baseUrl = flags.get("base-url");
  if (baseUrl) cfg.baseUrl = baseUrl;
  const interval = Number(flags.get("poll-interval") ?? "");
  if (Number.isFinite(interval) && interval >= 1_000) cfg.pollIntervalMs = interval;
  const cliTimeout = Number(flags.get("cli-timeout") ?? "");
  if (Number.isFinite(cliTimeout) && cliTimeout >= 10_000) cfg.cliTimeoutMs = cliTimeout;
  return cfg;
}

export async function runSeatBridgeCli(argv: string[]): Promise<never> {
  const cfg = parseSeatBridgeArgs(argv);
  if ("error" in cfg) {
    process.stderr.write(
      `${cfg.error}\n\nUsage: npx @unclick/mcp-server seat-bridge --seat claude-sub=claude-code [--seat gpt-sub=codex-cli ...]\n` +
        "       or:  ... seat-bridge --runtime claude-code --handle claude-sub [--label \"Claude (sub)\"]\n" +
        "       auth: UNCLICK_API_KEY env var or --api-key; optional --base-url, --poll-interval ms, --cli-timeout ms\n",
    );
    process.exit(1);
  }
  return startSeatBridge(cfg);
}
