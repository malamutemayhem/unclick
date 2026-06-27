import { describe, it, expect } from "vitest";
import {
  removalSpeed, precision, boardSafety, easeOfUse,
  toolCost, powered, forSmd, heatMethod,
  bestUse, desolderingTools,
} from "../desoldering-tool-calc.js";

describe("removalSpeed", () => {
  it("vacuum desoldering fastest removal", () => {
    expect(removalSpeed("vacuum_desoldering")).toBeGreaterThan(removalSpeed("desoldering_braid"));
  });
});

describe("precision", () => {
  it("desoldering braid most precise", () => {
    expect(precision("desoldering_braid")).toBeGreaterThan(precision("solder_sucker_pump"));
  });
});

describe("boardSafety", () => {
  it("desoldering braid safest for board", () => {
    expect(boardSafety("desoldering_braid")).toBeGreaterThan(boardSafety("hot_air_rework"));
  });
});

describe("easeOfUse", () => {
  it("solder sucker pump easiest to use", () => {
    expect(easeOfUse("solder_sucker_pump")).toBeGreaterThan(easeOfUse("hot_air_rework"));
  });
});

describe("toolCost", () => {
  it("vacuum desoldering most expensive", () => {
    expect(toolCost("vacuum_desoldering")).toBeGreaterThan(toolCost("solder_sucker_pump"));
  });
});

describe("powered", () => {
  it("hot air rework is powered", () => {
    expect(powered("hot_air_rework")).toBe(true);
  });
  it("solder sucker pump not powered", () => {
    expect(powered("solder_sucker_pump")).toBe(false);
  });
});

describe("forSmd", () => {
  it("hot air rework is for smd", () => {
    expect(forSmd("hot_air_rework")).toBe(true);
  });
  it("solder sucker pump not for smd", () => {
    expect(forSmd("solder_sucker_pump")).toBe(false);
  });
});

describe("heatMethod", () => {
  it("desoldering braid uses capillary wick absorb", () => {
    expect(heatMethod("desoldering_braid")).toBe("capillary_wick_absorb");
  });
});

describe("bestUse", () => {
  it("hot air rework best for bga qfp chip rework", () => {
    expect(bestUse("hot_air_rework")).toBe("bga_qfp_chip_rework");
  });
});

describe("desolderingTools", () => {
  it("returns 5 types", () => {
    expect(desolderingTools()).toHaveLength(5);
  });
});
