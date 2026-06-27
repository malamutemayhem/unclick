import { describe, it, expect } from "vitest";
import {
  moistureRemoval, energyUse, coldPerformance, noiseOutput,
  purchasePrice, portable, requiresDrain, operatingPrinciple,
  idealSpace, dehumidifierTypes,
} from "../dehumidifier-type-calc.js";

describe("moistureRemoval", () => {
  it("whole house best moisture removal", () => {
    expect(moistureRemoval("whole_house")).toBeGreaterThan(moistureRemoval("peltier"));
  });
});

describe("energyUse", () => {
  it("desiccant most energy", () => {
    expect(energyUse("desiccant")).toBeGreaterThan(energyUse("ventilating"));
  });
});

describe("coldPerformance", () => {
  it("desiccant best cold performance", () => {
    expect(coldPerformance("desiccant")).toBeGreaterThan(coldPerformance("compressor"));
  });
});

describe("noiseOutput", () => {
  it("compressor noisiest", () => {
    expect(noiseOutput("compressor")).toBeGreaterThan(noiseOutput("peltier"));
  });
});

describe("purchasePrice", () => {
  it("whole house most expensive", () => {
    expect(purchasePrice("whole_house")).toBeGreaterThan(purchasePrice("peltier"));
  });
});

describe("portable", () => {
  it("compressor is portable", () => {
    expect(portable("compressor")).toBe(true);
  });
  it("whole house is not", () => {
    expect(portable("whole_house")).toBe(false);
  });
});

describe("requiresDrain", () => {
  it("compressor requires drain", () => {
    expect(requiresDrain("compressor")).toBe(true);
  });
  it("desiccant does not", () => {
    expect(requiresDrain("desiccant")).toBe(false);
  });
});

describe("operatingPrinciple", () => {
  it("desiccant uses silica gel absorption", () => {
    expect(operatingPrinciple("desiccant")).toBe("silica_gel_absorption");
  });
});

describe("idealSpace", () => {
  it("peltier for closet small room", () => {
    expect(idealSpace("peltier")).toBe("closet_small_room");
  });
});

describe("dehumidifierTypes", () => {
  it("returns 5 types", () => {
    expect(dehumidifierTypes()).toHaveLength(5);
  });
});
