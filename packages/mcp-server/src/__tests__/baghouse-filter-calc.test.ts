import { describe, it, expect } from "vitest";
import {
  efficiency, airVolume, pressureDrop, bagLife,
  bhCost, continuous, forHighTemp, media,
  bestUse, baghouseFilterTypes,
} from "../baghouse-filter-calc.js";

describe("efficiency", () => {
  it("pulse jet highest efficiency", () => {
    expect(efficiency("pulse_jet")).toBeGreaterThan(efficiency("shaker"));
  });
});

describe("airVolume", () => {
  it("pulse jet highest air volume", () => {
    expect(airVolume("pulse_jet")).toBeGreaterThan(airVolume("shaker"));
  });
});

describe("pressureDrop", () => {
  it("cartridge collector best pressure drop control", () => {
    expect(pressureDrop("cartridge_collector")).toBeGreaterThan(pressureDrop("shaker"));
  });
});

describe("bagLife", () => {
  it("reverse air longest bag life", () => {
    expect(bagLife("reverse_air")).toBeGreaterThan(bagLife("shaker"));
  });
});

describe("bhCost", () => {
  it("cartridge collector most expensive", () => {
    expect(bhCost("cartridge_collector")).toBeGreaterThan(bhCost("shaker"));
  });
});

describe("continuous", () => {
  it("pulse jet is continuous", () => {
    expect(continuous("pulse_jet")).toBe(true);
  });
  it("shaker not continuous", () => {
    expect(continuous("shaker")).toBe(false);
  });
});

describe("forHighTemp", () => {
  it("pulse jet for high temp", () => {
    expect(forHighTemp("pulse_jet")).toBe(true);
  });
  it("shaker not for high temp", () => {
    expect(forHighTemp("shaker")).toBe(false);
  });
});

describe("media", () => {
  it("cartridge collector uses pleated cellulose", () => {
    expect(media("cartridge_collector")).toBe("pleated_cellulose_polyester_cartridge_high_surface_area");
  });
});

describe("bestUse", () => {
  it("shaker for woodworking grain handling", () => {
    expect(bestUse("shaker")).toBe("woodworking_grain_handling_light_dust_batch_process_older");
  });
});

describe("baghouseFilterTypes", () => {
  it("returns 5 types", () => {
    expect(baghouseFilterTypes()).toHaveLength(5);
  });
});
