import { afterEach, describe, expect, it, vi } from "vitest";
import { higgsfield_generate_image, higgsfield_get_styles, higgsfield_generate_video } from "./higgsfield-tool.js";

const ORIGINAL_ENV = { ...process.env };

function jsonResponse(data: unknown, init: { status?: number; headers?: Record<string, string> } = {}): Response {
  return new Response(JSON.stringify(data), {
    status: init.status ?? 200,
    headers: { "Content-Type": "application/json", ...(init.headers ?? {}) },
  });
}

function acceptedResponse(): Response {
  return new Response("", { status: 202 });
}

// L2 resilience contract for the Higgsfield connector: request timeout (longer
// for inference), clean 429 handling, input validation, and stable mapping.
describe("higgsfield connector resilience (L2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    process.env = { ...ORIGINAL_ENV };
  });

  it("throws a clean rate-limit error on HTTP 429", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: false, status: 429, headers: { get: () => null }, json: async () => ({}),
    })));
    await expect(higgsfield_get_styles({ api_key: "k" })).rejects.toThrow(/rate limit/i);
  });

  it("throws a clean timeout error when the request aborts", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }));
    await expect(higgsfield_get_styles({ api_key: "k" })).rejects.toThrow(/timed out/i);
  });

  it("validates required params before calling the API", async () => {
    await expect(higgsfield_generate_video({ api_key: "k" })).rejects.toThrow(/prompt is required/i);
  });

  it("returns customer-facing account-login guidance when Higgsfield is not connected", async () => {
    delete process.env.UNCLICK_API_KEY;
    delete process.env.HIGGSFIELD_API_KEY;

    const result = await higgsfield_get_styles({}) as {
      not_connected?: boolean;
      how_to_connect?: string[];
    };
    const copy = JSON.stringify(result);

    expect(result.not_connected).toBe(true);
    expect(result.how_to_connect?.join(" ")).toContain("Open Apps > Higgsfield > Connect");
    expect(copy).not.toMatch(/keychain|vault|old unclick/i);
  });

  it("maps style listings into a clean shape", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200, headers: { get: () => null },
      json: async () => ({ styles: [{ id: "cinematic" }, { id: "anime" }] }),
    })));
    const result = await higgsfield_get_styles({ api_key: "k" }) as Record<string, unknown>;
    expect(result.count).toBe(2);
    expect((result.styles as unknown[]).length).toBe(2);
  });

  it("prefers the connected Higgsfield MCP account login over Cloud API key setup", async () => {
    process.env.UNCLICK_API_KEY = "uc_test";
    process.env.UNCLICK_API_URL = "https://unclick.test";
    const fetchMock = vi.fn(async (input: string | URL, init?: RequestInit) => {
      const url = String(input);
      const method = String(init?.method ?? "GET").toUpperCase();
      const body = init?.body ? JSON.parse(String(init.body)) as Record<string, unknown> : {};

      if (url === "https://unclick.test/api/credentials?platform=higgsfield") {
        return jsonResponse({
          credential_kind: "higgsfield_mcp_oauth",
          access_token: "mcp-token",
          refresh_token: "refresh-token",
          client_id: "client-123",
          expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
          token_type: "Bearer",
          mcp_url: "https://mcp.higgsfield.ai/mcp",
        });
      }

      if (url === "https://mcp.higgsfield.ai/mcp" && method === "POST" && body.method === "initialize") {
        expect((init?.headers as Record<string, string>).Authorization).toBe("Bearer mcp-token");
        return jsonResponse({
          jsonrpc: "2.0",
          id: body.id,
          result: { protocolVersion: "2025-03-26", capabilities: {}, serverInfo: { name: "Higgsfield" } },
        }, { headers: { "mcp-session-id": "session-1" } });
      }

      if (url === "https://mcp.higgsfield.ai/mcp" && method === "POST" && body.method === "notifications/initialized") {
        return acceptedResponse();
      }

      if (url === "https://mcp.higgsfield.ai/mcp" && method === "POST" && body.method === "tools/list") {
        expect((init?.headers as Record<string, string>)["Mcp-Session-Id"]).toBe("session-1");
        return jsonResponse({
          jsonrpc: "2.0",
          id: body.id,
          result: { tools: [{ name: "generate_image" }] },
        });
      }

      if (url === "https://mcp.higgsfield.ai/mcp" && method === "POST" && body.method === "tools/call") {
        const params = body.params as Record<string, unknown>;
        expect(params.name).toBe("generate_image");
        expect(params.arguments).toMatchObject({
          params: {
          prompt: "a studio photo of a dog",
          model: "nano_banana_pro",
          resolution: "2k",
          aspect_ratio: "4:3",
          },
        });
        return jsonResponse({
          jsonrpc: "2.0",
          id: body.id,
          result: { structuredContent: { job_id: "job-1", status: "submitted" } },
        });
      }

      throw new Error(`Unexpected fetch ${method} ${url}`);
    });

    vi.stubGlobal("fetch", fetchMock);

    const result = await higgsfield_generate_image({
      prompt: "a studio photo of a dog",
      model: "nano_banana_pro",
      resolution: "2k",
      aspect_ratio: "4:3",
    }) as Record<string, unknown>;

    expect(result.provider).toBe("higgsfield_mcp");
    expect(result.tool).toBe("generate_image");
    expect(fetchMock).not.toHaveBeenCalledWith(
      expect.stringContaining("api.higgsfield.ai"),
      expect.anything(),
    );
  });

  it("refreshes an expired Higgsfield MCP login before calling the native tool", async () => {
    process.env.UNCLICK_API_KEY = "uc_test";
    process.env.UNCLICK_API_URL = "https://unclick.test";
    const toolCallArguments: Record<string, unknown>[] = [];

    const fetchMock = vi.fn(async (input: string | URL, init?: RequestInit) => {
      const url = String(input);
      const method = String(init?.method ?? "GET").toUpperCase();
      const bodyText = String(init?.body ?? "");
      const body = bodyText.startsWith("{") ? JSON.parse(bodyText) as Record<string, unknown> : {};

      if (url === "https://unclick.test/api/credentials?platform=higgsfield") {
        return jsonResponse({
          credential_kind: "higgsfield_mcp_oauth",
          access_token: "old-token",
          refresh_token: "refresh-token",
          client_id: "client-123",
          expires_at: new Date(Date.now() - 60 * 1000).toISOString(),
          mcp_url: "https://mcp.higgsfield.ai/mcp",
        });
      }

      if (url === "https://mcp.higgsfield.ai/oauth2/token") {
        expect(bodyText).toContain("grant_type=refresh_token");
        expect(bodyText).toContain("client_id=client-123");
        return jsonResponse({
          access_token: "fresh-token",
          refresh_token: "fresh-refresh-token",
          expires_in: 3600,
          token_type: "Bearer",
          scope: "openid email offline_access",
        });
      }

      if (url === "https://unclick.test/api/credentials" && method === "POST") {
        const persisted = JSON.parse(bodyText) as Record<string, unknown>;
        expect(persisted.platform).toBe("higgsfield");
        expect(persisted.credentials).toMatchObject({
          access_token: "fresh-token",
          refresh_token: "fresh-refresh-token",
          client_id: "client-123",
          credential_kind: "higgsfield_mcp_oauth",
        });
        return jsonResponse({ success: true });
      }

      if (url === "https://mcp.higgsfield.ai/mcp" && method === "POST" && body.method === "initialize") {
        expect((init?.headers as Record<string, string>).Authorization).toBe("Bearer fresh-token");
        return jsonResponse({ jsonrpc: "2.0", id: body.id, result: {} }, { headers: { "mcp-session-id": "session-1" } });
      }

      if (url === "https://mcp.higgsfield.ai/mcp" && method === "POST" && body.method === "notifications/initialized") {
        return acceptedResponse();
      }

      if (url === "https://mcp.higgsfield.ai/mcp" && method === "POST" && body.method === "tools/list") {
        return jsonResponse({ jsonrpc: "2.0", id: body.id, result: { tools: [{ name: "models_explore" }] } });
      }

      if (url === "https://mcp.higgsfield.ai/mcp" && method === "POST" && body.method === "tools/call") {
        const params = body.params as Record<string, unknown>;
        toolCallArguments.push(params.arguments as Record<string, unknown>);
        return jsonResponse({
          jsonrpc: "2.0",
          id: body.id,
          result: { structuredContent: { models: [{ id: "nano_banana_pro" }] } },
        });
      }

      throw new Error(`Unexpected fetch ${method} ${url}`);
    });

    vi.stubGlobal("fetch", fetchMock);

    const result = await higgsfield_get_styles({ query: "banana" }) as Record<string, unknown>;

    expect(result.provider).toBe("higgsfield_mcp");
    expect(result.tool).toBe("models_explore");
    expect(toolCallArguments[0]).toMatchObject({
      params: { action: "search", type: "image", query: "banana" },
    });
  });

  it("retries Higgsfield model exploration when the native MCP rejects an action shape", async () => {
    process.env.UNCLICK_API_KEY = "uc_test";
    process.env.UNCLICK_API_URL = "https://unclick.test";
    let toolCallCount = 0;
    const attemptedArgs: Record<string, unknown>[] = [];

    const fetchMock = vi.fn(async (input: string | URL, init?: RequestInit) => {
      const url = String(input);
      const method = String(init?.method ?? "GET").toUpperCase();
      const bodyText = String(init?.body ?? "");
      const body = bodyText.startsWith("{") ? JSON.parse(bodyText) as Record<string, unknown> : {};

      if (url === "https://unclick.test/api/credentials?platform=higgsfield") {
        return jsonResponse({
          credential_kind: "higgsfield_mcp_oauth",
          access_token: "mcp-token",
          refresh_token: "refresh-token",
          client_id: "client-123",
          expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
          token_type: "Bearer",
          mcp_url: "https://mcp.higgsfield.ai/mcp",
        });
      }

      if (url === "https://mcp.higgsfield.ai/mcp" && method === "POST" && body.method === "initialize") {
        return jsonResponse({ jsonrpc: "2.0", id: body.id, result: {} }, { headers: { "mcp-session-id": `session-${toolCallCount + 1}` } });
      }

      if (url === "https://mcp.higgsfield.ai/mcp" && method === "POST" && body.method === "notifications/initialized") {
        return acceptedResponse();
      }

      if (url === "https://mcp.higgsfield.ai/mcp" && method === "POST" && body.method === "tools/list") {
        return jsonResponse({ jsonrpc: "2.0", id: body.id, result: { tools: [{ name: "models_explore" }] } });
      }

      if (url === "https://mcp.higgsfield.ai/mcp" && method === "POST" && body.method === "tools/call") {
        toolCallCount += 1;
        const params = body.params as Record<string, unknown>;
        const argsPayload = params.arguments as Record<string, unknown>;
        attemptedArgs.push(argsPayload.params as Record<string, unknown>);
        if (toolCallCount === 1) {
          return jsonResponse({
            jsonrpc: "2.0",
            id: body.id,
            result: {
              isError: true,
              content: [{ type: "text", text: "Validation error: invalid action list" }],
            },
          });
        }
        return jsonResponse({
          jsonrpc: "2.0",
          id: body.id,
          result: { structuredContent: { models: [{ id: "nano_banana_pro" }] } },
        });
      }

      throw new Error(`Unexpected fetch ${method} ${url}`);
    });

    vi.stubGlobal("fetch", fetchMock);

    const result = await higgsfield_get_styles({ action: "list", query: "banana" }) as Record<string, unknown>;

    expect(result.provider).toBe("higgsfield_mcp");
    expect(result.tool).toBe("models_explore");
    expect(toolCallCount).toBe(2);
    expect(attemptedArgs[0]).toMatchObject({ action: "list", type: "image", query: "banana" });
    expect(attemptedArgs[1]).toMatchObject({ action: "search", type: "image", query: "banana" });
    expect(result.mcp_argument_fallback).toMatchObject({ attempted: 2 });
  });

  it("refreshes and retries when Higgsfield reports token expiry inside a tool result", async () => {
    process.env.UNCLICK_API_KEY = "uc_test";
    process.env.UNCLICK_API_URL = "https://unclick.test";
    let activeToken = "old-token";
    let toolCallCount = 0;

    const fetchMock = vi.fn(async (input: string | URL, init?: RequestInit) => {
      const url = String(input);
      const method = String(init?.method ?? "GET").toUpperCase();
      const headers = init?.headers as Record<string, string>;
      const bodyText = String(init?.body ?? "");
      const body = bodyText.startsWith("{") ? JSON.parse(bodyText) as Record<string, unknown> : {};

      if (url === "https://unclick.test/api/credentials?platform=higgsfield") {
        return jsonResponse({
          credential_kind: "higgsfield_mcp_oauth",
          access_token: "old-token",
          refresh_token: "refresh-token",
          client_id: "client-123",
          expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
          token_type: "Bearer",
          mcp_url: "https://mcp.higgsfield.ai/mcp",
        });
      }

      if (url === "https://mcp.higgsfield.ai/oauth2/token") {
        activeToken = "fresh-token";
        return jsonResponse({
          access_token: "fresh-token",
          refresh_token: "fresh-refresh-token",
          expires_in: 3600,
          token_type: "Bearer",
        });
      }

      if (url === "https://unclick.test/api/credentials" && method === "POST") {
        return jsonResponse({ success: true });
      }

      if (url === "https://mcp.higgsfield.ai/mcp" && method === "POST" && body.method === "initialize") {
        expect(headers.Authorization).toBe(`Bearer ${activeToken}`);
        return jsonResponse({ jsonrpc: "2.0", id: body.id, result: {} }, { headers: { "mcp-session-id": `session-${activeToken}` } });
      }

      if (url === "https://mcp.higgsfield.ai/mcp" && method === "POST" && body.method === "notifications/initialized") {
        return acceptedResponse();
      }

      if (url === "https://mcp.higgsfield.ai/mcp" && method === "POST" && body.method === "tools/list") {
        return jsonResponse({ jsonrpc: "2.0", id: body.id, result: { tools: [{ name: "generate_image" }] } });
      }

      if (url === "https://mcp.higgsfield.ai/mcp" && method === "POST" && body.method === "tools/call") {
        toolCallCount += 1;
        if (toolCallCount === 1) {
          return jsonResponse({
            jsonrpc: "2.0",
            id: body.id,
            result: {
              content: [{ type: "text", text: "Error starting generation: Invalid or expired token\nRequest ID: req-1" }],
              structuredContent: { error: "Invalid or expired token", request_id: "req-1" },
              isError: true,
            },
          });
        }
        expect(headers.Authorization).toBe("Bearer fresh-token");
        return jsonResponse({
          jsonrpc: "2.0",
          id: body.id,
          result: { structuredContent: { job_id: "job-2", status: "submitted" } },
        });
      }

      throw new Error(`Unexpected fetch ${method} ${url}`);
    });

    vi.stubGlobal("fetch", fetchMock);

    const result = await higgsfield_generate_image({
      prompt: "a 2k cat portrait",
      model: "nano_banana_pro",
      resolution: "2k",
      aspect_ratio: "1:1",
    }) as Record<string, unknown>;

    expect(result.provider).toBe("higgsfield_mcp");
    expect(result.tool).toBe("generate_image");
    expect(toolCallCount).toBe(2);
  });
});
