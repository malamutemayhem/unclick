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

  it("shows the curated Skills Library preview with provenance and risk state", async () => {
    await renderAdminTools();

    expect(screen.getByRole("heading", { name: "Skills Library" })).toBeInTheDocument();
    expect(screen.getByText(/OpenClaw and similar ecosystems are discovery inputs/i)).toBeInTheDocument();
    expect(screen.getByText("OpenClaw compatibility input")).toBeInTheDocument();
    expect(screen.getByText("Quarantined")).toBeInTheDocument();
    expect(screen.getByText("License review required")).toBeInTheDocument();
    expect(screen.getByText("upstream preview")).toBeInTheDocument();
    expect(screen.getByText(/No credential access/i)).toBeInTheDocument();
  });

  it("keeps preview and fork affordances disabled until install execution exists", async () => {
    await renderAdminTools();

    expect(screen.getByRole("button", { name: "Preview PR Monitor and Reviewer" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Install PR Monitor and Reviewer" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Fork Research Pack" })).toBeDisabled();
    expect(screen.getByText("Preview only, no live install or execution")).toBeInTheDocument();
    expect(screen.getByText("Forkable draft, reversible copy path")).toBeInTheDocument();
  });
});
