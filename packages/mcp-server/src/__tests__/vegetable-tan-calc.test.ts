import { describe, it, expect } from "vitest";
import {
  tanningWeeks, colorProduced, concentrationPercent, phRange,
  leatherFirmness, toolabilityRating, lightfastness,
  availabilityRating, costPerKg, tanningAgents,
} from "../vegetable-tan-calc.js";

describe("tanningWeeks", () => {
  it("oak bark takes longest", () => {
    expect(tanningWeeks("oak_bark")).toBeGreaterThan(
      tanningWeeks("mimosa")
    );
  });
});

describe("colorProduced", () => {
  it("oak bark produces golden brown", () => {
    expect(colorProduced("oak_bark")).toBe("golden_brown");
  });
});

describe("concentrationPercent", () => {
  it("quebracho is most concentrated", () => {
    expect(concentrationPercent("quebracho")).toBeGreaterThan(
      concentrationPercent("sumac")
    );
  });
});

describe("phRange", () => {
  it("chestnut runs lowest pH", () => {
    expect(phRange("chestnut").min).toBeLessThan(phRange("sumac").min);
  });
});

describe("leatherFirmness", () => {
  it("oak bark produces firmest leather", () => {
    expect(leatherFirmness("oak_bark")).toBeGreaterThan(
      leatherFirmness("sumac")
    );
  });
});

describe("toolabilityRating", () => {
  it("oak bark is most toolable", () => {
    expect(toolabilityRating("oak_bark")).toBeGreaterThan(
      toolabilityRating("quebracho")
    );
  });
});

describe("lightfastness", () => {
  it("quebracho is most lightfast", () => {
    expect(lightfastness("quebracho")).toBeGreaterThan(
      lightfastness("sumac")
    );
  });
});

describe("availabilityRating", () => {
  it("mimosa is most available", () => {
    expect(availabilityRating("mimosa")).toBeGreaterThan(
      availabilityRating("sumac")
    );
  });
});

describe("costPerKg", () => {
  it("sumac is most expensive", () => {
    expect(costPerKg("sumac")).toBeGreaterThan(costPerKg("mimosa"));
  });
});

describe("tanningAgents", () => {
  it("returns 5 agents", () => {
    expect(tanningAgents()).toHaveLength(5);
  });
});
