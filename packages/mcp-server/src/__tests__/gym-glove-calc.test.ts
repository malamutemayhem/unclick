import { describe, it, expect } from "vitest";
import {
  gripStrength, palmProtect, breathability, wristSupport,
  gloveCost, machineWashable, hasWristWrap, palmMaterial,
  bestWorkout, gymGloves,
} from "../gym-glove-calc.js";

describe("gripStrength", () => {
  it("fingerless leather classic best grip", () => {
    expect(gripStrength("fingerless_leather_classic")).toBeGreaterThan(gripStrength("grip_pad_minimalist"));
  });
});

describe("palmProtect", () => {
  it("full finger padded most palm protection", () => {
    expect(palmProtect("full_finger_padded")).toBeGreaterThan(palmProtect("grip_pad_minimalist"));
  });
});

describe("breathability", () => {
  it("grip pad minimalist most breathable", () => {
    expect(breathability("grip_pad_minimalist")).toBeGreaterThan(breathability("full_finger_padded"));
  });
});

describe("wristSupport", () => {
  it("wrist wrap integrated most wrist support", () => {
    expect(wristSupport("wrist_wrap_integrated")).toBeGreaterThan(wristSupport("grip_pad_minimalist"));
  });
});

describe("gloveCost", () => {
  it("wrist wrap integrated most expensive", () => {
    expect(gloveCost("wrist_wrap_integrated")).toBeGreaterThan(gloveCost("grip_pad_minimalist"));
  });
});

describe("machineWashable", () => {
  it("full finger padded is machine washable", () => {
    expect(machineWashable("full_finger_padded")).toBe(true);
  });
  it("fingerless leather classic is not machine washable", () => {
    expect(machineWashable("fingerless_leather_classic")).toBe(false);
  });
});

describe("hasWristWrap", () => {
  it("wrist wrap integrated has wrist wrap", () => {
    expect(hasWristWrap("wrist_wrap_integrated")).toBe(true);
  });
  it("full finger padded has no wrist wrap", () => {
    expect(hasWristWrap("full_finger_padded")).toBe(false);
  });
});

describe("palmMaterial", () => {
  it("fingerless leather classic uses genuine cowhide leather", () => {
    expect(palmMaterial("fingerless_leather_classic")).toBe("genuine_cowhide_leather");
  });
});

describe("bestWorkout", () => {
  it("crossfit pull up guard best for kipping muscle up", () => {
    expect(bestWorkout("crossfit_pull_up_guard")).toBe("kipping_muscle_up");
  });
});

describe("gymGloves", () => {
  it("returns 5 types", () => {
    expect(gymGloves()).toHaveLength(5);
  });
});
