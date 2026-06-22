import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AppsTable } from "./AppsTable";
import type { AppEntry } from "@/lib/appCatalog";

const APPS: AppEntry[] = [
  { slug: "github", name: "GitHub", category: "Developer & infra", blurb: "Manage repos.", domain: null, network: "online", toolCount: 1, tools: [{ name: "github_action", description: "Repos and issues." }], level: 2, hardened: true },
  { slug: "jobsmith", name: "Jobsmith", category: "Productivity", blurb: "Create source-backed job applications.", domain: null, network: "offline", toolCount: 2, tools: [{ name: "jobsmith_check", description: "Check application quality." }], level: 5, hardened: true },
  { slug: "openmeteo", name: "Open-Meteo", category: "Weather & science", blurb: "Forecasts.", domain: null, network: "online", toolCount: 3, tools: [{ name: "weather_current", description: "Current weather." }], level: 5, hardened: true },
  { slug: "supabase", name: "Supabase", category: "Developer & infra", blurb: "Connect Supabase Management API access.", domain: "supabase.com", network: "online", toolCount: 0, tools: [], level: null, hardened: true },
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

  it("keeps connection-only apps visible even when they have zero actions", () => {
    renderTable(<AppsTable apps={APPS} mode="public" />);
    expect(screen.getByText("Supabase")).toBeInTheDocument();
    expect(screen.getByText("Connect Supabase Management API access.")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("search matches app names with spaces and broken fragments", () => {
    renderTable(<AppsTable apps={APPS} mode="public" />);
    const search = screen.getByPlaceholderText(/search apps/i);

    fireEvent.change(search, { target: { value: "job smith" } });
    expect(screen.getByText("Jobsmith")).toBeInTheDocument();
    expect(screen.queryByText("GitHub")).not.toBeInTheDocument();

    fireEvent.change(search, { target: { value: "jo smi" } });
    expect(screen.getByText("Jobsmith")).toBeInTheDocument();
    expect(screen.queryByText("GitHub")).not.toBeInTheDocument();
  });

  it("filters by internet need via the compact Internet dropdown", () => {
    renderTable(<AppsTable apps={APPS} mode="public" />);
    expect(screen.getByText("Jobsmith")).toBeInTheDocument();
    expect(screen.getByText("GitHub")).toBeInTheDocument();

    const internet = screen.getByRole("combobox", { name: "Filter by internet use" });
    fireEvent.change(internet, { target: { value: "offline" } });
    expect(screen.getByText("Jobsmith")).toBeInTheDocument();
    expect(screen.queryByText("GitHub")).not.toBeInTheDocument();

    fireEvent.change(internet, { target: { value: "online" } });
    expect(screen.queryByText("Jobsmith")).not.toBeInTheDocument();
    expect(screen.getByText("GitHub")).toBeInTheDocument();
  });

  it("filters by category via the compact Category dropdown", () => {
    renderTable(<AppsTable apps={APPS} mode="public" />);
    const category = screen.getByRole("combobox", { name: "Filter by category" });
    fireEvent.change(category, { target: { value: "Productivity" } });
    expect(screen.getByText("Jobsmith")).toBeInTheDocument();
    expect(screen.queryByText("GitHub")).not.toBeInTheDocument();

    fireEvent.change(category, { target: { value: "" } });
    expect(screen.getByText("GitHub")).toBeInTheDocument();
  });

  it("shows the full blurb and the internet badge when a row is expanded", () => {
    renderTable(<AppsTable apps={APPS} mode="public" />);
    const row = screen.getByText("Jobsmith").closest("[role='button']");
    expect(row).not.toBeNull();
    fireEvent.click(row!);
    // The blurb now appears twice: the truncated cell and the untruncated
    // expansion (the fix for descriptions being cut off with no way to read them).
    expect(screen.getAllByText(APPS[1].blurb).length).toBeGreaterThanOrEqual(2);
    // "Works offline" shows as both the filter chip (button) and the badge (span).
    expect(screen.getAllByText("Works offline").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText("Check application quality.")).toBeInTheDocument();
  });

  it("admin mode: the status pill becomes a button that fires onStatusClick", () => {
    const onStatusClick = vi.fn();
    renderTable(
      <AppsTable
        apps={[APPS[0]]}
        mode="admin"
        statusOf={() => ({ label: "Needs key", tone: "" })}
        onStatusClick={onStatusClick}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Needs key" }));
    expect(onStatusClick).toHaveBeenCalledWith(expect.objectContaining({ slug: "github" }));
  });

  it("admin mode shows hosted MCP login rows as a connect action, not a connected/manage state", () => {
    const onOpenSetup = vi.fn();
    renderTable(
      <AppsTable
        apps={[APPS[0]]}
        mode="admin"
        statusOf={() => ({ label: "Setup", tone: "border-sky-300/25 bg-sky-300/10 text-sky-100" })}
        actionOf={() => ({ label: "Open setup", onClick: onOpenSetup })}
      />,
    );

    const button = screen.getByRole("button", { name: "Open setup" });
    expect(screen.queryByRole("button", { name: "Setup" })).not.toBeInTheDocument();
    expect(button).not.toHaveAttribute("title", "Click to manage this connection");
    fireEvent.click(button);
    expect(onOpenSetup).toHaveBeenCalledTimes(1);
  });

  it("admin mode exposes manage and disconnect controls on expanded connected rows", () => {
    const onManage = vi.fn();
    const onDisconnect = vi.fn();
    renderTable(
      <AppsTable
        apps={[APPS[0]]}
        mode="admin"
        statusOf={() => ({ label: "Connected", tone: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100" })}
        actionOf={() => ({ label: "Manage", onClick: onManage })}
        disconnectOf={() => ({ label: "Disconnect", onClick: onDisconnect })}
      />,
    );

    const row = screen.getByText("GitHub").closest("[role='button']");
    expect(row).not.toBeNull();
    fireEvent.click(row!);

    fireEvent.click(screen.getByRole("button", { name: "Manage" }));
    fireEvent.click(screen.getByRole("button", { name: "Disconnect" }));

    expect(onManage).toHaveBeenCalledTimes(1);
    expect(onDisconnect).toHaveBeenCalledTimes(1);
  });

  it("admin mode keeps saved login rows manageable as connected", () => {
    const onManage = vi.fn();
    const onDisconnect = vi.fn();
    renderTable(
      <AppsTable
        apps={[APPS[0]]}
        mode="admin"
        statusOf={() => ({ label: "Connected", tone: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100" })}
        actionOf={() => ({ label: "Manage", onClick: onManage })}
        disconnectOf={() => ({ label: "Disconnect", onClick: onDisconnect })}
      />,
    );

    expect(screen.getByRole("button", { name: "Connected" })).toBeInTheDocument();

    const row = screen.getByText("GitHub").closest("[role='button']");
    expect(row).not.toBeNull();
    fireEvent.click(row!);

    expect(screen.getAllByText("Connected").length).toBeGreaterThanOrEqual(2);
    fireEvent.click(screen.getByRole("button", { name: "Manage" }));
    fireEvent.click(screen.getByRole("button", { name: "Disconnect" }));

    expect(onManage).toHaveBeenCalledTimes(1);
    expect(onDisconnect).toHaveBeenCalledTimes(1);
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
