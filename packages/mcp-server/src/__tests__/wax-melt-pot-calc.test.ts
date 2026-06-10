import { describe, it, expect } from "vitest";
import {
  meltSpeed, tempControl, capacity, pourEase,
  potCost, hasSpigot, dedicatedUnit, heatSource,
  bestScale, waxMeltPots,
} from "../wax-melt-pot-calc.js";

describe("meltSpeed", () => {
  it("induction plate precise fastest melt speed", () => {
    expect(meltSpeed("induction_plate_precise")).toBeGreaterThan(meltSpeed("slow_cooker_large"));
  });
});

describe("tempControl", () => {
  it("induction plate precise best temp control", () => {
    expect(tempControl("induction_plate_precise")).toBeGreaterThan(tempControl("slow_cooker_large"));
  });
});

describe("capacity", () => {
  it("slow cooker large most capacity", () => {
    expect(capacity("slow_cooker_large")).toBeGreaterThan(capacity("wax_melter_pitcher"));
  });
});

describe("pourEase", () => {
  it("wax melter pitcher easiest pour", () => {
    expect(pourEase("wax_melter_pitcher")).toBeGreaterThan(pourEase("slow_cooker_large"));
  });
});

describe("potCost", () => {
  it("induction plate precise more expensive than double boiler", () => {
    expect(potCost("induction_plate_precise")).toBeGreaterThan(potCost("double_boiler_stove"));
  });
});

describe("hasSpigot", () => {
  it("electric presto pot has spigot", () => {
    expect(hasSpigot("electric_presto_pot")).toBe(true);
  });
  it("double boiler stove does not have spigot", () => {
    expect(hasSpigot("double_boiler_stove")).toBe(false);
  });
});

describe("dedicatedUnit", () => {
  it("wax melter pitcher is dedicated unit", () => {
    expect(dedicatedUnit("wax_melter_pitcher")).toBe(true);
  });
  it("double boiler stove is not dedicated unit", () => {
    expect(dedicatedUnit("double_boiler_stove")).toBe(false);
  });
});

describe("heatSource", () => {
  it("induction plate precise uses magnetic induction coil", () => {
    expect(heatSource("induction_plate_precise")).toBe("magnetic_induction_coil");
  });
});

describe("bestScale", () => {
  it("slow cooker large best for large batch bulk", () => {
    expect(bestScale("slow_cooker_large")).toBe("large_batch_bulk");
  });
});

describe("waxMeltPots", () => {
  it("returns 5 types", () => {
    expect(waxMeltPots()).toHaveLength(5);
  });
});
