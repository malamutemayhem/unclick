import { afterEach, describe, expect, it, vi } from "vitest";
import {
  API_KEY_STORAGE_KEY,
  clearApiKey,
  getApiKey,
  hasApiKey,
  isLikelyApiKey,
  onApiKeyChange,
  setApiKey,
} from "./apiKeyStore";

afterEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

describe("apiKeyStore", () => {
  it("uses the single canonical storage key", () => {
    expect(API_KEY_STORAGE_KEY).toBe("unclick_api_key");
  });

  it("round-trips a valid key", () => {
    expect(setApiKey("uc_live_abc123")).toBe(true);
    expect(getApiKey()).toBe("uc_live_abc123");
    expect(hasApiKey()).toBe(true);
    // Stored under the canonical literal so existing raw readers still see it.
    expect(localStorage.getItem("unclick_api_key")).toBe("uc_live_abc123");
  });

  it("accepts agent keys too", () => {
    expect(setApiKey("agt_xyz")).toBe(true);
    expect(getApiKey()).toBe("agt_xyz");
  });

  it("trims whitespace before storing", () => {
    setApiKey("  uc_padded  ");
    expect(getApiKey()).toBe("uc_padded");
  });

  it("refuses to store a malformed key (drift / junk guard)", () => {
    expect(setApiKey("not-a-key")).toBe(false);
    expect(setApiKey("")).toBe(false);
    expect(getApiKey()).toBe("");
    expect(hasApiKey()).toBe(false);
  });

  it("clears the key", () => {
    setApiKey("uc_live_abc123");
    clearApiKey();
    expect(getApiKey()).toBe("");
    expect(hasApiKey()).toBe(false);
  });

  it("validates key shape", () => {
    expect(isLikelyApiKey("uc_1")).toBe(true);
    expect(isLikelyApiKey("agt_1")).toBe(true);
    expect(isLikelyApiKey("sk_live_1")).toBe(false);
    expect(isLikelyApiKey("")).toBe(false);
  });

  it("notifies cross-tab listeners for the canonical key only", () => {
    const seen: string[] = [];
    const off = onApiKeyChange((k) => seen.push(k));

    setApiKey("uc_first");
    window.dispatchEvent(new StorageEvent("storage", { key: API_KEY_STORAGE_KEY }));
    window.dispatchEvent(new StorageEvent("storage", { key: "some_other_key" }));

    expect(seen).toEqual(["uc_first"]);
    off();
  });

  it("returns empty and does not throw when localStorage is unavailable", () => {
    const spy = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(getApiKey()).toBe("");
    spy.mockRestore();
  });
});
