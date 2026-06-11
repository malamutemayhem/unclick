import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import AdminDashboard from "./AdminDashboard";

const sessionState: { session: { access_token: string } | null } = { session: null };

vi.mock("@/lib/auth", () => ({
  useSession: () => ({ session: sessionState.session, user: null, loading: false }),
}));

function renderDashboard() {
  render(
    <MemoryRouter>
      <AdminDashboard />
    </MemoryRouter>,
  );
}

afterEach(() => {
  sessionState.session = null;
  vi.unstubAllGlobals();
});

describe("AdminDashboard", () => {
  it("shows the overview tiles and the honest standing-habits fallback when logged out", () => {
    renderDashboard();

    expect(screen.getByRole("heading", { name: "Dashboard" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Open Autopilot" })).toHaveAttribute("href", "/admin/autopilot");
    expect(screen.getByRole("heading", { name: "Standing habits" })).toBeInTheDocument();
    expect(screen.getByText(/Live queue numbers appear here/i)).toBeInTheDocument();
    expect(screen.queryByTestId("needs-you-live")).not.toBeInTheDocument();
  });

  it("shows live queue numbers under What needs you when the Jobs API responds", async () => {
    sessionState.session = { access_token: "test-token" };
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ queue_metrics: { active: 3, open_backlog: 12, done: 90 } }),
      }),
    );

    renderDashboard();

    await waitFor(() => {
      expect(screen.getByTestId("needs-you-live")).toBeInTheDocument();
    });
    expect(screen.getByRole("heading", { name: "What needs you" })).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText(/Live from the Jobs queue/i)).toBeInTheDocument();
  });

  it("keeps the standing-habits fallback when the fetch fails", async () => {
    sessionState.session = { access_token: "test-token" };
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));

    renderDashboard();

    await waitFor(() => {
      expect(screen.queryByTestId("needs-you-live")).not.toBeInTheDocument();
    });
    expect(screen.getByRole("heading", { name: "Standing habits" })).toBeInTheDocument();
  });
});
