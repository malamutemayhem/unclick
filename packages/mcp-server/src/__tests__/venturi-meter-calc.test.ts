import { describe, it, expect } from "vitest";
import {
  accuracy, pressureLoss, rangeability, durability,
  vmCost, bidirectional, forLargeLines, throat,
  bestUse, venturiMeterTypes,
} from "../venturi-meter-calc.js";

describe("accuracy", () => {
  it("classical most accurate", () => {
    expect(accuracy("classical_herschel_cast")).toBeGreaterThan(accuracy("insert_wafer_inline"));
  });
});

describe("pressureLoss", () => {
  it("classical lowest pressure loss", () => {
    expect(pressureLoss("classical_herschel_cast")).toBeGreaterThan(pressureLoss("insert_wafer_inline"));
  });
});

describe("rangeability", () => {
  it("cone best rangeability", () => {
    expect(rangeability("cone_v_element")).toBeGreaterThan(rangeability("classical_herschel_cast"));
  });
});

describe("durability", () => {
  it("classical most durable", () => {
    expect(durability("classical_herschel_cast")).toBeGreaterThan(durability("insert_wafer_inline"));
  });
});

describe("vmCost", () => {
  it("wet gas most expensive", () => {
    expect(vmCost("wet_gas_correction")).toBeGreaterThan(vmCost("insert_wafer_inline"));
  });
});

describe("bidirectional", () => {
  it("cone is bidirectional", () => {
    expect(bidirectional("cone_v_element")).toBe(true);
  });
  it("classical not bidirectional", () => {
    expect(bidirectional("classical_herschel_cast")).toBe(false);
  });
});

describe("forLargeLines", () => {
  it("classical for large lines", () => {
    expect(forLargeLines("classical_herschel_cast")).toBe(true);
  });
  it("insert not large lines", () => {
    expect(forLargeLines("insert_wafer_inline")).toBe(false);
  });
});

describe("throat", () => {
  it("cone uses suspended cone", () => {
    expect(throat("cone_v_element")).toBe("suspended_cone_beta_edge");
  });
});

describe("bestUse", () => {
  it("classical for water main", () => {
    expect(bestUse("classical_herschel_cast")).toBe("large_water_main_custody_transfer");
  });
});

describe("venturiMeterTypes", () => {
  it("returns 5 types", () => {
    expect(venturiMeterTypes()).toHaveLength(5);
  });
});
