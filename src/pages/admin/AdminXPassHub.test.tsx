import { render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import AdminXPassHub from "./AdminXPassHub";
import { dogfoodReport } from "@/data/dogfoodReport";

const sessionState: { session: { access_token: string } | null } = { session: null };

vi.mock("@/lib/auth", () => ({
  useSession: () => ({ session: sessionState.session, user: null, loading: false }),
}));

afterEach(() => {
  sessionState.session = null;
  vi.unstubAllGlobals();
});

function renderHub(path = "/admin/checks") {
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/admin/checks" element={<AdminXPassHub />} />
        <Route path="/admin/checks/:productId" element={<AdminXPassHub />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("AdminXPassHub", () => {
  it("shows the XPass family as a table with one linked row per Pass", () => {
    renderHub();

    expect(screen.getByRole("heading", { name: "XPass" })).toBeInTheDocument();
    expect(screen.getByText(/quality-control checklist/i)).toBeInTheDocument();
    expect(screen.getByText(/live checklist rows across 16 Passes/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "XPass family" })).toBeInTheDocument();
    // Table column headers.
    expect(screen.getByText("What it checks")).toBeInTheDocument();
    // Each row is still a link to the same Pass report (hyperlink unchanged).
    expect(screen.getByRole("link", { name: /TestPass/i })).toHaveAttribute("href", "/admin/checks/testpass");
    expect(screen.getByRole("link", { name: /UIPass/i })).toHaveAttribute("href", "/admin/checks/uipass");
    expect(screen.getByRole("link", { name: /SecurityPass/i })).toHaveAttribute("href", "/admin/checks/securitypass");
    expect(screen.getByRole("link", { name: /ConnectorPass/i })).toHaveAttribute("href", "/admin/checks/connectorpass");
    expect(screen.getByText("Was it copied exactly?")).toBeInTheDocument();
    // One linked row per Pass in the family table.
    const familyLinks = screen
      .getAllByRole("link")
      .filter((el) => el.getAttribute("href")?.startsWith("/admin/checks/"));
    expect(familyLinks.length).toBe(16);
  });

  it("shows a product report with a large product-specific checklist", () => {
    renderHub("/admin/checks/securitypass");

    expect(screen.getByRole("heading", { name: "SecurityPass" })).toBeInTheDocument();
    expect(screen.getByText("Is it safe enough?")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Latest recorded evidence" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Secrets and auth" })).toBeInTheDocument();
    expect(screen.getByText("No secret exposure")).toBeInTheDocument();
    expect(screen.getByText("Database scope is tenant-safe")).toBeInTheDocument();
    expect(screen.getAllByText(/Green only when every relevant row is PASS or N\/A/i).length).toBeGreaterThan(0);
    expect(screen.getByText("Alert")).toBeInTheDocument();
    expect(screen.getAllByTestId("xpass-check-row").length).toBeGreaterThan(50);
    expect(screen.getByTestId("xpass-checklist-results")).toContainElement(screen.getByText("Secrets and auth"));
  });

  it("shows only recorded evidence instead of fabricated report history", () => {
    renderHub("/admin/checks/securitypass");

    // The latest-evidence summary must come from the real dogfood report.
    const recorded = dogfoodReport.results.find((result) => result.id === "securitypass");
    expect(recorded).toBeDefined();
    expect(screen.getByTestId("xpass-evidence-summary")).toHaveTextContent(recorded!.summary.slice(0, 40));

    // The honesty note is always present and there is no invented history list.
    expect(screen.getByText(/Only recorded runs appear here/i)).toBeInTheDocument();
    expect(screen.queryByTestId("xpass-report-option")).not.toBeInTheDocument();
    expect(screen.queryByText(/checklist refresh/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/evidence replay/i)).not.toBeInTheDocument();
  });

  it("keeps unscored checklist rows visibly WAITING instead of pretending green", () => {
    renderHub("/admin/checks/securitypass");

    const rows = screen.getAllByTestId("xpass-check-row");
    const waiting = rows.filter((row) => within(row).queryByText("Waiting"));
    expect(waiting.length).toBeGreaterThan(10);
  });

  it("shows real recorded TestPass runs when the runs API responds", async () => {
    sessionState.session = { access_token: "test-token" };
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          runs: [
            {
              id: "run-1",
              pack_name: "Smoke pack",
              started_at: "2026-06-10T11:00:00Z",
              status: "complete",
              verdict_summary: { check: 9, fail: 0, na: 8, pending: 0 },
            },
            {
              id: "run-2",
              pack_name: "Connector pack",
              started_at: "2026-06-09T11:00:00Z",
              status: "complete",
              verdict_summary: { check: 4, fail: 2, na: 1, pending: 0 },
            },
          ],
        }),
      }),
    );

    renderHub("/admin/checks/testpass");

    await waitFor(() => {
      expect(screen.getByTestId("recorded-runs-panel")).toBeInTheDocument();
    });
    const rows = screen.getAllByTestId("recorded-run-row");
    expect(rows).toHaveLength(2);
    expect(rows[0]).toHaveAttribute("href", "/admin/testpass/runs/run-1");
    expect(rows[0]).toHaveTextContent("Smoke pack");
    expect(rows[0]).toHaveTextContent("9 PASS");
    expect(rows[1]).toHaveTextContent("2 FAIL");
  });

  it("shows real recorded UXPass runs with scores when the runs API responds", async () => {
    sessionState.session = { access_token: "test-token" };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        runs: [
          {
            id: "ux-1",
            target_url: "https://unclick.world/why",
            status: "complete",
            ux_score: 100,
            started_at: "2026-06-11T01:57:00Z",
            breakdown: { pass: 16, fail: 0 },
          },
        ],
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    renderHub("/admin/checks/uxpass");

    await waitFor(() => {
      expect(screen.getByTestId("recorded-runs-panel")).toBeInTheDocument();
    });
    const rows = screen.getAllByTestId("recorded-run-row");
    expect(rows[0]).toHaveTextContent("https://unclick.world/why");
    expect(rows[0]).toHaveTextContent("100/100");
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/uxpass?action=list_runs&limit=6",
      expect.objectContaining({ headers: { Authorization: "Bearer test-token" } }),
    );
  });

  it("does not show a recorded-runs panel for Passes without run history", async () => {
    sessionState.session = { access_token: "test-token" };
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ runs: [] }) });
    vi.stubGlobal("fetch", fetchMock);

    renderHub("/admin/checks/securitypass");

    expect(screen.queryByTestId("recorded-runs-panel")).not.toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("splits UIPass visual checks from UXPass journey checks", () => {
    renderHub("/admin/checks/uipass");

    expect(screen.getByRole("heading", { name: "UIPass" })).toBeInTheDocument();
    expect(screen.getByText("Does it look right?")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Screen layout" })).toBeInTheDocument();
    expect(screen.getByText("Desktop layout fits")).toBeInTheDocument();
    expect(screen.queryByText("Journey can be completed")).not.toBeInTheDocument();

    renderHub("/admin/checks/uxpass");

    expect(screen.getByRole("heading", { name: "UXPass" })).toBeInTheDocument();
    expect(screen.getByText("Is it easy to use?")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Task journey" })).toBeInTheDocument();
    expect(screen.getByText("Journey can be completed")).toBeInTheDocument();
  });

  it("marks FidelityPass exact-copy scope as N/A when source copy is not in scope", () => {
    renderHub("/admin/checks/fidelitypass");

    expect(screen.getByRole("heading", { name: "FidelityPass" })).toBeInTheDocument();
    expect(screen.getByText(/N\/A only when the job does not require source-copy fidelity/i)).toBeInTheDocument();
    expect(screen.getAllByText("N/A").length).toBeGreaterThan(0);
  });

  it("shows CopyPass copy-specific checks instead of the generic receipt wrapper", () => {
    renderHub("/admin/checks/copypass");

    expect(screen.getByRole("heading", { name: "CopyPass" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Message clarity" })).toBeInTheDocument();
    expect(screen.getByText("Headline promise is true")).toBeInTheDocument();
    expect(screen.getByText("No AI slop")).toBeInTheDocument();
    expect(screen.getByText("No filler adjectives")).toBeInTheDocument();
    expect(screen.getAllByTestId("xpass-check-row").length).toBeGreaterThan(55);
  });
});
