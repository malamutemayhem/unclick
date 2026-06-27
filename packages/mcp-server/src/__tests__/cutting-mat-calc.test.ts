import { describe, it, expect } from "vitest";
import {
  selfHealing, surfaceSize, gridAccuracy, portability,
  matCost, doubleSided, bladeProtect, matMaterial,
  bestCraft, cuttingMats,
} from "../cutting-mat-calc.js";

describe("selfHealing", () => {
  it("self healing grid best self healing", () => {
    expect(selfHealing("self_healing_grid")).toBeGreaterThan(selfHealing("glass_precision_flat"));
  });
});

describe("surfaceSize", () => {
  it("rotary large format largest surface", () => {
    expect(surfaceSize("rotary_large_format")).toBeGreaterThan(surfaceSize("foldable_travel_small"));
  });
});

describe("gridAccuracy", () => {
  it("glass precision flat most accurate grid", () => {
    expect(gridAccuracy("glass_precision_flat")).toBeGreaterThan(gridAccuracy("foldable_travel_small"));
  });
});

describe("portability", () => {
  it("foldable travel small most portable", () => {
    expect(portability("foldable_travel_small")).toBeGreaterThan(portability("glass_precision_flat"));
  });
});

describe("matCost", () => {
  it("glass precision flat most expensive", () => {
    expect(matCost("glass_precision_flat")).toBeGreaterThan(matCost("foldable_travel_small"));
  });
});

describe("doubleSided", () => {
  it("double sided metric is double sided", () => {
    expect(doubleSided("double_sided_metric")).toBe(true);
  });
  it("self healing grid is not", () => {
    expect(doubleSided("self_healing_grid")).toBe(false);
  });
});

describe("bladeProtect", () => {
  it("self healing grid protects blades", () => {
    expect(bladeProtect("self_healing_grid")).toBe(true);
  });
  it("glass precision flat does not", () => {
    expect(bladeProtect("glass_precision_flat")).toBe(false);
  });
});

describe("matMaterial", () => {
  it("foldable travel small uses polypropylene fold hinge", () => {
    expect(matMaterial("foldable_travel_small")).toBe("polypropylene_fold_hinge");
  });
});

describe("bestCraft", () => {
  it("rotary large format best for quilting large fabric layout", () => {
    expect(bestCraft("rotary_large_format")).toBe("quilting_large_fabric_layout");
  });
});

describe("cuttingMats", () => {
  it("returns 5 types", () => {
    expect(cuttingMats()).toHaveLength(5);
  });
});
