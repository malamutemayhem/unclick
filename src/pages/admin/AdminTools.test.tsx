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

  it("persists a turn-off to the enforcement API (admin_set_app_state)", async () => {
    await renderAdminTools();
    fireEvent.click(screen.getByLabelText(/Turn GitHub off/i));
    await waitFor(() => {
      const call = (fetch as unknown as { mock: { calls: unknown[][] } }).mock.calls.find(
        (c) => String(c[0]).includes("admin_set_app_state"),
      );
      expect(call).toBeTruthy();
      const body = JSON.parse((call![1] as { body: string }).body);
      expect(body.disabled_apps).toContain("github");
    });
  });
});
