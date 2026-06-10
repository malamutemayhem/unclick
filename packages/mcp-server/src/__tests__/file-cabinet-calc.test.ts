import { describe, it, expect } from "vitest";
import {
  fileCapacity, security, accessibility, floorSpace,
  cabinetCost, hasLock, onWheels, drawerOrientation,
  bestOffice, fileCabinets,
} from "../file-cabinet-calc.js";

describe("fileCapacity", () => {
  it("lateral wide drawer most file capacity", () => {
    expect(fileCapacity("lateral_wide_drawer")).toBeGreaterThan(fileCapacity("mobile_rolling_pedestal"));
  });
});

describe("security", () => {
  it("fireproof insulated safe best security", () => {
    expect(security("fireproof_insulated_safe")).toBeGreaterThan(security("open_shelf_binder"));
  });
});

describe("accessibility", () => {
  it("open shelf binder best accessibility", () => {
    expect(accessibility("open_shelf_binder")).toBeGreaterThan(accessibility("fireproof_insulated_safe"));
  });
});

describe("floorSpace", () => {
  it("mobile rolling pedestal best floor space", () => {
    expect(floorSpace("mobile_rolling_pedestal")).toBeGreaterThan(floorSpace("lateral_wide_drawer"));
  });
});

describe("cabinetCost", () => {
  it("fireproof insulated safe most expensive", () => {
    expect(cabinetCost("fireproof_insulated_safe")).toBeGreaterThan(cabinetCost("vertical_two_drawer"));
  });
});

describe("hasLock", () => {
  it("vertical two drawer has lock", () => {
    expect(hasLock("vertical_two_drawer")).toBe(true);
  });
  it("open shelf binder has no lock", () => {
    expect(hasLock("open_shelf_binder")).toBe(false);
  });
});

describe("onWheels", () => {
  it("mobile rolling pedestal is on wheels", () => {
    expect(onWheels("mobile_rolling_pedestal")).toBe(true);
  });
  it("vertical two drawer is not on wheels", () => {
    expect(onWheels("vertical_two_drawer")).toBe(false);
  });
});

describe("drawerOrientation", () => {
  it("lateral wide drawer uses side to side legal", () => {
    expect(drawerOrientation("lateral_wide_drawer")).toBe("side_to_side_legal");
  });
});

describe("bestOffice", () => {
  it("fireproof insulated safe best for legal records archive", () => {
    expect(bestOffice("fireproof_insulated_safe")).toBe("legal_records_archive");
  });
});

describe("fileCabinets", () => {
  it("returns 5 types", () => {
    expect(fileCabinets()).toHaveLength(5);
  });
});
