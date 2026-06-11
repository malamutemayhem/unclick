import { describe, it, expect } from "vitest";
import {
  efficiency, torqueCapacity, speed, noise,
  grCost, selfLocking, forPrecision, mesh,
  bestUse, gearTypes,
} from "../gear-type-calc.js";

describe("efficiency", () => {
  it("spur most efficient", () => {
    expect(efficiency("spur_parallel_axis")).toBeGreaterThan(efficiency("worm_right_angle"));
  });
});

describe("torqueCapacity", () => {
  it("planetary highest torque", () => {
    expect(torqueCapacity("planetary_epicyclic")).toBeGreaterThan(torqueCapacity("spur_parallel_axis"));
  });
});

describe("speed", () => {
  it("helical fastest", () => {
    expect(speed("helical_angled_tooth")).toBeGreaterThan(speed("worm_right_angle"));
  });
});

describe("noise", () => {
  it("helical quietest", () => {
    expect(noise("helical_angled_tooth")).toBeGreaterThan(noise("spur_parallel_axis"));
  });
});

describe("grCost", () => {
  it("planetary most expensive", () => {
    expect(grCost("planetary_epicyclic")).toBeGreaterThan(grCost("spur_parallel_axis"));
  });
});

describe("selfLocking", () => {
  it("worm is self locking", () => {
    expect(selfLocking("worm_right_angle")).toBe(true);
  });
  it("spur not self locking", () => {
    expect(selfLocking("spur_parallel_axis")).toBe(false);
  });
});

describe("forPrecision", () => {
  it("planetary for precision", () => {
    expect(forPrecision("planetary_epicyclic")).toBe(true);
  });
  it("spur not for precision", () => {
    expect(forPrecision("spur_parallel_axis")).toBe(false);
  });
});

describe("mesh", () => {
  it("planetary uses sun planet ring compound", () => {
    expect(mesh("planetary_epicyclic")).toBe("sun_planet_ring_compound");
  });
});

describe("bestUse", () => {
  it("worm best for elevator hoist", () => {
    expect(bestUse("worm_right_angle")).toBe("elevator_hoist_irreversible");
  });
});

describe("gearTypes", () => {
  it("returns 5 types", () => {
    expect(gearTypes()).toHaveLength(5);
  });
});
