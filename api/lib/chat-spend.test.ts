import { describe, it, expect } from "vitest";
import { decideChatProviderCall } from "./chat-spend";

describe("decideChatProviderCall", () => {
  it("allows local models for free", () => {
    const d = decideChatProviderCall({ lane: "local", slug: "ollama", hasVaultKey: false });
    expect(d.allowed).toBe(true);
    expect(d.costClass).toBe("free");
  });

  it("blocks subscription on the api endpoint (it belongs to Crews)", () => {
    const d = decideChatProviderCall({ lane: "subscription", slug: "claude", hasVaultKey: false });
    expect(d.allowed).toBe(false);
    expect(d.reason).toMatch(/crews/i);
  });

  it("allows a known cloud provider when a vault key is present", () => {
    const d = decideChatProviderCall({ lane: "api", slug: "openrouter", hasVaultKey: true });
    expect(d.allowed).toBe(true);
    expect(d.costClass).toBe("paid");
  });

  it("blocks a known cloud provider with no saved key", () => {
    const d = decideChatProviderCall({ lane: "api", slug: "openrouter", hasVaultKey: false });
    expect(d.allowed).toBe(false);
    expect(d.reason).toMatch(/no saved key/i);
  });

  it("blocks an unknown provider even with a key (fail-closed)", () => {
    const d = decideChatProviderCall({ lane: "api", slug: "totally-unknown", hasVaultKey: true });
    expect(d.allowed).toBe(false);
    expect(d.reason).toMatch(/unknown provider/i);
  });

  it("allows every known cloud provider when keyed", () => {
    for (const slug of ["openai", "openrouter", "groq", "togetherai", "mistral", "perplexity", "anthropic"]) {
      expect(decideChatProviderCall({ lane: "api", slug, hasVaultKey: true }).allowed).toBe(true);
    }
  });
});
