import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AdminBrainmap from "./AdminBrainmap";

const authState = {
  email: "creativelead@malamutemayhem.com",
  token: "test-session-token",
  loading: false,
};

vi.mock("@/lib/auth", () => ({
  useSession: () => ({
    session: authState.token ? { access_token: authState.token } : null,
    user: authState.email ? { email: authState.email } : null,
    loading: authState.loading,
  }),
}));

describe("AdminBrainmap", () => {
  beforeEach(() => {
    authState.email = "creativelead@malamutemayhem.com";
    authState.token = "test-session-token";
    authState.loading = false;
    vi.restoreAllMocks();
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ email: authState.email, is_admin: true }),
        }),
      ),
    );
  });

  it("renders the private visual Brainmap tree with the key onboarding systems", () => {
    render(React.createElement(AdminBrainmap));

    expect(screen.getByRole("heading", { name: "Ecosystem Brainmap" })).toBeInTheDocument();
    expect(screen.getByText("Private Yellow Admin")).toBeInTheDocument();
    expect(screen.getByText("Internal admin only")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Human orientation" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Core admin surfaces" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Worker tree" })).toBeInTheDocument();
    expect(screen.getByText("AI seat packet")).toBeInTheDocument();
    expect(screen.getAllByText("/admin/jobs").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Operational job and task queue.").length).toBeGreaterThan(0);
    expect(screen.getByText("Raw generated Brainmap")).toBeInTheDocument();
    expect(screen.getByText("Tool and worker tree")).toBeInTheDocument();
    expect(screen.getByText("SeatRelay")).toBeInTheDocument();
    expect(screen.getByText("CopyRoom")).toBeInTheDocument();
    expect(screen.getByText("Proof Ledger")).toBeInTheDocument();
    expect(screen.getAllByText("Source of truth").length).toBeGreaterThan(0);
    expect(screen.getByText(/brainmap-v2/i)).toBeInTheDocument();
  });

  it("filters the tree without losing the generated inventory", () => {
    render(React.createElement(AdminBrainmap));

    fireEvent.change(screen.getByLabelText("Search Brainmap"), {
      target: { value: "SeatRelay" },
    });

    expect(screen.getByText("SeatRelay")).toBeInTheDocument();
    expect(screen.getByText(/stale release, smart reassignment/i)).toBeInTheDocument();
    expect(screen.queryByText("CopyRoom")).not.toBeInTheDocument();
  });

  it("keeps the generated markdown available behind an explicit source toggle", () => {
    render(React.createElement(AdminBrainmap));

    expect(screen.queryByText("Pages and Meaning")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Show source" }));
    expect(screen.getAllByText("Pages and Meaning").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Tool and Worker Tree").length).toBeGreaterThan(0);
  });

  it("blocks the private view for non-owner admins", async () => {
    authState.email = "admin@example.com";

    render(React.createElement(AdminBrainmap));

    expect(await screen.findByText("Creative lead access only")).toBeInTheDocument();
    expect(screen.queryByText("SeatRelay")).not.toBeInTheDocument();
  });
});
