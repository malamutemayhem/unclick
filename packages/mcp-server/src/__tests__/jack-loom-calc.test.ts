import { describe, it, expect } from "vitest";
import {
  shedClean, setupEase, patternRange, spaceCompact,
  loomCost, computerized, folding, liftMethod,
  bestUse, jackLooms,
} from "../jack-loom-calc.js";

describe("shedClean", () => {
  it("computer dobby auto cleanest shed", () => {
    expect(shedClean("computer_dobby_auto")).toBeGreaterThan(shedClean("table_jack_compact"));
  });
});

describe("setupEase", () => {
  it("spring return easy easiest setup", () => {
    expect(setupEase("spring_return_easy")).toBeGreaterThan(setupEase("computer_dobby_auto"));
  });
});

describe("patternRange", () => {
  it("computer dobby auto widest pattern range", () => {
    expect(patternRange("computer_dobby_auto")).toBeGreaterThan(patternRange("table_jack_compact"));
  });
});

describe("spaceCompact", () => {
  it("folding jack portable most compact", () => {
    expect(spaceCompact("folding_jack_portable")).toBeGreaterThan(spaceCompact("floor_jack_standard"));
  });
});

describe("loomCost", () => {
  it("computer dobby auto most expensive", () => {
    expect(loomCost("computer_dobby_auto")).toBeGreaterThan(loomCost("floor_jack_standard"));
  });
});

describe("computerized", () => {
  it("computer dobby auto is computerized", () => {
    expect(computerized("computer_dobby_auto")).toBe(true);
  });
  it("floor jack standard not computerized", () => {
    expect(computerized("floor_jack_standard")).toBe(false);
  });
});

describe("folding", () => {
  it("folding jack portable is folding", () => {
    expect(folding("folding_jack_portable")).toBe(true);
  });
  it("floor jack standard not folding", () => {
    expect(folding("floor_jack_standard")).toBe(false);
  });
});

describe("liftMethod", () => {
  it("computer dobby auto uses solenoid shaft lift", () => {
    expect(liftMethod("computer_dobby_auto")).toBe("solenoid_shaft_lift");
  });
});

describe("bestUse", () => {
  it("floor jack standard best for general floor weave", () => {
    expect(bestUse("floor_jack_standard")).toBe("general_floor_weave");
  });
});

describe("jackLooms", () => {
  it("returns 5 types", () => {
    expect(jackLooms()).toHaveLength(5);
  });
});
