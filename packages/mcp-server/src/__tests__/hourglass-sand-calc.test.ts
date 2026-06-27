import { describe, it, expect } from "vitest";
import {
  flowConsistency, grainSizeUniformity, humiditySensitivity,
  wearResistance, colorRichness, magnetic,
  naturallyOccurring, bestTimerDuration, costPerKg, hourglassSands,
} from "../hourglass-sand-calc.js";

describe("flowConsistency", () => {
  it("garnet flows most consistently", () => {
    expect(flowConsistency("garnet")).toBeGreaterThan(
      flowConsistency("crushed_shell")
    );
  });
});

describe("grainSizeUniformity", () => {
  it("garnet has most uniform grains", () => {
    expect(grainSizeUniformity("garnet")).toBeGreaterThan(
      grainSizeUniformity("crushed_shell")
    );
  });
});

describe("humiditySensitivity", () => {
  it("iron filings are most humidity sensitive", () => {
    expect(humiditySensitivity("iron_filings")).toBeGreaterThan(
      humiditySensitivity("garnet")
    );
  });
});

describe("wearResistance", () => {
  it("garnet resists wear best", () => {
    expect(wearResistance("garnet")).toBeGreaterThan(
      wearResistance("crushed_shell")
    );
  });
});

describe("colorRichness", () => {
  it("garnet is most colorful", () => {
    expect(colorRichness("garnet")).toBeGreaterThan(
      colorRichness("silica")
    );
  });
});

describe("magnetic", () => {
  it("iron filings are magnetic", () => {
    expect(magnetic("iron_filings")).toBe(true);
  });
  it("silica is not", () => {
    expect(magnetic("silica")).toBe(false);
  });
});

describe("naturallyOccurring", () => {
  it("silica occurs naturally", () => {
    expect(naturallyOccurring("silica")).toBe(true);
  });
  it("iron filings do not", () => {
    expect(naturallyOccurring("iron_filings")).toBe(false);
  });
});

describe("bestTimerDuration", () => {
  it("silica best for one hour", () => {
    expect(bestTimerDuration("silica")).toBe("one_hour");
  });
});

describe("costPerKg", () => {
  it("garnet costs most", () => {
    expect(costPerKg("garnet")).toBeGreaterThan(
      costPerKg("crushed_shell")
    );
  });
});

describe("hourglassSands", () => {
  it("returns 5 sands", () => {
    expect(hourglassSands()).toHaveLength(5);
  });
});
