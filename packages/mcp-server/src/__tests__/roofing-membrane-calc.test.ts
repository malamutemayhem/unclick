import { describe, it, expect } from "vitest";
import {
  durability, uvResist, puncture, flexibility,
  rmCost, heatWeldable, forFlat, seam,
  bestUse, roofingMembraneTypes,
} from "../roofing-membrane-calc.js";

describe("durability", () => {
  it("epdm most durable", () => {
    expect(durability("epdm_rubber_synthetic_sheet")).toBeGreaterThan(durability("tpo_thermoplastic_polyolefin"));
  });
});

describe("uvResist", () => {
  it("tpo best uv resistance", () => {
    expect(uvResist("tpo_thermoplastic_polyolefin")).toBeGreaterThan(uvResist("built_up_bur_hot_asphalt"));
  });
});

describe("puncture", () => {
  it("bur best puncture resist", () => {
    expect(puncture("built_up_bur_hot_asphalt")).toBeGreaterThan(puncture("epdm_rubber_synthetic_sheet"));
  });
});

describe("flexibility", () => {
  it("epdm most flexible", () => {
    expect(flexibility("epdm_rubber_synthetic_sheet")).toBeGreaterThan(flexibility("built_up_bur_hot_asphalt"));
  });
});

describe("rmCost", () => {
  it("bur most expensive", () => {
    expect(rmCost("built_up_bur_hot_asphalt")).toBeGreaterThan(rmCost("epdm_rubber_synthetic_sheet"));
  });
});

describe("heatWeldable", () => {
  it("tpo is heat weldable", () => {
    expect(heatWeldable("tpo_thermoplastic_polyolefin")).toBe(true);
  });
  it("epdm not heat weldable", () => {
    expect(heatWeldable("epdm_rubber_synthetic_sheet")).toBe(false);
  });
});

describe("forFlat", () => {
  it("all for flat roof", () => {
    expect(forFlat("pvc_polyvinyl_chloride_sheet")).toBe(true);
  });
});

describe("seam", () => {
  it("epdm uses adhesive tape", () => {
    expect(seam("epdm_rubber_synthetic_sheet")).toBe("adhesive_tape_seam_rubber_bond");
  });
});

describe("bestUse", () => {
  it("tpo for commercial cool roof", () => {
    expect(bestUse("tpo_thermoplastic_polyolefin")).toBe("commercial_flat_roof_energy_cool");
  });
});

describe("roofingMembraneTypes", () => {
  it("returns 5 types", () => {
    expect(roofingMembraneTypes()).toHaveLength(5);
  });
});
