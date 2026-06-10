import { describe, it, expect } from "vitest";
import {
  fileCapacity, accessibility, security, spaceEfficiency,
  cabinetCost, lockable, hasWheels, buildMaterial,
  bestOffice, filingCabinets,
} from "../filing-cabinet-calc.js";

describe("fileCapacity", () => {
  it("lateral wide four biggest capacity", () => {
    expect(fileCapacity("lateral_wide_four")).toBeGreaterThan(fileCapacity("mobile_pedestal_roll"));
  });
});

describe("accessibility", () => {
  it("open shelf binder most accessible", () => {
    expect(accessibility("open_shelf_binder")).toBeGreaterThan(accessibility("fireproof_safe_rated"));
  });
});

describe("security", () => {
  it("fireproof safe rated most secure", () => {
    expect(security("fireproof_safe_rated")).toBeGreaterThan(security("open_shelf_binder"));
  });
});

describe("spaceEfficiency", () => {
  it("mobile pedestal roll most space efficient", () => {
    expect(spaceEfficiency("mobile_pedestal_roll")).toBeGreaterThan(spaceEfficiency("lateral_wide_four"));
  });
});

describe("cabinetCost", () => {
  it("fireproof safe rated most expensive", () => {
    expect(cabinetCost("fireproof_safe_rated")).toBeGreaterThan(cabinetCost("open_shelf_binder"));
  });
});

describe("lockable", () => {
  it("fireproof safe rated is lockable", () => {
    expect(lockable("fireproof_safe_rated")).toBe(true);
  });
  it("open shelf binder is not", () => {
    expect(lockable("open_shelf_binder")).toBe(false);
  });
});

describe("hasWheels", () => {
  it("mobile pedestal roll has wheels", () => {
    expect(hasWheels("mobile_pedestal_roll")).toBe(true);
  });
  it("vertical two drawer does not", () => {
    expect(hasWheels("vertical_two_drawer")).toBe(false);
  });
});

describe("buildMaterial", () => {
  it("fireproof safe rated uses insulated steel ul rated", () => {
    expect(buildMaterial("fireproof_safe_rated")).toBe("insulated_steel_ul_rated");
  });
});

describe("bestOffice", () => {
  it("mobile pedestal roll best for under desk personal", () => {
    expect(bestOffice("mobile_pedestal_roll")).toBe("under_desk_personal");
  });
});

describe("filingCabinets", () => {
  it("returns 5 types", () => {
    expect(filingCabinets()).toHaveLength(5);
  });
});
