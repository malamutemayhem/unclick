import { describe, it, expect } from "vitest";
import {
  capacity, comfort, noise, energy,
  cbCost, ventilated, forPerimeter, induction,
  bestUse, chilledBeamTypes,
} from "../chilled-beam-calc.js";

describe("capacity", () => {
  it("4 pipe highest capacity", () => {
    expect(capacity("active_induction_4_pipe")).toBeGreaterThan(capacity("passive_chilled_ceiling"));
  });
});

describe("comfort", () => {
  it("radiant slab best comfort", () => {
    expect(comfort("radiant_chilled_slab")).toBeGreaterThan(comfort("active_induction_2_pipe"));
  });
});

describe("noise", () => {
  it("passive quietest", () => {
    expect(noise("passive_chilled_ceiling")).toBeGreaterThan(noise("active_induction_4_pipe"));
  });
});

describe("energy", () => {
  it("radiant slab best energy", () => {
    expect(energy("radiant_chilled_slab")).toBeGreaterThan(energy("active_induction_4_pipe"));
  });
});

describe("cbCost", () => {
  it("multi service most expensive", () => {
    expect(cbCost("multi_service_chilled_beam")).toBeGreaterThan(cbCost("passive_chilled_ceiling"));
  });
});

describe("ventilated", () => {
  it("active 2 pipe is ventilated", () => {
    expect(ventilated("active_induction_2_pipe")).toBe(true);
  });
  it("passive not ventilated", () => {
    expect(ventilated("passive_chilled_ceiling")).toBe(false);
  });
});

describe("forPerimeter", () => {
  it("4 pipe for perimeter", () => {
    expect(forPerimeter("active_induction_4_pipe")).toBe(true);
  });
  it("passive not perimeter", () => {
    expect(forPerimeter("passive_chilled_ceiling")).toBe(false);
  });
});

describe("induction", () => {
  it("radiant uses embedded pex", () => {
    expect(induction("radiant_chilled_slab")).toBe("embedded_pex_slab_radiant_cool");
  });
});

describe("bestUse", () => {
  it("passive for interior zone", () => {
    expect(bestUse("passive_chilled_ceiling")).toBe("interior_zone_low_load_office");
  });
});

describe("chilledBeamTypes", () => {
  it("returns 5 types", () => {
    expect(chilledBeamTypes()).toHaveLength(5);
  });
});
