import { describe, it, expect } from "vitest";
import {
  closenessShave, skinComfort, batteryLife, portability,
  shaverCost, wetShave, selfCleaning, cuttingSystem,
  bestUse, electricShavers,
} from "../electric-shaver-calc.js";

describe("closenessShave", () => {
  it("foil linear closest shave", () => {
    expect(closenessShave("foil_linear")).toBeGreaterThan(closenessShave("travel_compact"));
  });
});

describe("skinComfort", () => {
  it("rotary triple head most skin comfort", () => {
    expect(skinComfort("rotary_triple_head")).toBeGreaterThan(skinComfort("travel_compact"));
  });
});

describe("batteryLife", () => {
  it("rotary triple head best battery life", () => {
    expect(batteryLife("rotary_triple_head")).toBeGreaterThan(batteryLife("travel_compact"));
  });
});

describe("portability", () => {
  it("travel compact most portable", () => {
    expect(portability("travel_compact")).toBeGreaterThan(portability("foil_linear"));
  });
});

describe("shaverCost", () => {
  it("foil linear most expensive", () => {
    expect(shaverCost("foil_linear")).toBeGreaterThan(shaverCost("travel_compact"));
  });
});

describe("wetShave", () => {
  it("wet dry body supports wet shave", () => {
    expect(wetShave("wet_dry_body")).toBe(true);
  });
  it("foil linear does not", () => {
    expect(wetShave("foil_linear")).toBe(false);
  });
});

describe("selfCleaning", () => {
  it("foil linear is self cleaning", () => {
    expect(selfCleaning("foil_linear")).toBe(true);
  });
  it("travel compact is not", () => {
    expect(selfCleaning("travel_compact")).toBe(false);
  });
});

describe("cuttingSystem", () => {
  it("rotary triple head uses circular lift cut head", () => {
    expect(cuttingSystem("rotary_triple_head")).toBe("circular_lift_cut_head");
  });
});

describe("bestUse", () => {
  it("travel compact for carry on business trip", () => {
    expect(bestUse("travel_compact")).toBe("carry_on_business_trip");
  });
});

describe("electricShavers", () => {
  it("returns 5 types", () => {
    expect(electricShavers()).toHaveLength(5);
  });
});
