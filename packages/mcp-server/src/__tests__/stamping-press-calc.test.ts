import { describe, it, expect } from "vitest";
import {
  speed, force, precision, flexibility,
  spCost, servoControl, forHighVolume, drive,
  bestUse, stampingPressTypes,
} from "../stamping-press-calc.js";

describe("speed", () => {
  it("mechanical crank fastest", () => {
    expect(speed("mechanical_crank_flywheel")).toBeGreaterThan(speed("hydraulic_deep_draw"));
  });
});

describe("force", () => {
  it("hydraulic deep draw highest force", () => {
    expect(force("hydraulic_deep_draw")).toBeGreaterThan(force("progressive_die_coil_fed"));
  });
});

describe("precision", () => {
  it("servo mechanical most precise", () => {
    expect(precision("servo_mechanical_flex")).toBeGreaterThan(precision("mechanical_crank_flywheel"));
  });
});

describe("flexibility", () => {
  it("servo mechanical most flexible", () => {
    expect(flexibility("servo_mechanical_flex")).toBeGreaterThan(flexibility("progressive_die_coil_fed"));
  });
});

describe("spCost", () => {
  it("servo mechanical most expensive", () => {
    expect(spCost("servo_mechanical_flex")).toBeGreaterThan(spCost("mechanical_crank_flywheel"));
  });
});

describe("servoControl", () => {
  it("servo mechanical has servo", () => {
    expect(servoControl("servo_mechanical_flex")).toBe(true);
  });
  it("mechanical crank no servo", () => {
    expect(servoControl("mechanical_crank_flywheel")).toBe(false);
  });
});

describe("forHighVolume", () => {
  it("progressive die for high volume", () => {
    expect(forHighVolume("progressive_die_coil_fed")).toBe(true);
  });
  it("hydraulic not for high volume", () => {
    expect(forHighVolume("hydraulic_deep_draw")).toBe(false);
  });
});

describe("drive", () => {
  it("transfer press uses multi station bar", () => {
    expect(drive("transfer_press_multi_die")).toBe("multi_station_transfer_bar");
  });
});

describe("bestUse", () => {
  it("progressive die for connector terminal", () => {
    expect(bestUse("progressive_die_coil_fed")).toBe("connector_terminal_spring_clip");
  });
});

describe("stampingPressTypes", () => {
  it("returns 5 types", () => {
    expect(stampingPressTypes()).toHaveLength(5);
  });
});
