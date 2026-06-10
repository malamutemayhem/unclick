import { describe, it, expect } from "vitest";
import {
  lumbarSupport, breathability, adjustability, coreEngagement,
  chairCost, hasArmrests, reclinable, seatDesign,
  bestUser, deskChairs,
} from "../desk-chair-calc.js";

describe("lumbarSupport", () => {
  it("mesh ergonomic best lumbar", () => {
    expect(lumbarSupport("mesh_ergonomic")).toBeGreaterThan(lumbarSupport("balance_ball"));
  });
});

describe("breathability", () => {
  it("mesh ergonomic most breathable", () => {
    expect(breathability("mesh_ergonomic")).toBeGreaterThan(breathability("leather_executive"));
  });
});

describe("adjustability", () => {
  it("mesh ergonomic most adjustable", () => {
    expect(adjustability("mesh_ergonomic")).toBeGreaterThan(adjustability("balance_ball"));
  });
});

describe("coreEngagement", () => {
  it("balance ball most core engagement", () => {
    expect(coreEngagement("balance_ball")).toBeGreaterThan(coreEngagement("leather_executive"));
  });
});

describe("chairCost", () => {
  it("mesh ergonomic most expensive", () => {
    expect(chairCost("mesh_ergonomic")).toBeGreaterThan(chairCost("balance_ball"));
  });
});

describe("hasArmrests", () => {
  it("leather executive has armrests", () => {
    expect(hasArmrests("leather_executive")).toBe(true);
  });
  it("balance ball does not", () => {
    expect(hasArmrests("balance_ball")).toBe(false);
  });
});

describe("reclinable", () => {
  it("mesh ergonomic is reclinable", () => {
    expect(reclinable("mesh_ergonomic")).toBe(true);
  });
  it("kneeling posture is not", () => {
    expect(reclinable("kneeling_posture")).toBe(false);
  });
});

describe("seatDesign", () => {
  it("balance ball uses anti burst pvc sphere", () => {
    expect(seatDesign("balance_ball")).toBe("anti_burst_pvc_sphere");
  });
});

describe("bestUser", () => {
  it("mesh ergonomic for long hours programmer", () => {
    expect(bestUser("mesh_ergonomic")).toBe("long_hours_programmer");
  });
});

describe("deskChairs", () => {
  it("returns 5 types", () => {
    expect(deskChairs()).toHaveLength(5);
  });
});
