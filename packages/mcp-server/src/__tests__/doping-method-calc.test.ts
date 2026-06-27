import { describe, it, expect } from "vitest";
import {
  precision, uniformity, depth, throughput,
  dopeCost, lowDamage, forAdvNode, mechanism,
  bestUse, dopingMethods,
} from "../doping-method-calc.js";

describe("precision", () => {
  it("ion implant beam most precise", () => {
    expect(precision("ion_implant_beam")).toBeGreaterThan(precision("solid_source_diffusion"));
  });
});

describe("uniformity", () => {
  it("ion implant beam best uniformity", () => {
    expect(uniformity("ion_implant_beam")).toBeGreaterThan(uniformity("solid_source_diffusion"));
  });
});

describe("depth", () => {
  it("solid source diffusion deepest", () => {
    expect(depth("solid_source_diffusion")).toBeGreaterThan(depth("molecular_beam_delta"));
  });
});

describe("throughput", () => {
  it("plasma immersion highest throughput", () => {
    expect(throughput("plasma_immersion")).toBeGreaterThan(throughput("molecular_beam_delta"));
  });
});

describe("dopeCost", () => {
  it("molecular beam delta most expensive", () => {
    expect(dopeCost("molecular_beam_delta")).toBeGreaterThan(dopeCost("solid_source_diffusion"));
  });
});

describe("lowDamage", () => {
  it("solid source diffusion is low damage", () => {
    expect(lowDamage("solid_source_diffusion")).toBe(true);
  });
  it("ion implant beam not low damage", () => {
    expect(lowDamage("ion_implant_beam")).toBe(false);
  });
});

describe("forAdvNode", () => {
  it("ion implant beam for advanced node", () => {
    expect(forAdvNode("ion_implant_beam")).toBe(true);
  });
  it("solid source diffusion not for advanced node", () => {
    expect(forAdvNode("solid_source_diffusion")).toBe(false);
  });
});

describe("mechanism", () => {
  it("molecular beam delta uses mbe monolayer spike", () => {
    expect(mechanism("molecular_beam_delta")).toBe("mbe_monolayer_spike");
  });
});

describe("bestUse", () => {
  it("plasma immersion best for conformal 3d finfet dope", () => {
    expect(bestUse("plasma_immersion")).toBe("conformal_3d_finfet_dope");
  });
});

describe("dopingMethods", () => {
  it("returns 5 types", () => {
    expect(dopingMethods()).toHaveLength(5);
  });
});
