import { describe, it, expect } from "vitest";
import {
  seamFlat, speedWork, controlGuide, fabricRange,
  rubberCost, heated, nonStick, surfaceType,
  bestUse, seamRubbers,
} from "../seam-rubber-calc.js";

describe("seamFlat", () => {
  it("heated rubber set flattest seam", () => {
    expect(seamFlat("heated_rubber_set")).toBeGreaterThan(seamFlat("round_rubber_crease"));
  });
});

describe("speedWork", () => {
  it("teflon rubber slide fastest work", () => {
    expect(speedWork("teflon_rubber_slide")).toBeGreaterThan(speedWork("grooved_rubber_guide"));
  });
});

describe("controlGuide", () => {
  it("grooved rubber guide best control guide", () => {
    expect(controlGuide("grooved_rubber_guide")).toBeGreaterThan(controlGuide("heated_rubber_set"));
  });
});

describe("fabricRange", () => {
  it("flat rubber standard widest fabric range", () => {
    expect(fabricRange("flat_rubber_standard")).toBeGreaterThan(fabricRange("round_rubber_crease"));
  });
});

describe("rubberCost", () => {
  it("heated rubber set most expensive", () => {
    expect(rubberCost("heated_rubber_set")).toBeGreaterThan(rubberCost("flat_rubber_standard"));
  });
});

describe("heated", () => {
  it("heated rubber set is heated", () => {
    expect(heated("heated_rubber_set")).toBe(true);
  });
  it("flat rubber standard not heated", () => {
    expect(heated("flat_rubber_standard")).toBe(false);
  });
});

describe("nonStick", () => {
  it("teflon rubber slide is non stick", () => {
    expect(nonStick("teflon_rubber_slide")).toBe(true);
  });
  it("flat rubber standard not non stick", () => {
    expect(nonStick("flat_rubber_standard")).toBe(false);
  });
});

describe("surfaceType", () => {
  it("grooved rubber guide uses grooved track face", () => {
    expect(surfaceType("grooved_rubber_guide")).toBe("grooved_track_face");
  });
});

describe("bestUse", () => {
  it("flat rubber standard best for general seam flatten", () => {
    expect(bestUse("flat_rubber_standard")).toBe("general_seam_flatten");
  });
});

describe("seamRubbers", () => {
  it("returns 5 types", () => {
    expect(seamRubbers()).toHaveLength(5);
  });
});
