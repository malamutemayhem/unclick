import { describe, it, expect } from "vitest";
import {
  successRatePercent, healingWeeks, maxRootstockDiameterCm,
  skillRequired, bestSeason, toolsNeeded,
  waxRequired, bestFruitTree, difficultyRating, graftTypes,
} from "../grafting-technique-calc.js";

describe("successRatePercent", () => {
  it("whip tongue has highest success rate", () => {
    expect(successRatePercent("whip_tongue")).toBeGreaterThan(
      successRatePercent("bridge")
    );
  });
});

describe("healingWeeks", () => {
  it("bridge takes longest to heal", () => {
    expect(healingWeeks("bridge")).toBeGreaterThan(
      healingWeeks("bud")
    );
  });
});

describe("maxRootstockDiameterCm", () => {
  it("bridge handles largest rootstock", () => {
    expect(maxRootstockDiameterCm("bridge")).toBeGreaterThan(
      maxRootstockDiameterCm("whip_tongue")
    );
  });
});

describe("skillRequired", () => {
  it("bridge needs most skill", () => {
    expect(skillRequired("bridge")).toBeGreaterThan(
      skillRequired("bark")
    );
  });
});

describe("bestSeason", () => {
  it("bud grafting is best in summer", () => {
    expect(bestSeason("bud")).toBe("summer");
  });
});

describe("toolsNeeded", () => {
  it("bridge needs most tools", () => {
    expect(toolsNeeded("bridge")).toBeGreaterThan(
      toolsNeeded("cleft")
    );
  });
});

describe("waxRequired", () => {
  it("cleft requires wax", () => {
    expect(waxRequired("cleft")).toBe(true);
  });
  it("bud does not", () => {
    expect(waxRequired("bud")).toBe(false);
  });
});

describe("bestFruitTree", () => {
  it("whip tongue is best for apple", () => {
    expect(bestFruitTree("whip_tongue")).toBe("apple");
  });
});

describe("difficultyRating", () => {
  it("bridge is hardest", () => {
    expect(difficultyRating("bridge")).toBeGreaterThan(
      difficultyRating("bark")
    );
  });
});

describe("graftTypes", () => {
  it("returns 5 types", () => {
    expect(graftTypes()).toHaveLength(5);
  });
});
