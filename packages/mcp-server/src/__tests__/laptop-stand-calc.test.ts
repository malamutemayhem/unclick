import { describe, it, expect } from "vitest";
import {
  ergonomicLift, stability, heatDissipation, portability,
  standCost, heightAdjustable, activeCooling, frameMaterial,
  bestSetup, laptopStands,
} from "../laptop-stand-calc.js";

describe("ergonomicLift", () => {
  it("adjustable arm most ergonomic lift", () => {
    expect(ergonomicLift("adjustable_arm")).toBeGreaterThan(ergonomicLift("cooling_fan_base"));
  });
});

describe("stability", () => {
  it("aluminum riser most stable", () => {
    expect(stability("aluminum_riser")).toBeGreaterThan(stability("portable_fold_flat"));
  });
});

describe("heatDissipation", () => {
  it("cooling fan base best heat dissipation", () => {
    expect(heatDissipation("cooling_fan_base")).toBeGreaterThan(heatDissipation("wooden_minimalist"));
  });
});

describe("portability", () => {
  it("portable fold flat most portable", () => {
    expect(portability("portable_fold_flat")).toBeGreaterThan(portability("adjustable_arm"));
  });
});

describe("standCost", () => {
  it("adjustable arm most expensive", () => {
    expect(standCost("adjustable_arm")).toBeGreaterThan(standCost("portable_fold_flat"));
  });
});

describe("heightAdjustable", () => {
  it("adjustable arm is height adjustable", () => {
    expect(heightAdjustable("adjustable_arm")).toBe(true);
  });
  it("aluminum riser is not", () => {
    expect(heightAdjustable("aluminum_riser")).toBe(false);
  });
});

describe("activeCooling", () => {
  it("cooling fan base has active cooling", () => {
    expect(activeCooling("cooling_fan_base")).toBe(true);
  });
  it("wooden minimalist does not", () => {
    expect(activeCooling("wooden_minimalist")).toBe(false);
  });
});

describe("frameMaterial", () => {
  it("wooden minimalist uses bamboo walnut plywood", () => {
    expect(frameMaterial("wooden_minimalist")).toBe("bamboo_walnut_plywood");
  });
});

describe("bestSetup", () => {
  it("portable fold flat for travel cowork nomad", () => {
    expect(bestSetup("portable_fold_flat")).toBe("travel_cowork_nomad");
  });
});

describe("laptopStands", () => {
  it("returns 5 types", () => {
    expect(laptopStands()).toHaveLength(5);
  });
});
