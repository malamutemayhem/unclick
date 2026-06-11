import { describe, it, expect } from "vitest";
import {
  resolution, throughput, layerUniformity, buildVolume,
  dpCost, fullLayer, forJewelry, printerConfig,
  bestUse, dlpPrinterTypes,
} from "../dlp-printer-calc.js";

describe("resolution", () => {
  it("micro dlp best resolution", () => {
    expect(resolution("micro_dlp")).toBeGreaterThan(resolution("continuous_dlp"));
  });
});

describe("throughput", () => {
  it("production dlp highest throughput", () => {
    expect(throughput("production_dlp")).toBeGreaterThan(throughput("multi_material_dlp"));
  });
});

describe("layerUniformity", () => {
  it("micro dlp best layer uniformity", () => {
    expect(layerUniformity("micro_dlp")).toBeGreaterThan(layerUniformity("continuous_dlp"));
  });
});

describe("buildVolume", () => {
  it("production dlp best build volume", () => {
    expect(buildVolume("production_dlp")).toBeGreaterThan(buildVolume("micro_dlp"));
  });
});

describe("dpCost", () => {
  it("micro dlp most expensive", () => {
    expect(dpCost("micro_dlp")).toBeGreaterThan(dpCost("desktop_dlp"));
  });
});

describe("fullLayer", () => {
  it("desktop dlp is full layer", () => {
    expect(fullLayer("desktop_dlp")).toBe(true);
  });
});

describe("forJewelry", () => {
  it("desktop dlp for jewelry", () => {
    expect(forJewelry("desktop_dlp")).toBe(true);
  });
  it("production dlp not for jewelry", () => {
    expect(forJewelry("production_dlp")).toBe(false);
  });
});

describe("printerConfig", () => {
  it("multi material dlp uses swap vat rinse multi resin per layer", () => {
    expect(printerConfig("multi_material_dlp")).toBe("multi_material_dlp_printer_swap_vat_rinse_multi_resin_per_layer");
  });
});

describe("bestUse", () => {
  it("production dlp for dental aligner batch tray fast serial", () => {
    expect(bestUse("production_dlp")).toBe("dental_aligner_production_dlp_printer_batch_tray_fast_serial");
  });
});

describe("dlpPrinterTypes", () => {
  it("returns 5 types", () => {
    expect(dlpPrinterTypes()).toHaveLength(5);
  });
});
