import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth", () => ({
  useSession: () => ({
    session: { access_token: "test-session-token" },
    user: { email: "admin@example.com" },
    loading: false,
  }),
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

  // Each of these renders the FULL generated catalog (650+ rows) in jsdom,
  // which can take well over the default 10s on a contended CI runner. The
  // wider budget keeps slow runners from flaking; the assertions are unchanged.
  const FULL_CATALOG_RENDER_TIMEOUT_MS = 30_000;

  it("renders the unified app rows with admin controls and search", async () => {
    await renderAdminTools();
    expect(screen.getByPlaceholderText(/search apps/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /turn all on/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /turn all off/i })).toBeInTheDocument();
    // A known app from the generated catalog renders as a row.
    expect(screen.getByText("GitHub")).toBeInTheDocument();
  }, FULL_CATALOG_RENDER_TIMEOUT_MS);

  it("keeps login-first apps connectable when admin_tools has not returned connector rows yet", async () => {
    await renderAdminTools();

    for (const name of ["Gmail", "Google Drive", "OneDrive"]) {
      const row = screen.getByText(name).closest("[role='button']");
      expect(row).not.toBeNull();
      expect(within(row as HTMLElement).getByRole("button", { name: "Connect" })).toBeInTheDocument();
      expect(within(row as HTMLElement).queryByText("Built-in")).not.toBeInTheDocument();
    }
  }, FULL_CATALOG_RENDER_TIMEOUT_MS);

  it("shows web-login credentials as connected in the Apps table", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        metering: {},
        connectors: [
          {
            id: "gmail",
            auth_type: "oauth2",
            setup_url: "/connect/gmail",
            credential: {
              id: "cred-gmail",
              is_valid: true,
              last_tested_at: null,
              source: "user_credentials",
            },
          },
          {
            id: "google-drive",
            auth_type: "oauth2",
            setup_url: "/connect/google-drive",
            credential: {
              id: "cred-drive",
              is_valid: true,
              last_tested_at: null,
              source: "user_credentials",
            },
          },
        ],
      }),
    } as Response);

    await renderAdminTools();

    for (const name of ["Gmail", "Google Drive"]) {
      const row = screen.getByText(name).closest("[role='button']");
      expect(row).not.toBeNull();
      expect(within(row as HTMLElement).getByRole("button", { name: "Connected" })).toHaveAttribute(
        "title",
        "Click to manage this connection",
      );
      expect(within(row as HTMLElement).getByText("Connected")).toBeInTheDocument();
      expect(within(row as HTMLElement).queryByRole("button", { name: "Connect" })).not.toBeInTheDocument();
    }
  }, FULL_CATALOG_RENDER_TIMEOUT_MS);

  it("links to Connections and the Skills Library instead of inlining everything", async () => {
    await renderAdminTools();
    expect(screen.getByRole("link", { name: /Skills Library/i })).toHaveAttribute("href", "/admin/skills");
    expect(screen.getByRole("link", { name: /Connections/i })).toHaveAttribute("href", "/admin/keychain");
  }, FULL_CATALOG_RENDER_TIMEOUT_MS);

  // The network filter chips and the connect wizard are covered by the cheap
  // fixture-based tests in src/components/apps/ (AppsTable.test.tsx and
  // ConnectAppModal.test.tsx); rendering the full catalog again here for each
  // assertion is what stalls jsdom.

  // Note: the toggle->admin_set_app_state persistence path is covered by the
  // enforcement unit tests (tool-gating.test.ts) and the API handler; a full
  // render-and-click integration test over the real ~200-app catalog is too slow
  // in jsdom (it can stall the suite), so it is intentionally omitted here.
});
