import { describe, it, expect } from "vitest";
import {
  populationPercent, canDonateTo, canReceiveFrom,
  demandLevel, plateletDemand, universalDonor,
  universalRecipient, rhFactor, antigenPresent, bloodTypes,
} from "../blood-type-calc.js";

describe("populationPercent", () => {
  it("o positive is most common", () => {
    expect(populationPercent("o_positive")).toBeGreaterThan(
      populationPercent("ab_positive")
    );
  });
});

describe("canDonateTo", () => {
  it("o negative can donate to most types", () => {
    expect(canDonateTo("o_negative")).toBeGreaterThan(
      canDonateTo("ab_positive")
    );
  });
});

describe("canReceiveFrom", () => {
  it("ab positive can receive from most types", () => {
    expect(canReceiveFrom("ab_positive")).toBeGreaterThan(
      canReceiveFrom("o_negative")
    );
  });
});

describe("demandLevel", () => {
  it("o negative has highest demand", () => {
    expect(demandLevel("o_negative")).toBeGreaterThan(
      demandLevel("ab_positive")
    );
  });
});

describe("plateletDemand", () => {
  it("ab positive has highest platelet demand", () => {
    expect(plateletDemand("ab_positive")).toBeGreaterThan(
      plateletDemand("b_positive")
    );
  });
});

describe("universalDonor", () => {
  it("o negative is universal donor", () => {
    expect(universalDonor("o_negative")).toBe(true);
  });
  it("a positive is not", () => {
    expect(universalDonor("a_positive")).toBe(false);
  });
});

describe("universalRecipient", () => {
  it("ab positive is universal recipient", () => {
    expect(universalRecipient("ab_positive")).toBe(true);
  });
  it("o positive is not", () => {
    expect(universalRecipient("o_positive")).toBe(false);
  });
});

describe("rhFactor", () => {
  it("o negative has negative rh", () => {
    expect(rhFactor("o_negative")).toBe("negative");
  });
  it("a positive has positive rh", () => {
    expect(rhFactor("a_positive")).toBe("positive");
  });
});

describe("antigenPresent", () => {
  it("ab positive has both antigens", () => {
    expect(antigenPresent("ab_positive")).toBe("AB");
  });
  it("o positive has no antigens", () => {
    expect(antigenPresent("o_positive")).toBe("none");
  });
});

describe("bloodTypes", () => {
  it("returns 5 types", () => {
    expect(bloodTypes()).toHaveLength(5);
  });
});
