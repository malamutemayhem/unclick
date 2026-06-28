/**
 * UnClick File Workspace ("Large-PR Room")
 * Vercel serverless function - server-side staging for large/streamed files,
 * pushed to git BY REFERENCE so file content never has to pass back through the
 * model's response (the ~600KB inline-push wall). See
 * docs/prd/unclick-file-workspace.md and migration
 * 20260628120000_unclick_file_workspace.sql.
 *
 * Auth: Authorization: Bearer <unclick_api_key>. The key is hashed to scope
 * every row to one tenant (never stored). The plaintext key is also used to
 * resolve the caller's stored GitHub credential for the push, so end users keep
 * "one connection, no keys their end".
 *
 * Endpoints (action via ?action= or body.action):
 *   POST ?action=put    { workspace_id?, path, content, seq? }
 *       Append one chunk of a file. Omit workspace_id on the first call to get a
 *       fresh one back. Stream a big file as many small puts (each well under the
 *       tool-arg limit), then push once.
 *   GET  ?workspace_id=  -> list staged files (path, bytes, chunks, expires_at).
 *   POST ?action=push   { workspace_id, owner, repo, branch, base_branch?,
 *                         message?, github_token? }
 *       Assemble every staged file for the workspace and write them to `branch`
 *       via the GitHub Git Data API (blobs -> tree -> commit -> ref). Rows are
 *       kept (retention), not deleted.
 *   POST ?action=prune  -> delete this tenant's rows past expires_at (retention
 *       cleanup; never deletes un-expired work).
 *
 * Required env (server-side only): SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY.
 * Optional fallback: GITHUB_TOKEN.
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import * as crypto from "crypto";

const GITHUB_API = "https://api.github.com";
const RETENTION_DAYS = 21; // inside the agreed 10-30 day lifecycle

// ─── Crypto (mirrors api/credentials.ts so the same stored github token decrypts) ──

const PBKDF2_ITERATIONS = 100_000;
const KEY_BYTES = 32;

function sha256hex(input: string): string {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function deriveKey(apiKey: string, salt: Buffer): Buffer {
  return crypto.pbkdf2Sync(apiKey, salt, PBKDF2_ITERATIONS, KEY_BYTES, "sha256");
}

function decrypt(iv: string, authTag: string, ciphertext: string, key: Buffer): string {
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, Buffer.from(iv, "hex"));
  decipher.setAuthTag(Buffer.from(authTag, "hex"));
  return Buffer.concat([
    decipher.update(Buffer.from(ciphertext, "hex")),
    decipher.final(),
  ]).toString("utf8");
}

// ─── Supabase REST helpers (service role, server-side only) ───────────────────

function supabaseHeaders(serviceRoleKey: string): Record<string, string> {
  return {
    apikey:         serviceRoleKey,
    Authorization:  `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
    Prefer:         "return=representation",
  };
}

async function supabaseFetch(
  url: string,
  method: string,
  headers: Record<string, string>,
  body?: unknown,
): Promise<{ ok: boolean; status: number; data: unknown }> {
  const res = await fetch(url, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  let data: unknown;
  try { data = await res.json(); } catch { data = null; }
  return { ok: res.ok, status: res.status, data };
}

// ─── Pure helpers (exported for tests) ────────────────────────────────────────

export type Chunk = { path: string; seq: number; content: string };
export type AssembledFile = { path: string; content: string };

/** ISO timestamp `days` from `now`. The row's retention horizon. */
export function retentionExpiry(now: Date, days: number = RETENTION_DAYS): string {
  return new Date(now.getTime() + days * 24 * 60 * 60 * 1000).toISOString();
}

/** Validate a `put`. Returns an error string, or null when ok. */
export function validatePut(body: Record<string, unknown>): string | null {
  if (!body || typeof body !== "object") return "Body required.";
  if (typeof body.path !== "string" || body.path.trim() === "") return "path is required.";
  if (body.path.includes("..")) return "path must not contain '..'.";
  if (typeof body.content !== "string") return "content (string) is required.";
  if (body.seq !== undefined && (typeof body.seq !== "number" || body.seq < 0)) {
    return "seq must be a non-negative number.";
  }
  return null;
}

/** Validate a `push`. Returns an error string, or null when ok. */
export function validatePush(body: Record<string, unknown>): string | null {
  if (!body || typeof body !== "object") return "Body required.";
  for (const f of ["workspace_id", "owner", "repo", "branch"] as const) {
    if (typeof body[f] !== "string" || (body[f] as string).trim() === "") {
      return `${f} is required.`;
    }
  }
  return null;
}

/**
 * Group chunk rows into whole files: order by (path, seq) and concatenate each
 * file's chunks. Deterministic regardless of row order coming back from the DB.
 */
