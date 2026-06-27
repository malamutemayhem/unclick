import { describe, it, expect } from "vitest";
import {
  accuracy, speed, repeatability, freqRange,
  calCost, automated, forOnWafer, standards,
  bestUse, vnaCalibrations,
} from "../vna-calibration-calc.js";

describe("accuracy", () => {
  it("trl thru reflect highest accuracy", () => {
    expect(accuracy("trl_thru_reflect")).toBeGreaterThan(accuracy("solt_mechanical"));
  });
});

describe("speed", () => {
  it("ecal electronic fastest", () => {
    expect(speed("ecal_electronic")).toBeGreaterThan(speed("solt_mechanical"));
  });
});

describe("repeatability", () => {
  it("ecal electronic most repeatable", () => {
    expect(repeatability("ecal_electronic")).toBeGreaterThan(repeatability("solt_mechanical"));
  });
});

describe("freqRange", () => {
  it("ecal electronic widest freq range", () => {
    expect(freqRange("ecal_electronic")).toBeGreaterThan(freqRange("lrl_line_reflect"));
  });
});

describe("calCost", () => {
  it("ecal electronic most expensive", () => {
    expect(calCost("ecal_electronic")).toBeGreaterThan(calCost("solt_mechanical"));
  });
});

describe("automated", () => {
  it("ecal electronic is automated", () => {
    expect(automated("ecal_electronic")).toBe(true);
  });
  it("solt mechanical not automated", () => {
    expect(automated("solt_mechanical")).toBe(false);
  });
});

describe("forOnWafer", () => {
  it("trl thru reflect for on wafer", () => {
    expect(forOnWafer("trl_thru_reflect")).toBe(true);
  });
  it("ecal electronic not for on wafer", () => {
    expect(forOnWafer("ecal_electronic")).toBe(false);
  });
});

describe("standards", () => {
  it("solt mechanical uses short open load thru", () => {
    expect(standards("solt_mechanical")).toBe("short_open_load_thru");
  });
});

describe("bestUse", () => {
  it("ecal electronic best for production test throughput", () => {
    expect(bestUse("ecal_electronic")).toBe("production_test_throughput");
  });
});

describe("vnaCalibrations", () => {
  it("returns 5 types", () => {
    expect(vnaCalibrations()).toHaveLength(5);
  });
});
