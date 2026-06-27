import { describe, it, expect } from "vitest";
import {
  speed, precision, payload, reach,
  srCost, cleanroom, forElectronics, drive,
  bestUse, scaraRobotTypes,
} from "../scara-robot-calc.js";

describe("speed", () => {
  it("high speed assembly fastest", () => {
    expect(speed("high_speed_assembly")).toBeGreaterThan(speed("long_arm_extended_reach"));
  });
});

describe("precision", () => {
  it("cleanroom most precise", () => {
    expect(precision("cleanroom_iso_class")).toBeGreaterThan(precision("long_arm_extended_reach"));
  });
});

describe("payload", () => {
  it("long arm highest payload", () => {
    expect(payload("long_arm_extended_reach")).toBeGreaterThan(payload("high_speed_assembly"));
  });
});

describe("reach", () => {
  it("long arm longest reach", () => {
    expect(reach("long_arm_extended_reach")).toBeGreaterThan(reach("high_speed_assembly"));
  });
});

describe("srCost", () => {
  it("cleanroom most expensive", () => {
    expect(srCost("cleanroom_iso_class")).toBeGreaterThan(srCost("standard_four_axis"));
  });
});

describe("cleanroom", () => {
  it("cleanroom ISO is cleanroom rated", () => {
    expect(cleanroom("cleanroom_iso_class")).toBe(true);
  });
  it("standard not cleanroom", () => {
    expect(cleanroom("standard_four_axis")).toBe(false);
  });
});

describe("forElectronics", () => {
  it("standard for electronics", () => {
    expect(forElectronics("standard_four_axis")).toBe(true);
  });
  it("ceiling mount not for electronics", () => {
    expect(forElectronics("ceiling_mount_inverted")).toBe(false);
  });
});

describe("drive", () => {
  it("cleanroom uses direct drive sealed", () => {
    expect(drive("cleanroom_iso_class")).toBe("direct_drive_sealed_iso_class_5");
  });
});

describe("bestUse", () => {
  it("high speed for SMT component placement", () => {
    expect(bestUse("high_speed_assembly")).toBe("smt_component_placement_rapid");
  });
});

describe("scaraRobotTypes", () => {
  it("returns 5 types", () => {
    expect(scaraRobotTypes()).toHaveLength(5);
  });
});
