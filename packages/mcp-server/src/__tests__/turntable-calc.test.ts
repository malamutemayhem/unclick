import { describe, it, expect } from "vitest";
import {
  soundFidelity, speedStability, vibrationIsolation, torque,
  tableCost, hasPreamp, djCapable, driveSystem,
  bestUser, turntables,
} from "../turntable-calc.js";

describe("soundFidelity", () => {
  it("belt drive best fidelity", () => {
    expect(soundFidelity("belt_drive")).toBeGreaterThan(soundFidelity("portable_suitcase"));
  });
});

describe("speedStability", () => {
  it("direct drive most stable speed", () => {
    expect(speedStability("direct_drive")).toBeGreaterThan(speedStability("portable_suitcase"));
  });
});

describe("vibrationIsolation", () => {
  it("belt drive best isolation", () => {
    expect(vibrationIsolation("belt_drive")).toBeGreaterThan(vibrationIsolation("portable_suitcase"));
  });
});

describe("torque", () => {
  it("direct drive most torque", () => {
    expect(torque("direct_drive")).toBeGreaterThan(torque("belt_drive"));
  });
});

describe("tableCost", () => {
  it("direct drive most expensive", () => {
    expect(tableCost("direct_drive")).toBeGreaterThan(tableCost("portable_suitcase"));
  });
});

describe("hasPreamp", () => {
  it("usb digital has preamp", () => {
    expect(hasPreamp("usb_digital")).toBe(true);
  });
  it("belt drive does not", () => {
    expect(hasPreamp("belt_drive")).toBe(false);
  });
});

describe("djCapable", () => {
  it("direct drive is dj capable", () => {
    expect(djCapable("direct_drive")).toBe(true);
  });
  it("belt drive is not", () => {
    expect(djCapable("belt_drive")).toBe(false);
  });
});

describe("driveSystem", () => {
  it("direct drive uses quartz locked platter motor", () => {
    expect(driveSystem("direct_drive")).toBe("quartz_locked_platter_motor");
  });
});

describe("bestUser", () => {
  it("usb digital for digitize vinyl collection", () => {
    expect(bestUser("usb_digital")).toBe("digitize_vinyl_collection");
  });
});

describe("turntables", () => {
  it("returns 5 types", () => {
    expect(turntables()).toHaveLength(5);
  });
});
