import { describe, it, expect } from "vitest";
import {
  colorPenetration, patternControl, colorfastness,
  skillRequired, batchSize, usesWax,
  resistTechnique, culturalOrigin, waterUsageLiters, dyeingMethods,
} from "../dyeing-method-calc.js";

describe("colorPenetration", () => {
  it("immersion has deepest penetration", () => {
    expect(colorPenetration("immersion")).toBeGreaterThan(
      colorPenetration("screen_print")
    );
  });
});

describe("patternControl", () => {
  it("screen print has best control", () => {
    expect(patternControl("screen_print")).toBeGreaterThan(
      patternControl("immersion")
    );
  });
});

describe("colorfastness", () => {
  it("immersion is most colorfast", () => {
    expect(colorfastness("immersion")).toBeGreaterThan(
      colorfastness("tie_dye")
    );
  });
});

describe("skillRequired", () => {
  it("batik requires most skill", () => {
    expect(skillRequired("batik")).toBeGreaterThan(
      skillRequired("tie_dye")
    );
  });
});

describe("batchSize", () => {
  it("immersion handles largest batches", () => {
    expect(batchSize("immersion")).toBeGreaterThan(
      batchSize("batik")
    );
  });
});

describe("usesWax", () => {
  it("batik uses wax", () => {
    expect(usesWax("batik")).toBe(true);
  });
  it("tie dye does not", () => {
    expect(usesWax("tie_dye")).toBe(false);
  });
});

describe("resistTechnique", () => {
  it("shibori is resist technique", () => {
    expect(resistTechnique("shibori")).toBe(true);
  });
  it("immersion is not", () => {
    expect(resistTechnique("immersion")).toBe(false);
  });
});

describe("culturalOrigin", () => {
  it("batik from indonesia", () => {
    expect(culturalOrigin("batik")).toBe("indonesia");
  });
});

describe("waterUsageLiters", () => {
  it("immersion uses most water", () => {
    expect(waterUsageLiters("immersion")).toBeGreaterThan(
      waterUsageLiters("screen_print")
    );
  });
});

describe("dyeingMethods", () => {
  it("returns 5 types", () => {
    expect(dyeingMethods()).toHaveLength(5);
  });
});
