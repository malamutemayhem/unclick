import { describe, expect, it, vi } from "vitest";
import {
  isChunkLoadError,
  markReloadAttempt,
  recoverFromStaleChunk,
  reloadedRecently,
  RELOAD_GUARD_WINDOW_MS,
  type ReloadWindow,
} from "./chunk-reload";

function fakeStorage(initial: Record<string, string> = {}): Storage {
  const map = new Map<string, string>(Object.entries(initial));
  return {
    get length() {
      return map.size;
    },
    clear: () => map.clear(),
    getItem: (k: string) => (map.has(k) ? (map.get(k) as string) : null),
    key: (i: number) => Array.from(map.keys())[i] ?? null,
    removeItem: (k: string) => {
      map.delete(k);
    },
    setItem: (k: string, v: string) => {
      map.set(k, v);
    },
  } as Storage;
}

describe("isChunkLoadError", () => {
  it("matches the common dynamic-import failure messages", () => {
    expect(
      isChunkLoadError(
        new Error("Failed to fetch dynamically imported module: https://x/AdminSeatsApi-abc.js"),
      ),
    ).toBe(true);
    expect(isChunkLoadError(new Error("error loading dynamically imported module"))).toBe(true);
    expect(isChunkLoadError(new Error("Loading chunk vendor-123 failed"))).toBe(true);
    expect(isChunkLoadError(new Error("Loading CSS chunk admin-9 failed"))).toBe(true);
    expect(isChunkLoadError("Importing a module script failed.")).toBe(true);
  });

  it("ignores unrelated render errors", () => {
    expect(
      isChunkLoadError(new Error("Cannot read properties of undefined (reading 'map')")),
    ).toBe(false);
    expect(isChunkLoadError("some random string")).toBe(false);
    expect(isChunkLoadError(null)).toBe(false);
    expect(isChunkLoadError(undefined)).toBe(false);
    expect(isChunkLoadError({ message: 42 })).toBe(false);
  });

  it("reads a message off a plain object", () => {
    expect(isChunkLoadError({ message: "Failed to fetch dynamically imported module" })).toBe(true);
  });
});

describe("reload guard", () => {
  it("treats no prior attempt as not-recent", () => {
    expect(reloadedRecently(1_000, fakeStorage())).toBe(false);
  });

  it("treats an attempt inside the window as recent and outside as stale", () => {
    const storage = fakeStorage();
    markReloadAttempt(1_000, storage);
    expect(reloadedRecently(1_000 + RELOAD_GUARD_WINDOW_MS - 1, storage)).toBe(true);
    expect(reloadedRecently(1_000 + RELOAD_GUARD_WINDOW_MS + 1, storage)).toBe(false);
  });

  it("tolerates a null storage (private mode)", () => {
    expect(reloadedRecently(1_000, null)).toBe(false);
    expect(() => markReloadAttempt(1_000, null)).not.toThrow();
  });
});

describe("recoverFromStaleChunk", () => {
  it("reloads once, then refuses within the guard window", () => {
    const reload = vi.fn();
    const win: ReloadWindow = { location: { reload }, sessionStorage: fakeStorage() };

    expect(recoverFromStaleChunk(1_000, win)).toBe(true);
    expect(reload).toHaveBeenCalledTimes(1);

    // A second failure 2s later (still stale) must NOT reload again.
    expect(recoverFromStaleChunk(3_000, win)).toBe(false);
    expect(reload).toHaveBeenCalledTimes(1);
  });

  it("reloads again once the guard window has passed", () => {
    const reload = vi.fn();
    const win: ReloadWindow = { location: { reload }, sessionStorage: fakeStorage() };

    expect(recoverFromStaleChunk(1_000, win)).toBe(true);
    expect(recoverFromStaleChunk(1_000 + RELOAD_GUARD_WINDOW_MS + 5, win)).toBe(true);
    expect(reload).toHaveBeenCalledTimes(2);
  });
});
