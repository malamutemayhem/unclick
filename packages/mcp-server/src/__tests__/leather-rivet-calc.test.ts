import { describe, it, expect } from "vitest";
import {
  holdStrength, setEase, appearance, versatility,
  rivetCost, removable, bothSidesFinish, setMethod,
  bestProject, leatherRivets,
} from "../leather-rivet-calc.js";

describe("holdStrength", () => {
  it("copper burr permanent strongest hold", () => {
    expect(holdStrength("copper_burr_permanent")).toBeGreaterThan(holdStrength("tubular_hollow_light"));
  });
});

describe("setEase", () => {
  it("chicago screw remove easiest to set", () => {
    expect(setEase("chicago_screw_remove")).toBeGreaterThan(setEase("copper_burr_permanent"));
  });
});

describe("appearance", () => {
  it("double cap decorative best appearance", () => {
    expect(appearance("double_cap_decorative")).toBeGreaterThan(appearance("tubular_hollow_light"));
  });
});

describe("versatility", () => {
  it("chicago screw remove most versatile", () => {
    expect(versatility("chicago_screw_remove")).toBeGreaterThan(versatility("copper_burr_permanent"));
  });
});

describe("rivetCost", () => {
  it("chicago screw remove most expensive", () => {
    expect(rivetCost("chicago_screw_remove")).toBeGreaterThan(rivetCost("single_cap_rapid"));
  });
});

describe("removable", () => {
  it("chicago screw remove is removable", () => {
    expect(removable("chicago_screw_remove")).toBe(true);
  });
  it("copper burr permanent is not removable", () => {
    expect(removable("copper_burr_permanent")).toBe(false);
  });
});

describe("bothSidesFinish", () => {
  it("double cap decorative has both sides finish", () => {
    expect(bothSidesFinish("double_cap_decorative")).toBe(true);
  });
  it("single cap rapid does not have both sides finish", () => {
    expect(bothSidesFinish("single_cap_rapid")).toBe(false);
  });
});

describe("setMethod", () => {
  it("copper burr permanent uses burr setter peen", () => {
    expect(setMethod("copper_burr_permanent")).toBe("burr_setter_peen");
  });
});

describe("bestProject", () => {
  it("chicago screw remove best for portfolio swap page", () => {
    expect(bestProject("chicago_screw_remove")).toBe("portfolio_swap_page");
  });
});

describe("leatherRivets", () => {
  it("returns 5 types", () => {
    expect(leatherRivets()).toHaveLength(5);
  });
});
