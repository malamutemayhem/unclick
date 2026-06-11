import { describe, it, expect } from "vitest";
import {
  force, speed, precision, durability,
  hcCost, singleActing, forPress, seal,
  bestUse, hydraulicCylinderTypes,
} from "../hydraulic-cylinder-calc.js";

describe("force", () => {
  it("mill duty highest force", () => {
    expect(force("mill_duty_heavy_forge")).toBeGreaterThan(force("telescopic_multi_stage"));
  });
});

describe("speed", () => {
  it("servo hydraulic fastest", () => {
    expect(speed("servo_hydraulic_closed")).toBeGreaterThan(speed("telescopic_multi_stage"));
  });
});

describe("precision", () => {
  it("servo hydraulic most precise", () => {
    expect(precision("servo_hydraulic_closed")).toBeGreaterThan(precision("telescopic_multi_stage"));
  });
});

describe("durability", () => {
  it("mill duty most durable", () => {
    expect(durability("mill_duty_heavy_forge")).toBeGreaterThan(durability("telescopic_multi_stage"));
  });
});

describe("hcCost", () => {
  it("servo hydraulic most expensive", () => {
    expect(hcCost("servo_hydraulic_closed")).toBeGreaterThan(hcCost("single_acting_plunger"));
  });
});

describe("singleActing", () => {
  it("plunger is single acting", () => {
    expect(singleActing("single_acting_plunger")).toBe(true);
  });
  it("double acting tie rod not single acting", () => {
    expect(singleActing("double_acting_tie_rod")).toBe(false);
  });
});

describe("forPress", () => {
  it("mill duty for press", () => {
    expect(forPress("mill_duty_heavy_forge")).toBe(true);
  });
  it("telescopic not for press", () => {
    expect(forPress("telescopic_multi_stage")).toBe(false);
  });
});

describe("seal", () => {
  it("servo hydraulic uses low friction ptfe", () => {
    expect(seal("servo_hydraulic_closed")).toBe("low_friction_ptfe_servo_grade");
  });
});

describe("bestUse", () => {
  it("telescopic for dump truck crane", () => {
    expect(bestUse("telescopic_multi_stage")).toBe("dump_truck_crane_boom_compact");
  });
});

describe("hydraulicCylinderTypes", () => {
  it("returns 5 types", () => {
    expect(hydraulicCylinderTypes()).toHaveLength(5);
  });
});
