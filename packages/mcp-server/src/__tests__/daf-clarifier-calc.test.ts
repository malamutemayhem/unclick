import { describe, it, expect } from "vitest";
import {
  removal, throughput, footprint, chemical,
  daCost, pressurized, forOily, mechanism,
  bestUse, dafClarifierTypes,
} from "../daf-clarifier-calc.js";

describe("removal", () => {
  it("plate pack lamella best removal", () => {
    expect(removal("plate_pack_lamella")).toBeGreaterThan(removal("induced_air_rotor"));
  });
});

describe("throughput", () => {
  it("circular scraper highest throughput", () => {
    expect(throughput("circular_scraper_daf")).toBeGreaterThan(throughput("full_flow_pressurize"));
  });
});

describe("footprint", () => {
  it("plate pack lamella smallest footprint (highest score)", () => {
    expect(footprint("plate_pack_lamella")).toBeGreaterThan(footprint("circular_scraper_daf"));
  });
});

describe("chemical", () => {
  it("plate pack lamella highest chemical use", () => {
    expect(chemical("plate_pack_lamella")).toBeGreaterThan(chemical("induced_air_rotor"));
  });
});

describe("daCost", () => {
  it("plate pack lamella most expensive", () => {
    expect(daCost("plate_pack_lamella")).toBeGreaterThan(daCost("induced_air_rotor"));
  });
});

describe("pressurized", () => {
  it("full flow is pressurized", () => {
    expect(pressurized("full_flow_pressurize")).toBe(true);
  });
  it("induced air not pressurized", () => {
    expect(pressurized("induced_air_rotor")).toBe(false);
  });
});

describe("forOily", () => {
  it("induced air for oily water", () => {
    expect(forOily("induced_air_rotor")).toBe(true);
  });
  it("plate pack lamella not for oily", () => {
    expect(forOily("plate_pack_lamella")).toBe(false);
  });
});

describe("mechanism", () => {
  it("induced air uses rotor induce", () => {
    expect(mechanism("induced_air_rotor")).toBe("rotor_induce_air_bubble_no_compressor");
  });
});

describe("bestUse", () => {
  it("plate pack lamella for compact retrofit", () => {
    expect(bestUse("plate_pack_lamella")).toBe("high_rate_compact_retrofit_space_limit");
  });
});

describe("dafClarifierTypes", () => {
  it("returns 5 types", () => {
    expect(dafClarifierTypes()).toHaveLength(5);
  });
});
