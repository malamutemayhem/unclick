import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import AdminCircle from "./AdminCircle";
import { PEERS } from "@/lib/circle/circleData";

// AdminCircle is the Circle landing surface: a roster of connected members with
// live share counts and the entry point to the deterministic permissions
// matrix. It reads the ledger from localStorage and renders synchronously, so
// these tests need no network or session stubs.
function renderAdminCircle() {
  return render(
    <MemoryRouter>
      <AdminCircle />
    </MemoryRouter>,
  );
}

describe("AdminCircle", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  it("renders the Circle landing with the member roster", () => {
    renderAdminCircle();

    expect(screen.getByRole("heading", { level: 1, name: "Circle" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Members" })).toBeInTheDocument();
    for (const member of PEERS) {
      expect(screen.getByText(member.name)).toBeInTheDocument();
    }
  });

  it("links to the deterministic permissions matrix", () => {
    renderAdminCircle();

    const permissionsLink = screen.getByRole("link", { name: /Permissions/i });
    expect(permissionsLink).toHaveAttribute("href", "/admin/circle/permissions");
  });

  it("summarises share counts from the ledger on every member card", () => {
    renderAdminCircle();

    expect(screen.getAllByText("You share")).toHaveLength(PEERS.length);
    expect(screen.getAllByText("Shares with you")).toHaveLength(PEERS.length);
  });
});
