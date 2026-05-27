/**
 * SlopPass API - deterministic AI-code quality review.
 *
 * POST ?action=run
 * Body: { target, files?, diff?, checks?, provider?, target_sha? }
 *
 * SlopPass inspects caller-provided file text or unified diff text only.
 * It does not execute code, read repositories, call paid providers, or persist
 * source content. The response is a complete receipt with JSON, markdown, and
 * HTML report bodies for the inspected scope.
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import * as crypto from "node:crypto";
import { runSlopPass } from "../packages/sloppass/src/runner/index.js";
import {
  generateHtmlReport,
  generateJsonReport,
  generateMarkdownReport,
} from "../packages/sloppass/src/reporter.js";
import type { SlopPassRunInput } from "../packages/sloppass/src/schema.js";

const CORS = {
  "Access-Control-Allow-Origin": "https://unclick.world",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Authorization,Content-Type",
};

function json(res: VercelResponse, status: number, body: unknown) {
  res.status(status).setHeader("Content-Type", "application/json");
  Object.entries(CORS).forEach(([key, value]) => res.setHeader(key, value));
  res.end(JSON.stringify(body));
}

function sha256hex(input: string): string {
  return crypto.createHash("sha256").update(input).digest("hex");
}

async function getActorUserIdFromJwt(supabaseUrl: string, token: string): Promise<string | null> {
  const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) return null;
  const user = (await response.json()) as { id?: string };
  return user.id ?? null;
}

async function getActorUserIdFromApiKey(
  supabaseUrl: string,
  serviceKey: string,
  apiKey: string,
): Promise<string | null> {
  const apiKeyHash = sha256hex(apiKey);
  const response = await fetch(
    `${supabaseUrl}/rest/v1/api_keys?key_hash=eq.${encodeURIComponent(apiKeyHash)}&is_active=eq.true&select=user_id&limit=1`,
    { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` } },
  );
  if (!response.ok) return null;
  const rows = (await response.json()) as Array<{ user_id: string | null }>;
  return rows[0]?.user_id ?? null;
}

async function resolveActorUserId(
  supabaseUrl: string,
  serviceKey: string,
  token: string,
): Promise<string | null> {
  if (token.startsWith("uc_")) return getActorUserIdFromApiKey(supabaseUrl, serviceKey, token);
  return getActorUserIdFromJwt(supabaseUrl, token);
}

function runIdFor(input: unknown): string {
  return `sloppass_${sha256hex(JSON.stringify(input)).slice(0, 20)}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") return json(res, 204, {});
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });

  const action = (req.query.action ?? "run") as string;
  if (action !== "run" && action !== "start_run") {
    return json(res, 404, { error: "Unknown action" });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return json(res, 500, { error: "Server misconfigured: missing Supabase env vars" });
  }

  const token = (req.headers.authorization ?? "").replace(/^Bearer\s+/i, "");
  if (!token) return json(res, 401, { error: "Missing Bearer token" });

  const actorUserId = await resolveActorUserId(supabaseUrl, serviceKey, token);
  if (!actorUserId) return json(res, 401, { error: "Invalid session" });

  const body = (req.body ?? {}) as SlopPassRunInput & { target_sha?: string };
  try {
    const result = await runSlopPass(body);
    const run_id = runIdFor({
      target: body.target,
      files: body.files?.map((file) => ({ path: file.path, sha: sha256hex(file.content) })),
      diff_sha: body.diff ? sha256hex(body.diff) : null,
      checks: body.checks,
      provider: body.provider,
      target_sha: body.target_sha ?? null,
    });
    return json(res, 200, {
      run_id,
      status: "complete",
      pass: "sloppass",
      target_sha: body.target_sha ?? null,
      verdict: result.verdict,
      finding_count: result.findings.length,
      summary: result.summary,
      result,
      reports: {
        json: generateJsonReport(result),
        markdown: generateMarkdownReport(result),
        html: generateHtmlReport(result),
      },
      note: "SlopPass inspected only the provided file text or diff text. Source content is not persisted by this endpoint.",
    });
  } catch (error) {
    return json(res, 400, {
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
