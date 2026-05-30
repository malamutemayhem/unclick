// connector-kit.ts
// Shared helpers that move a connector up the depth ladder with minimal code:
//   - timeoutFetch:  L2 resilience (request timeout + clean 429/timeout/network errors)
//   - memoryDefault: L3 memory-aware (read a default from args -> env, tracking which
//                    defaults were used)
//   - stamp:         L4 proactive (attach source / freshness / next-step metadata)
//
// PTV is the reference connector for this pattern; this kit makes it reusable so
// the other connectors are small adoptions rather than hand-copies.

export interface StampOptions {
  source: string;
  attribution?: string;
  defaultsUsed?: string[];
  nextSteps?: string[];
}

const DEFAULT_TIMEOUT_MS = Number(process.env.CONNECTOR_TIMEOUT_MS) || 10000;

/**
 * fetch with an AbortController timeout and normalized, agent-readable errors.
 * `label` names the upstream API in error messages (e.g. "Amber").
 */
export async function timeoutFetch(
  label: string,
  url: string,
  init: RequestInit = {},
  timeoutMs: number = DEFAULT_TIMEOUT_MS,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...init, signal: controller.signal });
    if (res.status === 429) {
      const retryAfter = res.headers.get("Retry-After");
      throw new Error(`${label} API rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
    }
    return res;
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`${label} API request timed out after ${timeoutMs}ms.`);
    }
    // re-throw our own 429 message unchanged; wrap raw network failures
    if (err instanceof Error && /rate limit reached/.test(err.message)) throw err;
    throw new Error(`${label} API network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Resolve a value from explicit args first, then an env default. When the env
 * default is used (and args did not supply it), push the env key onto `usedSink`
 * so the response can report which remembered defaults filled in.
 */
export function memoryDefault(
  args: Record<string, unknown>,
  argKey: string,
  envKey: string,
  usedSink: string[],
): string {
  const fromArgs = args[argKey];
  if (fromArgs !== undefined && String(fromArgs).trim() !== "") return String(fromArgs).trim();
  const fromEnv = process.env[envKey];
  if (fromEnv && fromEnv.trim() !== "") {
    usedSink.push(envKey);
    return fromEnv.trim();
  }
  return "";
}

/** Attach UnClick source/freshness/next-step metadata to a tool result. */
export function stamp(result: unknown, opts: StampOptions): unknown {
  const meta: Record<string, unknown> = {
    source: opts.source,
    fetched_at: new Date().toISOString(),
    defaults_used: opts.defaultsUsed ?? [],
  };
  if (opts.attribution) meta.attribution = opts.attribution;
  if (opts.nextSteps && opts.nextSteps.length) meta.next_steps = opts.nextSteps;

  if (result && typeof result === "object" && !Array.isArray(result)) {
    return { ...(result as Record<string, unknown>), unclick_meta: meta };
  }
  return { data: result, unclick_meta: meta };
}
