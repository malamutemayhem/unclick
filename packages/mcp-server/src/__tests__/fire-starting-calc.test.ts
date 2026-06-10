import { describe, it, expect } from "vitest";
import {
  difficultyRating, sparkTemp, wetConditionReliability,
  usesRequired, sunRequired, portability,
  bestTinder, traditionalOrigin, costEstimate, fireMethods,
} from "../fire-starting-calc.js";

describe("difficultyRating", () => {
  it("bow drill is most difficult", () => {
    expect(difficultyRating("bow_drill")).toBeGreaterThan(
      difficultyRating("magnifying")
    );
  });
});

describe("sparkTemp", () => {
  it("ferro rod has highest spark temp", () => {
    expect(sparkTemp("ferro_rod")).toBeGreaterThan(
      sparkTemp("flint_steel")
    );
  });
});

describe("wetConditionReliability", () => {
  it("ferro rod is most reliable in wet", () => {
    expect(wetConditionReliability("ferro_rod")).toBeGreaterThan(
      wetConditionReliability("magnifying")
    );
  });
});

describe("usesRequired", () => {
  it("ferro rod lasts most uses", () => {
    expect(usesRequired("ferro_rod")).toBeGreaterThan(
      usesRequired("flint_steel")
    );
  });
});

describe("sunRequired", () => {
  it("magnifying needs sun", () => {
    expect(sunRequired("magnifying")).toBe(true);
  });
  it("ferro rod does not", () => {
    expect(sunRequired("ferro_rod")).toBe(false);
  });
});

describe("portability", () => {
  it("ferro rod is most portable", () => {
    expect(portability("ferro_rod")).toBeGreaterThan(
      portability("bow_drill")
    );
  });
});

describe("bestTinder", () => {
  it("flint steel best with char cloth", () => {
    expect(bestTinder("flint_steel")).toBe("char_cloth");
  });
});

describe("traditionalOrigin", () => {
  it("fire piston from southeast asia", () => {
    expect(traditionalOrigin("fire_piston")).toBe("southeast_asia");
  });
});

describe("costEstimate", () => {
  it("fire piston costs most", () => {
    expect(costEstimate("fire_piston")).toBeGreaterThan(
      costEstimate("bow_drill")
    );
  });
});

describe("fireMethods", () => {
  it("returns 5 methods", () => {
    expect(fireMethods()).toHaveLength(5);
  });
});
