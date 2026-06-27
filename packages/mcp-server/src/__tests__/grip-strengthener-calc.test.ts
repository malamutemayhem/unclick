import { describe, it, expect } from "vitest";
import {
  crushStrength, fingerIsolation, rehabSafe, portability,
  gripCost, adjustableResist, worksExtensors, resistSource,
  bestGoal, gripStrengtheners,
} from "../grip-strengthener-calc.js";

describe("crushStrength", () => {
  it("adjustable dial resistance most crush strength", () => {
    expect(crushStrength("adjustable_dial_resistance")).toBeGreaterThan(crushStrength("putty_therapy_squeeze"));
  });
});

describe("fingerIsolation", () => {
  it("finger band extensor best finger isolation", () => {
    expect(fingerIsolation("finger_band_extensor")).toBeGreaterThan(fingerIsolation("spring_coil_hand_grip"));
  });
});

describe("rehabSafe", () => {
  it("putty therapy squeeze most rehab safe", () => {
    expect(rehabSafe("putty_therapy_squeeze")).toBeGreaterThan(rehabSafe("spring_coil_hand_grip"));
  });
});

describe("portability", () => {
  it("finger band extensor most portable", () => {
    expect(portability("finger_band_extensor")).toBeGreaterThan(portability("putty_therapy_squeeze"));
  });
});

describe("gripCost", () => {
  it("adjustable dial resistance more expensive than spring coil", () => {
    expect(gripCost("adjustable_dial_resistance")).toBeGreaterThan(gripCost("spring_coil_hand_grip"));
  });
});

describe("adjustableResist", () => {
  it("adjustable dial resistance has adjustable resist", () => {
    expect(adjustableResist("adjustable_dial_resistance")).toBe(true);
  });
  it("spring coil hand grip has no adjustable resist", () => {
    expect(adjustableResist("spring_coil_hand_grip")).toBe(false);
  });
});

describe("worksExtensors", () => {
  it("finger band extensor works extensors", () => {
    expect(worksExtensors("finger_band_extensor")).toBe(true);
  });
  it("spring coil hand grip does not work extensors", () => {
    expect(worksExtensors("spring_coil_hand_grip")).toBe(false);
  });
});

describe("resistSource", () => {
  it("gyroscope ball spin uses gyroscopic rotor spin", () => {
    expect(resistSource("gyroscope_ball_spin")).toBe("gyroscopic_rotor_spin");
  });
});

describe("bestGoal", () => {
  it("finger band extensor best for climber tendon balance", () => {
    expect(bestGoal("finger_band_extensor")).toBe("climber_tendon_balance");
  });
});

describe("gripStrengtheners", () => {
  it("returns 5 types", () => {
    expect(gripStrengtheners()).toHaveLength(5);
  });
});
