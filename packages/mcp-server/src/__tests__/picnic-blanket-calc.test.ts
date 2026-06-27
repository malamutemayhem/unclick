import { describe, it, expect } from "vitest";
import {
  comfort, waterResist, packSize, cleanEase,
  blanketCost, machineWash, sandResist, topFabric,
  bestOuting, picnicBlankets,
} from "../picnic-blanket-calc.js";

describe("comfort", () => {
  it("padded quilted thick most comfortable", () => {
    expect(comfort("padded_quilted_thick")).toBeGreaterThan(comfort("straw_roll_up_beach"));
  });
});

describe("waterResist", () => {
  it("fleece waterproof back best water resistance", () => {
    expect(waterResist("fleece_waterproof_back")).toBeGreaterThan(waterResist("woven_cotton_classic"));
  });
});

describe("packSize", () => {
  it("nylon ultralight camp smallest pack size", () => {
    expect(packSize("nylon_ultralight_camp")).toBeGreaterThan(packSize("padded_quilted_thick"));
  });
});

describe("cleanEase", () => {
  it("nylon ultralight camp easiest to clean", () => {
    expect(cleanEase("nylon_ultralight_camp")).toBeGreaterThan(cleanEase("padded_quilted_thick"));
  });
});

describe("blanketCost", () => {
  it("padded quilted thick most expensive", () => {
    expect(blanketCost("padded_quilted_thick")).toBeGreaterThan(blanketCost("straw_roll_up_beach"));
  });
});

describe("machineWash", () => {
  it("fleece waterproof back is machine washable", () => {
    expect(machineWash("fleece_waterproof_back")).toBe(true);
  });
  it("straw roll up beach is not", () => {
    expect(machineWash("straw_roll_up_beach")).toBe(false);
  });
});

describe("sandResist", () => {
  it("straw roll up beach resists sand", () => {
    expect(sandResist("straw_roll_up_beach")).toBe(true);
  });
  it("fleece waterproof back does not", () => {
    expect(sandResist("fleece_waterproof_back")).toBe(false);
  });
});

describe("topFabric", () => {
  it("woven cotton classic uses herringbone cotton woven", () => {
    expect(topFabric("woven_cotton_classic")).toBe("herringbone_cotton_woven");
  });
});

describe("bestOuting", () => {
  it("straw roll up beach best for sandy beach lakeside", () => {
    expect(bestOuting("straw_roll_up_beach")).toBe("sandy_beach_lakeside");
  });
});

describe("picnicBlankets", () => {
  it("returns 5 types", () => {
    expect(picnicBlankets()).toHaveLength(5);
  });
});
