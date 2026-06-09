import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import AdminSeatsLocal from "./AdminSeatsLocal";
import {
  getEndpointModelsUrl,
  normalizeEndpointUrl,
} from "./AdminSeatsLocalUtils";

function jsonResponse(body: unknown) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("AdminSeatsLocal", () => {
  it("normalizes OpenAI-compatible model endpoints", () => {
    expect(normalizeEndpointUrl(" http://localhost:1234/v1/ ")).toBe("http://localhost:1234/v1");
    expect(getEndpointModelsUrl("openai-compat", "http://localhost:1234")).toBe(
      "http://localhost:1234/v1/models",
    );
    expect(getEndpointModelsUrl("openai-compat", "http://localhost:1234/v1")).toBe(
      "http://localhost:1234/v1/models",
    );
    expect(getEndpointModelsUrl("ollama", "http://localhost:11434")).toBe(
      "http://localhost:11434/api/tags",
    );
  });

  it("shows a clear browser-direct empty state when Ollama is unavailable", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error("connection refused"));
    vi.stubGlobal("fetch", fetchMock);

    render(React.createElement(AdminSeatsLocal));

    expect(await screen.findByText("No local runtime detected")).toBeInTheDocument();
    expect(screen.getByText(/Local detection uses browser-direct calls/i)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith("http://localhost:11434/api/tags", expect.any(Object));
  });

  it("lists installed Ollama models with status and capabilities", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith("/api/tags")) {
        return jsonResponse({
          models: [
            {
              name: "llava:7b",
              model: "llava:7b",
              modified_at: new Date(Date.now() - 3_600_000).toISOString(),
              size: 4 * 1024 * 1024 * 1024,
              digest: "sha256:llava",
              details: {
                family: "llava",
                families: ["clip"],
                parameter_size: "7B",
                quantization_level: "Q4_K_M",
              },
            },
          ],
        });
      }

      if (url.endsWith("/api/ps")) {
        return jsonResponse({
          models: [
            {
              name: "llava:7b",
              model: "llava:7b",
              size: 4 * 1024 * 1024 * 1024,
              digest: "sha256:llava",
              expires_at: new Date(Date.now() + 3_600_000).toISOString(),
            },
          ],
        });
      }

      return new Response(null, { status: 404 });
    });
    vi.stubGlobal("fetch", fetchMock);

    render(React.createElement(AdminSeatsLocal));

    expect(await screen.findByText("llava:7b")).toBeInTheDocument();
    expect(screen.getByText("4.0 GB")).toBeInTheDocument();
    expect(screen.getByText("7B")).toBeInTheDocument();
    expect(screen.getByText("Vision")).toBeInTheDocument();
    expect(screen.getByText("Running")).toBeInTheDocument();
  });
});
