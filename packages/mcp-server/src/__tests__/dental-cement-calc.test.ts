import { describe, it, expect } from "vitest";
import {
  bondStrength, fluorideRelease, biocompatibility, workingTime,
  materialCost, moistureTolerant, lightCured, settingMechanism,
  bestRestoration, dentalCements,
} from "../dental-cement-calc.js";

describe("bondStrength", () => {
  it("resin cement strongest bond", () => {
    expect(bondStrength("resin_cement")).toBeGreaterThan(bondStrength("polycarboxylate"));
  });
});

describe("fluorideRelease", () => {
  it("glass ionomer most fluoride release", () => {
    expect(fluorideRelease("glass_ionomer")).toBeGreaterThan(fluorideRelease("resin_cement"));
  });
});

describe("biocompatibility", () => {
  it("polycarboxylate most biocompatible", () => {
    expect(biocompatibility("polycarboxylate")).toBeGreaterThan(biocompatibility("zinc_phosphate"));
  });
});

describe("workingTime", () => {
  it("resin cement longest working time", () => {
    expect(workingTime("resin_cement")).toBeGreaterThan(workingTime("zinc_phosphate"));
  });
});

describe("materialCost", () => {
  it("resin cement most expensive", () => {
    expect(materialCost("resin_cement")).toBeGreaterThan(materialCost("zinc_phosphate"));
  });
});

describe("moistureTolerant", () => {
  it("glass ionomer is moisture tolerant", () => {
    expect(moistureTolerant("glass_ionomer")).toBe(true);
  });
  it("resin cement is not", () => {
    expect(moistureTolerant("resin_cement")).toBe(false);
  });
});

describe("lightCured", () => {
  it("resin modified is light cured", () => {
    expect(lightCured("resin_modified")).toBe(true);
  });
  it("zinc phosphate is not", () => {
    expect(lightCured("zinc_phosphate")).toBe(false);
  });
});

describe("settingMechanism", () => {
  it("resin cement uses free radical polymerization", () => {
    expect(settingMechanism("resin_cement")).toBe("free_radical_polymerization");
  });
});

describe("bestRestoration", () => {
  it("glass ionomer for pediatric temporary crown", () => {
    expect(bestRestoration("glass_ionomer")).toBe("pediatric_temporary_crown");
  });
});

describe("dentalCements", () => {
  it("returns 5 cements", () => {
    expect(dentalCements()).toHaveLength(5);
  });
});
