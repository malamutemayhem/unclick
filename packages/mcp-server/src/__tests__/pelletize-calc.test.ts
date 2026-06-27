import { describe, it, expect } from "vitest";
import {
  uniformity, throughput, strength, sizeControl,
  plCost, continuous, forIronOre, binder,
  bestUse, pelletizeTypes,
} from "../pelletize-calc.js";

describe("uniformity", () => {
  it("extrusion die highest uniformity", () => {
    expect(uniformity("extrusion_pellet_die")).toBeGreaterThan(uniformity("drum_pelletizer_rotary"));
  });
});

describe("throughput", () => {
  it("drum pelletizer highest throughput", () => {
    expect(throughput("drum_pelletizer_rotary")).toBeGreaterThan(throughput("fluid_bed_pellet_coat"));
  });
});

describe("strength", () => {
  it("extrusion die high strength", () => {
    expect(strength("extrusion_pellet_die")).toBeGreaterThan(strength("spray_congeal_prilling"));
  });
});

describe("sizeControl", () => {
  it("extrusion die best size control", () => {
    expect(sizeControl("extrusion_pellet_die")).toBeGreaterThan(sizeControl("drum_pelletizer_rotary"));
  });
});

describe("plCost", () => {
  it("fluid bed most expensive", () => {
    expect(plCost("fluid_bed_pellet_coat")).toBeGreaterThan(plCost("drum_pelletizer_rotary"));
  });
});

describe("continuous", () => {
  it("disc pelletizer is continuous", () => {
    expect(continuous("disc_pelletizer_balling")).toBe(true);
  });
  it("fluid bed not continuous", () => {
    expect(continuous("fluid_bed_pellet_coat")).toBe(false);
  });
});

describe("forIronOre", () => {
  it("disc pelletizer for iron ore", () => {
    expect(forIronOre("disc_pelletizer_balling")).toBe(true);
  });
  it("extrusion die not for iron ore", () => {
    expect(forIronOre("extrusion_pellet_die")).toBe(false);
  });
});

describe("binder", () => {
  it("disc pelletizer uses bentonite water", () => {
    expect(binder("disc_pelletizer_balling")).toBe("bentonite_water_nucleation_disc");
  });
});

describe("bestUse", () => {
  it("extrusion for pharma catalyst feed", () => {
    expect(bestUse("extrusion_pellet_die")).toBe("pharma_catalyst_feed_pellet_uniform");
  });
});

describe("pelletizeTypes", () => {
  it("returns 5 types", () => {
    expect(pelletizeTypes()).toHaveLength(5);
  });
});
