/**
 * UnClick Bug Reporter - Vercel serverless function
 *
 * Route: POST /v1/report-bug
 *
 * Accepts agent-submitted bug reports, auto-classifies severity, and stores
 * them in the Supabase `bug_reports` table.
 *
 * Run this SQL in Supabase SQL Editor to create the table:
 *
 * CREATE TABLE bug_reports (
 *   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   tool_name TEXT NOT NULL,
 *   error_message TEXT NOT NULL,
 *   request_payload JSONB,
 *   expected_behavior TEXT,
 *   agent_context TEXT,
 *   severity TEXT NOT NULL DEFAULT 'medium',
 *   status TEXT NOT NULL DEFAULT 'open',
 *   resolution_notes TEXT,
 *   created_at TIMESTAMPTZ DEFAULT NOW(),
 *   updated_at TIMESTAMPTZ DEFAULT NOW()
 * );
 *
 * ALTER TABLE bug_reports ENABLE ROW LEVEL SECURITY;
 *
 * CREATE POLICY "Allow agent inserts" ON bug_reports
 *   FOR INSERT WITH CHECK (true);
 *
 * CREATE POLICY "Allow status reads" ON bug_reports
 *   FOR SELECT USING (true);
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import * as crypto from "crypto";

function sha256hex(input: string): string {
  return crypto.createHash("sha256").update(input).digest("hex");
}

// ---------------------------------------------------------------------------
// Severity classification
// ---------------------------------------------------------------------------

function classifySeverity(errorMessage: string, requestPayload?: unknown): string {
  const msg = errorMessage.toLowerCase();

  // Critical: server errors, panics, data loss signals
  if (
    msg.includes("500") ||
    msg.includes("internal server error") ||
    msg.includes("panic") ||
    msg.includes("fatal") ||
    msg.includes("data loss") ||
    msg.includes("corruption")
  ) {
    return "critical";
  }

  // High: timeouts, service unavailable, auth failures
  if (
    msg.includes("timeout") ||
    msg.includes("timed out") ||
    msg.includes("503") ||
    msg.includes("502") ||
    msg.includes("service unavailable") ||
    msg.includes("unauthorized") ||
    msg.includes("403")
  ) {
    return "high";
  }

  // Low: not found, validation
  if (
    msg.includes("404") ||
    msg.includes("not found") ||
    msg.includes("validation") ||
    msg.includes("invalid")
  ) {
    return "low";
  }

  // Default to medium for 4xx and anything else
  return "medium";
}

function normalizeAgentContext(agentContext: unknown): string | null {
  if (!agentContext) return null;
  if (typeof agentContext === "string") return agentContext;
  try {
    return JSON.stringify(agentContext);
  } catch {
    return String(agentContext);
  }
}

function normalizeSeverity(value: unknown, fallback: string): string {
  if (typeof value !== "string") return fallback;
  return ["critical", "high", "medium", "low"].includes(value) ? value : fallback;
}

// ---------------------------------------------------------------------------
// Email notification via Resend
// ---------------------------------------------------------------------------

async function sendBugEmail(params: {
  tool_name: string;
  error_message: string;
  severity: string;
  expected_behavior?: string;
  agent_context?: string;
  created_at: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[sendBugEmail] RESEND_API_KEY not set - skipping bug notification email");
    return;
  }

  const { tool_name, error_message, severity, expected_behavior, agent_context, created_at } = params;

  const emailBody = [
    `Tool: ${tool_name}`,
    `Severity: ${severity.toUpperCase()}`,
    `Timestamp: ${created_at}`,
    ``,
    `Error:`,
    error_message,
    expected_behavior ? `\nExpected Behavior:\n${expected_behavior}` : "",
    agent_context ? `\nAgent Context:\n${typeof agent_context === "string" ? agent_context : JSON.stringify(agent_context, null, 2)}` : "",
  ].filter(Boolean).join("\n");

  let resendRes: Response;
  try {
    resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "UnClick Bugs <bugs@unclick.world>",
        to: [process.env.ADMIN_NOTIFICATION_EMAIL || "bugs@unclick.world"],
        subject: `[UnClick Bug] ${severity.toUpperCase()}: ${tool_name}`,
        text: emailBody,
      }),
    });
  } catch (err) {
    console.error("[sendBugEmail] Network error calling Resend:", err);
    return;
  }

  if (!resendRes.ok) {
    const resendText = await resendRes.text();
    console.error("[sendBugEmail] Resend API error - email not sent:", resendRes.status, resendText);
  }
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { tool_name, error_message, request_payload, expected_behavior, agent_context, notify, severity: requested_severity } =
    req.body ?? {};

  if (!tool_name || !error_message) {
    return res.status(400).json({
      error: "tool_name and error_message are required",
    });
  }

  const authHeader = (req.headers.authorization ?? "").replace(/^Bearer\s+/i, "").trim();
  const bodyApiKey = typeof req.body?.api_key === "string" ? req.body.api_key.trim() : "";
  const rawApiKey = authHeader || bodyApiKey;
  const apiKeyHash = rawApiKey ? sha256hex(rawApiKey) : null;

  const severity = normalizeSeverity(requested_severity, classifySeverity(String(error_message), request_payload));
  const normalizedAgentContext = normalizeAgentContext(agent_context);

  // ---------------------------------------------------------------------------
  // Supabase write
  // ---------------------------------------------------------------------------

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    // Graceful degradation: log and return success shape so agents aren't blocked
    console.error("Supabase env vars missing - bug report not persisted");
    return res.status(200).json({
      id: null,
      severity,
      status: "open",
      persisted: false,
      message: "Bug report received (storage unavailable)",
    });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from("bug_reports")
    .insert({
      tool_name: String(tool_name),
      error_message: String(error_message),
      request_payload: request_payload ?? null,
      expected_behavior: expected_behavior ? String(expected_behavior) : null,
      agent_context: normalizedAgentContext,
      severity,
      status: "open",
      api_key_hash: apiKeyHash,
    })
    .select("id, severity, status, created_at")
    .single();

  if (error) {
    console.error("Supabase insert error:", error.message);
    return res.status(500).json({ error: "Failed to store bug report", detail: error.message });
  }

  // Await the email so Vercel doesn't terminate before the request completes
  if (notify !== false) {
    await sendBugEmail({
      tool_name: String(tool_name),
      error_message: String(error_message),
      severity,
      expected_behavior: expected_behavior ? String(expected_behavior) : undefined,
      agent_context: normalizedAgentContext ?? undefined,
      created_at: data.created_at ?? new Date().toISOString(),
    });
  }

  return res.status(201).json({
    ...data,
    persisted: true,
    message: "Bug report filed",
  });
}
