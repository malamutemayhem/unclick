#!/usr/bin/env node

import { pathToFileURL } from "node:url";

const DEFAULT_API_URL = "https://unclick.world/api/memory-admin";
const TERMINAL_STATES = new Set(["completed", "failed", "cancelled"]);

function readFlag(argv, name) {
  const index = argv.indexOf(name);
  if (index === -1) return null;
  const value = argv[index + 1];
  if (!value || value.startsWith("--")) return "";
  return value;
}

function hasFlag(argv, name) {
  return argv.includes(name);
}

export function parseDispatchCompleteArgs(argv, env = process.env) {
  const dispatchId = readFlag(argv, "--dispatch-id") || env.WAKE_DISPATCH_ID || "";
  const agentId = readFlag(argv, "--agent-id") || env.WAKE_AGENT_ID || "unclick-builder-tether-seat";
  const state = (readFlag(argv, "--state") || "completed").toLowerCase();
  const apiUrl = readFlag(argv, "--api-url") || env.UNCLICK_API_URL || DEFAULT_API_URL;
  const dryRun = hasFlag(argv, "--dry-run") || env.WAKE_DISPATCH_DRY_RUN === "1";
  const currentTask = readFlag(argv, "--current-task") || "dispatch cleanup";
  const nextAction = readFlag(argv, "--next-action") || "remove stale WakePass blocker";

  return {
    dispatchId: dispatchId.trim(),
    agentId: agentId.trim(),
    state,
    apiUrl,
    dryRun,
    currentTask,
    nextAction,
  };
}

export function validateDispatchCompleteArgs(args) {
  if (!args.dispatchId) return "dispatch_id required";
  if (!args.agentId) return "agent_id required";
  if (!TERMINAL_STATES.has(args.state)) return "state must be completed, failed, or cancelled";
  return null;
}

export function buildDispatchTerminalRequest(args) {
  if (args.state === "completed") {
    return {
      url: `${args.apiUrl}?action=reliability_heartbeats&method=publish`,
      body: {
        dispatch_id: args.dispatchId,
        agent_id: args.agentId,
        state: "completed",
        current_task: args.currentTask,
        next_action: args.nextAction,
      },
    };
  }

  return {
    url: `${args.apiUrl}?action=reliability_dispatches&method=release`,
    body: {
      dispatch_id: args.dispatchId,
      agent_id: args.agentId,
      status: args.state,
    },
  };
}

export function buildAuthHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

export function redactHeaders(headers) {
  return {
    ...headers,
    Authorization: headers.Authorization ? "Bearer [redacted]" : undefined,
  };
}

async function main() {
  const args = parseDispatchCompleteArgs(process.argv.slice(2));
  const validationError = validateDispatchCompleteArgs(args);
  if (validationError) {
    console.error(`BLOCKER: ${validationError}`);
    process.exitCode = 1;
    return;
  }

  const request = buildDispatchTerminalRequest(args);
  const token = process.env.UNCLICK_API_KEY || process.env.FISHBOWL_WAKE_TOKEN || process.env.FISHBOWL_AUTOCLOSE_TOKEN || "";

  if (args.dryRun) {
    console.log(JSON.stringify({ dry_run: true, request }, null, 2));
    return;
  }

  if (!token) {
    console.error("BLOCKER: UNCLICK_API_KEY, FISHBOWL_WAKE_TOKEN, or FISHBOWL_AUTOCLOSE_TOKEN is required.");
    process.exitCode = 1;
    return;
  }

  const response = await fetch(request.url, {
    method: "POST",
    headers: buildAuthHeaders(token),
    body: JSON.stringify(request.body),
  });
  const responseBody = await response.text();
  if (!response.ok) {
    console.error(`BLOCKER: dispatch terminal update failed HTTP ${response.status}: ${responseBody}`);
    process.exitCode = 1;
    return;
  }

  console.log(
    JSON.stringify(
      {
        pass: true,
        status: response.status,
        dispatch_id: args.dispatchId,
        terminal_state: args.state,
        response: responseBody ? JSON.parse(responseBody) : null,
      },
      null,
      2,
    ),
  );
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(`BLOCKER: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  });
}
