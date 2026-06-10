import { describe, it, expect } from "vitest";
import {
  odorControl, handsFree, capacity, durability,
  canCost, hasLid, needsBattery, shellMaterial,
  bestRoom, trashCans,
} from "../trash-can-calc.js";

describe("odorControl", () => {
  it("sensor touchless best odor control", () => {
    expect(odorControl("sensor_touchless")).toBeGreaterThan(odorControl("open_top_basic"));
  });
});

describe("handsFree", () => {
  it("sensor touchless fully hands free", () => {
    expect(handsFree("sensor_touchless")).toBeGreaterThan(handsFree("swing_top_push"));
  });
});

describe("capacity", () => {
  it("dual compartment recycle biggest capacity", () => {
    expect(capacity("dual_compartment_recycle")).toBeGreaterThan(capacity("sensor_touchless"));
  });
});

describe("durability", () => {
  it("swing top push most durable", () => {
    expect(durability("swing_top_push")).toBeGreaterThan(durability("sensor_touchless"));
  });
});

describe("canCost", () => {
  it("sensor touchless most expensive", () => {
    expect(canCost("sensor_touchless")).toBeGreaterThan(canCost("open_top_basic"));
  });
});

describe("hasLid", () => {
  it("step pedal lid has lid", () => {
    expect(hasLid("step_pedal_lid")).toBe(true);
  });
  it("open top basic does not", () => {
    expect(hasLid("open_top_basic")).toBe(false);
  });
});

describe("needsBattery", () => {
  it("sensor touchless needs battery", () => {
    expect(needsBattery("sensor_touchless")).toBe(true);
  });
  it("step pedal lid does not", () => {
    expect(needsBattery("step_pedal_lid")).toBe(false);
  });
});

describe("shellMaterial", () => {
  it("step pedal lid uses stainless steel fingerprint resist", () => {
    expect(shellMaterial("step_pedal_lid")).toBe("stainless_steel_fingerprint_resist");
  });
});

describe("bestRoom", () => {
  it("sensor touchless best for kitchen hygienic touchfree", () => {
    expect(bestRoom("sensor_touchless")).toBe("kitchen_hygienic_touchfree");
  });
});

describe("trashCans", () => {
  it("returns 5 types", () => {
    expect(trashCans()).toHaveLength(5);
  });
});
