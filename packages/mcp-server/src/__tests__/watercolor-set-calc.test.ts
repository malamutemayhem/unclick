import { describe, it, expect } from "vitest";
import {
  pigmentIntensity, transparency, mixability, portability,
  setCost, lightfast, rewettable, paintForm,
  bestStyle, watercolorSets,
} from "../watercolor-set-calc.js";

describe("pigmentIntensity", () => {
  it("tube professional large most intense", () => {
    expect(pigmentIntensity("tube_professional_large")).toBeGreaterThan(pigmentIntensity("watercolor_pencil_dual"));
  });
});

describe("transparency", () => {
  it("tube professional large most transparent", () => {
    expect(transparency("tube_professional_large")).toBeGreaterThan(transparency("gouache_opaque_set"));
  });
});

describe("mixability", () => {
  it("tube professional large most mixable", () => {
    expect(mixability("tube_professional_large")).toBeGreaterThan(mixability("watercolor_pencil_dual"));
  });
});

describe("portability", () => {
  it("pan travel compact most portable", () => {
    expect(portability("pan_travel_compact")).toBeGreaterThan(portability("tube_professional_large"));
  });
});

describe("setCost", () => {
  it("tube professional large most expensive", () => {
    expect(setCost("tube_professional_large")).toBeGreaterThan(setCost("watercolor_pencil_dual"));
  });
});

describe("lightfast", () => {
  it("tube professional large is lightfast", () => {
    expect(lightfast("tube_professional_large")).toBe(true);
  });
  it("liquid concentrate dropper is not", () => {
    expect(lightfast("liquid_concentrate_dropper")).toBe(false);
  });
});

describe("rewettable", () => {
  it("pan travel compact is rewettable", () => {
    expect(rewettable("pan_travel_compact")).toBe(true);
  });
  it("gouache opaque set is not", () => {
    expect(rewettable("gouache_opaque_set")).toBe(false);
  });
});

describe("paintForm", () => {
  it("liquid concentrate dropper uses fluid liquid bottle", () => {
    expect(paintForm("liquid_concentrate_dropper")).toBe("fluid_liquid_bottle");
  });
});

describe("bestStyle", () => {
  it("pan travel compact best for plein air field sketch", () => {
    expect(bestStyle("pan_travel_compact")).toBe("plein_air_field_sketch");
  });
});

describe("watercolorSets", () => {
  it("returns 5 types", () => {
    expect(watercolorSets()).toHaveLength(5);
  });
});
