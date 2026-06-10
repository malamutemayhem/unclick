import { describe, it, expect } from "vitest";
import {
  degreesOfFreedom, payloadKg, speedScore,
  precisionMm, costScore, requiresSafetyCage,
  fixedBase, primaryApplication, kinematics, robotTypes,
} from "../robot-type-calc.js";

describe("degreesOfFreedom", () => {
  it("collaborative most dof", () => {
    expect(degreesOfFreedom("collaborative")).toBeGreaterThan(
      degreesOfFreedom("delta")
    );
  });
});

describe("payloadKg", () => {
  it("articulated highest payload", () => {
    expect(payloadKg("articulated")).toBeGreaterThan(
      payloadKg("delta")
    );
  });
});

describe("speedScore", () => {
  it("delta fastest", () => {
    expect(speedScore("delta")).toBeGreaterThan(
      speedScore("collaborative")
    );
  });
});

describe("precisionMm", () => {
  it("delta most precise", () => {
    expect(precisionMm("delta")).toBeGreaterThan(
      precisionMm("articulated")
    );
  });
});

describe("costScore", () => {
  it("articulated most expensive", () => {
    expect(costScore("articulated")).toBeGreaterThan(
      costScore("cartesian")
    );
  });
});

describe("requiresSafetyCage", () => {
  it("articulated requires cage", () => {
    expect(requiresSafetyCage("articulated")).toBe(true);
  });
  it("collaborative does not", () => {
    expect(requiresSafetyCage("collaborative")).toBe(false);
  });
});

describe("fixedBase", () => {
  it("scara has fixed base", () => {
    expect(fixedBase("scara")).toBe(true);
  });
  it("collaborative does not", () => {
    expect(fixedBase("collaborative")).toBe(false);
  });
});

describe("primaryApplication", () => {
  it("delta for pick and place", () => {
    expect(primaryApplication("delta")).toBe("pick_and_place");
  });
});

describe("kinematics", () => {
  it("delta uses parallel linkage", () => {
    expect(kinematics("delta")).toBe("parallel_linkage");
  });
});

describe("robotTypes", () => {
  it("returns 5 types", () => {
    expect(robotTypes()).toHaveLength(5);
  });
});
