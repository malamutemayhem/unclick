import { describe, it, expect } from "vitest";
import {
  runSurface, noiseLevel, pawSafety, cleanability,
  wheelCost, freestanding, chewResistant, spinMechanism,
  bestPet, hamsterWheels,
} from "../hamster-wheel-calc.js";

describe("runSurface", () => {
  it("wood cork natural best run surface", () => {
    expect(runSurface("wood_cork_natural")).toBeGreaterThan(runSurface("wire_mesh_open"));
  });
});

describe("noiseLevel", () => {
  it("wire mesh open noisiest", () => {
    expect(noiseLevel("wire_mesh_open")).toBeGreaterThan(noiseLevel("silent_spinner"));
  });
});

describe("pawSafety", () => {
  it("flying saucer safest paws", () => {
    expect(pawSafety("flying_saucer")).toBeGreaterThan(pawSafety("wire_mesh_open"));
  });
});

describe("cleanability", () => {
  it("flying saucer easiest to clean", () => {
    expect(cleanability("flying_saucer")).toBeGreaterThan(cleanability("wood_cork_natural"));
  });
});

describe("wheelCost", () => {
  it("wood cork natural most expensive", () => {
    expect(wheelCost("wood_cork_natural")).toBeGreaterThan(wheelCost("wire_mesh_open"));
  });
});

describe("freestanding", () => {
  it("solid plastic is freestanding", () => {
    expect(freestanding("solid_plastic")).toBe(true);
  });
  it("wire mesh open is not", () => {
    expect(freestanding("wire_mesh_open")).toBe(false);
  });
});

describe("chewResistant", () => {
  it("wire mesh open is chew resistant", () => {
    expect(chewResistant("wire_mesh_open")).toBe(true);
  });
  it("solid plastic is not", () => {
    expect(chewResistant("solid_plastic")).toBe(false);
  });
});

describe("spinMechanism", () => {
  it("silent spinner uses ball bearing sealed", () => {
    expect(spinMechanism("silent_spinner")).toBe("ball_bearing_sealed");
  });
});

describe("bestPet", () => {
  it("silent spinner for bedroom quiet night", () => {
    expect(bestPet("silent_spinner")).toBe("bedroom_quiet_night");
  });
});

describe("hamsterWheels", () => {
  it("returns 5 types", () => {
    expect(hamsterWheels()).toHaveLength(5);
  });
});
