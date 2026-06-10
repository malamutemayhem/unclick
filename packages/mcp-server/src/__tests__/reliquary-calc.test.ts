import { describe, it, expect } from "vitest";
import {
  chamberVolumeCc, glassThicknessMm, sealIntegrity,
  goldLeafSheets, gemstoneCount, filigreeWireM,
  enamelFiringTemp, conservationInterval, insuranceValue,
  relicMaterials,
} from "../reliquary-calc.js";

describe("chamberVolumeCc", () => {
  it("l x w x h", () => {
    expect(chamberVolumeCc(10, 5, 8)).toBe(400);
  });
});

describe("glassThicknessMm", () => {
  it("thicker for large chamber", () => {
    expect(glassThicknessMm(600)).toBeGreaterThan(glassThicknessMm(50));
  });
});

describe("sealIntegrity", () => {
  it("gold highest", () => {
    expect(sealIntegrity(0, "gold")).toBeGreaterThan(sealIntegrity(0, "gilded_wood"));
  });
  it("decreases with age", () => {
    expect(sealIntegrity(100, "gold")).toBeLessThan(sealIntegrity(0, "gold"));
  });
});

describe("goldLeafSheets", () => {
  it("positive sheets", () => {
    expect(goldLeafSheets(500)).toBeGreaterThan(0);
  });
});

describe("gemstoneCount", () => {
  it("positive count", () => {
    expect(gemstoneCount(60, 5)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(gemstoneCount(60, 0)).toBe(0);
  });
});

describe("filigreeWireM", () => {
  it("positive meters", () => {
    expect(filigreeWireM(200, 3)).toBeGreaterThan(0);
  });
});

describe("enamelFiringTemp", () => {
  it("wood = 0 (not enamelable)", () => {
    expect(enamelFiringTemp("gilded_wood")).toBe(0);
  });
  it("gold positive", () => {
    expect(enamelFiringTemp("gold")).toBeGreaterThan(0);
  });
});

describe("conservationInterval", () => {
  it("gold longest", () => {
    expect(conservationInterval("gold")).toBeGreaterThan(conservationInterval("gilded_wood"));
  });
});

describe("insuranceValue", () => {
  it("increases with age", () => {
    expect(insuranceValue("gold", 200)).toBeGreaterThan(insuranceValue("gold", 10));
  });
});

describe("relicMaterials", () => {
  it("returns 5 materials", () => {
    expect(relicMaterials()).toHaveLength(5);
  });
});
