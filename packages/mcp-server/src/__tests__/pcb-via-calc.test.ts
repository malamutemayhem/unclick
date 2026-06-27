import { describe, it, expect } from "vitest";
import {
  density, signalPerf, reliability, thermal,
  viaCost, filled, forBga, process,
  bestUse, pcbVias,
} from "../pcb-via-calc.js";

describe("density", () => {
  it("microvia hdi highest density", () => {
    expect(density("microvia_hdi")).toBeGreaterThan(density("through_hole_standard"));
  });
});

describe("signalPerf", () => {
  it("via in pad filled best signal performance", () => {
    expect(signalPerf("via_in_pad_filled")).toBeGreaterThan(signalPerf("through_hole_standard"));
  });
});

describe("reliability", () => {
  it("through hole standard most reliable", () => {
    expect(reliability("through_hole_standard")).toBeGreaterThan(reliability("microvia_hdi"));
  });
});

describe("thermal", () => {
  it("via in pad filled best thermal", () => {
    expect(thermal("via_in_pad_filled")).toBeGreaterThan(thermal("microvia_hdi"));
  });
});

describe("viaCost", () => {
  it("microvia hdi most expensive", () => {
    expect(viaCost("microvia_hdi")).toBeGreaterThan(viaCost("through_hole_standard"));
  });
});

describe("filled", () => {
  it("via in pad filled is filled", () => {
    expect(filled("via_in_pad_filled")).toBe(true);
  });
  it("through hole standard not filled", () => {
    expect(filled("through_hole_standard")).toBe(false);
  });
});

describe("forBga", () => {
  it("via in pad filled for bga", () => {
    expect(forBga("via_in_pad_filled")).toBe(true);
  });
  it("through hole standard not for bga", () => {
    expect(forBga("through_hole_standard")).toBe(false);
  });
});

describe("process", () => {
  it("microvia hdi uses laser ablation sequential", () => {
    expect(process("microvia_hdi")).toBe("laser_ablation_sequential");
  });
});

describe("bestUse", () => {
  it("via in pad filled best for bga thermal pad connect", () => {
    expect(bestUse("via_in_pad_filled")).toBe("bga_thermal_pad_connect");
  });
});

describe("pcbVias", () => {
  it("returns 5 types", () => {
    expect(pcbVias()).toHaveLength(5);
  });
});
