import { describe, it, expect } from "vitest";
import {
  torque, speed, life, engagement,
  clCost, slipCapable, forAutomotive, mechanism,
  bestUse, clutchTypes,
} from "../clutch-type-calc.js";

describe("torque", () => {
  it("wet disc highest torque", () => {
    expect(torque("friction_disc_wet")).toBeGreaterThan(torque("centrifugal_shoe"));
  });
});

describe("speed", () => {
  it("wet disc fastest", () => {
    expect(speed("friction_disc_wet")).toBeGreaterThan(speed("centrifugal_shoe"));
  });
});

describe("life", () => {
  it("wet disc longest life", () => {
    expect(life("friction_disc_wet")).toBeGreaterThan(life("centrifugal_shoe"));
  });
});

describe("engagement", () => {
  it("electromagnetic powder best engagement", () => {
    expect(engagement("electromagnetic_powder")).toBeGreaterThan(engagement("centrifugal_shoe"));
  });
});

describe("clCost", () => {
  it("wet disc most expensive", () => {
    expect(clCost("friction_disc_wet")).toBeGreaterThan(clCost("centrifugal_shoe"));
  });
});

describe("slipCapable", () => {
  it("dry disc is slip capable", () => {
    expect(slipCapable("friction_disc_dry")).toBe(true);
  });
  it("centrifugal not slip capable", () => {
    expect(slipCapable("centrifugal_shoe")).toBe(false);
  });
});

describe("forAutomotive", () => {
  it("dry disc for automotive", () => {
    expect(forAutomotive("friction_disc_dry")).toBe(true);
  });
  it("electromagnetic not for automotive", () => {
    expect(forAutomotive("electromagnetic_powder")).toBe(false);
  });
});

describe("mechanism", () => {
  it("overrunning uses sprag wedge", () => {
    expect(mechanism("overrunning_sprag")).toBe("sprag_wedge_one_way");
  });
});

describe("bestUse", () => {
  it("electromagnetic best for web tension printing", () => {
    expect(bestUse("electromagnetic_powder")).toBe("web_tension_control_printing");
  });
});

describe("clutchTypes", () => {
  it("returns 5 types", () => {
    expect(clutchTypes()).toHaveLength(5);
  });
});
