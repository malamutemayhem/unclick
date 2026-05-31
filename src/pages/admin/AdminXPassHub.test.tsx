import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import AdminXPassHub from "./AdminXPassHub";

function renderHub() {
  render(
    <MemoryRouter>
      <AdminXPassHub />
    </MemoryRouter>,
  );
}

describe("AdminXPassHub", () => {
  it("shows the suite landing page with checklist and reports", () => {
    renderHub();

    expect(screen.getByRole("heading", { name: "XPass" })).toBeInTheDocument();
    expect(screen.getByText(/AutoPilot's roadworthy check/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Reports" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Guided run planner" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Checklist" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /All XPass/i })).toBeInTheDocument();
    expect(screen.getAllByText("FidelityPass").length).toBeGreaterThan(0);
  });

  it("filters the checklist to one product", () => {
    renderHub();

    fireEvent.click(screen.getByRole("button", { name: /CopyPass/i }));

    expect(screen.getAllByText("Is the wording clear?").length).toBeGreaterThan(0);
    expect(screen.getByText(/Use on hero copy/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Open CopyPass/i })).toHaveAttribute("href", "/admin/copypass");
  });

  it("switches report context from the report ledger", () => {
    renderHub();

    fireEvent.click(screen.getByRole("button", { name: /Copy and source fidelity/i }));

    expect(screen.getByText(/Only applies when the target includes exact source text/i)).toBeInTheDocument();
    expect(screen.getAllByText("Copy and source fidelity").length).toBeGreaterThan(0);
  });

  it("guides a run from a plain-English target", () => {
    renderHub();

    fireEvent.click(screen.getByRole("button", { name: /Screen or journey/i }));

    expect(screen.getByText(/Capture desktop and mobile proof/i)).toBeInTheDocument();
    expect(screen.getAllByText("UXPass").length).toBeGreaterThan(0);
    expect(screen.getAllByText("FlowPass").length).toBeGreaterThan(0);
    expect(screen.getByText(/N\/A means the check was considered/i)).toBeInTheDocument();
  });
});
