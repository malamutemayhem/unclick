import { describe, it, expect } from "vitest";
import {
  arrowSupport, fletchingClearance, accuracy, setupEase,
  restCost, fullContainment, needsTiming, restMechanism,
  bestShooter, arrowRests,
} from "../arrow-rest-calc.js";

describe("arrowSupport", () => {
  it("whisker biscuit full highest support", () => {
    expect(arrowSupport("whisker_biscuit_full")).toBeGreaterThan(arrowSupport("pressure_plunger_recurve"));
  });
});

describe("fletchingClearance", () => {
  it("drop away limb best clearance", () => {
    expect(fletchingClearance("drop_away_limb")).toBeGreaterThan(fletchingClearance("whisker_biscuit_full"));
  });
});

describe("accuracy", () => {
  it("drop away limb most accurate", () => {
    expect(accuracy("drop_away_limb")).toBeGreaterThan(accuracy("whisker_biscuit_full"));
  });
});

describe("setupEase", () => {
  it("whisker biscuit full easiest setup", () => {
    expect(setupEase("whisker_biscuit_full")).toBeGreaterThan(setupEase("drop_away_limb"));
  });
});

describe("restCost", () => {
  it("drop away limb most expensive", () => {
    expect(restCost("drop_away_limb")).toBeGreaterThan(restCost("pressure_plunger_recurve"));
  });
});

describe("fullContainment", () => {
  it("whisker biscuit full has full containment", () => {
    expect(fullContainment("whisker_biscuit_full")).toBe(true);
  });
  it("drop away limb does not", () => {
    expect(fullContainment("drop_away_limb")).toBe(false);
  });
});

describe("needsTiming", () => {
  it("drop away limb needs timing", () => {
    expect(needsTiming("drop_away_limb")).toBe(true);
  });
  it("whisker biscuit full does not", () => {
    expect(needsTiming("whisker_biscuit_full")).toBe(false);
  });
});

describe("restMechanism", () => {
  it("whisker biscuit full uses bristle ring surround", () => {
    expect(restMechanism("whisker_biscuit_full")).toBe("bristle_ring_surround");
  });
});

describe("bestShooter", () => {
  it("drop away limb best for tournament target pro", () => {
    expect(bestShooter("drop_away_limb")).toBe("tournament_target_pro");
  });
});

describe("arrowRests", () => {
  it("returns 5 types", () => {
    expect(arrowRests()).toHaveLength(5);
  });
});
