// ─── Subscription seat bridge ─────────────────────────────────────────────────
// Lets a chat seat on unclick.world/admin/chat answer on the user's OWN
// consumer plan instead of an API key, by driving the official CLI that is
// already signed in on this machine:
//
//   claude-code  ->  `claude -p`     (Claude Pro/Max via the Claude Code CLI)
//   codex-cli    ->  `codex exec`    (ChatGPT Plus/Pro via the Codex CLI)
//
// Run it with:  npx @unclick/mcp-server seat-bridge --runtime claude-code \
//                 --handle claude-sub
// Auth:         UNCLICK_API_KEY env var (uc_/agt_), or --api-key.
// Server:       UNCLICK_API_URL overrides https://unclick.world (previews).
//
// Loop: poll /api/chat-bridge?action=poll (heartbeat + claim one job), run
// the CLI headless with the job's prompt, POST the reply to action=complete.
// The bridge never sees or sends any provider credential; the CLI holds its
// own login. If the CLI is not installed or not signed in, the job fails
// with an honest error that surfaces in the chat UI.

import { spawn } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

export type SeatBridgeRuntime = "claude-code" | "codex-cli";

export interface SeatBridgeJob {
  id: string;
  system: string | null;
  prompt: string;
  thread_id: string | null;
  runtime: string;
}

export interface CliResult {
  content?: string;
  error?: string;
}

export interface SeatBridgeConfig {
  apiKey: string;
  handle: string;
  runtime: SeatBridgeRuntime;
  baseUrl?: string;
  label?: string;
  pollIntervalMs?: number;
  cliTimeoutMs?: number;
  /** Injection points for tests. */
  fetchFn?: typeof fetch;
  runCli?: (args: {
    runtime: SeatBridgeRuntime;
    system: string;
    prompt: string;
    timeoutMs: number;
  }) => Promise<CliResult>;
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

// `codex exec --json` emits JSONL events. The final agent message has moved
// between schema versions, so accept the known shapes and keep the LAST
// match: item.completed items with agent text, or msg.agent_message rows.
// Anything else falls back to the last-message file or raw stdout.
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

// The Codex CLI has no system-prompt flag, so the system block rides at the
// top of the piped prompt. Claude Code gets the system block through
// --append-system-prompt, so its stdin is the prompt alone.
export function composeCliStdin(
  runtime: SeatBridgeRuntime,
  system: string,
  prompt: string,
): string {
  if (runtime === "codex-cli" && system.trim()) {
    return `${system.trim()}\n\n${prompt}`;
  }
  return prompt;
}

export function buildCliInvocation(
  runtime: SeatBridgeRuntime,
  system: string,
  lastMessagePath: string,
): { command: string; args: string[] } {
  if (runtime === "claude-code") {
    const args = ["-p", "--output-format", "json"];
    if (system.trim()) args.push("--append-system-prompt", system.trim());
    return { command: "claude", args };
  }
  return {
    command: "codex",
    args: [
      "exec",
      "--skip-git-repo-check",
      "--json",
      "--output-last-message",
      lastMessagePath,
      "-",
    ],
  };
}

// ─── CLI runner (spawns the signed-in local CLI) ──────────────

async function runCliHeadless(args: {
  runtime: SeatBridgeRuntime;
  system: string;
  prompt: string;
  timeoutMs: number;
}): Promise<CliResult> {
  let workDir: string | null = null;
  try {
    workDir = await mkdtemp(join(tmpdir(), "unclick-seat-"));
    const lastMessagePath = join(workDir, "last-message.txt");
    const { command, args: cliArgs } = buildCliInvocation(
      args.runtime,
      args.system,
      lastMessagePath,
    );
    const stdin = composeCliStdin(args.runtime, args.system, args.prompt);

    const result = await new Promise<CliResult>((resolve) => {
      const child = spawn(command, cliArgs, {
        cwd: workDir ?? tmpdir(),
        stdio: ["pipe", "pipe", "pipe"],
        env: process.env,
      });
      let stdout = "";
      let stderr = "";
      let settled = false;
      const timer = setTimeout(() => {
        if (settled) return;
        settled = true;
        child.kill("SIGKILL");
        resolve({ error: `${command} timed out after ${Math.round(args.timeoutMs / 1000)}s` });
      }, args.timeoutMs);

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
        resolve({
          error:
            err.code === "ENOENT"
              ? `${command} is not installed on this machine (or not on PATH). Install and sign in first.`
              : `${command} failed to start: ${err.message}`,
        });
      });
      child.on("close", async (code) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        if (args.runtime === "claude-code") {
          const content = parseClaudeOutput(stdout);
          if (content) return resolve({ content });
          return resolve({
            error: `claude exited ${code ?? "?"} with no answer${stderr ? `: ${stderr.slice(0, 300)}` : ""}`,
          });
        }
        // codex: prefer the --output-last-message file, then JSONL parsing.
        let content = "";
        try {
          content = (await readFile(lastMessagePath, "utf8")).trim();
        } catch {
          /* file may not exist on failure */
        }
        if (!content) content = parseCodexJsonl(stdout);
        if (content) return resolve({ content });
        return resolve({
          error: `codex exited ${code ?? "?"} with no answer${stderr ? `: ${stderr.slice(0, 300)}` : ""}`,
        });
      });

      child.stdin.write(stdin);
      child.stdin.end();
    });
    return result;
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
 * One poll cycle: heartbeat + claim, run the CLI when a job arrives, post
 * the result back. Returns what happened so the outer loop (and tests) can
 * pace themselves.
 */
