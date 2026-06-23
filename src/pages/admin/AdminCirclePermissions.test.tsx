import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import AdminCirclePermissions from "./AdminCirclePermissions";

function renderPage() {
  return render(
    <MemoryRouter>
      <AdminCirclePermissions />
    </MemoryRouter>,
  );
}

describe("AdminCirclePermissions", () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  it("renders the matrix, members, and the deterministic-enforcement note", () => {
    renderPage();
    expect(screen.getByRole("heading", { name: "Permissions" })).toBeInTheDocument();
    expect(screen.getByText(/Enforced by a fixed rule engine, not by an AI/i)).toBeInTheDocument();
    expect(screen.getByText("Priya")).toBeInTheDocument();
    expect(screen.getByRole("switch", { name: "Share Saved Facts with Priya" })).toBeInTheDocument();
  });

  it("toggles a single cell on then off", () => {
    renderPage();
    const cell = screen.getByRole("switch", { name: "Share Library with Sam" });
    expect(cell).toHaveAttribute("aria-checked", "false");
    fireEvent.click(cell);
    expect(screen.getByRole("switch", { name: "Share Library with Sam" })).toHaveAttribute("aria-checked", "true");
    fireEvent.click(screen.getByRole("switch", { name: "Share Library with Sam" }));
    expect(screen.getByRole("switch", { name: "Share Library with Sam" })).toHaveAttribute("aria-checked", "false");
  });

  it("row master turns the whole row on", () => {
    renderPage();
    expect(screen.getByRole("switch", { name: "Share Library with Sam" })).toHaveAttribute("aria-checked", "false");
    fireEvent.click(screen.getByRole("switch", { name: "Share all of Library" }));
    expect(screen.getByRole("switch", { name: "Share Library with Sam" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("switch", { name: "Share Library with Leo" })).toHaveAttribute("aria-checked", "true");
  });

  it("peer-owned tables: your column is clickable, other columns are view only", () => {
    renderPage();
    expect(screen.getByRole("switch", { name: "Accept Dropbox from David" })).toBeEnabled();
    expect(screen.getByRole("switch", { name: "David shares Dropbox with Priya, view only" })).toBeDisabled();
  });
});
