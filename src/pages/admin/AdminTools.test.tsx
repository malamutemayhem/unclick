import { cleanup, render, screen, waitFor } from "@testing-library/react";
import React from "react";
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
  await waitFor(() =>
    expect(fetch).toHaveBeenCalledWith(
      "/api/memory-admin?action=admin_tools",
      expect.objectContaining({
        headers: { Authorization: "Bearer test-session-token" },
      }),
    ),
  );
}

describe("AdminTools", () => {
  beforeEach(() => {
    vi.resetModules();
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

  it("shows the Skills Library starter pack preview with native boundaries", async () => {
    await renderAdminTools();

    expect(screen.getByRole("heading", { name: "Skills Library" })).toBeInTheDocument();
    expect(screen.getByText(/A curated starter pack of 20/i)).toBeInTheDocument();
    expect(screen.getByText("7 hardwired")).toBeInTheDocument();
    expect(screen.getByText("7 hybrid")).toBeInTheDocument();
    expect(screen.getByText("6 optional")).toBeInTheDocument();
    expect(screen.getByText("Coordinator router")).toBeInTheDocument();
    expect(screen.getAllByText(/Hardwire into UnClick/i).length).toBeGreaterThan(0);
  });

  it("links to the full Skills Library instead of offering live install execution", async () => {
    await renderAdminTools();

    expect(screen.getByRole("link", { name: "Open Skills Library" })).toHaveAttribute("href", "/admin/skills");
    expect(screen.queryByRole("button", { name: /Install/i })).not.toBeInTheDocument();
  });
});