export async function runSeatBridgeOnce(
  cfg: SeatBridgeConfig,
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
        handle: cfg.handle,
        runtime: cfg.runtime,
        label: cfg.label ?? null,
      }),
    });
    if (!poll.ok) {
      const body = (await poll.json().catch(() => ({}))) as { error?: string };
      log(`seat-bridge: poll failed (${poll.status})${body.error ? `: ${body.error}` : ""}`);
      return "error";
    }
    const parsed = (await poll.json()) as { job?: SeatBridgeJob | null };
    job = parsed.job ?? null;
  } catch (err) {
    log(`seat-bridge: poll error: ${err instanceof Error ? err.message : String(err)}`);
    return "error";
  }

  if (!job) return "idle";

  log(`seat-bridge: claimed job ${job.id}, running ${cfg.runtime}...`);
  const result = await runCli({
    runtime: cfg.runtime,
    system: job.system ?? "",
    prompt: job.prompt,
    timeoutMs: cfg.cliTimeoutMs ?? DEFAULT_CLI_TIMEOUT_MS,
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
      log(`seat-bridge: complete failed (${complete.status}) for job ${job.id}`);
      return "error";
    }
  } catch (err) {
    log(`seat-bridge: complete error: ${err instanceof Error ? err.message : String(err)}`);
    return "error";
  }

  log(
    result.content
      ? `seat-bridge: job ${job.id} answered (${result.content.length} chars)`
      : `seat-bridge: job ${job.id} failed: ${result.error}`,
  );
  return "handled";
}

/** Run the bridge forever, backing off on repeated errors. */
export async function startSeatBridge(cfg: SeatBridgeConfig): Promise<never> {
  const log = cfg.log ?? ((line: string) => process.stderr.write(`${line}\n`));
  const baseInterval = cfg.pollIntervalMs ?? DEFAULT_POLL_INTERVAL_MS;
  let errorStreak = 0;
  log(
    `seat-bridge: online as @${cfg.handle} (${cfg.runtime}) against ${apiBase(cfg)}. ` +
      "Answers run on this machine's signed-in CLI; keep it open.",
  );
  for (;;) {
    const outcome = await runSeatBridgeOnce(cfg);
    errorStreak = outcome === "error" ? errorStreak + 1 : 0;
    // After a handled job, poll again immediately: more turns may be queued.
    if (outcome === "handled") continue;
    const backoff = Math.min(baseInterval * 2 ** Math.min(errorStreak, 4), 60_000);
    await new Promise((resolve) => setTimeout(resolve, errorStreak > 0 ? backoff : baseInterval));
  }
}

// ─── CLI arg parsing for `npx @unclick/mcp-server seat-bridge` ─

export function parseSeatBridgeArgs(
  argv: string[],
  env: Record<string, string | undefined> = process.env,
): { error: string } | SeatBridgeConfig {
  const flags = new Map<string, string>();
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith("--")) continue;
    const next = argv[i + 1];
    if (next === undefined || next.startsWith("--")) {
      flags.set(arg.slice(2), "true");
    } else {
      flags.set(arg.slice(2), next);
      i += 1;
    }
  }

  const runtime = flags.get("runtime") ?? "";
  if (runtime !== "claude-code" && runtime !== "codex-cli") {
    return { error: "Pass --runtime claude-code or --runtime codex-cli." };
  }
  const handle = (flags.get("handle") ?? "").trim();
  if (!/^[a-z0-9][a-z0-9_-]{0,39}$/.test(handle)) {
    return { error: "Pass --handle (1-40 chars of a-z 0-9 - _), e.g. --handle claude-sub." };
  }
  const apiKey = (flags.get("api-key") ?? env.UNCLICK_API_KEY ?? "").trim();
  if (!apiKey.startsWith("uc_") && !apiKey.startsWith("agt_")) {
    return { error: "Set UNCLICK_API_KEY (uc_/agt_) or pass --api-key." };
  }

  const cfg: SeatBridgeConfig = { apiKey, handle, runtime };
  const baseUrl = flags.get("base-url");
  if (baseUrl) cfg.baseUrl = baseUrl;
  const label = flags.get("label");
  if (label) cfg.label = label;
  const interval = Number(flags.get("poll-interval") ?? "");
  if (Number.isFinite(interval) && interval >= 1_000) cfg.pollIntervalMs = interval;
  return cfg;
}

export async function runSeatBridgeCli(argv: string[]): Promise<never> {
  const cfg = parseSeatBridgeArgs(argv);
  if ("error" in cfg) {
    process.stderr.write(
      `${cfg.error}\n\nUsage: npx @unclick/mcp-server seat-bridge --runtime claude-code --handle claude-sub\n` +
        "       (auth: UNCLICK_API_KEY env var or --api-key; optional --label, --base-url, --poll-interval ms)\n",
    );
    process.exit(1);
  }
  return startSeatBridge(cfg);
}
