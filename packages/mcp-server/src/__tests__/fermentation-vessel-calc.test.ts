import { describe, it, expect } from "vitest";
import {
  tempControl, yeastHarvest, oxygenExclusion, versatility,
  fvCost, pressureRated, forLager, vesselConfig,
  bestUse, fermentationVesselTypes,
} from "../fermentation-vessel-calc.js";

describe("tempControl", () => {
  it("unitank best temp control", () => {
    expect(tempControl("unitank")).toBeGreaterThan(tempControl("open_top"));
  });
});

describe("yeastHarvest", () => {
  it("cylindroconical best yeast harvest", () => {
    expect(yeastHarvest("cylindroconical")).toBeGreaterThan(yeastHarvest("coolship"));
  });
});

describe("oxygenExclusion", () => {
  it("unitank best oxygen exclusion", () => {
    expect(oxygenExclusion("unitank")).toBeGreaterThan(oxygenExclusion("open_top"));
  });
});

describe("versatility", () => {
  it("unitank most versatile", () => {
    expect(versatility("unitank")).toBeGreaterThan(versatility("horizontal_lager"));
  });
});

describe("fvCost", () => {
  it("unitank most expensive", () => {
    expect(fvCost("unitank")).toBeGreaterThan(fvCost("coolship"));
  });
});

describe("pressureRated", () => {
  it("cylindroconical is pressure rated", () => {
    expect(pressureRated("cylindroconical")).toBe(true);
  });
  it("open top not pressure rated", () => {
    expect(pressureRated("open_top")).toBe(false);
  });
});

describe("forLager", () => {
  it("horizontal lager for lager", () => {
    expect(forLager("horizontal_lager")).toBe(true);
  });
  it("coolship not for lager", () => {
    expect(forLager("coolship")).toBe(false);
  });
});

describe("vesselConfig", () => {
  it("coolship uses shallow open tray wild yeast", () => {
    expect(vesselConfig("coolship")).toBe("coolship_koelschip_shallow_open_tray_wild_yeast_spontaneous_cool");
  });
});

describe("bestUse", () => {
  it("unitank for efficient brewery single vessel", () => {
    expect(bestUse("unitank")).toBe("efficient_brewery_unitank_ferment_condition_serve_single_vessel");
  });
});

describe("fermentationVesselTypes", () => {
  it("returns 5 types", () => {
    expect(fermentationVesselTypes()).toHaveLength(5);
  });
});
