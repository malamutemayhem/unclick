import { describe, it, expect } from "vitest";
import {
  holdStrength, heatResist, easeOfRemoval, reusability,
  waxCost, naturalOrigin, stickForm, meltTemp,
  bestUse, dopWaxes,
} from "../dop-wax-calc.js";

describe("holdStrength", () => {
  it("black extra hard strongest hold", () => {
    expect(holdStrength("black_extra_hard")).toBeGreaterThan(holdStrength("red_soft_low"));
  });
});

describe("heatResist", () => {
  it("black extra hard best heat resist", () => {
    expect(heatResist("black_extra_hard")).toBeGreaterThan(heatResist("red_soft_low"));
  });
});

describe("easeOfRemoval", () => {
  it("red soft low easiest removal", () => {
    expect(easeOfRemoval("red_soft_low")).toBeGreaterThan(easeOfRemoval("black_extra_hard"));
  });
});

describe("reusability", () => {
  it("black extra hard most reusable", () => {
    expect(reusability("black_extra_hard")).toBeGreaterThan(reusability("shellac_flake_natural"));
  });
});

describe("waxCost", () => {
  it("black extra hard more expensive", () => {
    expect(waxCost("black_extra_hard")).toBeGreaterThan(waxCost("brown_hard_stick"));
  });
});

describe("naturalOrigin", () => {
  it("shellac flake natural has natural origin", () => {
    expect(naturalOrigin("shellac_flake_natural")).toBe(true);
  });
  it("brown hard stick not natural origin", () => {
    expect(naturalOrigin("brown_hard_stick")).toBe(false);
  });
});

describe("stickForm", () => {
  it("brown hard stick is stick form", () => {
    expect(stickForm("brown_hard_stick")).toBe(true);
  });
  it("shellac flake natural not stick form", () => {
    expect(stickForm("shellac_flake_natural")).toBe(false);
  });
});

describe("meltTemp", () => {
  it("black extra hard uses high 180f", () => {
    expect(meltTemp("black_extra_hard")).toBe("high_180f");
  });
});

describe("bestUse", () => {
  it("red soft low best for delicate soft gem", () => {
    expect(bestUse("red_soft_low")).toBe("delicate_soft_gem");
  });
});

describe("dopWaxes", () => {
  it("returns 5 types", () => {
    expect(dopWaxes()).toHaveLength(5);
  });
});
