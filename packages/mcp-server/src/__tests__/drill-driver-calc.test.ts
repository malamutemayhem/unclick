import { describe, it, expect } from "vitest";
import {
  torqueRating, speedControl, portability, precision,
  drillCost, hammerAction, brushless, chuckType,
  bestTask, drillDrivers,
} from "../drill-driver-calc.js";

describe("torqueRating", () => {
  it("impact driver highest torque", () => {
    expect(torqueRating("impact_driver")).toBeGreaterThan(torqueRating("cordless_lithium"));
  });
});

describe("speedControl", () => {
  it("drill press best speed control", () => {
    expect(speedControl("drill_press")).toBeGreaterThan(speedControl("impact_driver"));
  });
});

describe("portability", () => {
  it("cordless lithium most portable", () => {
    expect(portability("cordless_lithium")).toBeGreaterThan(portability("drill_press"));
  });
});

describe("precision", () => {
  it("drill press most precise", () => {
    expect(precision("drill_press")).toBeGreaterThan(precision("impact_driver"));
  });
});

describe("drillCost", () => {
  it("drill press most expensive", () => {
    expect(drillCost("drill_press")).toBeGreaterThan(drillCost("corded_hammer"));
  });
});

describe("hammerAction", () => {
  it("corded hammer has hammer action", () => {
    expect(hammerAction("corded_hammer")).toBe(true);
  });
  it("cordless lithium does not", () => {
    expect(hammerAction("cordless_lithium")).toBe(false);
  });
});

describe("brushless", () => {
  it("impact driver is brushless", () => {
    expect(brushless("impact_driver")).toBe(true);
  });
  it("corded hammer is not", () => {
    expect(brushless("corded_hammer")).toBe(false);
  });
});

describe("chuckType", () => {
  it("impact driver uses hex quarter inch quick", () => {
    expect(chuckType("impact_driver")).toBe("hex_quarter_inch_quick");
  });
});

describe("bestTask", () => {
  it("right angle for tight space joist stud", () => {
    expect(bestTask("right_angle")).toBe("tight_space_joist_stud");
  });
});

describe("drillDrivers", () => {
  it("returns 5 types", () => {
    expect(drillDrivers()).toHaveLength(5);
  });
});
