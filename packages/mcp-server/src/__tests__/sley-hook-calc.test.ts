import { describe, it, expect } from "vitest";
import {
  threadingSpeed, precision, handComfort, durability,
  hookCost, doubleEnd, forFineThread, hookMaterial,
  bestUse, sleyHooks,
} from "../sley-hook-calc.js";

describe("threadingSpeed", () => {
  it("double end flip fastest threading", () => {
    expect(threadingSpeed("double_end_flip")).toBeGreaterThan(threadingSpeed("fine_gauge_thin"));
  });
});

describe("precision", () => {
  it("fine gauge thin most precise", () => {
    expect(precision("fine_gauge_thin")).toBeGreaterThan(precision("flat_blade_standard"));
  });
});

describe("handComfort", () => {
  it("ergonomic handle grip most comfortable", () => {
    expect(handComfort("ergonomic_handle_grip")).toBeGreaterThan(handComfort("fine_gauge_thin"));
  });
});

describe("durability", () => {
  it("flat blade standard most durable", () => {
    expect(durability("flat_blade_standard")).toBeGreaterThan(durability("fine_gauge_thin"));
  });
});

describe("hookCost", () => {
  it("double end flip more expensive than flat blade", () => {
    expect(hookCost("double_end_flip")).toBeGreaterThan(hookCost("flat_blade_standard"));
  });
});

describe("doubleEnd", () => {
  it("double end flip is double ended", () => {
    expect(doubleEnd("double_end_flip")).toBe(true);
  });
  it("flat blade standard is not double ended", () => {
    expect(doubleEnd("flat_blade_standard")).toBe(false);
  });
});

describe("forFineThread", () => {
  it("fine gauge thin is for fine thread", () => {
    expect(forFineThread("fine_gauge_thin")).toBe(true);
  });
  it("bent tip angle is not for fine thread", () => {
    expect(forFineThread("bent_tip_angle")).toBe(false);
  });
});

describe("hookMaterial", () => {
  it("ergonomic handle grip uses steel rubber handle", () => {
    expect(hookMaterial("ergonomic_handle_grip")).toBe("steel_rubber_handle");
  });
});

describe("bestUse", () => {
  it("double end flip best for heddle reed combo", () => {
    expect(bestUse("double_end_flip")).toBe("heddle_reed_combo");
  });
});

describe("sleyHooks", () => {
  it("returns 5 types", () => {
    expect(sleyHooks()).toHaveLength(5);
  });
});
