import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import AdminXPassHub from "./AdminXPassHub";
import { dogfoodReport } from "@/data/dogfoodReport";

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
  it("shows a simple XPass family card grid", () => {
    renderHub();

    expect(screen.getByRole("heading", { name: "XPass" })).toBeInTheDocument();
    expect(screen.getByText(/quality-control checklist/i)).toBeInTheDocument();
    expect(screen.getByText(/live checklist rows across 15 Passes/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "XPass family" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /TestPass/i })).toHaveAttribute("href", "/admin/checks/testpass");
    expect(screen.getByRole("link", { name: /UIPass/i })).toHaveAttribute("href", "/admin/checks/uipass");
    expect(screen.getByRole("link", { name: /SecurityPass/i })).toHaveAttribute("href", "/admin/checks/securitypass");
    expect(screen.getByText("Was it copied exactly?")).toBeInTheDocument();
    expect(screen.getAllByText(/checks$/i).length).toBeGreaterThan(10);
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
