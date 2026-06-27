import { describe, it, expect } from "vitest";
import {
  nibbleClean, controlFine, glassRange, comfortGrip,
  plierCost, springAction, forDetail, noseProfile,
  bestUse, grozPliers,
} from "../groz-plier-calc.js";

describe("nibbleClean", () => {
  it("narrow nose detail cleanest nibble", () => {
    expect(nibbleClean("narrow_nose_detail")).toBeGreaterThan(nibbleClean("wide_jaw_grip"));
  });
});

describe("controlFine", () => {
  it("narrow nose detail finest control", () => {
    expect(controlFine("narrow_nose_detail")).toBeGreaterThan(controlFine("wide_jaw_grip"));
  });
});

describe("glassRange", () => {
  it("wide jaw grip widest glass range", () => {
    expect(glassRange("wide_jaw_grip")).toBeGreaterThan(glassRange("narrow_nose_detail"));
  });
});

describe("comfortGrip", () => {
  it("spring action easy most comfortable grip", () => {
    expect(comfortGrip("spring_action_easy")).toBeGreaterThan(comfortGrip("narrow_nose_detail"));
  });
});

describe("plierCost", () => {
  it("spring action easy most expensive", () => {
    expect(plierCost("spring_action_easy")).toBeGreaterThan(plierCost("flat_nose_standard"));
  });
});

describe("springAction", () => {
  it("spring action easy has spring action", () => {
    expect(springAction("spring_action_easy")).toBe(true);
  });
  it("flat nose standard no spring action", () => {
    expect(springAction("flat_nose_standard")).toBe(false);
  });
});

describe("forDetail", () => {
  it("narrow nose detail is for detail", () => {
    expect(forDetail("narrow_nose_detail")).toBe(true);
  });
  it("flat nose standard not for detail", () => {
    expect(forDetail("flat_nose_standard")).toBe(false);
  });
});

describe("noseProfile", () => {
  it("curved nose contour uses curved smooth nose", () => {
    expect(noseProfile("curved_nose_contour")).toBe("curved_smooth_nose");
  });
});

describe("bestUse", () => {
  it("flat nose standard best for general glass groze", () => {
    expect(bestUse("flat_nose_standard")).toBe("general_glass_groze");
  });
});

describe("grozPliers", () => {
  it("returns 5 types", () => {
    expect(grozPliers()).toHaveLength(5);
  });
});
