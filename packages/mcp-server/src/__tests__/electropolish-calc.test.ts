import { describe, it, expect } from "vitest";
import {
  smoothness, speed, uniformity, passivation,
  epCost, noAcid, forImplant, electrolyte,
  bestUse, electropolishTypes,
} from "../electropolish-calc.js";

describe("smoothness", () => {
  it("rack immersion smoothest", () => {
    expect(smoothness("rack_immersion_batch")).toBeGreaterThan(smoothness("drum_tumble_small_part"));
  });
});

describe("speed", () => {
  it("spot weld fastest", () => {
    expect(speed("spot_weld_localized")).toBeGreaterThan(speed("dry_electropolish_zero_waste"));
  });
});

describe("uniformity", () => {
  it("flow cell most uniform", () => {
    expect(uniformity("flow_cell_tube_pipe")).toBeGreaterThan(uniformity("spot_weld_localized"));
  });
});

describe("passivation", () => {
  it("dry electropolish best passivation", () => {
    expect(passivation("dry_electropolish_zero_waste")).toBeGreaterThan(passivation("drum_tumble_small_part"));
  });
});

describe("epCost", () => {
  it("dry electropolish most expensive", () => {
    expect(epCost("dry_electropolish_zero_waste")).toBeGreaterThan(epCost("drum_tumble_small_part"));
  });
});

describe("noAcid", () => {
  it("dry electropolish is acid-free", () => {
    expect(noAcid("dry_electropolish_zero_waste")).toBe(true);
  });
  it("rack immersion not acid-free", () => {
    expect(noAcid("rack_immersion_batch")).toBe(false);
  });
});

describe("forImplant", () => {
  it("rack immersion for implants", () => {
    expect(forImplant("rack_immersion_batch")).toBe(true);
  });
  it("drum tumble not for implants", () => {
    expect(forImplant("drum_tumble_small_part")).toBe(false);
  });
});

describe("electrolyte", () => {
  it("dry electropolish uses solid body ion exchange", () => {
    expect(electrolyte("dry_electropolish_zero_waste")).toBe("solid_body_particle_ion_exchange");
  });
});

describe("bestUse", () => {
  it("flow cell for sanitary tube bioprocess", () => {
    expect(bestUse("flow_cell_tube_pipe")).toBe("sanitary_tube_bpe_bioprocess");
  });
});

describe("electropolishTypes", () => {
  it("returns 5 types", () => {
    expect(electropolishTypes()).toHaveLength(5);
  });
});
