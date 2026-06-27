import { describe, it, expect } from "vitest";
import {
  sublimRate, quality, scalability, uniformity,
  fdCost, batch, forPharma, chamber,
  bestUse, freezeDryTypes,
} from "../freeze-dry-calc.js";

describe("sublimRate", () => {
  it("spray freeze highest sublimation rate", () => {
    expect(sublimRate("spray_freeze_particle")).toBeGreaterThan(sublimRate("manifold_flask_lab"));
  });
});

describe("quality", () => {
  it("shelf batch pharma best quality", () => {
    expect(quality("shelf_batch_pharma")).toBeGreaterThan(quality("atmospheric_freeze_belt"));
  });
});

describe("scalability", () => {
  it("atmospheric freeze belt most scalable", () => {
    expect(scalability("atmospheric_freeze_belt")).toBeGreaterThan(scalability("manifold_flask_lab"));
  });
});

describe("uniformity", () => {
  it("shelf batch pharma best uniformity", () => {
    expect(uniformity("shelf_batch_pharma")).toBeGreaterThan(uniformity("manifold_flask_lab"));
  });
});

describe("fdCost", () => {
  it("spray freeze most expensive", () => {
    expect(fdCost("spray_freeze_particle")).toBeGreaterThan(fdCost("manifold_flask_lab"));
  });
});

describe("batch", () => {
  it("shelf batch pharma is batch", () => {
    expect(batch("shelf_batch_pharma")).toBe(true);
  });
  it("rotary freeze bulk not batch", () => {
    expect(batch("rotary_freeze_bulk")).toBe(false);
  });
});

describe("forPharma", () => {
  it("shelf batch pharma for pharma", () => {
    expect(forPharma("shelf_batch_pharma")).toBe(true);
  });
  it("atmospheric belt not for pharma", () => {
    expect(forPharma("atmospheric_freeze_belt")).toBe(false);
  });
});

describe("chamber", () => {
  it("manifold flask uses manifold port", () => {
    expect(chamber("manifold_flask_lab")).toBe("manifold_port_flask_shell_freeze");
  });
});

describe("bestUse", () => {
  it("spray freeze for nanoparticle inhale dose", () => {
    expect(bestUse("spray_freeze_particle")).toBe("nanoparticle_inhale_dose_powder");
  });
});

describe("freezeDryTypes", () => {
  it("returns 5 types", () => {
    expect(freezeDryTypes()).toHaveLength(5);
  });
});
