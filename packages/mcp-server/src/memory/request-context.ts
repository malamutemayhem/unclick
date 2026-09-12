import { AsyncLocalStorage } from "node:async_hooks";

export interface RequestContext {
  apiKey?: string;
  sessionToken?: string;
  isSuperuser?: boolean;
}

const storage = new AsyncLocalStorage<RequestContext>();

export function runWithRequestContext<T>(context: RequestContext, fn: () => Promise<T>): Promise<T> {
  return storage.run(context, fn);
}

export function currentApiKey(env: NodeJS.ProcessEnv = process.env): string | null {
  const current = storage.getStore();
  if (current) return current.apiKey?.trim() || null;
  return env.UNCLICK_API_KEY?.trim() || null;
}

export function currentSessionToken(env: NodeJS.ProcessEnv = process.env): string | null {
  const current = storage.getStore();
  if (current) return current.sessionToken?.trim() || null;
  return env.UNCLICK_MCP_SESSION_TOKEN?.trim() || null;
}

/** No ambient fallback: privilege must be attached to this request. */
export function currentRequestIsSuperuser(): boolean {
  return storage.getStore()?.isSuperuser === true;
}
