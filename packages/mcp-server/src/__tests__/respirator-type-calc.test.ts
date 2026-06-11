import { describe, it, expect } from "vitest";
import {
  protection, comfort, duration, communication,
  rpCost, powered, forIdlh, filter,
  bestUse, respiratorTypes,
} from "../respirator-type-calc.js";

describe("protection", () => {
  it("scba highest protection", () => {
    expect(protection("scba_self_contained_air")).toBeGreaterThan(protection("disposable_n95_filtering"));
  });
});

describe("comfort", () => {
  it("papr most comfortable", () => {
    expect(comfort("papr_powered_blower")).toBeGreaterThan(comfort("scba_self_contained_air"));
  });
});

describe("duration", () => {
  it("papr longest duration", () => {
    expect(duration("papr_powered_blower")).toBeGreaterThan(duration("disposable_n95_filtering"));
  });
});

describe("communication", () => {
  it("disposable best communication", () => {
    expect(communication("disposable_n95_filtering")).toBeGreaterThan(communication("scba_self_contained_air"));
  });
});

describe("rpCost", () => {
  it("scba most expensive", () => {
    expect(rpCost("scba_self_contained_air")).toBeGreaterThan(rpCost("disposable_n95_filtering"));
  });
});

describe("powered", () => {
  it("papr is powered", () => {
    expect(powered("papr_powered_blower")).toBe(true);
  });
  it("half face not powered", () => {
    expect(powered("half_face_cartridge_reuse")).toBe(false);
  });
});

describe("forIdlh", () => {
  it("scba for idlh", () => {
    expect(forIdlh("scba_self_contained_air")).toBe(true);
  });
  it("papr not for idlh", () => {
    expect(forIdlh("papr_powered_blower")).toBe(false);
  });
});

describe("filter", () => {
  it("scba uses cylinder compressed air", () => {
    expect(filter("scba_self_contained_air")).toBe("cylinder_compressed_air_regulator");
  });
});

describe("bestUse", () => {
  it("disposable for dust mist healthcare", () => {
    expect(bestUse("disposable_n95_filtering")).toBe("dust_mist_healthcare_particle_basic");
  });
});

describe("respiratorTypes", () => {
  it("returns 5 types", () => {
    expect(respiratorTypes()).toHaveLength(5);
  });
});
