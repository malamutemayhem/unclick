import { describe, it, expect } from "vitest";
import {
  drawAccuracy, throughput, surfaceFinish, reductionRatio,
  wdCost, continuous, forMicro, drawerConfig,
  bestUse, wireDrawerTypes,
} from "../wire-drawer-calc.js";

describe("drawAccuracy", () => {
  it("fine wire best draw accuracy", () => {
    expect(drawAccuracy("fine_wire")).toBeGreaterThan(drawAccuracy("bull_block"));
  });
});

describe("throughput", () => {
  it("multi block highest throughput", () => {
    expect(throughput("multi_block")).toBeGreaterThan(throughput("single_block"));
  });
});

describe("surfaceFinish", () => {
  it("wet drawing best surface finish", () => {
    expect(surfaceFinish("wet_drawing")).toBeGreaterThan(surfaceFinish("bull_block"));
  });
});

describe("reductionRatio", () => {
  it("fine wire best reduction ratio", () => {
    expect(reductionRatio("fine_wire")).toBeGreaterThan(reductionRatio("single_block"));
  });
});

describe("wdCost", () => {
  it("fine wire most expensive", () => {
    expect(wdCost("fine_wire")).toBeGreaterThan(wdCost("single_block"));
  });
});

describe("continuous", () => {
  it("multi block is continuous", () => {
    expect(continuous("multi_block")).toBe(true);
  });
  it("single block not continuous", () => {
    expect(continuous("single_block")).toBe(false);
  });
});

describe("forMicro", () => {
  it("fine wire for micro", () => {
    expect(forMicro("fine_wire")).toBe(true);
  });
  it("multi block not for micro", () => {
    expect(forMicro("multi_block")).toBe(false);
  });
});

describe("drawerConfig", () => {
  it("wet drawing uses lubricant bath cool die smooth surface", () => {
    expect(drawerConfig("wet_drawing")).toBe("wet_drawing_wire_drawer_lubricant_bath_cool_die_smooth_surface");
  });
});

describe("bestUse", () => {
  it("bull block for heavy gauge rod bar large diameter", () => {
    expect(bestUse("bull_block")).toBe("heavy_gauge_bull_block_wire_drawer_rod_bar_large_diameter");
  });
});

describe("wireDrawerTypes", () => {
  it("returns 5 types", () => {
    expect(wireDrawerTypes()).toHaveLength(5);
  });
});
