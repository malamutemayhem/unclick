import { describe, it, expect } from "vitest";
import {
  energyEff, recovery, capacity, purity,
  dsCost, thermal, forBrackish, driving,
  bestUse, desalinations,
} from "../desalination-calc.js";

describe("energyEff", () => {
  it("reverse osmosis most energy efficient", () => {
    expect(energyEff("reverse_osmosis_membrane")).toBeGreaterThan(energyEff("multi_stage_flash"));
  });
});

describe("recovery", () => {
  it("electrodialysis highest recovery", () => {
    expect(recovery("electrodialysis_reversal")).toBeGreaterThan(recovery("forward_osmosis_draw"));
  });
});

describe("capacity", () => {
  it("reverse osmosis highest capacity", () => {
    expect(capacity("reverse_osmosis_membrane")).toBeGreaterThan(capacity("forward_osmosis_draw"));
  });
});

describe("purity", () => {
  it("multi effect highest purity", () => {
    expect(purity("multi_effect_distill")).toBeGreaterThan(purity("electrodialysis_reversal"));
  });
});

describe("dsCost", () => {
  it("multi stage flash most expensive", () => {
    expect(dsCost("multi_stage_flash")).toBeGreaterThan(dsCost("reverse_osmosis_membrane"));
  });
});

describe("thermal", () => {
  it("multi stage flash is thermal", () => {
    expect(thermal("multi_stage_flash")).toBe(true);
  });
  it("reverse osmosis not thermal", () => {
    expect(thermal("reverse_osmosis_membrane")).toBe(false);
  });
});

describe("forBrackish", () => {
  it("electrodialysis for brackish", () => {
    expect(forBrackish("electrodialysis_reversal")).toBe(true);
  });
  it("multi stage flash not for brackish", () => {
    expect(forBrackish("multi_stage_flash")).toBe(false);
  });
});

describe("driving", () => {
  it("forward osmosis uses draw solute osmotic gradient", () => {
    expect(driving("forward_osmosis_draw")).toBe("draw_solute_osmotic_gradient");
  });
});

describe("bestUse", () => {
  it("reverse osmosis best for seawater municipal", () => {
    expect(bestUse("reverse_osmosis_membrane")).toBe("seawater_municipal_drinking");
  });
});

describe("desalinations", () => {
  it("returns 5 types", () => {
    expect(desalinations()).toHaveLength(5);
  });
});
