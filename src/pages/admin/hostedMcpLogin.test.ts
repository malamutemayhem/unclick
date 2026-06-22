import { afterEach, describe, expect, it, vi } from "vitest";
import { ensureLocalConnectionApiKey, startHostedMcpLogin } from "./hostedMcpLogin";

function jsonResponse(body: unknown, ok = true, status = ok ? 200 : 500): Response {
  return {
    ok,
    status,
    json: () => Promise.resolve(body),
  } as Response;
}

function fakeWindow() {
  const popupAssign = vi.fn();
  const close = vi.fn();
  const focus = vi.fn();
  const popup = {
    closed: false,
    close,
    focus,
    document: {
      title: "",
      body: { style: {}, innerHTML: "" },
    },
    location: { assign: popupAssign },
  };
  const open = vi.fn(() => popup);
  const windowAssign = vi.fn();
  return {
    popup,
    popupAssign,
    close,
    focus,
    windowRef: {
      open,
      screenLeft: 100,
      screenTop: 50,
      outerWidth: 1200,
      outerHeight: 900,
      location: { assign: windowAssign },
    } as unknown as Window,
    open,
    windowAssign,
  };
}

describe("hostedMcpLogin", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("opens a provider popup and starts Higgsfield OAuth with the cached account key", async () => {
    const fake = fakeWindow();
    const fetcher = vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
      expect(String(input)).toBe("/api/oauth-init");
      expect(init).toEqual(expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ platform: "higgsfield", api_key: "uc_cached_key" }),
      }));
      return Promise.resolve(jsonResponse({
        authorization_url: "https://mcp.higgsfield.ai/oauth2/authorize?client_id=test",
      }));
    });

    const popup = await startHostedMcpLogin({
      slug: "higgsfield",
      sessionAccessToken: "session-token",
      fetcher,
      windowRef: fake.windowRef,
      readApiKey: () => "uc_cached_key",
    });

    expect(popup).toBe(fake.popup);
    expect(fake.open).toHaveBeenCalledWith("", "unclick_connect_higgsfield", expect.stringContaining("popup=yes"));
    expect(fake.open).toHaveBeenCalledWith("", "unclick_connect_higgsfield", expect.stringContaining("left=420,top=120"));
    expect(fake.popupAssign).toHaveBeenCalledWith("https://mcp.higgsfield.ai/oauth2/authorize?client_id=test");
    expect(fake.close).not.toHaveBeenCalled();
  });

  it("mints and stores an account key before starting OAuth when this browser has none", async () => {
    const storeApiKeyValue = vi.fn(() => true);
    const fetcher = vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("generate_api_key")) return Promise.resolve(jsonResponse({ api_key: "uc_new_key" }));
      if (url === "/api/oauth-init") {
        return Promise.resolve(jsonResponse({ authorization_url: "https://mcp.higgsfield.ai/oauth2/authorize?client_id=test" }));
      }
      throw new Error(`unexpected fetch: ${url}`);
    });

    const key = await ensureLocalConnectionApiKey({
      sessionAccessToken: "session-token",
      fetcher,
      readApiKey: () => "",
      storeApiKeyValue,
    });

    expect(key).toBe("uc_new_key");
    expect(storeApiKeyValue).toHaveBeenCalledWith("uc_new_key");
  });

  it("closes the popup when OAuth cannot start", async () => {
    const fake = fakeWindow();
    const fetcher = vi.fn(() => Promise.resolve(jsonResponse({ error: "provider down" }, false, 502)));

    await expect(startHostedMcpLogin({
      slug: "higgsfield",
      sessionAccessToken: "session-token",
      fetcher,
      windowRef: fake.windowRef,
      readApiKey: () => "uc_cached_key",
    })).rejects.toThrow(/provider down/i);

    expect(fake.close).toHaveBeenCalled();
  });
});
