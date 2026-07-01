// Stale lazy-chunk recovery.
//
// Every non-homepage route is a React.lazy(() => import(...)) chunk with a
// content-hash filename. When a new build deploys, Vercel publishes new hashes
// and drops the previous build's chunk files. A browser tab opened BEFORE the
// deploy still holds the old module graph in memory, so the next navigation to
// a not-yet-loaded route fetches a dead (404) chunk URL. The dynamic import
// rejects; React Suspense only handles the pending state, not a rejected
// import, so the error propagates. With no recovery the app unmounts to the
// bare navy <html> canvas (the "blue blank page" until a manual refresh).
//
// The cure: treat a chunk-load failure as "this tab is stale" and reload once
// to pull the fresh index.html (served no-store) with the new chunk hashes. A
// sessionStorage guard prevents a reload loop if a reload does NOT fix it (a
// genuinely missing asset); the caller then surfaces a manual recovery option
// instead of reloading forever.

const RELOAD_GUARD_KEY = "uc:chunk-reload-at";
export const RELOAD_GUARD_WINDOW_MS = 10_000;

const CHUNK_ERROR_PATTERNS: RegExp[] = [
  /failed to fetch dynamically imported module/i,
  /error loading dynamically imported module/i,
  /unable to preload css/i,
  /loading chunk [\w-]+ failed/i,
  /loading css chunk [\w-]+ failed/i,
  /importing a module script failed/i,
];

/** True when the error looks like a dynamic-import / chunk-load failure. */
export function isChunkLoadError(error: unknown): boolean {
  let message = "";
  if (error instanceof Error) {
    message = `${error.name}: ${error.message}`;
  } else if (typeof error === "string") {
    message = error;
  } else if (error && typeof error === "object" && "message" in error) {
    const raw = (error as { message: unknown }).message;
    message = typeof raw === "string" ? raw : "";
  }
  if (!message) return false;
  return CHUNK_ERROR_PATTERNS.some((pattern) => pattern.test(message));
}

function readStorage(storage: Storage | null, key: string): string | null {
  try {
    return storage?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

function writeStorage(storage: Storage | null, key: string, value: string): void {
  try {
    storage?.setItem(key, value);
  } catch {
    // Private mode / quota: never let bookkeeping block the reload itself.
  }
}

/** True if a self-heal reload was already attempted within the guard window. */
export function reloadedRecently(now: number, storage: Storage | null): boolean {
  const raw = readStorage(storage, RELOAD_GUARD_KEY);
  if (!raw) return false;
  const last = Number(raw);
  if (!Number.isFinite(last)) return false;
  const elapsed = now - last;
  return elapsed >= 0 && elapsed < RELOAD_GUARD_WINDOW_MS;
}

/** Record the moment a self-heal reload was attempted. */
export function markReloadAttempt(now: number, storage: Storage | null): void {
  writeStorage(storage, RELOAD_GUARD_KEY, String(now));
}

export interface ReloadWindow {
  location: { reload: () => void };
  sessionStorage: Storage | null;
}

function resolveWindow(win?: ReloadWindow): ReloadWindow | null {
  if (win) return win;
  if (typeof window === "undefined") return null;
  let storage: Storage | null = null;
  try {
    storage = window.sessionStorage;
  } catch {
    storage = null;
  }
  return { location: window.location, sessionStorage: storage };
}

/**
 * Attempt a one-time self-heal reload for a stale-chunk failure.
 * Returns true when a reload was triggered (the page is about to navigate away,
 * so the caller can render a quiet spinner); false when a reload was already
 * tried within the guard window (the caller should show a manual recovery UI).
 */
export function recoverFromStaleChunk(now: number = Date.now(), win?: ReloadWindow): boolean {
  const target = resolveWindow(win);
  if (!target) return false;
  if (reloadedRecently(now, target.sessionStorage)) return false;
  markReloadAttempt(now, target.sessionStorage);
  target.location.reload();
  return true;
}
