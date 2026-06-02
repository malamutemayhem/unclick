import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AppsTable } from "./AppsTable";
import type { AppEntry } from "@/lib/appCatalog";

const APPS: AppEntry[] = [
  { slug: "github", name: "GitHub", category: "Developer & infra", blurb: "Manage repos.", domain: null, toolCount: 1, tools: [{ name: "github_action", description: "Repos and issues." }], level: 2, hardened: true },
  { slug: "openmeteo", name: "Open-Meteo", category: "Weather & science", blurb: "Forecasts.", domain: null, toolCount: 3, tools: [{ name: "weather_current", description: "Current weather." }], level: 5, hardened: true },
];

function renderTable(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

afterEach(cleanup);

describe("AppsTable", () => {
  it("public mode renders read-only rows linking to detail pages, no admin controls", () => {
    renderTable(<AppsTable apps={APPS} mode="public" />);
    expect(screen.getByText("GitHub").closest("a")).toHaveAttribute("href", "/apps/github");
    expect(screen.queryByRole("button", { name: /turn all on/i })).not.toBeInTheDocument();
    // No per-app enable checkbox in public mode (the "Show technical names"
    // display toggle is allowed in both modes and is not an admin control).
    expect(screen.queryByLabelText(/^Turn /i)).not.toBeInTheDocument();
  });

  it("search filters by capability across both surfaces", () => {
    renderTable(<AppsTable apps={APPS} mode="public" />);
    fireEvent.change(screen.getByPlaceholderText(/search apps/i), { target: { value: "weather" } });
    expect(screen.getByText("Open-Meteo")).toBeInTheDocument();
    expect(screen.queryByText("GitHub")).not.toBeInTheDocument();
  });

  it("admin mode shows checkboxes + bulk controls and fires toggle callbacks", () => {
    const onToggle = vi.fn();
    const onToggleAll = vi.fn();
    renderTable(
      <AppsTable
        apps={APPS}
        mode="admin"
        enabled={{ github: false }}
        onToggle={onToggle}
        onToggleAll={onToggleAll}
        statusOf={() => null}
      />,
    );
    // Two per-app enable checkboxes (GitHub off -> "Turn ... on", Open-Meteo on
    // -> "Turn ... off"); the "Show technical names" toggle is separate.
    expect(screen.getByLabelText("Turn GitHub on")).toBeInTheDocument();
    expect(screen.getByLabelText("Turn Open-Meteo off")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /turn all off/i }));
    expect(onToggleAll).toHaveBeenCalledWith(false);

    // GitHub is off in props -> its checkbox is unchecked -> clicking turns it on.
    const githubRow = screen.getByText("GitHub").closest("div.grid") as HTMLElement;
    fireEvent.click(within(githubRow).getByRole("checkbox"));
    expect(onToggle).toHaveBeenCalledWith("github", true);
  });
});
