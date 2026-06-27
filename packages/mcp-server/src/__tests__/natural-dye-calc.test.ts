import { describe, it, expect } from "vitest";
import {
  colorProduced, mordantRequired, dyeRatioPercent, simmertimMinutes,
  maxTempCelsius, lightfastness, washfastness, exhaustsCompletely,
  costPerKg, naturalDyeSources,
} from "../natural-dye-calc.js";

describe("colorProduced", () => {
  it("madder produces red", () => {
    expect(colorProduced("madder")).toBe("red");
  });
});

describe("mordantRequired", () => {
  it("madder needs mordant", () => {
    expect(mordantRequired("madder")).toBe(true);
  });
  it("walnut does not need mordant", () => {
    expect(mordantRequired("walnut")).toBe(false);
  });
});

describe("dyeRatioPercent", () => {
  it("marigold needs highest ratio", () => {
    expect(dyeRatioPercent("marigold")).toBeGreaterThan(
      dyeRatioPercent("madder")
    );
  });
});

describe("simmertimMinutes", () => {
  it("walnut simmers longest", () => {
    expect(simmertimMinutes("walnut")).toBeGreaterThan(
      simmertimMinutes("marigold")
    );
  });
});

describe("maxTempCelsius", () => {
  it("walnut uses highest temp", () => {
    expect(maxTempCelsius("walnut")).toBeGreaterThan(
      maxTempCelsius("madder")
    );
  });
});

describe("lightfastness", () => {
  it("walnut is most lightfast", () => {
    expect(lightfastness("walnut")).toBeGreaterThan(
      lightfastness("marigold")
    );
  });
});

describe("washfastness", () => {
  it("walnut is most washfast", () => {
    expect(washfastness("walnut")).toBeGreaterThan(
      washfastness("marigold")
    );
  });
});

describe("exhaustsCompletely", () => {
  it("madder exhausts completely", () => {
    expect(exhaustsCompletely("madder")).toBe(true);
  });
  it("weld does not exhaust completely", () => {
    expect(exhaustsCompletely("weld")).toBe(false);
  });
});

describe("costPerKg", () => {
  it("madder is most expensive", () => {
    expect(costPerKg("madder")).toBeGreaterThan(costPerKg("walnut"));
  });
});

describe("naturalDyeSources", () => {
  it("returns 5 sources", () => {
    expect(naturalDyeSources()).toHaveLength(5);
  });
});
