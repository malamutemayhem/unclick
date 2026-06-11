import { describe, it, expect } from "vitest";
import {
  markDistinct, controlPlace, repeatConsist, colorRange,
  smokeCost, metallic, organic, markSource,
  bestUse, smokeFires,
} from "../smoke-fire-calc.js";

describe("markDistinct", () => {
  it("horsehair mark line most distinct mark", () => {
    expect(markDistinct("horsehair_mark_line")).toBeGreaterThan(markDistinct("salt_crystal_bloom"));
  });
});

describe("controlPlace", () => {
  it("copper wire flash best control placement", () => {
    expect(controlPlace("copper_wire_flash")).toBeGreaterThan(controlPlace("salt_crystal_bloom"));
  });
});

describe("repeatConsist", () => {
  it("copper wire flash most consistent repeat", () => {
    expect(repeatConsist("copper_wire_flash")).toBeGreaterThan(repeatConsist("feather_mark_fine"));
  });
});

describe("colorRange", () => {
  it("copper wire flash widest color range", () => {
    expect(colorRange("copper_wire_flash")).toBeGreaterThan(colorRange("sugar_fumed_dark"));
  });
});

describe("smokeCost", () => {
  it("copper wire flash most expensive", () => {
    expect(smokeCost("copper_wire_flash")).toBeGreaterThan(smokeCost("sugar_fumed_dark"));
  });
});

describe("metallic", () => {
  it("copper wire flash is metallic", () => {
    expect(metallic("copper_wire_flash")).toBe(true);
  });
  it("horsehair mark line not metallic", () => {
    expect(metallic("horsehair_mark_line")).toBe(false);
  });
});

describe("organic", () => {
  it("horsehair mark line is organic", () => {
    expect(organic("horsehair_mark_line")).toBe(true);
  });
  it("copper wire flash not organic", () => {
    expect(organic("copper_wire_flash")).toBe(false);
  });
});

describe("markSource", () => {
  it("copper wire flash uses copper oxide flash", () => {
    expect(markSource("copper_wire_flash")).toBe("copper_oxide_flash");
  });
});

describe("bestUse", () => {
  it("horsehair mark line best for fine line pattern", () => {
    expect(bestUse("horsehair_mark_line")).toBe("fine_line_pattern");
  });
});

describe("smokeFires", () => {
  it("returns 5 types", () => {
    expect(smokeFires()).toHaveLength(5);
  });
});
