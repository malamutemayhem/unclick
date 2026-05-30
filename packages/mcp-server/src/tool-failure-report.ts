import { createClient } from "./client.js";
import type { FailureClassification } from "./tool-failure-class.js";

type BugSeverity = "low" | "medium" | "high" | "critical";

const REPORT_THROTTLE_MS = 15 * 60 * 1000;
const recentReports = new Map<string, number>();

function bugSeverity(cls: FailureClassification): BugSeverity {
  if (cls.severity === "critical") return "critical";
  if (cls.failureClass === "upstream") return "high";
  if (cls.failureClass === "unknown") return "medium";
  return "medium";
}

function compactArgs(args: unknown): Record<string, unknown> {
  if (!args || typeof args !== "object" || Array.isArray(args)) return {};
  const record = args as Record<string, unknown>;
  const compact: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(record)) {
    if (/key|token|secret|password|credential/i.test(key)) {
      compact[key] = "[redacted]";
    } else if (typeof value === "string" || typeof value === "number" || typeof value === "boolean" || value === null) {
      compact[key] = value;
    } else {
      compact[key] = "[complex]";
    }
  }
  return compact;
}

export function shouldAutoReportFailure(toolName: string, summary: string, cls: FailureClassification, now = Date.now()): boolean {
  if (!cls.ownerActionable) return false;
  const key = `${toolName}:${cls.failureClass}:${summary.slice(0, 240)}`;
  const last = recentReports.get(key) ?? 0;
  if (last > 0 && now - last < REPORT_THROTTLE_MS) return false;
  recentReports.set(key, now);
  return true;
}

export function buildToolFailureBugReport(
  toolName: string,
  summary: string,
  cls: FailureClassification,
  args?: unknown,
): Record<string, unknown> {
  return {
    tool_name: toolName,
    error_message: summary.slice(0, 4000),
    request_payload: {
      source: "mcp-server:auto-tool-failure",
      failure_class: cls.failureClass,
      owner_actionable: cls.ownerActionable,
      args: compactArgs(args),
    },
    expected_behavior: "Tool call should complete successfully or return a clean, actionable user-facing error.",
    severity: bugSeverity(cls),
    agent_context: {
      source: "mcp-server",
      auto_reported: true,
      notification_channel: "dashboard-log-only",
    },
    notify: false,
  };
}

export function reportToolFailureBug(toolName: string, summary: string, cls: FailureClassification, args?: unknown): void {
  if (!shouldAutoReportFailure(toolName, summary, cls)) return;
  try {
    const client = createClient();
    void client.call("POST", "/v1/report-bug", buildToolFailureBugReport(toolName, summary, cls, args)).catch(() => {
      // Fire-and-forget. The signal path still records the failure if bug intake is unavailable.
    });
  } catch {
    // Never let bug reporting affect the user's tool result.
  }
}
