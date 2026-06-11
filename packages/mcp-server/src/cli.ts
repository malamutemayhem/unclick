#!/usr/bin/env node
/**
 * unclick: the thin CLI veneer over the UnClick rails.
 *
 * Gives terminal-resident agents (and humans) the high-frequency operations
 * as cheap shell commands with no MCP schema tax:
 *
 *   unclick memory <op> ['{"json":"args"}']   any memory operation
 *   unclick call <endpoint_id> ['{...}']      any catalog endpoint
 *   unclick runner once [--now <iso>]         one AutoPilot Runner pass
 *   unclick runner start [--interval <sec>]   long-running runner daemon
 *   unclick help
 *
 * Uses the exact same handlers as the MCP server, so local zero-config
 * memory, BYOD Supabase, and managed cloud all behave identically here.
 */

import { pathToFileURL } from "node:url";
import { MEMORY_HANDLERS } from "./memory/handlers.js";
import { executeEndpoint } from "./runner/executor.js";
import { runRunner } from "./runner/runner.js";

export interface CliCommand {
  kind: "memory" | "call" | "runner" | "help";
  op?: string;
  endpointId?: string;
  params?: Record<string, unknown>;
  runnerMode?: "once" | "start";
  intervalSeconds?: number;
  now?: string;
  error?: string;
}

const HELP_TEXT = `unclick - UnClick rails from the terminal

Usage:
  unclick memory <op> ['{"json":"args"}']   Run a memory operation
                                            (load_memory, save_fact, search_memory,
                                             save_playbook, list_schedules, ...)
  unclick call <endpoint_id> ['{...}']      Execute any UnClick catalog endpoint
  unclick runner once [--now <iso>]         Run one AutoPilot Runner pass
  unclick runner start [--interval <sec>]   Run the AutoPilot Runner daemon
  unclick help                              Show this help

Environment:
  UNCLICK_API_KEY         enables managed memory, Boardroom delivery, remote endpoints
  MEMORY_LOCAL_DATA_DIR   overrides the local zero-config memory location`;

function parseJsonArg(raw: string | undefined): { params: Record<string, unknown> } | { error: string } {
  if (!raw) return { params: {} };
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return { error: "JSON args must be an object, e.g. '{\"query\":\"x\"}'." };
    }
    return { params: parsed as Record<string, unknown> };
  } catch {
    return { error: `Could not parse JSON args: ${raw}` };
  }
}

export function parseCliArgs(argv: string[]): CliCommand {
  const [command, ...rest] = argv;
  if (!command || command === "help" || command === "--help" || command === "-h") {
    return { kind: "help" };
  }

  if (command === "memory") {
    const op = rest[0];
    if (!op) return { kind: "memory", error: "memory needs an operation, e.g. unclick memory load_memory" };
    const json = parseJsonArg(rest[1]);
    if ("error" in json) return { kind: "memory", op, error: json.error };
    return { kind: "memory", op, params: json.params };
  }

  if (command === "call") {
    const endpointId = rest[0];
    if (!endpointId) return { kind: "call", error: "call needs an endpoint id, e.g. unclick call weather_current" };
    const json = parseJsonArg(rest[1]);
    if ("error" in json) return { kind: "call", endpointId, error: json.error };
    return { kind: "call", endpointId, params: json.params };
  }

  if (command === "runner") {
    const mode = rest[0] === "start" ? "start" : rest[0] === "once" ? "once" : undefined;
    if (!mode) return { kind: "runner", error: 'runner needs a mode: "once" or "start".' };
    const cmd: CliCommand = { kind: "runner", runnerMode: mode };
    for (let i = 1; i < rest.length; i++) {
      if (rest[i] === "--interval" && rest[i + 1]) {
        const seconds = Number(rest[i + 1]);
        if (!Number.isFinite(seconds) || seconds < 30) {
          return { kind: "runner", error: "--interval must be a number of seconds (minimum 30)." };
        }
        cmd.intervalSeconds = seconds;
        i++;
      } else if (rest[i] === "--now" && rest[i + 1]) {
        cmd.now = rest[i + 1];
        i++;
      } else {
        return { kind: "runner", error: `Unknown runner flag: ${rest[i]}` };
      }
    }
    return cmd;
  }

  return { kind: "help", error: `Unknown command: ${command}` };
}

export async function runCli(argv: string[]): Promise<number> {
  const cmd = parseCliArgs(argv);

  if (cmd.error) {
    console.error(cmd.error);
    console.error(HELP_TEXT);
    return 1;
  }

  if (cmd.kind === "help") {
    console.log(HELP_TEXT);
    return 0;
  }

  if (cmd.kind === "memory") {
    const handler = MEMORY_HANDLERS[cmd.op ?? ""];
    if (!handler) {
      console.error(`Unknown memory operation "${cmd.op}". Known ops include: ${Object.keys(MEMORY_HANDLERS).sort().join(", ")}`);
      return 1;
    }
    const result = await handler(cmd.params ?? {});
    console.log(JSON.stringify(result, null, 2));
    return 0;
  }

  if (cmd.kind === "call") {
    const result = await executeEndpoint(cmd.endpointId ?? "", cmd.params ?? {});
    console.log(JSON.stringify(result, null, 2));
    return result.ok ? 0 : 1;
  }

  // runner
  const report = await runRunner({
    once: cmd.runnerMode === "once",
    intervalSeconds: cmd.intervalSeconds,
    now: cmd.now,
  });
  if (report) console.log(JSON.stringify(report, null, 2));
  return 0;
}

const isMain =
  typeof process.argv[1] === "string" &&
  import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMain) {
  runCli(process.argv.slice(2)).then(
    (code) => {
      process.exitCode = code;
    },
    (err) => {
      console.error(err instanceof Error ? err.message : String(err));
      process.exitCode = 1;
    },
  );
}
