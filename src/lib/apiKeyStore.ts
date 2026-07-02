/**
 * Canonical accessor for the user's UnClick api_key in browser storage.
 *
 * Background (job a8574878, PR #61 cross-tenant follow-ups): the api_key is
 * read and written in ~14 places across the app, all using the same literal
 * "unclick_api_key" but redeclared as a local constant in 11 different files
 * (sometimes named STORAGE_KEY, sometimes API_KEY_STORAGE). They agree today,
 * so there is no live cross-tenant bug, but the duplication is a drift vector:
 * one file diverging would silently read a different tenant's key slot. This
 * module centralises the key name and the read/write/clear semantics so new
 * code cannot drift, and existing readers can migrate onto it incrementally.
 *
 * SSR-safe: every accessor no-ops or returns empty when window is undefined,
 * matching the existing `typeof window !== "undefined"` guards in the app.
 */

export const API_KEY_STORAGE_KEY = "unclick_api_key";

/** Read the stored api_key, or "" if none / unavailable. */
export function getApiKey(): string {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(API_KEY_STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

/** True when a non-empty api_key is stored. */
export function hasApiKey(): boolean {
  return getApiKey().length > 0;
}

/**
 * Persist the api_key. Rejects obviously malformed values so a bad write
 * cannot poison the canonical slot. Returns true on success.
 */
export function setApiKey(key: string): boolean {
  if (typeof window === "undefined") return false;
  const trimmed = (key ?? "").trim();
  if (!isLikelyApiKey(trimmed)) return false;
  try {
    window.localStorage.setItem(API_KEY_STORAGE_KEY, trimmed);
    return true;
  } catch {
    return false;
  }
}

/** Remove the stored api_key. */
export function clearApiKey(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(API_KEY_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

/**
 * Basic shape check for an UnClick api_key. Keys are uc_* (user) or agt_*
 * (agent); this mirrors the server-side format check in api/credentials.ts
 * and is a guard against storing junk, not an authentication decision.
 */
export function isLikelyApiKey(value: string): boolean {
  const v = (value ?? "").trim();
  return v.startsWith("uc_") || v.startsWith("agt_");
}

/**
 * Subscribe to cross-tab changes of the api_key. Several components already
 * listen to the raw `storage` event; this filters to the canonical key.
 * Returns an unsubscribe function.
 */
export function onApiKeyChange(handler: (key: string) => void): () => void {
  if (typeof window === "undefined") return () => {};
  const listener = (event: StorageEvent) => {
    if (event.key === null || event.key === API_KEY_STORAGE_KEY) {
      handler(getApiKey());
    }
  };
  window.addEventListener("storage", listener);
  return () => window.removeEventListener("storage", listener);
}
