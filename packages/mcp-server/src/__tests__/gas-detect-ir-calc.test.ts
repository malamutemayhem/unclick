import { describe, it, expect } from "vitest";
import {
  sensitivity, selectivity, pathLength, stability,
  giCost, failSafe, forMultiGas, optic,
  bestUse, gasDetectIrTypes,
} from "../gas-detect-ir-calc.js";

describe("sensitivity", () => {
  it("tunable diode laser most sensitive", () => {
    expect(sensitivity("tunable_diode_laser")).toBeGreaterThan(sensitivity("open_path_line"));
  });
});

describe("selectivity", () => {
  it("photoacoustic most selective", () => {
    expect(selectivity("photoacoustic_multi")).toBeGreaterThanOrEqual(selectivity("tunable_diode_laser"));
  });
});

describe("pathLength", () => {
  it("open path longest", () => {
    expect(pathLength("open_path_line")).toBeGreaterThan(pathLength("ndir_point_single"));
  });
});

describe("stability", () => {
  it("ndir dual beam most stable", () => {
    expect(stability("ndir_dual_beam")).toBeGreaterThan(stability("open_path_line"));
  });
});

describe("giCost", () => {
  it("tunable diode laser most expensive", () => {
    expect(giCost("tunable_diode_laser")).toBeGreaterThan(giCost("ndir_point_single"));
  });
});

describe("failSafe", () => {
  it("all ir detectors are fail safe", () => {
    expect(failSafe("ndir_point_single")).toBe(true);
    expect(failSafe("open_path_line")).toBe(true);
  });
});

describe("forMultiGas", () => {
  it("photoacoustic for multi gas", () => {
    expect(forMultiGas("photoacoustic_multi")).toBe(true);
  });
  it("ndir single not for multi gas", () => {
    expect(forMultiGas("ndir_point_single")).toBe(false);
  });
});

describe("optic", () => {
  it("open path uses transmitter receiver", () => {
    expect(optic("open_path_line")).toBe("transmitter_receiver_open_air_long_path");
  });
});

describe("bestUse", () => {
  it("ndir single for co2 methane point", () => {
    expect(bestUse("ndir_point_single")).toBe("co2_methane_single_gas_point_monitor");
  });
});

describe("gasDetectIrTypes", () => {
  it("returns 5 types", () => {
    expect(gasDetectIrTypes()).toHaveLength(5);
  });
});
