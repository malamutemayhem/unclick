import { describe, it, expect } from "vitest";
import {
  heightDiameterRatio, decorativeComplexity, loadBearing,
  capitalHeight, flutingCount, hasBase, hasVolutes,
  bestBuilding, carvingCost, columnOrders,
} from "../column-order-calc.js";

describe("heightDiameterRatio", () => {
  it("corinthian has highest ratio", () => {
    expect(heightDiameterRatio("corinthian")).toBeGreaterThanOrEqual(
      heightDiameterRatio("doric")
    );
  });
});

describe("decorativeComplexity", () => {
  it("composite is most complex", () => {
    expect(decorativeComplexity("composite")).toBeGreaterThan(
      decorativeComplexity("tuscan")
    );
  });
});

describe("loadBearing", () => {
  it("doric bears most load", () => {
    expect(loadBearing("doric")).toBeGreaterThan(
      loadBearing("corinthian")
    );
  });
});

describe("capitalHeight", () => {
  it("composite has tallest capital", () => {
    expect(capitalHeight("composite")).toBeGreaterThan(
      capitalHeight("doric")
    );
  });
});

describe("flutingCount", () => {
  it("tuscan has no fluting", () => {
    expect(flutingCount("tuscan")).toBe(0);
  });
  it("doric has 20 flutes", () => {
    expect(flutingCount("doric")).toBe(20);
  });
});

describe("hasBase", () => {
  it("doric has no base", () => {
    expect(hasBase("doric")).toBe(false);
  });
  it("ionic has a base", () => {
    expect(hasBase("ionic")).toBe(true);
  });
});

describe("hasVolutes", () => {
  it("ionic has volutes", () => {
    expect(hasVolutes("ionic")).toBe(true);
  });
  it("doric does not", () => {
    expect(hasVolutes("doric")).toBe(false);
  });
});

describe("bestBuilding", () => {
  it("doric best for temple", () => {
    expect(bestBuilding("doric")).toBe("temple");
  });
});

describe("carvingCost", () => {
  it("composite costs most", () => {
    expect(carvingCost("composite")).toBeGreaterThan(
      carvingCost("tuscan")
    );
  });
});

describe("columnOrders", () => {
  it("returns 5 orders", () => {
    expect(columnOrders()).toHaveLength(5);
  });
});
