import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth", () => ({
  useSession: () => ({
    session: { access_token: "test-session-token" },
    user: { email: "admin@example.com" },
    loading: false,
  }),
}));

// Small catalog so the bulk-toggle path can be exercised without rendering the
// full ~200-app grid (which is too slow in jsdom).
vi.mock("@/lib/appCatalog", () => ({
  APP_CATALOG: [
    { slug: "alpha", name: "Alpha", category: "Utilities", blurb: "A.", domain: null, toolCount: 1, tools: [{ name: "alpha_do", description: "Do." }], level: 5, hardened: true },
    { slug: "beta", name: "Beta", category: "Utilities", blurb: "B.", domain: null, toolCount: 1, tools: [{ name: "beta_do", description: "Do." }], level: 2, hardened: true },
  ],
  APP_CATEGORIES: ["Utilities"],
  APP_COUNT: 2,
  TOOL_COUNT: 2,
  levelLabel: (l: number | null) => (l === 5 ? "Smart" : "Reliable"),
  actionLabel: (t: { name: string; label?: string }) => t.label ?? t.name,
}));

async function renderAdminTools() {
  const { default: AdminTools } = await import("./AdminTools");
  render(
    <MemoryRouter>
      <AdminTools />
    </MemoryRouter>,
  );
  await screen.findByRole("heading", { name: "Apps" });
}

describe("AdminTools (Apps library)", () => {
  beforeEach(() => {
    vi.resetModules();
    localStorage.clear();
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ metering: {}, connectors: [] }),
        }),
      ),
    );
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("loads connection status from admin_tools", async () => {
    await renderAdminTools();
    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        "/api/memory-admin?action=admin_tools",
        expect.objectContaining({
          headers: { Authorization: "Bearer test-session-token" },
        }),
      ),
    );
  });

  it("renders the unified app rows with admin controls and search", async () => {
    await renderAdminTools();
    expect(screen.getByPlaceholderText(/search apps/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /turn all on/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /turn all off/i })).toBeInTheDocument();
    // A known app from the generated catalog renders as a row.
    expect(screen.getByText("GitHub")).toBeInTheDocument();
  });

  it("links to Passport and the Skills Library instead of inlining everything", async () => {
    await renderAdminTools();
    expect(screen.getByRole("link", { name: /Skills Library/i })).toHaveAttribute("href", "/admin/skills");
    expect(screen.getByRole("link", { name: /Passport/i })).toHaveAttribute("href", "/admin/keychain");
  });

  it("Turn all off posts every app slug; Turn all on clears them", async () => {
    const calls: Array<{ url: string; body?: { disabled_apps: string[] } }> = [];
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string, opts?: { body?: string }) => {
        calls.push({ url: String(url), body: opts?.body ? JSON.parse(opts.body) : undefined });
        return { ok: true, json: () => Promise.resolve({ connectors: [], disabled_apps: [] }) };
      }),
    );
    await renderAdminTools();

    fireEvent.click(screen.getByRole("button", { name: /turn all off/i }));
    await waitFor(() => {
      const post = calls.find((c) => c.url.includes("admin_set_app_state"));
      expect(post?.body?.disabled_apps.slice().sort()).toEqual(["alpha", "beta"]);
    });

    fireEvent.click(screen.getByRole("button", { name: /turn all on/i }));
    await waitFor(() => {
      const posts = calls.filter((c) => c.url.includes("admin_set_app_state"));
      expect(posts.at(-1)?.body?.disabled_apps).toEqual([]);
    });
  });

  it("surfaces an error (instead of failing silently) when a save fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string) => {
        if (String(url).includes("admin_set_app_state")) {
          return { ok: false, status: 500, text: () => Promise.resolve("boom") };
        }
        return { ok: true, json: () => Promise.resolve({ connectors: [], disabled_apps: [] }) };
      }),
    );
    await renderAdminTools();
    fireEvent.click(screen.getByRole("button", { name: /turn all off/i }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/could not save/i);
  });

  // Note: the toggle->admin_set_app_state persistence path is covered by the
  // enforcement unit tests (tool-gating.test.ts) and the API handler; a full
  // render-and-click integration test over the real ~200-app catalog is too slow
  // in jsdom (it can stall the suite), so it is intentionally omitted here.
});
