import { describe, it, expect } from "vitest";
import {
  dryTimeHours, flexibility, waterResistance,
  pigmentLoad, yellowing, rewettable,
  bestSurface, archivalQuality, costPerLiter, paintBinders,
} from "../paint-binder-calc.js";

describe("dryTimeHours", () => {
  it("linseed oil dries slowest", () => {
    expect(dryTimeHours("linseed_oil")).toBeGreaterThan(
      dryTimeHours("gum_arabic")
    );
  });
});

describe("flexibility", () => {
  it("acrylic polymer is most flexible", () => {
    expect(flexibility("acrylic_polymer")).toBeGreaterThan(
      flexibility("casein")
    );
  });
});

describe("waterResistance", () => {
  it("linseed oil is most water resistant", () => {
    expect(waterResistance("linseed_oil")).toBeGreaterThan(
      waterResistance("gum_arabic")
    );
  });
});

describe("pigmentLoad", () => {
  it("acrylic polymer holds most pigment", () => {
    expect(pigmentLoad("acrylic_polymer")).toBeGreaterThan(
      pigmentLoad("casein")
    );
  });
});

describe("yellowing", () => {
  it("linseed oil yellows most", () => {
    expect(yellowing("linseed_oil")).toBeGreaterThan(
      yellowing("acrylic_polymer")
    );
  });
});

describe("rewettable", () => {
  it("gum arabic is rewettable", () => {
    expect(rewettable("gum_arabic")).toBe(true);
  });
  it("linseed oil is not rewettable", () => {
    expect(rewettable("linseed_oil")).toBe(false);
  });
});

describe("bestSurface", () => {
  it("egg yolk best on wood panel", () => {
    expect(bestSurface("egg_yolk")).toBe("wood_panel");
  });
});

describe("archivalQuality", () => {
  it("linseed oil is most archival", () => {
    expect(archivalQuality("linseed_oil")).toBeGreaterThan(
      archivalQuality("casein")
    );
  });
});

describe("costPerLiter", () => {
  it("gum arabic costs most", () => {
    expect(costPerLiter("gum_arabic")).toBeGreaterThan(
      costPerLiter("egg_yolk")
    );
  });
});

describe("paintBinders", () => {
  it("returns 5 binders", () => {
    expect(paintBinders()).toHaveLength(5);
  });
});
