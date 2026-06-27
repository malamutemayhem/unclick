import { describe, it, expect } from "vitest";
import {
  workSurface, pinHold, portability, stability,
  pillowCost, rotatable, forContinuous, pillowFill,
  bestUse, lacePillows,
} from "../lace-pillow-calc.js";

describe("workSurface", () => {
  it("dome mushroom raised best work surface", () => {
    expect(workSurface("dome_mushroom_raised")).toBeGreaterThan(workSurface("travel_foam_portable"));
  });
});

describe("pinHold", () => {
  it("block polystyrene firm best pin hold", () => {
    expect(pinHold("block_polystyrene_firm")).toBeGreaterThan(pinHold("travel_foam_portable"));
  });
});

describe("portability", () => {
  it("travel foam portable most portable", () => {
    expect(portability("travel_foam_portable")).toBeGreaterThan(portability("dome_mushroom_raised"));
  });
});

describe("stability", () => {
  it("dome mushroom raised most stable", () => {
    expect(stability("dome_mushroom_raised")).toBeGreaterThan(stability("travel_foam_portable"));
  });
});

describe("pillowCost", () => {
  it("dome mushroom raised most expensive", () => {
    expect(pillowCost("dome_mushroom_raised")).toBeGreaterThan(pillowCost("block_polystyrene_firm"));
  });
});

describe("rotatable", () => {
  it("flat cookie round is rotatable", () => {
    expect(rotatable("flat_cookie_round")).toBe(true);
  });
  it("block polystyrene firm not rotatable", () => {
    expect(rotatable("block_polystyrene_firm")).toBe(false);
  });
});

describe("forContinuous", () => {
  it("bolster roll long for continuous", () => {
    expect(forContinuous("bolster_roll_long")).toBe(true);
  });
  it("flat cookie round not for continuous", () => {
    expect(forContinuous("flat_cookie_round")).toBe(false);
  });
});

describe("pillowFill", () => {
  it("flat cookie round uses sawdust packed firm", () => {
    expect(pillowFill("flat_cookie_round")).toBe("sawdust_packed_firm");
  });
});

describe("bestUse", () => {
  it("dome mushroom raised best for honiton raised work", () => {
    expect(bestUse("dome_mushroom_raised")).toBe("honiton_raised_work");
  });
});

describe("lacePillows", () => {
  it("returns 5 types", () => {
    expect(lacePillows()).toHaveLength(5);
  });
});
