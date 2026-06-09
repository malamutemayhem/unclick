import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AdminSeatsLocalPage from "./AdminSeatsLocal";
import {
  buildLocalHealthUrl,
  buildLocalRoutingSummary,
  DEFAULT_LOCAL_ROUTING_CONFIG,
  LOCAL_ROUTING_SETTINGS_KEY,
  LOCAL_ROUTING_STORAGE_KEY,
  normalizeLocalRoutingConfig,
} from "./AdminSeatsLocalRouting";

vi.mock("@/lib/auth", () => ({
  useSession: () => ({
    session: { access_token: "session-token" },
    user: { id: "user-1" },
    loading: false,
  }),
}));

vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({ toast: vi.fn() }),
}));

describe("AdminSeatsLocalPage routing defaults", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = String(input);
        if (url.includes("tenant_settings_get")) {
          return new Response(JSON.stringify({ data: {} }), { status: 200 });
        }
        if (url.includes("tenant_settings_set")) {
          return new Response(JSON.stringify({ success: true }), { status: 200 });
        }
        if (url.includes("localhost:11434")) {
          return new Response(JSON.stringify({ models: [] }), { status: 200 });
        }
        return new Response(JSON.stringify({ ok: true, init }), { status: 200 });
      }),
    );
  });

  it("defaults embeddings to local and complex reasoning to API", () => {
    const config = normalizeLocalRoutingConfig({});
    const embeddings = config.rules.find((rule) => rule.id === "embeddings");
    const complexReasoning = config.rules.find((rule) => rule.id === "complex_reasoning");

    expect(embeddings?.route).toBe("local");
    expect(embeddings?.modelHint).toContain("nomic");
    expect(complexReasoning?.route).toBe("api");
    expect(complexReasoning?.fallback).toBe("block");
  });

  it("builds health URLs for Ollama and OpenAI-compatible endpoints", () => {
    expect(buildLocalHealthUrl("http://localhost:11434/", "ollama")).toBe("http://localhost:11434/api/tags");
    expect(buildLocalHealthUrl("http://localhost:1234/v1", "openai-compatible")).toBe("http://localhost:1234/v1/models");
    expect(buildLocalHealthUrl("http://localhost:1234", "openai-compatible")).toBe("http://localhost:1234/v1/models");
  });

  it("summarizes route and fallback counts", () => {
    expect(buildLocalRoutingSummary(DEFAULT_LOCAL_ROUTING_CONFIG)).toEqual({
      local: 2,
      api: 1,
      auto: 2,
      apiFallbacks: 3,
      queuedFallbacks: 1,
      blockedFallbacks: 1,
    });
  });

  it("lets users change fallback behavior and persist to tenant settings", async () => {
    render(React.createElement(AdminSeatsLocalPage));

    const embeddingsFallback = await screen.findByLabelText("Fallback", { selector: "#embeddings-fallback" });
    fireEvent.change(embeddingsFallback, { target: { value: "queue" } });

    fireEvent.click(screen.getByRole("button", { name: /Save/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "/api/memory-admin?action=tenant_settings_set",
        expect.objectContaining({
          method: "POST",
          body: expect.stringContaining(LOCAL_ROUTING_SETTINGS_KEY),
        }),
      );
    });

    const savedRaw = window.localStorage.getItem(LOCAL_ROUTING_STORAGE_KEY);
    expect(savedRaw).not.toBeNull();
    const saved = normalizeLocalRoutingConfig(JSON.parse(savedRaw ?? "{}"));
    expect(saved.rules.find((rule) => rule.id === "embeddings")?.fallback).toBe("queue");
  });
});
