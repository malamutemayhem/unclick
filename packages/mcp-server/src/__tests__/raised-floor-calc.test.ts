import { describe, it, expect } from "vitest";
import {
  loadCapacity, airflow, fireRating, acoustic,
  rfCost, esdSafe, forDataCenter, panel,
  bestUse, raisedFloorTypes,
} from "../raised-floor-calc.js";

describe("loadCapacity", () => {
  it("steel cement highest load", () => {
    expect(loadCapacity("steel_cement_filled")).toBeGreaterThan(loadCapacity("conductive_esd_vinyl"));
  });
});

describe("airflow", () => {
  it("perforated best airflow", () => {
    expect(airflow("perforated_airflow_tile")).toBeGreaterThan(airflow("calcium_sulphate_wood"));
  });
});

describe("fireRating", () => {
  it("steel cement best fire rating", () => {
    expect(fireRating("steel_cement_filled")).toBeGreaterThan(fireRating("conductive_esd_vinyl"));
  });
});

describe("acoustic", () => {
  it("calcium sulphate best acoustic", () => {
    expect(acoustic("calcium_sulphate_wood")).toBeGreaterThan(acoustic("perforated_airflow_tile"));
  });
});

describe("rfCost", () => {
  it("aluminum most expensive", () => {
    expect(rfCost("aluminum_die_cast")).toBeGreaterThan(rfCost("conductive_esd_vinyl"));
  });
});

describe("esdSafe", () => {
  it("aluminum is esd safe", () => {
    expect(esdSafe("aluminum_die_cast")).toBe(true);
  });
  it("steel cement not esd safe", () => {
    expect(esdSafe("steel_cement_filled")).toBe(false);
  });
});

describe("forDataCenter", () => {
  it("perforated for data center", () => {
    expect(forDataCenter("perforated_airflow_tile")).toBe(true);
  });
  it("esd vinyl not data center", () => {
    expect(forDataCenter("conductive_esd_vinyl")).toBe(false);
  });
});

describe("panel", () => {
  it("perforated uses 25 percent open", () => {
    expect(panel("perforated_airflow_tile")).toBe("steel_perforated_25_percent_open");
  });
});

describe("bestUse", () => {
  it("steel cement for heavy equipment", () => {
    expect(bestUse("steel_cement_filled")).toBe("heavy_equipment_server_room");
  });
});

describe("raisedFloorTypes", () => {
  it("returns 5 types", () => {
    expect(raisedFloorTypes()).toHaveLength(5);
  });
});
