import { describe, it, expect } from "vitest";
import {
  biasStability, angleRandom, bandwidth, scaleFactor,
  gyroCost, triaxial, forTactical, principle,
  bestUse, memsGyros,
} from "../mems-gyro-calc.js";

describe("biasStability", () => {
  it("fog fiber optic best bias stability", () => {
    expect(biasStability("fog_fiber_optic")).toBeGreaterThan(biasStability("tuning_fork_vibrating"));
  });
});

describe("angleRandom", () => {
  it("fog fiber optic best angle random walk", () => {
    expect(angleRandom("fog_fiber_optic")).toBeGreaterThan(angleRandom("tuning_fork_vibrating"));
  });
});

describe("bandwidth", () => {
  it("mems rlg solid state widest bandwidth", () => {
    expect(bandwidth("mems_rlg_solid_state")).toBeGreaterThan(bandwidth("hemispherical_wine_glass"));
  });
});

describe("scaleFactor", () => {
  it("fog fiber optic best scale factor", () => {
    expect(scaleFactor("fog_fiber_optic")).toBeGreaterThan(scaleFactor("tuning_fork_vibrating"));
  });
});

describe("gyroCost", () => {
  it("fog fiber optic most expensive", () => {
    expect(gyroCost("fog_fiber_optic")).toBeGreaterThan(gyroCost("tuning_fork_vibrating"));
  });
});

describe("triaxial", () => {
  it("tuning fork vibrating is triaxial", () => {
    expect(triaxial("tuning_fork_vibrating")).toBe(true);
  });
  it("fog fiber optic not triaxial", () => {
    expect(triaxial("fog_fiber_optic")).toBe(false);
  });
});

describe("forTactical", () => {
  it("hemispherical wine glass for tactical", () => {
    expect(forTactical("hemispherical_wine_glass")).toBe(true);
  });
  it("tuning fork vibrating not for tactical", () => {
    expect(forTactical("tuning_fork_vibrating")).toBe(false);
  });
});

describe("principle", () => {
  it("fog fiber optic uses sagnac fiber coil interferom", () => {
    expect(principle("fog_fiber_optic")).toBe("sagnac_fiber_coil_interferom");
  });
});

describe("bestUse", () => {
  it("hemispherical wine glass best for spacecraft attitude hold", () => {
    expect(bestUse("hemispherical_wine_glass")).toBe("spacecraft_attitude_hold");
  });
});

describe("memsGyros", () => {
  it("returns 5 types", () => {
    expect(memsGyros()).toHaveLength(5);
  });
});
