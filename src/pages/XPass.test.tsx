import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import XPassPage from "./XPass";

vi.mock("@/lib/auth", () => ({
  useSession: () => ({ session: null }),
}));

vi.mock("@/components/FadeIn", () => ({
  default: ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children),
}));

function renderXPassPage() {
  render(
    <MemoryRouter initialEntries={["/xpass"]}>
      <XPassPage />
    </MemoryRouter>,
  );
}

describe("XPassPage", () => {
  it("explains XPass as the public AutoPilot proof doorway", () => {
    renderXPassPage();

    expect(screen.getByRole("heading", { name: /Proof before it ships/i })).toBeInTheDocument();
    expect(screen.getByText(/AutoPilot's quality-control checklist/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /View public receipt/i })).toHaveAttribute("href", "/dogfood");
    expect(screen.getByRole("link", { name: /Open XPass in Admin/i })).toHaveAttribute("href", "/admin/checks");
    expect(screen.getByRole("heading", { name: /The XPass family/i })).toBeInTheDocument();
    expect(screen.getAllByText("UIPass").length).toBeGreaterThan(0);
    expect(screen.getAllByText("UXPass").length).toBeGreaterThan(0);
  });
});
