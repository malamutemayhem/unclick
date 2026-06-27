import { describe, it, expect } from "vitest";
import {
  surfaceAccuracy, throughput, shapeRange, scratchDig,
  lgCost, automated, forAspheric, grinderConfig,
  bestUse, lensGrinderTypes,
} from "../lens-grinder-calc.js";

describe("surfaceAccuracy", () => {
  it("freeform grind best surface accuracy", () => {
    expect(surfaceAccuracy("freeform_grind")).toBeGreaterThan(surfaceAccuracy("conventional_grind"));
  });
});

describe("throughput", () => {
  it("cnc generator highest throughput", () => {
    expect(throughput("cnc_generator")).toBeGreaterThan(throughput("mrf_polish"));
  });
});

describe("shapeRange", () => {
  it("freeform grind widest shape range", () => {
    expect(shapeRange("freeform_grind")).toBeGreaterThan(shapeRange("conventional_grind"));
  });
});

describe("scratchDig", () => {
  it("diamond turning best scratch dig", () => {
    expect(scratchDig("diamond_turning")).toBeGreaterThan(scratchDig("conventional_grind"));
  });
});

describe("lgCost", () => {
  it("diamond turning most expensive", () => {
    expect(lgCost("diamond_turning")).toBeGreaterThan(lgCost("conventional_grind"));
  });
});

describe("automated", () => {
  it("cnc generator is automated", () => {
    expect(automated("cnc_generator")).toBe(true);
  });
  it("conventional grind not automated", () => {
    expect(automated("conventional_grind")).toBe(false);
  });
});

describe("forAspheric", () => {
  it("freeform grind for aspheric", () => {
    expect(forAspheric("freeform_grind")).toBe(true);
  });
  it("conventional grind not for aspheric", () => {
    expect(forAspheric("conventional_grind")).toBe(false);
  });
});

describe("grinderConfig", () => {
  it("mrf polish uses magnetorheological fluid jet sub nanometer", () => {
    expect(grinderConfig("mrf_polish")).toBe("mrf_lens_polisher_magnetorheological_fluid_jet_sub_nanometer");
  });
});

describe("bestUse", () => {
  it("diamond turning for ir optics spdt metal mirror aspheric", () => {
    expect(bestUse("diamond_turning")).toBe("ir_optics_diamond_turning_machine_spdt_metal_mirror_aspheric");
  });
});

describe("lensGrinderTypes", () => {
  it("returns 5 types", () => {
    expect(lensGrinderTypes()).toHaveLength(5);
  });
});
