import { describe, it, expect } from "vitest";
import {
  ignitionEfficiency, longevity, coldStartPerformance, fuelEconomy,
  plugCost, wasteSparkOk, preGapped, electrodeMaterial,
  bestEngine, sparkPlugs,
} from "../spark-plug-calc.js";

describe("ignitionEfficiency", () => {
  it("iridium fine wire most efficient ignition", () => {
    expect(ignitionEfficiency("iridium_fine_wire")).toBeGreaterThan(ignitionEfficiency("copper_core_standard"));
  });
});

describe("longevity", () => {
  it("ruthenium hk performance longest lasting", () => {
    expect(longevity("ruthenium_hk_performance")).toBeGreaterThan(longevity("copper_core_standard"));
  });
});

describe("coldStartPerformance", () => {
  it("ruthenium hk performance best cold start", () => {
    expect(coldStartPerformance("ruthenium_hk_performance")).toBeGreaterThan(coldStartPerformance("double_platinum_long"));
  });
});

describe("fuelEconomy", () => {
  it("ruthenium hk performance best fuel economy", () => {
    expect(fuelEconomy("ruthenium_hk_performance")).toBeGreaterThan(fuelEconomy("copper_core_standard"));
  });
});

describe("plugCost", () => {
  it("ruthenium hk performance most expensive", () => {
    expect(plugCost("ruthenium_hk_performance")).toBeGreaterThan(plugCost("copper_core_standard"));
  });
});

describe("wasteSparkOk", () => {
  it("double platinum long supports waste spark", () => {
    expect(wasteSparkOk("double_platinum_long")).toBe(true);
  });
  it("copper core standard does not", () => {
    expect(wasteSparkOk("copper_core_standard")).toBe(false);
  });
});

describe("preGapped", () => {
  it("iridium fine wire is pre gapped", () => {
    expect(preGapped("iridium_fine_wire")).toBe(true);
  });
  it("copper core standard is not", () => {
    expect(preGapped("copper_core_standard")).toBe(false);
  });
});

describe("electrodeMaterial", () => {
  it("iridium fine wire uses iridium fine tip", () => {
    expect(electrodeMaterial("iridium_fine_wire")).toBe("iridium_fine_tip_0_6mm");
  });
});

describe("bestEngine", () => {
  it("double platinum long best for waste spark ignition", () => {
    expect(bestEngine("double_platinum_long")).toBe("waste_spark_ignition");
  });
});

describe("sparkPlugs", () => {
  it("returns 5 types", () => {
    expect(sparkPlugs()).toHaveLength(5);
  });
});
