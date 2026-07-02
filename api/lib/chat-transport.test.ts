import { describe, it, expect } from "vitest";
import {
  PROVIDER_BASE_URLS,
  transportForSlug,
  isPrivateHost,
  resolveApiChatModel,
} from "./chat-transport";

describe("transportForSlug", () => {
  it("routes anthropic to its own transport", () => {
    expect(transportForSlug("anthropic")).toBe("anthropic");
  });

  it("routes every other provider through the openai-compatible transport", () => {
    for (const slug of ["openai", "openrouter", "groq", "togetherai", "mistral", "perplexity", "custom"]) {
      expect(transportForSlug(slug)).toBe("openai_compatible");
    }
  });
});

describe("PROVIDER_BASE_URLS", () => {
  it("uses the SDK default (undefined) for openai", () => {
    expect(PROVIDER_BASE_URLS.openai).toBeUndefined();
  });

  it("maps openrouter to its v1 base url", () => {
    expect(PROVIDER_BASE_URLS.openrouter).toBe("https://openrouter.ai/api/v1");
  });
});

describe("isPrivateHost", () => {
  it("flags localhost and private ranges", () => {
    for (const url of [
      "http://localhost:11434",
      "http://127.0.0.1:1234",
      "http://0.0.0.0:8000",
      "http://[::1]:8000",
      "http://192.168.1.50:11434",
      "http://10.0.0.5:1234",
      "http://172.16.0.1:8000",
      "http://server.local:11434",
      "http://169.254.169.254/latest/meta-data",
      "not a url",
    ]) {
      expect(isPrivateHost(url)).toBe(true);
    }
  });

  it("allows real cloud provider hosts", () => {
    for (const url of [
      "https://openrouter.ai/api/v1",
      "https://api.groq.com/openai/v1",
      "https://api.together.xyz/v1",
      "https://api.mistral.ai/v1",
      "https://api.perplexity.ai",
    ]) {
      expect(isPrivateHost(url)).toBe(false);
    }
  });
});

describe("resolveApiChatModel", () => {
  it("builds an openai-compatible model for a cloud slug without throwing", () => {
    expect(() =>
      resolveApiChatModel({ slug: "openrouter", model: "openai/gpt-4o-mini", apiKey: "sk-test" }),
    ).not.toThrow();
  });

  it("builds an anthropic model for the anthropic slug", () => {
    expect(() =>
      resolveApiChatModel({ slug: "anthropic", model: "claude-haiku-4-5", apiKey: "sk-test" }),
    ).not.toThrow();
  });

  it("refuses a custom base url that points at localhost (api lane never targets a private host)", () => {
    expect(() =>
      resolveApiChatModel({
        slug: "custom",
        model: "llama3.2",
        apiKey: "sk-test",
        baseUrlOverride: "http://localhost:11434/v1",
      }),
    ).toThrow(/private or localhost/i);
  });
});
