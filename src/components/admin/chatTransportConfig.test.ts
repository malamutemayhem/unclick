import { describe, it, expect } from "vitest";
import {
  CHAT_PROVIDERS,
  findChatProvider,
  estimateTokens,
} from "./chatTransportConfig";

describe("CHAT_PROVIDERS", () => {
  it("lists OpenRouter first (first-class) and every provider has at least one model", () => {
    expect(CHAT_PROVIDERS[0].slug).toBe("openrouter");
    for (const p of CHAT_PROVIDERS) {
      expect(p.models.length).toBeGreaterThan(0);
      expect(p.slug).toMatch(/^[a-z]+$/);
    }
  });

  it("uses slugs that match the vault platform_slug set", () => {
    const slugs = CHAT_PROVIDERS.map((p) => p.slug);
    for (const expected of ["openrouter", "openai", "anthropic", "groq", "mistral", "perplexity", "togetherai"]) {
      expect(slugs).toContain(expected);
    }
  });
});

describe("findChatProvider", () => {
  it("returns a provider for a known slug", () => {
    expect(findChatProvider("openrouter")?.label).toBe("OpenRouter");
  });
  it("returns undefined for an unknown slug", () => {
    expect(findChatProvider("nope")).toBeUndefined();
  });
});

describe("estimateTokens", () => {
  it("is zero for empty text", () => {
    expect(estimateTokens("")).toBe(0);
  });
  it("approximates ~4 chars per token", () => {
    expect(estimateTokens("12345678")).toBe(2);
    expect(estimateTokens("abc")).toBe(1);
  });
});
