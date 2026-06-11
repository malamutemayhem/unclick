import { describe, it, expect } from "vitest";
import {
  pelletQuality, throughput, sizeRange, coolingRate,
  plCost, forHighMelt, forMicro, pelletConfig,
  bestUse, pelletizerTypes,
} from "../pelletizer-calc.js";

describe("pelletQuality", () => {
  it("underwater best pellet quality", () => {
    expect(pelletQuality("underwater_pelletizer")).toBeGreaterThan(pelletQuality("hot_face_pelletizer"));
  });
});

describe("throughput", () => {
  it("underwater highest throughput", () => {
    expect(throughput("underwater_pelletizer")).toBeGreaterThan(throughput("drop_pelletizer"));
  });
});

describe("sizeRange", () => {
  it("drop pelletizer best size range", () => {
    expect(sizeRange("drop_pelletizer")).toBeGreaterThan(sizeRange("hot_face_pelletizer"));
  });
});

describe("coolingRate", () => {
  it("underwater best cooling rate", () => {
    expect(coolingRate("underwater_pelletizer")).toBeGreaterThan(coolingRate("hot_face_pelletizer"));
  });
});

describe("plCost", () => {
  it("underwater most expensive", () => {
    expect(plCost("underwater_pelletizer")).toBeGreaterThan(plCost("strand_pelletizer"));
  });
});

describe("forHighMelt", () => {
  it("underwater for high melt", () => {
    expect(forHighMelt("underwater_pelletizer")).toBe(true);
  });
  it("strand not for high melt", () => {
    expect(forHighMelt("strand_pelletizer")).toBe(false);
  });
});

describe("forMicro", () => {
  it("underwater for micro", () => {
    expect(forMicro("underwater_pelletizer")).toBe(true);
  });
  it("strand not for micro", () => {
    expect(forMicro("strand_pelletizer")).toBe(false);
  });
});

describe("pelletConfig", () => {
  it("water ring uses centrifugal cut water cool semi sphere", () => {
    expect(pelletConfig("water_ring_pelletizer")).toBe("water_ring_pelletizer_centrifugal_cut_water_cool_semi_sphere");
  });
});

describe("bestUse", () => {
  it("drop for pastille rotoform belt cool chemical additive", () => {
    expect(bestUse("drop_pelletizer")).toBe("pastille_drop_pelletizer_rotoform_belt_cool_chemical_additive");
  });
});

describe("pelletizerTypes", () => {
  it("returns 5 types", () => {
    expect(pelletizerTypes()).toHaveLength(5);
  });
});
