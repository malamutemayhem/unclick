import { describe, it, expect } from "vitest";
import {
  editionSize, detailFineness, colorLayering,
  setupComplexity, reproducibility, reliefProcess,
  usesAcid, surfaceMaterial, famousPractitioner, printmakingTypes,
} from "../printmaking-type-calc.js";

describe("editionSize", () => {
  it("screen print largest edition", () => {
    expect(editionSize("screen_print")).toBeGreaterThan(
      editionSize("etching")
    );
  });
});

describe("detailFineness", () => {
  it("etching finest detail", () => {
    expect(detailFineness("etching")).toBeGreaterThan(
      detailFineness("linocut")
    );
  });
});

describe("colorLayering", () => {
  it("screen print best color layering", () => {
    expect(colorLayering("screen_print")).toBeGreaterThan(
      colorLayering("etching")
    );
  });
});

describe("setupComplexity", () => {
  it("etching most complex setup", () => {
    expect(setupComplexity("etching")).toBeGreaterThan(
      setupComplexity("linocut")
    );
  });
});

describe("reproducibility", () => {
  it("screen print most reproducible", () => {
    expect(reproducibility("screen_print")).toBeGreaterThan(
      reproducibility("etching")
    );
  });
});

describe("reliefProcess", () => {
  it("woodcut is relief", () => {
    expect(reliefProcess("woodcut")).toBe(true);
  });
  it("etching is not", () => {
    expect(reliefProcess("etching")).toBe(false);
  });
});

describe("usesAcid", () => {
  it("etching uses acid", () => {
    expect(usesAcid("etching")).toBe(true);
  });
  it("woodcut does not", () => {
    expect(usesAcid("woodcut")).toBe(false);
  });
});

describe("surfaceMaterial", () => {
  it("lithography uses limestone", () => {
    expect(surfaceMaterial("lithography")).toBe("limestone");
  });
});

describe("famousPractitioner", () => {
  it("screen print practitioner is warhol", () => {
    expect(famousPractitioner("screen_print")).toBe("warhol");
  });
});

describe("printmakingTypes", () => {
  it("returns 5 types", () => {
    expect(printmakingTypes()).toHaveLength(5);
  });
});
