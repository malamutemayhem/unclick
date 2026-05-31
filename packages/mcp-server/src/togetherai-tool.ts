// Together AI Inference API.
// Docs: https://docs.together.ai/reference
// Auth: Bearer token
// Base: https://api.together.xyz/v1

const TOGETHER_API_BASE = "https://api.together.xyz/v1";

function requireKey(args: Record<string, unknown>): string {
  const key = String(args.api_key ?? "").trim();
  if (!key) throw new Error("api_key is required. Get one at api.together.ai/settings/api-keys.");
  return key;
}

const TOGETHER_TIMEOUT_MS = Number(process.env.TOGETHERAI_TIMEOUT_MS) || 60000;

async function togetherPost<T>(apiKey: string, path: string, body: unknown): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TOGETHER_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${TOGETHER_API_BASE}${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Together AI request timed out after ${TOGETHER_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Together AI network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Together AI rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  const data = await res.json().catch(() => ({})) as Record<string, unknown>;
  if (!res.ok) {
    const msg = (data.error as Record<string, unknown>)?.message as string
      ?? (data.message as string)
      ?? `status ${res.status}`;
    throw new Error(`Together AI error (${res.status}): ${msg}`);
  }
  return data as T;
}

async function togetherGet<T>(apiKey: string, path: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TOGETHER_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${TOGETHER_API_BASE}${path}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Together AI request timed out after ${TOGETHER_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Together AI network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Together AI rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  const data = await res.json().catch(() => ({})) as Record<string, unknown>;
  if (!res.ok) {
    const msg = (data.error as Record<string, unknown>)?.message as string
      ?? (data.message as string)
      ?? `status ${res.status}`;
    throw new Error(`Together AI error (${res.status}): ${msg}`);
  }
  return data as T;
}

// ─── Operations ───────────────────────────────────────────────────────────────

export async function togetherai_chat_completion(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = requireKey(args);
  const model = String(args.model ?? "meta-llama/Llama-3-8b-chat-hf").trim();
  const messages = args.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error("messages must be a non-empty array of {role, content} objects.");
  }

  const body: Record<string, unknown> = { model, messages };
  if (args.max_tokens !== undefined) body.max_tokens = Number(args.max_tokens);
  if (args.temperature !== undefined) body.temperature = Number(args.temperature);
  if (args.top_p !== undefined) body.top_p = Number(args.top_p);
  if (args.top_k !== undefined) body.top_k = Number(args.top_k);
  if (args.stop !== undefined) body.stop = args.stop;
  if (args.stream !== undefined) body.stream = Boolean(args.stream);

  const data = await togetherPost<Record<string, unknown>>(apiKey, "/chat/completions", body);
  const choices = data.choices as Array<Record<string, unknown>> | undefined;
  const choice = choices?.[0];
  return {
    model: data.model,
    content: (choice?.message as Record<string, unknown>)?.content ?? null,
    finish_reason: choice?.finish_reason ?? null,
    usage: data.usage ?? null,
    raw: data,
  };
}

export async function togetherai_completion(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = requireKey(args);
  const model = String(args.model ?? "mistralai/Mistral-7B-v0.1").trim();
  const prompt = String(args.prompt ?? "").trim();
  if (!prompt) throw new Error("prompt is required.");

  const body: Record<string, unknown> = { model, prompt };
  if (args.max_tokens !== undefined) body.max_tokens = Number(args.max_tokens);
  if (args.temperature !== undefined) body.temperature = Number(args.temperature);
  if (args.top_p !== undefined) body.top_p = Number(args.top_p);
  if (args.top_k !== undefined) body.top_k = Number(args.top_k);
  if (args.stop !== undefined) body.stop = args.stop;

  const data = await togetherPost<Record<string, unknown>>(apiKey, "/completions", body);
  const choices = data.choices as Array<Record<string, unknown>> | undefined;
  return {
    model: data.model,
    text: choices?.[0]?.text ?? null,
    finish_reason: choices?.[0]?.finish_reason ?? null,
    usage: data.usage ?? null,
    raw: data,
  };
}

export async function togetherai_create_embedding(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = requireKey(args);
  const model = String(args.model ?? "togethercomputer/m2-bert-80M-8k-retrieval").trim();
  const input = args.input;
  if (!input) throw new Error("input is required (string or array of strings).");

  const data = await togetherPost<Record<string, unknown>>(apiKey, "/embeddings", { model, input });
  const embeddingsData = data.data as Array<Record<string, unknown>> | undefined;
  return {
    model: data.model,
    count: embeddingsData?.length ?? 0,
    embeddings: embeddingsData?.map((e) => e.embedding) ?? [],
    usage: data.usage ?? null,
  };
}

export async function togetherai_list_models(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = requireKey(args);
  const data = await togetherGet<unknown[]>(apiKey, "/models");
  const models = Array.isArray(data) ? data : [];
  return {
    count: models.length,
    models,
  };
}
