import { describe, expect, it } from "vitest";

import {
  applyToolMemoryDefaults,
  extractPtvDefaultsFromMemoryRows,
} from "../tool-memory-defaults.js";

describe("PTV memory defaults", () => {
  it("extracts a saved home stop from memory text", () => {
    const defaults = extractPtvDefaultsFromMemoryRows([
      {
        source: "fact",
        content: "PTV home station stop_id 12345 route_type 0 direction_id 9",
      },
    ]);

    expect(defaults).toEqual({
      stop_id: "12345",
      route_type: 0,
      direction_id: "9",
    });
  });

  it("applies business-context defaults when ptv_departures has no stop_id", async () => {
    const result = await applyToolMemoryDefaults("ptv_departures", {}, {
      backend: {
        async getBusinessContext() {
          return [
            {
              category: "connector_defaults",
              key: "ptv",
              value: {
                stop_id: 12345,
                route_type: 0,
                max_results: 3,
              },
            },
          ];
        },
        async searchMemory() {
          return [];
        },
      },
    });

    expect(result.args).toMatchObject({
      stop_id: "12345",
      route_type: 0,
      max_results: 3,
      __unclick_memory_defaults: ["memory.stop_id", "memory.route_type", "memory.max_results"],
    });
  });

  it("does not override explicit PTV args", async () => {
    const result = await applyToolMemoryDefaults("ptv_departures", { stop_id: 999 }, {
      backend: {
        async getBusinessContext() {
          return [
            { category: "connector_defaults", key: "ptv", value: { stop_id: 12345 } },
          ];
        },
        async searchMemory() {
          return [];
        },
      },
    });

    expect(result.args).toEqual({ stop_id: 999 });
    expect(result.applied).toEqual([]);
  });
});

describe("generic connector memory defaults", () => {
  const backendWith = (rows: unknown[]) => ({
    async getBusinessContext() {
      return rows;
    },
    async searchMemory() {
      return [];
    },
  });

  it("fills a saved Turso org when none is supplied", async () => {
    const result = await applyToolMemoryDefaults("turso_list_databases", {}, {
      backend: backendWith([
        { category: "connector_defaults", key: "turso", value: { org: "acme-co" } },
      ]),
    });

    expect(result.args).toMatchObject({
      org: "acme-co",
      __unclick_memory_defaults: ["memory.org"],
    });
    expect(result.applied).toEqual(["memory.org"]);
  });

  it("fills a saved Jira project_key on create", async () => {
    const result = await applyToolMemoryDefaults("jira_create_issue", { summary: "x" }, {
      backend: backendWith([
        { category: "connector_defaults", key: "jira", value: { project_key: "ENG" } },
      ]),
    });

    expect(result.args).toMatchObject({ project_key: "ENG", __unclick_memory_defaults: ["memory.project_key"] });
  });

  it("fills a saved Neon project_id", async () => {
    const result = await applyToolMemoryDefaults("neon_get_project", {}, {
      backend: backendWith([
        { category: "connector_defaults", key: "neon", value: { project_id: "proj-123" } },
      ]),
    });

    expect(result.args).toMatchObject({ project_id: "proj-123", __unclick_memory_defaults: ["memory.project_id"] });
  });

  it("fills a saved home city for weather and tolerates a JSON-string value", async () => {
    const result = await applyToolMemoryDefaults("weather_current", {}, {
      backend: backendWith([
        { category: "connector_defaults", key: "weather", value: JSON.stringify({ city: "Melbourne" }) },
      ]),
    });

    expect(result.args).toMatchObject({ city: "Melbourne", __unclick_memory_defaults: ["memory.city"] });
  });

  it("does not override an explicit location (guard args)", async () => {
    const result = await applyToolMemoryDefaults("weather_current", { latitude: 1, longitude: 2 }, {
      backend: backendWith([
        { category: "connector_defaults", key: "weather", value: { city: "Melbourne" } },
      ]),
    });

    expect(result.args).toEqual({ latitude: 1, longitude: 2 });
    expect(result.applied).toEqual([]);
  });

  it("is a no-op for tools without a registered default", async () => {
    const result = await applyToolMemoryDefaults("openai_chat_completion", { model: "x" }, {
      backend: backendWith([
        { category: "connector_defaults", key: "turso", value: { org: "acme-co" } },
      ]),
    });

    expect(result.args).toEqual({ model: "x" });
    expect(result.applied).toEqual([]);
  });
});
