import { describe, it, expect } from "vitest";
import {
  capacity, accessibility, airflow, density,
  cmCost, toolless, forOverhead, routing,
  bestUse, cableManagerTypes,
} from "../cable-manager-calc.js";

describe("capacity", () => {
  it("overhead basket highest capacity", () => {
    expect(capacity("overhead_basket_tray")).toBeGreaterThan(capacity("horizontal_1u_panel"));
  });
});

describe("accessibility", () => {
  it("waterfall most accessible", () => {
    expect(accessibility("waterfall_side_mount")).toBeGreaterThan(accessibility("underfloor_raceway_duct"));
  });
});

describe("airflow", () => {
  it("overhead best airflow", () => {
    expect(airflow("overhead_basket_tray")).toBeGreaterThan(airflow("underfloor_raceway_duct"));
  });
});

describe("density", () => {
  it("vertical finger best density", () => {
    expect(density("vertical_finger_duct")).toBeGreaterThan(density("waterfall_side_mount"));
  });
});

describe("cmCost", () => {
  it("underfloor most expensive", () => {
    expect(cmCost("underfloor_raceway_duct")).toBeGreaterThan(cmCost("horizontal_1u_panel"));
  });
});

describe("toolless", () => {
  it("horizontal is toolless", () => {
    expect(toolless("horizontal_1u_panel")).toBe(true);
  });
  it("overhead not toolless", () => {
    expect(toolless("overhead_basket_tray")).toBe(false);
  });
});

describe("forOverhead", () => {
  it("basket tray for overhead", () => {
    expect(forOverhead("overhead_basket_tray")).toBe(true);
  });
  it("horizontal not overhead", () => {
    expect(forOverhead("horizontal_1u_panel")).toBe(false);
  });
});

describe("routing", () => {
  it("waterfall uses side rail bracket", () => {
    expect(routing("waterfall_side_mount")).toBe("waterfall_bracket_side_rail");
  });
});

describe("bestUse", () => {
  it("overhead for data center row", () => {
    expect(bestUse("overhead_basket_tray")).toBe("data_center_row_overhead_path");
  });
});

describe("cableManagerTypes", () => {
  it("returns 5 types", () => {
    expect(cableManagerTypes()).toHaveLength(5);
  });
});
