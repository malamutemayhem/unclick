import { describe, it, expect } from "vitest";
import {
  tuningStability, speedOfUse, pressureControl, fretBuzz,
  capoCost, oneHandOperate, partialCapo, clampStyle,
  bestGuitar, capos,
} from "../capo-calc.js";

describe("tuningStability", () => {
  it("screw adjust best tuning stability", () => {
    expect(tuningStability("screw_adjust")).toBeGreaterThan(tuningStability("spring_trigger"));
  });
});

describe("speedOfUse", () => {
  it("spring trigger fastest to use", () => {
    expect(speedOfUse("spring_trigger")).toBeGreaterThan(speedOfUse("screw_adjust"));
  });
});

describe("pressureControl", () => {
  it("screw adjust best pressure control", () => {
    expect(pressureControl("screw_adjust")).toBeGreaterThan(pressureControl("spring_trigger"));
  });
});

describe("fretBuzz", () => {
  it("screw adjust least fret buzz", () => {
    expect(fretBuzz("screw_adjust")).toBeGreaterThan(fretBuzz("spring_trigger"));
  });
});

describe("capoCost", () => {
  it("partial drop most expensive", () => {
    expect(capoCost("partial_drop")).toBeGreaterThan(capoCost("spring_trigger"));
  });
});

describe("oneHandOperate", () => {
  it("spring trigger is one hand operate", () => {
    expect(oneHandOperate("spring_trigger")).toBe(true);
  });
  it("screw adjust is not", () => {
    expect(oneHandOperate("screw_adjust")).toBe(false);
  });
});

describe("partialCapo", () => {
  it("partial drop is partial capo", () => {
    expect(partialCapo("partial_drop")).toBe(true);
  });
  it("spring trigger is not", () => {
    expect(partialCapo("spring_trigger")).toBe(false);
  });
});

describe("clampStyle", () => {
  it("shubb roller uses lever roller slide", () => {
    expect(clampStyle("shubb_roller")).toBe("lever_roller_slide");
  });
});

describe("bestGuitar", () => {
  it("partial drop for open tuning creative", () => {
    expect(bestGuitar("partial_drop")).toBe("open_tuning_creative");
  });
});

describe("capos", () => {
  it("returns 5 types", () => {
    expect(capos()).toHaveLength(5);
  });
});
