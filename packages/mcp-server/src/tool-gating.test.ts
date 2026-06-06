import { describe, expect, it } from "vitest";

import {
  appForTool,
  filterDisabledTools,
  getDisabledApps,
  getToolAppMap,
  isToolDisabled,
} from "./tool-gating.js";

describe("tool gating (app on/off enforcement)", () => {
  it("maps tools to their app from the generated index", () => {
    const map = getToolAppMap();
    expect(map.get("github_action")).toBe("github");
    // Prefix-mismatch case: weather_* tools belong to openmeteo, not "weather".
    expect(map.get("weather_current")).toBe("openmeteo");
    expect(appForTool("ptv_departures")).toBe("ptv");
  });

  it("blocks a tool only when its app is in the disabled set", () => {
    expect(isToolDisabled("github_action", new Set())).toBe(false);
    expect(isToolDisabled("github_action", new Set(["github"]))).toBe(true);
    // Disabling openmeteo blocks its weather_* tools (name does not match slug).
    expect(isToolDisabled("weather_current", new Set(["openmeteo"]))).toBe(true);
    // Unknown / internal tools are never blocked.
    expect(isToolDisabled("load_memory", new Set(["github"]))).toBe(false);
  });

  it("filters a tool list, keeping unmapped tools", () => {
    const tools = [
      { name: "github_action" },
      { name: "weather_current" },
      { name: "load_memory" },
    ];
    const filtered = filterDisabledTools(tools, new Set(["github", "openmeteo"]));
    expect(filtered.map((t) => t.name)).toEqual(["load_memory"]);
  });

  it("is a no-op with an empty disabled set", () => {
    const tools = [{ name: "github_action" }, { name: "stripe_customers" }];
    expect(filterDisabledTools(tools, new Set())).toHaveLength(2);
  });

  it("getDisabledApps is fail-safe without an api key (returns empty)", async () => {
    expect((await getDisabledApps(null)).size).toBe(0);
  });
});
