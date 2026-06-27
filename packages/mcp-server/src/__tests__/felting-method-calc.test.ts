import { describe, it, expect } from "vitest";
import {
  shrinkagePercent, timeMinutes, densityResult,
  detailPrecision, waterRequired, sculptural,
  bestFiber, beginnerFriendly, costEstimate, feltingMethods,
} from "../felting-method-calc.js";

describe("shrinkagePercent", () => {
  it("cobweb felting shrinks most", () => {
    expect(shrinkagePercent("cobweb_felting")).toBeGreaterThan(
      shrinkagePercent("needle_felting")
    );
  });
});

describe("timeMinutes", () => {
  it("needle felting takes longest", () => {
    expect(timeMinutes("needle_felting")).toBeGreaterThan(
      timeMinutes("wet_felting")
    );
  });
});

describe("densityResult", () => {
  it("wet felting is densest", () => {
    expect(densityResult("wet_felting")).toBeGreaterThan(
      densityResult("cobweb_felting")
    );
  });
});

describe("detailPrecision", () => {
  it("needle felting is most precise", () => {
    expect(detailPrecision("needle_felting")).toBeGreaterThan(
      detailPrecision("wet_felting")
    );
  });
});

describe("waterRequired", () => {
  it("wet felting needs water", () => {
    expect(waterRequired("wet_felting")).toBe(true);
  });
  it("needle felting does not", () => {
    expect(waterRequired("needle_felting")).toBe(false);
  });
});

describe("sculptural", () => {
  it("needle felting is sculptural", () => {
    expect(sculptural("needle_felting")).toBe(true);
  });
  it("wet felting is not", () => {
    expect(sculptural("wet_felting")).toBe(false);
  });
});

describe("bestFiber", () => {
  it("needle felting best with corriedale", () => {
    expect(bestFiber("needle_felting")).toBe("corriedale");
  });
});

describe("beginnerFriendly", () => {
  it("wet felting most beginner friendly", () => {
    expect(beginnerFriendly("wet_felting")).toBeGreaterThan(
      beginnerFriendly("cobweb_felting")
    );
  });
});

describe("costEstimate", () => {
  it("nuno felting costs most", () => {
    expect(costEstimate("nuno_felting")).toBeGreaterThan(
      costEstimate("wet_felting")
    );
  });
});

describe("feltingMethods", () => {
  it("returns 5 methods", () => {
    expect(feltingMethods()).toHaveLength(5);
  });
});
