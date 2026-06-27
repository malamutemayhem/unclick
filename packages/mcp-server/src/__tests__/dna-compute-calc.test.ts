import { describe, it, expect } from "vitest";
import {
  parallelism, speed, errorRate, programmability,
  dnaCost, reusable, forDiagnostics, mechanism,
  bestUse, dnaComputes,
} from "../dna-compute-calc.js";

describe("parallelism", () => {
  it("dna storage compute highest parallelism", () => {
    expect(parallelism("dna_storage_compute")).toBeGreaterThan(parallelism("aptamer_sensor_logic"));
  });
});

describe("speed", () => {
  it("aptamer sensor logic fastest", () => {
    expect(speed("aptamer_sensor_logic")).toBeGreaterThan(speed("dna_storage_compute"));
  });
});

describe("errorRate", () => {
  it("dna storage compute highest error handling needed", () => {
    expect(errorRate("dna_storage_compute")).toBeGreaterThan(errorRate("aptamer_sensor_logic"));
  });
});

describe("programmability", () => {
  it("crispr logic most programmable", () => {
    expect(programmability("crispr_logic")).toBeGreaterThan(programmability("dna_storage_compute"));
  });
});

describe("dnaCost", () => {
  it("dna storage compute most expensive", () => {
    expect(dnaCost("dna_storage_compute")).toBeGreaterThan(dnaCost("aptamer_sensor_logic"));
  });
});

describe("reusable", () => {
  it("crispr logic is reusable", () => {
    expect(reusable("crispr_logic")).toBe(true);
  });
  it("strand displacement not reusable", () => {
    expect(reusable("strand_displacement")).toBe(false);
  });
});

describe("forDiagnostics", () => {
  it("aptamer sensor logic for diagnostics", () => {
    expect(forDiagnostics("aptamer_sensor_logic")).toBe(true);
  });
  it("dna origami gate not for diagnostics", () => {
    expect(forDiagnostics("dna_origami_gate")).toBe(false);
  });
});

describe("mechanism", () => {
  it("crispr logic uses guide rna conditional", () => {
    expect(mechanism("crispr_logic")).toBe("guide_rna_conditional");
  });
});

describe("bestUse", () => {
  it("aptamer sensor logic best for point of care detect", () => {
    expect(bestUse("aptamer_sensor_logic")).toBe("point_of_care_detect");
  });
});

describe("dnaComputes", () => {
  it("returns 5 types", () => {
    expect(dnaComputes()).toHaveLength(5);
  });
});
