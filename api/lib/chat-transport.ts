// ============================================================
// Chat API-lane transport
//
// The "api" seat lane runs a model on the user's own provider key,
// server-side. One OpenAI-compatible branch covers OpenAI, OpenRouter,
// Groq, Together, Mistral, and Perplexity (they all speak the OpenAI
// /v1/chat/completions shape); Anthropic is the single exception.
//
// This module is for the api lane ONLY. The local lane is browser
// direct and the subscription lane spawns through Crews / MCP sampling,
// so neither passes through here. The private-host guard asserts the
// invariant that the api lane never targets localhost.
// ============================================================

import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";

export type ChatTransport = "openai_compatible" | "anthropic";

// Trusted server-side slug -> base URL. The server resolves the base
// URL from the slug; it never takes a cloud base URL from the client.
// undefined means the SDK default host for that provider.
export const PROVIDER_BASE_URLS: Record<string, string | undefined> = {
  openai: undefined,
  openrouter: "https://openrouter.ai/api/v1",
  groq: "https://api.groq.com/openai/v1",
  togetherai: "https://api.together.xyz/v1",
  mistral: "https://api.mistral.ai/v1",
  perplexity: "https://api.perplexity.ai",
};

// anthropic is the lone slug on the anthropic transport; everything
// else uses the OpenAI-compatible branch.
export function transportForSlug(slug: string): ChatTransport {
  return slug === "anthropic" ? "anthropic" : "openai_compatible";
}

// Reject private / localhost / metadata hosts. The api lane is cloud
// only; a localhost target belongs to the local lane (browser direct),
// never the server. Doubles as a basic SSRF guard.
export function isPrivateHost(rawUrl: string): boolean {
  let host: string;
  try {
    host = new URL(rawUrl).hostname.toLowerCase();
  } catch {
    return true; // unparseable -> treat as unsafe
  }
  // WHATWG URL keeps IPv6 hosts in brackets, e.g. "[::1]".
  if (host.startsWith("[") && host.endsWith("]")) host = host.slice(1, -1);
  if (host === "localhost" || host.endsWith(".local") || host.endsWith(".localhost")) return true;
  if (host === "127.0.0.1" || host === "0.0.0.0" || host === "::1") return true;
  if (host.startsWith("10.") || host.startsWith("192.168.")) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(host)) return true;
  if (host === "169.254.169.254") return true; // cloud metadata endpoint
  // IPv6 link-local (fe80::/10) and unique-local (fc00::/7).
  if (host.includes(":") && (host.startsWith("fe80:") || host.startsWith("fc") || host.startsWith("fd"))) return true;
  return false;
}

export interface ResolveApiChatModelInput {
  slug: string;             // provider slug, e.g. openrouter
  model: string;            // model id, e.g. anthropic/claude-3.5-sonnet
  apiKey: string;           // the user's decrypted vault key
  baseUrlOverride?: string; // optional, for a custom OpenAI-compatible cloud endpoint
}

// Build a language model for the api lane. Throws if a base URL would
// point at a private host (that is the local lane's job, not the
// server's).
export function resolveApiChatModel(input: ResolveApiChatModelInput) {
  if (transportForSlug(input.slug) === "anthropic") {
    return createAnthropic({ apiKey: input.apiKey })(input.model);
  }

  const baseURL =
    input.slug in PROVIDER_BASE_URLS ? PROVIDER_BASE_URLS[input.slug] : input.baseUrlOverride;

  if (baseURL && isPrivateHost(baseURL)) {
    throw new Error(
      "api lane refuses a private or localhost base URL; use a local seat for offline models",
    );
  }

  // Use the Chat Completions API explicitly. In @ai-sdk/openai v3 the default
  // provider call (createOpenAI(...)(model)) targets the OpenAI Responses API
  // (/v1/responses), which OpenAI-compatible hosts like OpenRouter, Groq,
  // Together, Mistral and Perplexity do not implement - they return
  // "Invalid Responses API request". .chat() pins /v1/chat/completions, which
  // every provider on this branch (including OpenAI itself) supports.
  return createOpenAI({ apiKey: input.apiKey, baseURL }).chat(input.model);
}
