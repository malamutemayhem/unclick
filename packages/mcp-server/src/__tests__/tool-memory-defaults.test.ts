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
