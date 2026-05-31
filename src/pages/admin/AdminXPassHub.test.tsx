import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import AdminXPassHub from "./AdminXPassHub";

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
    expect(screen.getByText(/roadworthy inspection/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "XPass family" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /TestPass/i })).toHaveAttribute("href", "/admin/checks/testpass");
    expect(screen.getByRole("link", { name: /SecurityPass/i })).toHaveAttribute("href", "/admin/checks/securitypass");
    expect(screen.getByText("Was it copied exactly?")).toBeInTheDocument();
  });

  it("shows a product report with recent reports and thin checklist rows", () => {
    renderHub("/admin/checks/securitypass");

    expect(screen.getByRole("heading", { name: "SecurityPass" })).toBeInTheDocument();
    expect(screen.getByText("Is it safe enough?")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Recent reports" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Roadworthy checks" })).toBeInTheDocument();
    expect(screen.getByText("Scope is clear")).toBeInTheDocument();
    expect(screen.getByText(/plain comment any person can understand/i)).toBeInTheDocument();
    expect(screen.getAllByText("PASS").length).toBeGreaterThan(0);
  });

  it("marks FidelityPass exact-copy scope as N/A when source copy is not in scope", () => {
    renderHub("/admin/checks/fidelitypass");

    expect(screen.getByRole("heading", { name: "FidelityPass" })).toBeInTheDocument();
    expect(screen.getByText(/N\/A is correct when no exact source copy is in scope/i)).toBeInTheDocument();
    expect(screen.getAllByText("N/A").length).toBeGreaterThan(0);
  });
});
