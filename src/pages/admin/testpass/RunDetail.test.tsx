import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import RunDetail from "./RunDetail";

const sessionState: { session: { access_token: string } | null; loading: boolean } = {
  session: null,
  loading: true,
};

vi.mock("@/lib/auth", () => ({
  useSession: () => ({ session: sessionState.session, user: null, loading: sessionState.loading }),
}));

afterEach(() => {
  sessionState.session = null;
  sessionState.loading = true;
  vi.unstubAllGlobals();
});

function renderRun() {
  render(
    <MemoryRouter initialEntries={["/admin/testpass/runs/run-abc"]}>
      <Routes>
        <Route path="/admin/testpass/runs/:id" element={<RunDetail />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("RunDetail session readiness", () => {
  it("keeps loading (never flashes 'Run not found') while the session is still resolving", () => {
    sessionState.session = null;
    sessionState.loading = true;
    renderRun();
    expect(screen.getByText(/Loading run/i)).toBeInTheDocument();
    expect(screen.queryByText(/Run not found/i)).not.toBeInTheDocument();
  });

  it("prompts sign-in once the session resolved with no token", async () => {
    sessionState.session = null;
    sessionState.loading = false;
    renderRun();
    expect(await screen.findByText(/Sign in to view this run/i)).toBeInTheDocument();
    expect(screen.queryByText(/Run not found/i)).not.toBeInTheDocument();
  });

  it("loads the run once a token is available", async () => {
    sessionState.session = { access_token: "test-token" };
    sessionState.loading = false;
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          run: {
            id: "run-abc",
            pack_name: "TestPass Core v0",
            target: { url: "https://unclick.world/api/mcp" },
            profile: "smoke",
            started_at: "2026-06-30T00:00:00Z",
            status: "complete",
            verdict_summary: { check: 9, fail: 0, na: 8, pending: 0 },
          },
          items: [],
        }),
      }),
    );
    renderRun();
    expect(await screen.findByRole("heading", { name: /TestPass result/i })).toBeInTheDocument();
    expect(screen.queryByText(/Run not found/i)).not.toBeInTheDocument();
  });
});
