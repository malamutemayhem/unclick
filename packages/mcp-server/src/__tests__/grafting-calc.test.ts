import { describe, it, expect } from "vitest";
import {
  successRatePercent, healingWeeks, scionSizeCmMin,
  bestSeason, cambiumAlignmentCritical, wrappingRequired,
  knifeSkillLevel, multiScionCapable, costPerGraft, graftTypes,
} from "../grafting-calc.js";

describe("successRatePercent", () => {
  it("whip tongue has highest success", () => {
    expect(successRatePercent("whip_tongue")).toBeGreaterThan(
      successRatePercent("bridge")
    );
  });
});

describe("healingWeeks", () => {
  it("bridge takes longest to heal", () => {
    expect(healingWeeks("bridge")).toBeGreaterThan(
      healingWeeks("bud_chip")
    );
  });
});

describe("scionSizeCmMin", () => {
  it("bark needs largest scion", () => {
    expect(scionSizeCmMin("bark")).toBeGreaterThan(
      scionSizeCmMin("bud_chip")
    );
  });
});

describe("bestSeason", () => {
  it("bud chip is for summer", () => {
    expect(bestSeason("bud_chip")).toBe("summer");
  });
});

describe("cambiumAlignmentCritical", () => {
  it("whip tongue is most critical", () => {
    expect(cambiumAlignmentCritical("whip_tongue")).toBeGreaterThan(
      cambiumAlignmentCritical("bark")
    );
  });
});

describe("wrappingRequired", () => {
  it("all grafts need wrapping", () => {
    expect(wrappingRequired("whip_tongue")).toBe(true);
    expect(wrappingRequired("bark")).toBe(true);
  });
});

describe("knifeSkillLevel", () => {
  it("whip tongue needs most skill", () => {
    expect(knifeSkillLevel("whip_tongue")).toBeGreaterThan(
      knifeSkillLevel("bark")
    );
  });
});

describe("multiScionCapable", () => {
  it("cleft supports multiple scions", () => {
    expect(multiScionCapable("cleft")).toBe(true);
  });
  it("whip tongue does not", () => {
    expect(multiScionCapable("whip_tongue")).toBe(false);
  });
});

describe("costPerGraft", () => {
  it("bridge is most expensive", () => {
    expect(costPerGraft("bridge")).toBeGreaterThan(
      costPerGraft("bud_chip")
    );
  });
});

describe("graftTypes", () => {
  it("returns 5 types", () => {
    expect(graftTypes()).toHaveLength(5);
  });
});
