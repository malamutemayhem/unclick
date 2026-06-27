import { describe, it, expect } from "vitest";
import {
  lineClarity, crossGrain, durability, reachLength,
  gaugeCost, dualMark, seversfiber, markingTip,
  bestLayout, markingGauges,
} from "../marking-gauge-calc.js";

describe("lineClarity", () => {
  it("wheel cutter precise clearest line", () => {
    expect(lineClarity("wheel_cutter_precise")).toBeGreaterThan(lineClarity("panel_long_beam"));
  });
});

describe("crossGrain", () => {
  it("wheel cutter precise best cross grain", () => {
    expect(crossGrain("wheel_cutter_precise")).toBeGreaterThan(crossGrain("pin_scratch_classic"));
  });
});

describe("durability", () => {
  it("pin scratch classic most durable", () => {
    expect(durability("pin_scratch_classic")).toBeGreaterThan(durability("knife_bevel_clean"));
  });
});

describe("reachLength", () => {
  it("panel long beam longest reach", () => {
    expect(reachLength("panel_long_beam")).toBeGreaterThan(reachLength("wheel_cutter_precise"));
  });
});

describe("gaugeCost", () => {
  it("wheel cutter precise more expensive than pin scratch", () => {
    expect(gaugeCost("wheel_cutter_precise")).toBeGreaterThan(gaugeCost("pin_scratch_classic"));
  });
});

describe("dualMark", () => {
  it("mortise twin pin has dual mark", () => {
    expect(dualMark("mortise_twin_pin")).toBe(true);
  });
  it("wheel cutter precise has no dual mark", () => {
    expect(dualMark("wheel_cutter_precise")).toBe(false);
  });
});

describe("seversfiber", () => {
  it("wheel cutter precise severs fiber", () => {
    expect(seversfiber("wheel_cutter_precise")).toBe(true);
  });
  it("pin scratch classic does not sever fiber", () => {
    expect(seversfiber("pin_scratch_classic")).toBe(false);
  });
});

describe("markingTip", () => {
  it("mortise twin pin uses dual pin parallel", () => {
    expect(markingTip("mortise_twin_pin")).toBe("dual_pin_parallel");
  });
});

describe("bestLayout", () => {
  it("wheel cutter precise best for dovetail baseline mark", () => {
    expect(bestLayout("wheel_cutter_precise")).toBe("dovetail_baseline_mark");
  });
});

describe("markingGauges", () => {
  it("returns 5 types", () => {
    expect(markingGauges()).toHaveLength(5);
  });
});
