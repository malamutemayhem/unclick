import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import WorkerKeysCard from "./WorkerKeysCard";

// A signed-in session is always present; the card is only mounted inside the
// login-gated /admin/you page.
vi.mock("@/lib/auth", () => ({
  useSession: () => ({
    session: { access_token: "test-token" },
    user: null,
    loading: false,
  }),
}));

interface StubRoutes {
  list?: unknown;
  mint?: unknown;
}

function stubFetch(routes: StubRoutes) {
  const fetchMock = vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    const method = (init?.method ?? "GET").toUpperCase();
    if (url.includes("/api/worker-keys")) {
      if (method === "POST") {
        return Promise.resolve({ ok: true, json: () => Promise.resolve(routes.mint) });
      }
      if (method === "DELETE") {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ success: true }) });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(routes.list ?? { worker_keys: [] }),
      });
    }
    return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
  });
  vi.stubGlobal("fetch", fetchMock);
  Object.defineProperty(window, "fetch", { value: fetchMock, configurable: true });
  return fetchMock;
}

describe("WorkerKeysCard", () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("shows the empty state when the account has no worker keys", async () => {
    stubFetch({ list: { worker_keys: [] } });
    render(<WorkerKeysCard />);
    expect(await screen.findByText(/No worker keys yet/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Create worker key/i })).toBeInTheDocument();
  });

  it("lists existing worker keys with a revoke button", async () => {
    stubFetch({
      list: {
        worker_keys: [
          {
            id: "wk1",
            label: "CI runner",
            key_prefix: "agt_abcd1234",
            is_active: true,
            created_at: "2026-06-01T00:00:00Z",
            last_used_at: null,
          },
        ],
      },
    });
    render(<WorkerKeysCard />);
    expect(await screen.findByText("CI runner")).toBeInTheDocument();
    expect(screen.getByText(/agt_abcd1234/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Revoke/i })).toBeInTheDocument();
  });

  it("reveals the minted key and its self-reconnecting URL once after create", async () => {
    const fetchMock = stubFetch({
      list: { worker_keys: [] },
      mint: { id: "wk2", api_key: "agt_secretvalue123", prefix: "agt_secretva", label: "laptop" },
    });
    render(<WorkerKeysCard />);
    await screen.findByText(/No worker keys yet/i);

    fireEvent.click(screen.getByRole("button", { name: /Create worker key/i }));

    // The one-time reveal block appears with both copy actions.
    expect(await screen.findByText(/shown only once/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Copy key/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Copy URL/i })).toBeInTheDocument();

    // Revealing surfaces the full key inside the ready-made connection URL.
    fireEvent.click(screen.getByRole("button", { name: /Reveal/i }));
    expect(
      await screen.findByText("https://unclick.world/api/mcp?key=agt_secretvalue123"),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/worker-keys",
        expect.objectContaining({ method: "POST" }),
      );
    });
  });
});
