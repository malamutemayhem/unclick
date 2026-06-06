import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useAppFilter } from "./useAppFilter";
import type { AppEntry } from "@/lib/appCatalog";

const APPS: AppEntry[] = [
  { slug: "github", name: "GitHub", category: "Developer & infra", blurb: "Manage repos.", domain: null, toolCount: 1, tools: [{ name: "github_action", description: "Repos, issues, PRs." }], level: 2, hardened: true },
  { slug: "openmeteo", name: "Open-Meteo", category: "Weather & science", blurb: "Forecasts.", domain: null, toolCount: 3, tools: [{ name: "weather_current", description: "Current weather conditions." }], level: 5, hardened: true },
  { slug: "stripe", name: "Stripe", category: "Money & payments", blurb: "Payments.", domain: null, toolCount: 6, tools: [{ name: "stripe_customers", description: "Customers and charges." }], level: 5, hardened: true },
];

describe("useAppFilter", () => {
  it("filters by name", () => {
    const { result } = renderHook(() => useAppFilter(APPS));
    act(() => result.current.setQuery("git"));
    expect(result.current.filtered.map((a) => a.slug)).toEqual(["github"]);
  });

  it("matches an app by its tool capability, not just its name", () => {
    const { result } = renderHook(() => useAppFilter(APPS));
    act(() => result.current.setQuery("weather"));
    expect(result.current.filtered.map((a) => a.slug)).toEqual(["openmeteo"]);
  });

  it("filters by category", () => {
    const { result } = renderHook(() => useAppFilter(APPS));
    act(() => result.current.setCategory("Money & payments"));
    expect(result.current.filtered.map((a) => a.slug)).toEqual(["stripe"]);
  });

  it("sorts by tool count and flips direction on re-click", () => {
    const { result } = renderHook(() => useAppFilter(APPS));
    act(() => result.current.toggleSort("toolCount"));
    expect(result.current.filtered[0].slug).toBe("stripe"); // most tools first
    act(() => result.current.toggleSort("toolCount"));
    expect(result.current.filtered[0].slug).toBe("github"); // fewest first
  });

  it("defaults to alphabetical by name", () => {
    const { result } = renderHook(() => useAppFilter(APPS));
    expect(result.current.filtered.map((a) => a.name)).toEqual(["GitHub", "Open-Meteo", "Stripe"]);
  });
});
