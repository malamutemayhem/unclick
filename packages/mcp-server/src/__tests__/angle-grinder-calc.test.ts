import { describe, it, expect } from "vitest";
import {
  cuttingPower, controlEase, portability, discVariety,
  grinderCost, variableSpeed, cordless, motorType,
  bestTask, angleGrinders,
} from "../angle-grinder-calc.js";

describe("cuttingPower", () => {
  it("large seven inch most cutting power", () => {
    expect(cuttingPower("large_seven_inch")).toBeGreaterThan(cuttingPower("small_four_inch"));
  });
});

describe("controlEase", () => {
  it("small four inch easiest control", () => {
    expect(controlEase("small_four_inch")).toBeGreaterThan(controlEase("large_seven_inch"));
  });
});

describe("portability", () => {
  it("cordless battery port most portable", () => {
    expect(portability("cordless_battery_port")).toBeGreaterThan(portability("large_seven_inch"));
  });
});

describe("discVariety", () => {
  it("small four inch widest disc variety", () => {
    expect(discVariety("small_four_inch")).toBeGreaterThan(discVariety("large_seven_inch"));
  });
});

describe("grinderCost", () => {
  it("large seven inch more expensive than small four", () => {
    expect(grinderCost("large_seven_inch")).toBeGreaterThan(grinderCost("small_four_inch"));
  });
});

describe("variableSpeed", () => {
  it("variable speed dial has variable speed", () => {
    expect(variableSpeed("variable_speed_dial")).toBe(true);
  });
  it("small four inch does not have variable speed", () => {
    expect(variableSpeed("small_four_inch")).toBe(false);
  });
});

describe("cordless", () => {
  it("cordless battery port is cordless", () => {
    expect(cordless("cordless_battery_port")).toBe(true);
  });
  it("large seven inch is not cordless", () => {
    expect(cordless("large_seven_inch")).toBe(false);
  });
});

describe("motorType", () => {
  it("cordless battery port uses brushless dc battery", () => {
    expect(motorType("cordless_battery_port")).toBe("brushless_dc_battery");
  });
});

describe("bestTask", () => {
  it("variable speed dial best for polishing sanding finish", () => {
    expect(bestTask("variable_speed_dial")).toBe("polishing_sanding_finish");
  });
});

describe("angleGrinders", () => {
  it("returns 5 types", () => {
    expect(angleGrinders()).toHaveLength(5);
  });
});
