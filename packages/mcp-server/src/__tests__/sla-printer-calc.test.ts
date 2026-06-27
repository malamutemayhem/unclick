import { describe, it, expect } from "vitest";
import {
  resolution, throughput, surfaceFinish, buildVolume,
  spCost, bottomUp, forDental, printerConfig,
  bestUse, slaPrinterTypes,
} from "../sla-printer-calc.js";

describe("resolution", () => {
  it("micro sla best resolution", () => {
    expect(resolution("micro_sla")).toBeGreaterThan(resolution("continuous_sla"));
  });
});

describe("throughput", () => {
  it("continuous sla highest throughput", () => {
    expect(throughput("continuous_sla")).toBeGreaterThan(throughput("micro_sla"));
  });
});

describe("surfaceFinish", () => {
  it("standard sla best surface finish", () => {
    expect(surfaceFinish("standard_sla")).toBeGreaterThan(surfaceFinish("continuous_sla"));
  });
});

describe("buildVolume", () => {
  it("large format sla best build volume", () => {
    expect(buildVolume("large_format_sla")).toBeGreaterThan(buildVolume("micro_sla"));
  });
});

describe("spCost", () => {
  it("large format sla most expensive", () => {
    expect(spCost("large_format_sla")).toBeGreaterThan(spCost("inverted_sla"));
  });
});

describe("bottomUp", () => {
  it("inverted sla is bottom up", () => {
    expect(bottomUp("inverted_sla")).toBe(true);
  });
  it("standard sla not bottom up", () => {
    expect(bottomUp("standard_sla")).toBe(false);
  });
});

describe("forDental", () => {
  it("inverted sla for dental", () => {
    expect(forDental("inverted_sla")).toBe(true);
  });
  it("standard sla not for dental", () => {
    expect(forDental("standard_sla")).toBe(false);
  });
});

describe("printerConfig", () => {
  it("continuous sla uses dead zone membrane no peel fast print", () => {
    expect(printerConfig("continuous_sla")).toBe("continuous_sla_printer_dead_zone_membrane_no_peel_fast_print");
  });
});

describe("bestUse", () => {
  it("micro sla for microfluidic chip sub micron channel optic", () => {
    expect(bestUse("micro_sla")).toBe("microfluidic_chip_micro_sla_printer_sub_micron_channel_optic");
  });
});

describe("slaPrinterTypes", () => {
  it("returns 5 types", () => {
    expect(slaPrinterTypes()).toHaveLength(5);
  });
});
