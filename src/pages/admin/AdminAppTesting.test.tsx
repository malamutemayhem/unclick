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
    // Comments column header is rendered.
    expect(screen.getByText("Comments")).toBeInTheDocument();
    // Manual work column header is rendered (also referenced in the help copy).
    expect(screen.getAllByText("Manual work").length).toBeGreaterThanOrEqual(1);
    // Human checked column header is rendered (also referenced in the help copy).
    expect(screen.getAllByText("Human checked").length).toBeGreaterThanOrEqual(1);
    // Each app row exposes a human-checked checkbox.
    expect(screen.getAllByRole("checkbox").length).toBeGreaterThan(0);
  });

  it("shows auto-derived manual work per app and filters by it", () => {
    renderPage();

    // Alpha Vantage needs a provider API key; the cell says what to get.
    expect(screen.getAllByText(/Get API key/i).length).toBeGreaterThan(0);

    // "Needs a human" hides no-work apps (CoinGecko works keyless) but keeps
    // key-gated ones like Alpha Vantage.
    fireEvent.click(screen.getByRole("button", { name: /needs a human/i }));
    expect(screen.queryByText("CoinGecko")).not.toBeInTheDocument();
    expect(screen.getByText("Alpha Vantage")).toBeInTheDocument();

    // The sign-in kind filter narrows to OAuth connectors like GitHub.
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));
    expect(screen.queryByText("Alpha Vantage")).not.toBeInTheDocument();
    expect(screen.getByText("GitHub")).toBeInTheDocument();
    expect(screen.getByText(/Sign in with GitHub/i)).toBeInTheDocument();
  });

  it("filters the table by search query", () => {
    renderPage();

    const search = screen.getByPlaceholderText(/search apps/i);
    fireEvent.change(search, { target: { value: "alpha" } });

    expect(screen.getByText("Alpha Vantage")).toBeInTheDocument();
    expect(screen.queryByText("CoinGecko")).not.toBeInTheDocument();
  });

  it("matches app names with spaces and broken fragments", () => {
    renderPage();

    const search = screen.getByPlaceholderText(/search apps/i);
    fireEvent.change(search, { target: { value: "job smith" } });
    expect(screen.getByRole("link", { name: /jobsmith/i })).toBeInTheDocument();
    expect(screen.queryByText("CoinGecko")).not.toBeInTheDocument();

    fireEvent.change(search, { target: { value: "jo smi" } });
    expect(screen.getByRole("link", { name: /jobsmith/i })).toBeInTheDocument();
    expect(screen.queryByText("CoinGecko")).not.toBeInTheDocument();
  });
});
