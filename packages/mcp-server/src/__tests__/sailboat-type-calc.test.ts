import { describe, it, expect } from "vitest";
import {
  hullSpeed, stabilityRating, crewSizeMin,
  lengthMeters, upwindAbility, multiHull,
  liveaboard, bestUse, averagePriceUsd, sailboatTypes,
} from "../sailboat-type-calc.js";

describe("hullSpeed", () => {
  it("catamaran is fastest", () => {
    expect(hullSpeed("catamaran")).toBeGreaterThan(
      hullSpeed("dinghy")
    );
  });
});

describe("stabilityRating", () => {
  it("catamaran is most stable", () => {
    expect(stabilityRating("catamaran")).toBeGreaterThan(
      stabilityRating("dinghy")
    );
  });
});

describe("crewSizeMin", () => {
  it("schooner needs largest crew", () => {
    expect(crewSizeMin("schooner")).toBeGreaterThan(
      crewSizeMin("sloop")
    );
  });
});

describe("lengthMeters", () => {
  it("schooner is longest", () => {
    expect(lengthMeters("schooner")).toBeGreaterThan(
      lengthMeters("dinghy")
    );
  });
});

describe("upwindAbility", () => {
  it("sloop is best upwind", () => {
    expect(upwindAbility("sloop")).toBeGreaterThan(
      upwindAbility("schooner")
    );
  });
});

describe("multiHull", () => {
  it("catamaran is multi hull", () => {
    expect(multiHull("catamaran")).toBe(true);
  });
  it("sloop is not", () => {
    expect(multiHull("sloop")).toBe(false);
  });
});

describe("liveaboard", () => {
  it("ketch is liveaboard capable", () => {
    expect(liveaboard("ketch")).toBe(true);
  });
  it("dinghy is not", () => {
    expect(liveaboard("dinghy")).toBe(false);
  });
});

describe("bestUse", () => {
  it("dinghy for racing", () => {
    expect(bestUse("dinghy")).toBe("racing");
  });
});

describe("averagePriceUsd", () => {
  it("schooner is most expensive", () => {
    expect(averagePriceUsd("schooner")).toBeGreaterThan(
      averagePriceUsd("dinghy")
    );
  });
});

describe("sailboatTypes", () => {
  it("returns 5 types", () => {
    expect(sailboatTypes()).toHaveLength(5);
  });
});
