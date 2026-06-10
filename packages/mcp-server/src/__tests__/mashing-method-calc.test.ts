import { describe, it, expect } from "vitest";
import {
  complexityScore, timeMinutes, extractionEfficiency,
  melanoidinProduction, waterUsage, requiresDirectHeat,
  beginnerFriendly, bestStyleMatch, equipmentNeeded, mashingMethods,
} from "../mashing-method-calc.js";

describe("complexityScore", () => {
  it("decoction most complex", () => {
    expect(complexityScore("decoction")).toBeGreaterThan(
      complexityScore("single_infusion")
    );
  });
});

describe("timeMinutes", () => {
  it("decoction takes longest", () => {
    expect(timeMinutes("decoction")).toBeGreaterThan(
      timeMinutes("single_infusion")
    );
  });
});

describe("extractionEfficiency", () => {
  it("decoction best extraction", () => {
    expect(extractionEfficiency("decoction")).toBeGreaterThan(
      extractionEfficiency("no_sparge")
    );
  });
});

describe("melanoidinProduction", () => {
  it("decoction most melanoidins", () => {
    expect(melanoidinProduction("decoction")).toBeGreaterThan(
      melanoidinProduction("single_infusion")
    );
  });
});

describe("waterUsage", () => {
  it("decoction uses most water", () => {
    expect(waterUsage("decoction")).toBeGreaterThan(
      waterUsage("no_sparge")
    );
  });
});

describe("requiresDirectHeat", () => {
  it("decoction requires direct heat", () => {
    expect(requiresDirectHeat("decoction")).toBe(true);
  });
  it("single infusion does not", () => {
    expect(requiresDirectHeat("single_infusion")).toBe(false);
  });
});

describe("beginnerFriendly", () => {
  it("single infusion is beginner friendly", () => {
    expect(beginnerFriendly("single_infusion")).toBe(true);
  });
  it("decoction is not", () => {
    expect(beginnerFriendly("decoction")).toBe(false);
  });
});

describe("bestStyleMatch", () => {
  it("decoction for czech pilsner", () => {
    expect(bestStyleMatch("decoction")).toBe("czech_pilsner");
  });
});

describe("equipmentNeeded", () => {
  it("no sparge needs basic tun", () => {
    expect(equipmentNeeded("no_sparge")).toBe("basic_tun");
  });
});

describe("mashingMethods", () => {
  it("returns 5 methods", () => {
    expect(mashingMethods()).toHaveLength(5);
  });
});
