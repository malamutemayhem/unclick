import { describe, it, expect } from "vitest";
import {
  fleshRemoval, hideDamage, throughput, thicknessControl,
  fmCost, automated, forHeavy, machineConfig,
  bestUse, fleshingMachineTypes,
} from "../fleshing-machine-calc.js";

describe("fleshRemoval", () => {
  it("spiral blade best flesh removal", () => {
    expect(fleshRemoval("spiral_blade")).toBeGreaterThan(fleshRemoval("manual_beam"));
  });
});

describe("hideDamage", () => {
  it("manual beam least hide damage", () => {
    expect(hideDamage("manual_beam")).toBeGreaterThan(hideDamage("spiral_blade"));
  });
});

describe("throughput", () => {
  it("spiral blade highest throughput", () => {
    expect(throughput("spiral_blade")).toBeGreaterThan(throughput("manual_beam"));
  });
});

describe("thicknessControl", () => {
  it("band knife best thickness control", () => {
    expect(thicknessControl("band_knife")).toBeGreaterThan(thicknessControl("manual_beam"));
  });
});

describe("fmCost", () => {
  it("spiral blade most expensive", () => {
    expect(fmCost("spiral_blade")).toBeGreaterThan(fmCost("manual_beam"));
  });
});

describe("automated", () => {
  it("rotary blade is automated", () => {
    expect(automated("rotary_blade")).toBe(true);
  });
  it("manual beam not automated", () => {
    expect(automated("manual_beam")).toBe(false);
  });
});

describe("forHeavy", () => {
  it("rotary blade for heavy hides", () => {
    expect(forHeavy("rotary_blade")).toBe(true);
  });
  it("band knife not for heavy", () => {
    expect(forHeavy("band_knife")).toBe(false);
  });
});

describe("machineConfig", () => {
  it("band knife uses endless blade loop fine thickness", () => {
    expect(machineConfig("band_knife")).toBe("band_knife_fleshing_machine_endless_blade_loop_fine_thickness_split");
  });
});

describe("bestUse", () => {
  it("manual beam for artisan tanner", () => {
    expect(bestUse("manual_beam")).toBe("artisan_tanner_manual_beam_fleshing_hand_knife_small_batch_craft");
  });
});

describe("fleshingMachineTypes", () => {
  it("returns 5 types", () => {
    expect(fleshingMachineTypes()).toHaveLength(5);
  });
});
