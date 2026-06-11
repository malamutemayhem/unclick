import { describe, it, expect } from "vitest";
import {
  depth, payload, maneuver, endurance,
  rvCost, tethered, forInspection, propulsion,
  bestUse, rovTypes,
} from "../rov-type-calc.js";

describe("depth", () => {
  it("work class deepest", () => {
    expect(depth("work_class_heavy")).toBeGreaterThan(depth("micro_rov_inspection"));
  });
});

describe("payload", () => {
  it("work class highest payload", () => {
    expect(payload("work_class_heavy")).toBeGreaterThan(payload("micro_rov_inspection"));
  });
});

describe("maneuver", () => {
  it("micro rov best maneuver", () => {
    expect(maneuver("micro_rov_inspection")).toBeGreaterThan(maneuver("autonomous_auv_survey"));
  });
});

describe("endurance", () => {
  it("autonomous auv longest endurance", () => {
    expect(endurance("autonomous_auv_survey")).toBeGreaterThan(endurance("micro_rov_inspection"));
  });
});

describe("rvCost", () => {
  it("work class most expensive", () => {
    expect(rvCost("work_class_heavy")).toBeGreaterThan(rvCost("micro_rov_inspection"));
  });
});

describe("tethered", () => {
  it("work class is tethered", () => {
    expect(tethered("work_class_heavy")).toBe(true);
  });
  it("autonomous auv not tethered", () => {
    expect(tethered("autonomous_auv_survey")).toBe(false);
  });
});

describe("forInspection", () => {
  it("observation class for inspection", () => {
    expect(forInspection("observation_class_mini")).toBe(true);
  });
  it("work class not for inspection", () => {
    expect(forInspection("work_class_heavy")).toBe(false);
  });
});

describe("propulsion", () => {
  it("autonomous auv uses battery torpedo form", () => {
    expect(propulsion("autonomous_auv_survey")).toBe("battery_torpedo_form");
  });
});

describe("bestUse", () => {
  it("micro rov best for tank ballast confined", () => {
    expect(bestUse("micro_rov_inspection")).toBe("tank_ballast_confined_space");
  });
});

describe("rovTypes", () => {
  it("returns 5 types", () => {
    expect(rovTypes()).toHaveLength(5);
  });
});
