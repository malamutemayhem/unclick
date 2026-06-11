import { describe, it, expect } from "vitest";
import {
  waveResist, stability, lifespan, scourProtect,
  swCost, flexible, forUrban, material,
  bestUse, seawallTypes,
} from "../seawall-type-calc.js";

describe("waveResist", () => {
  it("gravity concrete best wave resist", () => {
    expect(waveResist("gravity_concrete_mass")).toBeGreaterThan(waveResist("gabion_basket_wire_rock"));
  });
});

describe("stability", () => {
  it("gravity most stable", () => {
    expect(stability("gravity_concrete_mass")).toBeGreaterThan(stability("cantilever_sheet_pile"));
  });
});

describe("lifespan", () => {
  it("gravity longest lifespan", () => {
    expect(lifespan("gravity_concrete_mass")).toBeGreaterThan(lifespan("gabion_basket_wire_rock"));
  });
});

describe("scourProtect", () => {
  it("revetment best scour protection", () => {
    expect(scourProtect("revetment_riprap_slope")).toBeGreaterThan(scourProtect("cantilever_sheet_pile"));
  });
});

describe("swCost", () => {
  it("gravity most expensive", () => {
    expect(swCost("gravity_concrete_mass")).toBeGreaterThan(swCost("gabion_basket_wire_rock"));
  });
});

describe("flexible", () => {
  it("gabion is flexible", () => {
    expect(flexible("gabion_basket_wire_rock")).toBe(true);
  });
  it("gravity not flexible", () => {
    expect(flexible("gravity_concrete_mass")).toBe(false);
  });
});

describe("forUrban", () => {
  it("gravity for urban", () => {
    expect(forUrban("gravity_concrete_mass")).toBe(true);
  });
  it("revetment not for urban", () => {
    expect(forUrban("revetment_riprap_slope")).toBe(false);
  });
});

describe("material", () => {
  it("gabion uses wire mesh basket", () => {
    expect(material("gabion_basket_wire_rock")).toBe("wire_mesh_basket_filled_stone");
  });
});

describe("bestUse", () => {
  it("gravity for urban waterfront", () => {
    expect(bestUse("gravity_concrete_mass")).toBe("urban_waterfront_promenade");
  });
});

describe("seawallTypes", () => {
  it("returns 5 types", () => {
    expect(seawallTypes()).toHaveLength(5);
  });
});
