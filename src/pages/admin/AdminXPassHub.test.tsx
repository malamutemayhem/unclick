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
    expect(screen.getByText(/quality-control checklist/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "XPass family" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /TestPass/i })).toHaveAttribute("href", "/admin/checks/testpass");
    expect(screen.getByRole("link", { name: /SecurityPass/i })).toHaveAttribute("href", "/admin/checks/securitypass");
    expect(screen.getByText("Was it copied exactly?")).toBeInTheDocument();
    expect(screen.getAllByText(/checks$/i).length).toBeGreaterThan(10);
  });

  it("shows a product report with a large product-specific checklist", () => {
    renderHub("/admin/checks/securitypass");

    expect(screen.getByRole("heading", { name: "SecurityPass" })).toBeInTheDocument();
    expect(screen.getByText("Is it safe enough?")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Recent reports" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Secrets and auth" })).toBeInTheDocument();
    expect(screen.getByText("No secret exposure")).toBeInTheDocument();
    expect(screen.getByText("Database scope is tenant-safe")).toBeInTheDocument();
    expect(screen.getAllByText(/Green only when every relevant row is PASS or N\/A/i).length).toBeGreaterThan(0);
    expect(screen.getByText("Alert")).toBeInTheDocument();
    expect(screen.getAllByTestId("xpass-check-row").length).toBeGreaterThan(20);
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
    expect(screen.getAllByTestId("xpass-check-row").length).toBeGreaterThan(20);
  });
});
