import { describe, it, expect } from "vitest";
import {
  routineDurationSec, strengthDemand, flexibilityDemand,
  injuryRisk, maxScore, womenOnly,
  menOnly, apparatusHeight, keySkill, gymnasticsApparatuses,
} from "../gymnastics-apparatus-calc.js";

describe("routineDurationSec", () => {
  it("floor longest routine", () => {
    expect(routineDurationSec("floor")).toBeGreaterThan(
      routineDurationSec("vault")
    );
  });
});

describe("strengthDemand", () => {
  it("pommel horse most strength", () => {
    expect(strengthDemand("pommel_horse")).toBeGreaterThan(
      strengthDemand("balance_beam")
    );
  });
});

describe("flexibilityDemand", () => {
  it("balance beam most flexibility", () => {
    expect(flexibilityDemand("balance_beam")).toBeGreaterThan(
      flexibilityDemand("pommel_horse")
    );
  });
});

describe("injuryRisk", () => {
  it("vault highest injury risk", () => {
    expect(injuryRisk("vault")).toBeGreaterThan(
      injuryRisk("pommel_horse")
    );
  });
});

describe("maxScore", () => {
  it("all have same max score", () => {
    expect(maxScore("floor")).toBe(maxScore("vault"));
  });
});

describe("womenOnly", () => {
  it("uneven bars women only", () => {
    expect(womenOnly("uneven_bars")).toBe(true);
  });
  it("floor is not", () => {
    expect(womenOnly("floor")).toBe(false);
  });
});

describe("menOnly", () => {
  it("pommel horse men only", () => {
    expect(menOnly("pommel_horse")).toBe(true);
  });
  it("vault is not", () => {
    expect(menOnly("vault")).toBe(false);
  });
});

describe("apparatusHeight", () => {
  it("floor is ground level", () => {
    expect(apparatusHeight("floor")).toBe("ground_level");
  });
});

describe("keySkill", () => {
  it("vault key skill is tsukahara", () => {
    expect(keySkill("vault")).toBe("tsukahara");
  });
});

describe("gymnasticsApparatuses", () => {
  it("returns 5 apparatuses", () => {
    expect(gymnasticsApparatuses()).toHaveLength(5);
  });
});
