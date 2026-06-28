import { stampMeta } from "./connector-meta.js";
import { credentialResolvedFromUnClick, markCredentialLiveTested, resolveCredentials } from "./vault-bridge.js";

const GMAIL_BASE = "https://gmail.googleapis.com/gmail/v1/users/me";
const GMAIL_SOURCE = "Gmail API v1";

type ResolvedToken = { token: string; shouldMarkProof: boolean };
type TokenResolutionError = Record<string, unknown> & { error: string };

function isResolvedToken(auth: ResolvedToken | TokenResolutionError): auth is ResolvedToken {
  return typeof (auth as { token?: unknown }).token === "string";
}

async function requireToken(args: Record<string, unknown>): Promise<ResolvedToken | TokenResolutionError> {
  const resolved = await resolveCredentials("gmail", args);
  if ("error" in resolved) return resolved as TokenResolutionError;
  const token = String(resolved.access_token ?? "").trim();
  return token
    ? { token, shouldMarkProof: credentialResolvedFromUnClick(resolved) }
    : { error: "Gmail access_token could not be resolved." };
}

function base64Url(value: string): string {
  return Buffer.from(value, "utf8").toString("base64url");
}

async function gmailRequest<T>(
  token: string,
  method: "GET" | "POST",
  path: string,
  options: { query?: Record<string, string | number | undefined>; body?: unknown } = {},
): Promise<T> {
  const url = new URL(`${GMAIL_BASE}${path}`);
  for (const [key, value] of Object.entries(options.query ?? {})) {
    if (value !== undefined && value !== "") url.searchParams.set(key, String(value));
  }

  const GMAIL_TIMEOUT_MS = Number(process.env.GMAIL_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), GMAIL_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url.toString(), {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        ...(options.body !== undefined ? { "Content-Type": "application/json" } : {}),
      },
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") throw new Error(`Gmail request timed out after ${GMAIL_TIMEOUT_MS}ms.`);
    throw new Error(`Gmail network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }

  const text = await res.text();
  const data = text ? JSON.parse(text) as Record<string, unknown> : {};
  if (res.status === 401) throw new Error("Gmail token is invalid or expired.");
  if (res.status === 403) throw new Error("Gmail access is forbidden. Check the connected account permissions.");
  if (res.status === 429) throw new Error("Gmail rate limit reached (HTTP 429). Please wait and retry.");
  if (!res.ok) {
    const message = typeof data.error === "object" && data.error && "message" in data.error
      ? String((data.error as { message?: unknown }).message)
      : text.slice(0, 200);
    throw new Error(`Gmail error (${res.status}): ${message || res.statusText}`);
  }
  return data as T;
}

function stamp(result: unknown, nextSteps: string[]): Record<string, unknown> {
  return stampMeta(result, { source: GMAIL_SOURCE, fetched_at: new Date().toISOString(), next_steps: nextSteps });
}

export async function gmailSearch(args: Record<string, unknown>): Promise<unknown> {
  const auth = await requireToken(args);
  if (!isResolvedToken(auth)) return auth;
  const data = await gmailRequest(auth.token, "GET", "/messages", {
    query: {
      q: String(args.query ?? "").trim() || undefined,
      maxResults: Math.min(100, Number(args.limit) || 10),
      pageToken: String(args.page_token ?? "").trim() || undefined,
    },
  });
  if (auth.shouldMarkProof) await markCredentialLiveTested("gmail");
  return stamp(data, ["Use gmail_read with a returned message id to read metadata and body snippets."]);
}

export async function gmailRead(args: Record<string, unknown>): Promise<unknown> {
  const auth = await requireToken(args);
  if (!isResolvedToken(auth)) return auth;
  const id = String(args.message_id ?? args.id ?? "").trim();
  if (!id) return { error: "message_id is required." };
  const format = String(args.format ?? "metadata").trim() || "metadata";
  const data = await gmailRequest(auth.token, "GET", `/messages/${encodeURIComponent(id)}`, {
    query: {
      format,
      metadataHeaders: format === "metadata" ? "From" : undefined,
    },
  });
  if (auth.shouldMarkProof) await markCredentialLiveTested("gmail");
  return stamp(data, ["Use gmail_search to find related messages, or gmail_send to send a reply when appropriate."]);
}

export async function gmailSend(args: Record<string, unknown>): Promise<unknown> {
  const auth = await requireToken(args);
  if (!isResolvedToken(auth)) return auth;
  const to = String(args.to ?? "").trim();
  const subject = String(args.subject ?? "").trim();
  const body = String(args.body ?? "").trim();
  if (!to) return { error: "to is required." };
  if (!subject) return { error: "subject is required." };
  if (!body) return { error: "body is required." };

  const from = String(args.from ?? "me").trim() || "me";
  const raw = base64Url([
    `To: ${to}`,
    `From: ${from}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "",
    body,
  ].join("\r\n"));
  const data = await gmailRequest(auth.token, "POST", "/messages/send", { body: { raw } });
  if (auth.shouldMarkProof) await markCredentialLiveTested("gmail");
  return stamp(data, ["Use gmail_search to confirm the sent message or find the thread later."]);
}
