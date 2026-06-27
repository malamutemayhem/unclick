import { describe, it, expect } from "vitest";
import {
  restCount, totalTimeMinutes, saccharificationTempCelsius,
  efficiencyPercent, bodyCharacter, directHeatRequired,
  skillLevel, bestForStyle, energyCostRating, mashTypes,
} from "../mash-schedule-calc.js";

describe("restCount", () => {
  it("double decoction has most rests", () => {
    expect(restCount("decoction_double")).toBeGreaterThan(
      restCount("single_infusion")
    );
  });
});

describe("totalTimeMinutes", () => {
  it("double decoction takes longest", () => {
    expect(totalTimeMinutes("decoction_double")).toBeGreaterThan(
      totalTimeMinutes("single_infusion")
    );
  });
});

describe("saccharificationTempCelsius", () => {
  it("single infusion runs hottest", () => {
    expect(saccharificationTempCelsius("single_infusion")).toBeGreaterThanOrEqual(
      saccharificationTempCelsius("decoction_double")
    );
  });
});

describe("efficiencyPercent", () => {
  it("double decoction is most efficient", () => {
    expect(efficiencyPercent("decoction_double")).toBeGreaterThan(
      efficiencyPercent("single_infusion")
    );
  });
});

describe("bodyCharacter", () => {
  it("single infusion gives medium body", () => {
    expect(bodyCharacter("single_infusion")).toBe("medium");
  });
});

describe("directHeatRequired", () => {
  it("decoction needs direct heat", () => {
    expect(directHeatRequired("decoction_single")).toBe(true);
  });
  it("single infusion does not", () => {
    expect(directHeatRequired("single_infusion")).toBe(false);
  });
});

describe("skillLevel", () => {
  it("double decoction needs most skill", () => {
    expect(skillLevel("decoction_double")).toBeGreaterThan(
      skillLevel("single_infusion")
    );
  });
});

describe("bestForStyle", () => {
  it("single infusion is best for ale", () => {
    expect(bestForStyle("single_infusion")).toBe("ale");
  });
});

describe("energyCostRating", () => {
  it("double decoction costs most energy", () => {
    expect(energyCostRating("decoction_double")).toBeGreaterThan(
      energyCostRating("single_infusion")
    );
  });
});

describe("mashTypes", () => {
  it("returns 5 types", () => {
    expect(mashTypes()).toHaveLength(5);
  });
});
