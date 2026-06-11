import { describe, it, expect } from "vitest";
import {
  loadCapacity, abrasionResist, inclination, maintenance,
  ccCost, enclosed, forHotMaterial, chain,
  bestUse, chainConveyorTypes,
} from "../chain-conveyor-calc.js";

describe("loadCapacity", () => {
  it("apron pan highest load capacity", () => {
    expect(loadCapacity("apron_pan_heavy_duty")).toBeGreaterThan(loadCapacity("tubular_drag_enclosed"));
  });
});

describe("abrasionResist", () => {
  it("apron pan best abrasion resistance", () => {
    expect(abrasionResist("apron_pan_heavy_duty")).toBeGreaterThan(abrasionResist("overhead_trolley_chain"));
  });
});

describe("inclination", () => {
  it("tubular drag best inclination", () => {
    expect(inclination("tubular_drag_enclosed")).toBeGreaterThan(inclination("scraper_chain_bottom"));
  });
});

describe("maintenance", () => {
  it("tubular drag lowest maintenance", () => {
    expect(maintenance("tubular_drag_enclosed")).toBeGreaterThan(maintenance("apron_pan_heavy_duty"));
  });
});

describe("ccCost", () => {
  it("apron pan most expensive", () => {
    expect(ccCost("apron_pan_heavy_duty")).toBeGreaterThan(ccCost("scraper_chain_bottom"));
  });
});

describe("enclosed", () => {
  it("tubular drag is enclosed", () => {
    expect(enclosed("tubular_drag_enclosed")).toBe(true);
  });
  it("scraper chain not enclosed", () => {
    expect(enclosed("scraper_chain_bottom")).toBe(false);
  });
});

describe("forHotMaterial", () => {
  it("scraper chain for hot material", () => {
    expect(forHotMaterial("scraper_chain_bottom")).toBe(true);
  });
  it("tubular drag not for hot material", () => {
    expect(forHotMaterial("tubular_drag_enclosed")).toBe(false);
  });
});

describe("chain", () => {
  it("overhead trolley uses i beam track", () => {
    expect(chain("overhead_trolley_chain")).toBe("overhead_i_beam_track_trolley_pendant_carrier");
  });
});

describe("bestUse", () => {
  it("tubular drag for food pharma", () => {
    expect(bestUse("tubular_drag_enclosed")).toBe("food_pharma_chemical_dust_free_multi_direction");
  });
});

describe("chainConveyorTypes", () => {
  it("returns 5 types", () => {
    expect(chainConveyorTypes()).toHaveLength(5);
  });
});
