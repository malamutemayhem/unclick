import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import AdminAppTesting from "./AdminAppTesting";

function renderPage() {
  render(
    React.createElement(MemoryRouter, null, React.createElement(AdminAppTesting)),
  );
}

describe("AdminAppTesting", () => {
  it("renders the catalog with seeded test statuses", () => {
    renderPage();

    expect(screen.getByRole("heading", { name: "AppTesting" })).toBeInTheDocument();
    // Seeded "working" app and the amber "needs attention" app both show up.
    expect(screen.getByText("CoinGecko")).toBeInTheDocument();
    expect(screen.getByText("Alpha Vantage")).toBeInTheDocument();
    // Progress line is present and references the full catalog size.
    expect(screen.getByText(/of \d+ apps/)).toBeInTheDocument();
    // Legend explains the amber bucket (the "needs npc"/manual-step case).
    expect(
      screen.getByText(/Works, but needs a manual step/i),
    ).toBeInTheDocument();
  });

  it("filters the table by search query", () => {
    renderPage();

    const search = screen.getByPlaceholderText(/search apps/i);
    fireEvent.change(search, { target: { value: "alpha" } });

    expect(screen.getByText("Alpha Vantage")).toBeInTheDocument();
    expect(screen.queryByText("CoinGecko")).not.toBeInTheDocument();
  });
});
