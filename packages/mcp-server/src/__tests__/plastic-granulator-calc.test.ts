import { describe, it, expect } from "vitest";
import {
  pelletUniformity, throughput, dustLevel, coolingEfficiency,
  pgCost, underwater, forRecycle, granulatorConfig,
  bestUse, plasticGranulatorTypes,
} from "../plastic-granulator-calc.js";

describe("pelletUniformity", () => {
  it("underwater pelletizer best uniformity", () => {
    expect(pelletUniformity("underwater_pelletizer")).toBeGreaterThan(pelletUniformity("grinder_granulator"));
  });
});

describe("throughput", () => {
  it("underwater pelletizer highest throughput", () => {
    expect(throughput("underwater_pelletizer")).toBeGreaterThan(throughput("grinder_granulator"));
  });
});

describe("dustLevel", () => {
  it("underwater pelletizer least dust", () => {
    expect(dustLevel("underwater_pelletizer")).toBeGreaterThan(dustLevel("grinder_granulator"));
  });
});

describe("coolingEfficiency", () => {
  it("underwater pelletizer best cooling efficiency", () => {
    expect(coolingEfficiency("underwater_pelletizer")).toBeGreaterThan(coolingEfficiency("grinder_granulator"));
  });
});

describe("pgCost", () => {
  it("underwater pelletizer most expensive", () => {
    expect(pgCost("underwater_pelletizer")).toBeGreaterThan(pgCost("grinder_granulator"));
  });
});

describe("underwater", () => {
  it("underwater pelletizer is underwater", () => {
    expect(underwater("underwater_pelletizer")).toBe(true);
  });
  it("strand pelletizer not underwater", () => {
    expect(underwater("strand_pelletizer")).toBe(false);
  });
});

describe("forRecycle", () => {
  it("strand pelletizer for recycle", () => {
    expect(forRecycle("strand_pelletizer")).toBe(true);
  });
  it("underwater pelletizer not for recycle", () => {
    expect(forRecycle("underwater_pelletizer")).toBe(false);
  });
});

describe("granulatorConfig", () => {
  it("hot face cutter uses die face knife cut air cool", () => {
    expect(granulatorConfig("hot_face_cutter")).toBe("hot_face_cutter_plastic_die_face_knife_cut_air_cool_pellet");
  });
});

describe("bestUse", () => {
  it("grinder granulator for regrind scrap runner sprue", () => {
    expect(bestUse("grinder_granulator")).toBe("plastics_recycling_grinder_granulator_regrind_scrap_runner_sprue");
  });
});

describe("plasticGranulatorTypes", () => {
  it("returns 5 types", () => {
    expect(plasticGranulatorTypes()).toHaveLength(5);
  });
});
