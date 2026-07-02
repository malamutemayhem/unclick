import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AdminAutopilot, AdminWorkers } from "./AdminEcosystemPages";

const sessionState: { session: { access_token: string } | null } = { session: null };

vi.mock("@/lib/auth", () => ({
  useSession: () => ({ session: sessionState.session, user: null, loading: false }),
}));

function renderAutopilot() {
  render(
    <MemoryRouter>
      <AdminAutopilot />
    </MemoryRouter>,
  );
}

afterEach(() => {
  sessionState.session = null;
  vi.unstubAllGlobals();
});

describe("AdminWorkers", () => {
  it("shows Jobs Manager as a first-class worker role", () => {
    render(React.createElement(AdminWorkers));

    expect(screen.getByRole("heading", { name: "Workers" })).toBeInTheDocument();
    expect(screen.getByText("📋 Jobs Manager")).toBeInTheDocument();
    expect(screen.getByText(/coordinator escalation/i)).toBeInTheDocument();
    expect(screen.getByText(/proof-to-done reconciliation/i)).toBeInTheDocument();
  });

  it("shows Engineering Steward as an architecture health worker role", () => {
    render(React.createElement(AdminWorkers));

    expect(screen.getByText("🧱 Engineering Steward")).toBeInTheDocument();
    expect(screen.getByText(/architecture health/i)).toBeInTheDocument();
    expect(screen.getByText(/scaling risks/i)).toBeInTheDocument();
  });
});

describe("AdminAutopilot", () => {
  it("renders the engine room hub without a live strip when logged out", () => {
    renderAutopilot();

    expect(screen.getByRole("heading", { name: "AutoPilot" })).toBeInTheDocument();
    expect(screen.getByText("Boardroom")).toBeInTheDocument();
    expect(screen.getByText("Jobs")).toBeInTheDocument();
    expect(screen.getByText("XPass")).toBeInTheDocument();
    expect(screen.queryByTestId("engine-now-strip")).not.toBeInTheDocument();
  });

  it("shows real queue metrics in the engine strip when the Jobs API responds", async () => {
    sessionState.session = { access_token: "test-token" };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        queue_metrics: { active: 4, open_backlog: 21, done: 137 },
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    renderAutopilot();

    await waitFor(() => {
      expect(screen.getByTestId("engine-now-strip")).toBeInTheDocument();
    });
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("21")).toBeInTheDocument();
    expect(screen.getByText("137")).toBeInTheDocument();
    expect(screen.getByText(/Live from the Jobs queue/i)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/memory-admin?action=fishbowl_list_todos",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("stays silent instead of showing invented numbers when the fetch fails", async () => {
    sessionState.session = { access_token: "test-token" };
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));

    renderAutopilot();

    await waitFor(() => {
      expect(screen.queryByTestId("engine-now-strip")).not.toBeInTheDocument();
    });
  });
});