export function assembleFiles(rows: Chunk[]): AssembledFile[] {
  const byPath = new Map<string, Chunk[]>();
  for (const r of rows) {
    const list = byPath.get(r.path) ?? [];
    list.push(r);
    byPath.set(r.path, list);
  }
  return [...byPath.keys()]
    .sort()
    .map((path) => ({
      path,
      content: byPath
        .get(path)!
        .slice()
        .sort((a, b) => a.seq - b.seq)
        .map((c) => c.content)
        .join(""),
    }));
}

/** Map blob SHAs to a GitHub tree payload (all regular file blobs). */
export function buildTreeEntries(
  blobs: Array<{ path: string; sha: string }>,
): Array<{ path: string; mode: "100644"; type: "blob"; sha: string }> {
  return blobs.map((b) => ({ path: b.path, mode: "100644", type: "blob", sha: b.sha }));
}

// ─── GitHub Git Data API push-by-reference ────────────────────────────────────

function ghHeaders(token: string): Record<string, string> {
  return {
    Authorization:          `Bearer ${token}`,
    Accept:                 "application/vnd.github+json",
    "Content-Type":         "application/json",
    "User-Agent":           "unclick-file-workspace/1.0",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function ghJson<T extends Record<string, unknown> = Record<string, unknown>>(
  url: string,
  init: { method: string; headers: Record<string, string>; body?: unknown },
): Promise<{ ok: boolean; status: number; data: T | null }> {
  const res = await fetch(url, {
    method:  init.method,
    headers: init.headers,
    body:    init.body !== undefined ? JSON.stringify(init.body) : undefined,
  });
  let data: T | null;
  try { data = (await res.json()) as T; } catch { data = null; }
  return { ok: res.ok, status: res.status, data };
}

// Minimal shapes of the GitHub Git Data API responses this function reads.
type GhRef = { object?: { sha?: string } };
type GhRepo = { default_branch?: string };
type GhCommit = { tree?: { sha?: string } };
type GhSha = { sha?: string };

export type PushResult = { commit_sha: string; branch: string; files: string[] };

/**
 * Write `files` to `branch` of owner/repo via the Git Data API:
 *   blobs -> tree (on top of base) -> commit -> create/update ref.
 * Content comes from the workspace (server-side), so it never round-trips the
 * model. Creates `branch` off `baseBranch` (or the default branch) when missing.
 */
export async function pushFilesByReference(args: {
  token: string;
  owner: string;
  repo: string;
  branch: string;
  baseBranch?: string;
  message: string;
  files: AssembledFile[];
}): Promise<PushResult> {
  const { token, owner, repo, branch, baseBranch, message, files } = args;
  const base = `${GITHUB_API}/repos/${owner}/${repo}`;
  const H = ghHeaders(token);

  if (files.length === 0) throw new Error("No staged files to push.");

  // 1. Resolve the parent commit: the target branch if it exists, else the base.
  let parentSha: string;
  let branchExists = true;
  const refRes = await ghJson<GhRef>(`${base}/git/ref/heads/${encodeURIComponent(branch)}`, {
    method: "GET", headers: H,
  });
  const existingSha = refRes.ok ? refRes.data?.object?.sha : undefined;
  if (existingSha) {
    parentSha = existingSha;
  } else {
    branchExists = false;
    let baseRef = baseBranch;
    if (!baseRef) {
      const repoRes = await ghJson<GhRepo>(base, { method: "GET", headers: H });
      baseRef = repoRes.data?.default_branch ?? "main";
    }
    const baseRefRes = await ghJson<GhRef>(`${base}/git/ref/heads/${encodeURIComponent(baseRef)}`, {
      method: "GET", headers: H,
    });
    const baseSha = baseRefRes.ok ? baseRefRes.data?.object?.sha : undefined;
    if (!baseSha) throw new Error(`Could not resolve base branch "${baseRef}".`);
    parentSha = baseSha;
  }

  // 2. Base tree of the parent commit.
  const parentCommit = await ghJson<GhCommit>(`${base}/git/commits/${parentSha}`, { method: "GET", headers: H });
  const baseTreeSha = parentCommit.ok ? parentCommit.data?.tree?.sha : undefined;
  if (!baseTreeSha) throw new Error("Could not read parent commit tree.");

  // 3. One blob per file (content stored/sent server-side, not inlined by model).
  const blobs: Array<{ path: string; sha: string }> = [];
  for (const f of files) {
    const blob = await ghJson<GhSha>(`${base}/git/blobs`, {
      method: "POST", headers: H, body: { content: f.content, encoding: "utf-8" },
    });
    const blobSha = blob.ok ? blob.data?.sha : undefined;
    if (!blobSha) throw new Error(`Failed to create blob for ${f.path}: ${blob.status}`);
    blobs.push({ path: f.path, sha: blobSha });
  }

  // 4. Tree on top of the base tree.
  const tree = await ghJson<GhSha>(`${base}/git/trees`, {
    method: "POST", headers: H, body: { base_tree: baseTreeSha, tree: buildTreeEntries(blobs) },
  });
  const treeSha = tree.ok ? tree.data?.sha : undefined;
  if (!treeSha) throw new Error("Failed to create tree.");

  // 5. Commit.
  const commit = await ghJson<GhSha>(`${base}/git/commits`, {
    method: "POST", headers: H, body: { message, tree: treeSha, parents: [parentSha] },
  });
  const commitSha = commit.ok ? commit.data?.sha : undefined;
  if (!commitSha) throw new Error("Failed to create commit.");

  // 6. Point the branch at the new commit (create the ref if the branch is new).
  const refWrite = branchExists
    ? await ghJson(`${base}/git/refs/heads/${encodeURIComponent(branch)}`, {
        method: "PATCH", headers: H, body: { sha: commitSha, force: false },
      })
    : await ghJson(`${base}/git/refs`, {
        method: "POST", headers: H, body: { ref: `refs/heads/${branch}`, sha: commitSha },
      });
  if (!refWrite.ok) {
    throw new Error(`Failed to update branch ref (${refWrite.status}). Commit ${commitSha} was created but not referenced.`);
  }

  return { commit_sha: commitSha, branch, files: files.map((f) => f.path) };
}

// ─── GitHub token resolution (inline -> stored UnClick credential -> env) ──────

async function resolveGithubToken(
  inline: string | undefined,
  apiKey: string,
  supabaseUrl: string,
  serviceRoleKey: string,
): Promise<string | null> {
  if (inline && inline.trim()) return inline.trim();

  // The caller's stored GitHub credential, decrypted with their own key - the
  // same row api/credentials.ts writes. Keeps "no keys their end".
  const apiKeyHash = sha256hex(apiKey);
  const url =
    `${supabaseUrl}/rest/v1/user_credentials?api_key_hash=eq.${encodeURIComponent(apiKeyHash)}` +
    `&platform_slug=eq.github&select=*&order=label.asc.nullsfirst`;
  const { ok, data } = await supabaseFetch(url, "GET", supabaseHeaders(serviceRoleKey));
  if (ok && Array.isArray(data) && data.length > 0) {
    try {
      const row = data[0] as Record<string, string>;
      const key = deriveKey(apiKey, Buffer.from(row.encryption_salt, "hex"));
      const creds = JSON.parse(
        decrypt(row.encryption_iv, row.encryption_tag, row.encrypted_data, key),
      ) as Record<string, string>;
      const token = creds.access_token || creds.token || creds.api_key || creds.pat;
      if (token) return token;
    } catch {
      // fall through to env
    }
  }

  const envToken = process.env.GITHUB_TOKEN?.trim();
  return envToken && envToken !== "" ? envToken : null;
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "https://unclick.world");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();

  const supabaseUrl    = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({ error: "Server credentials not configured." });
  }

  const apiKey = String(req.headers.authorization ?? "").replace(/^Bearer\s+/i, "").trim();
  if (!apiKey) return res.status(401).json({ error: "Authorization header required." });
  const apiKeyHash = sha256hex(apiKey);

  const body = (req.body ?? {}) as Record<string, unknown>;
  const action = String(req.query.action ?? body.action ?? "").trim();
  const rest = `${supabaseUrl}/rest/v1/workspace_files`;

  try {
    // ── GET: list staged files for a workspace ──────────────────────────────
    if (req.method === "GET") {
      const workspaceId = String(req.query.workspace_id ?? "").trim();
      if (!workspaceId) return res.status(400).json({ error: "workspace_id query param required." });
      const url =
        `${rest}?api_key_hash=eq.${encodeURIComponent(apiKeyHash)}` +
        `&workspace_id=eq.${encodeURIComponent(workspaceId)}&select=path,seq,content,expires_at`;
      const { ok, data } = await supabaseFetch(url, "GET", supabaseHeaders(serviceRoleKey));
      if (!ok) return res.status(502).json({ error: "Workspace lookup failed." });
      const rows = (data as Array<Record<string, unknown>>) ?? [];
      const files = assembleFiles(
        rows.map((r) => ({ path: String(r.path), seq: Number(r.seq), content: String(r.content) })),
      ).map((f) => ({ path: f.path, bytes: Buffer.byteLength(f.content, "utf8") }));
      const expires_at = rows.length ? rows[0].expires_at : null;
      return res.status(200).json({ workspace_id: workspaceId, files, chunks: rows.length, expires_at });
    }

    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed." });

    // ── put: append one chunk ───────────────────────────────────────────────
    if (action === "put") {
      const err = validatePut(body);
      if (err) return res.status(400).json({ error: err });
      const workspaceId = String(body.workspace_id ?? "").trim() || crypto.randomUUID();
      const seq = typeof body.seq === "number" ? body.seq : await nextSeq(rest, serviceRoleKey, apiKeyHash, workspaceId, String(body.path));
      const row = {
        api_key_hash: apiKeyHash,
        workspace_id: workspaceId,
        path:         String(body.path),
        seq,
        content:      String(body.content),
        expires_at:   retentionExpiry(new Date()),
      };
      const { ok } = await supabaseFetch(rest, "POST", supabaseHeaders(serviceRoleKey), row);
      if (!ok) return res.status(502).json({ error: "Failed to stage chunk." });
      return res.status(200).json({
        workspace_id: workspaceId,
        path: row.path,
        seq,
        bytes: Buffer.byteLength(row.content, "utf8"),
      });
    }

    // ── push: assemble + write to git by reference ──────────────────────────
    if (action === "push") {
      const err = validatePush(body);
      if (err) return res.status(400).json({ error: err });
      const workspaceId = String(body.workspace_id);

      const url =
        `${rest}?api_key_hash=eq.${encodeURIComponent(apiKeyHash)}` +
        `&workspace_id=eq.${encodeURIComponent(workspaceId)}&select=path,seq,content`;
      const { ok, data } = await supabaseFetch(url, "GET", supabaseHeaders(serviceRoleKey));
      if (!ok) return res.status(502).json({ error: "Workspace lookup failed." });
      const rows = (data as Array<Record<string, unknown>>) ?? [];
      if (rows.length === 0) return res.status(404).json({ error: "No staged files for that workspace_id." });
      const files = assembleFiles(
        rows.map((r) => ({ path: String(r.path), seq: Number(r.seq), content: String(r.content) })),
      );

      const token = await resolveGithubToken(
        typeof body.github_token === "string" ? body.github_token : undefined,
        apiKey, supabaseUrl, serviceRoleKey,
      );
      if (!token) {
        return res.status(400).json({
          error: "No GitHub credential. Connect GitHub to UnClick, pass github_token, or set GITHUB_TOKEN.",
        });
      }

      const result = await pushFilesByReference({
        token,
        owner:      String(body.owner),
        repo:       String(body.repo),
        branch:     String(body.branch),
        baseBranch: typeof body.base_branch === "string" ? body.base_branch : undefined,
        message:    typeof body.message === "string" && body.message.trim() ? body.message : "unclick: workspace push",
        files,
      });

      // Loss-prevention: mark pushed, do NOT delete. Rows prune after expires_at.
      await supabaseFetch(
        `${rest}?api_key_hash=eq.${encodeURIComponent(apiKeyHash)}&workspace_id=eq.${encodeURIComponent(workspaceId)}`,
        "PATCH", supabaseHeaders(serviceRoleKey), { pushed_at: new Date().toISOString() },
      );

      return res.status(200).json(result);
    }

    // ── prune: delete only this tenant's expired rows ───────────────────────
    if (action === "prune") {
      const nowIso = new Date().toISOString();
      const url =
        `${rest}?api_key_hash=eq.${encodeURIComponent(apiKeyHash)}&expires_at=lt.${encodeURIComponent(nowIso)}`;
      const { ok, data } = await supabaseFetch(url, "DELETE", supabaseHeaders(serviceRoleKey));
      if (!ok) return res.status(502).json({ error: "Prune failed." });
      const deleted = Array.isArray(data) ? data.length : 0;
      return res.status(200).json({ pruned: deleted });
    }

    return res.status(400).json({ error: `Unknown action "${action}". Use put, push, or prune.` });
  } catch (e) {
    return res.status(502).json({ error: e instanceof Error ? e.message : "Workspace operation failed." });
  }
}

/** Next chunk index for a file: count of existing chunks (append semantics). */
async function nextSeq(
  rest: string,
  serviceRoleKey: string,
  apiKeyHash: string,
  workspaceId: string,
  path: string,
): Promise<number> {
  const url =
    `${rest}?api_key_hash=eq.${encodeURIComponent(apiKeyHash)}` +
    `&workspace_id=eq.${encodeURIComponent(workspaceId)}&path=eq.${encodeURIComponent(path)}&select=seq`;
  const { ok, data } = await supabaseFetch(url, "GET", supabaseHeaders(serviceRoleKey));
  if (!ok || !Array.isArray(data)) return 0;
  return data.length;
}
