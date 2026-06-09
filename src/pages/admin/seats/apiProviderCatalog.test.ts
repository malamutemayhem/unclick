import { describe, expect, it } from "vitest";
import {
  API_PROVIDER_CATALOG,
  API_PROVIDER_STORAGE_KEY,
  findCatalogEntry,
  findModel,
  formatCost,
  formatContextWindow,
  loadStoredProviders,
  saveStoredProviders,
  type StoredApiProvider,
} from "./apiProviderCatalog";

describe("apiProviderCatalog", () => {
  it("includes at least 5 providers", () => {
    expect(API_PROVIDER_CATALOG.length).toBeGreaterThanOrEqual(5);
  });

  it("every provider has at least one model", () => {
    for (const entry of API_PROVIDER_CATALOG) {
      expect(entry.models.length).toBeGreaterThanOrEqual(1);
      expect(entry.slug).toBeTruthy();
      expect(entry.name).toBeTruthy();
      expect(entry.defaultEndpoint).toMatch(/^https:\/\//);
    }
  });

  it("finds a catalog entry by slug", () => {
    const anthropic = findCatalogEntry("anthropic");
    expect(anthropic?.name).toBe("Anthropic");
    expect(anthropic?.models.length).toBeGreaterThanOrEqual(2);

    expect(findCatalogEntry("nonexistent")).toBeUndefined();
  });

  it("finds a model by slug and model ID", () => {
    const model = findModel("openai", "gpt-4.1");
    expect(model?.name).toBe("GPT-4.1");
    expect(model?.costPerMInput).toBeDefined();

    expect(findModel("openai", "nonexistent")).toBeUndefined();
    expect(findModel("nonexistent", "gpt-4.1")).toBeUndefined();
  });

  it("formats cost values", () => {
    expect(formatCost(15)).toBe("$15/M");
    expect(formatCost(0.8)).toBe("$0.80/M");
    expect(formatCost(0.1)).toBe("$0.10/M");
    expect(formatCost(undefined)).toBe("-");
  });

  it("formats context window sizes", () => {
    expect(formatContextWindow(200000)).toBe("200K");
    expect(formatContextWindow(1_000_000)).toBe("1.0M");
    expect(formatContextWindow(1_048_576)).toBe("1.0M");
    expect(formatContextWindow(32768)).toBe("33K");
    expect(formatContextWindow(undefined)).toBe("-");
  });

  it("all model IDs are unique within their provider", () => {
    for (const entry of API_PROVIDER_CATALOG) {
      const ids = entry.models.map((m) => m.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("all provider slugs are unique", () => {
    const slugs = API_PROVIDER_CATALOG.map((e) => e.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("round-trips stored providers through save/load", () => {
    const stored: StoredApiProvider[] = [
      {
        id: "anthropic-123",
        slug: "anthropic",
        name: "Anthropic",
        modelId: "claude-opus-4-6",
        endpoint: "https://api.anthropic.com/v1",
        status: "active",
        rateLimitRpm: 60,
        addedAt: "2026-06-09T00:00:00.000Z",
      },
    ];

    saveStoredProviders(stored);
    const loaded = loadStoredProviders();
    expect(loaded).toEqual(stored);
  });

  it("returns empty array for corrupt storage", () => {
    window.localStorage.setItem(API_PROVIDER_STORAGE_KEY, "not-json");
    expect(loadStoredProviders()).toEqual([]);

    window.localStorage.setItem(API_PROVIDER_STORAGE_KEY, '"string"');
    expect(loadStoredProviders()).toEqual([]);

    window.localStorage.removeItem(API_PROVIDER_STORAGE_KEY);
    expect(loadStoredProviders()).toEqual([]);
  });
});
