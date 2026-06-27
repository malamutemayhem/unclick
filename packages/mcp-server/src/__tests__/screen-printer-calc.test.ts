import { describe, it, expect } from "vitest";
import {
  printPrecision, throughput, inkDeposit, setupSpeed,
  spCost, automated, forTextile, printerConfig,
  bestUse, screenPrinterTypes,
} from "../screen-printer-calc.js";

describe("printPrecision", () => {
  it("smt stencil best print precision", () => {
    expect(printPrecision("smt_stencil")).toBeGreaterThan(printPrecision("flatbed_manual"));
  });
});

describe("throughput", () => {
  it("cylinder rotary highest throughput", () => {
    expect(throughput("cylinder_rotary")).toBeGreaterThan(throughput("flatbed_manual"));
  });
});

describe("inkDeposit", () => {
  it("smt stencil best ink deposit", () => {
    expect(inkDeposit("smt_stencil")).toBeGreaterThan(inkDeposit("cylinder_rotary"));
  });
});

describe("setupSpeed", () => {
  it("flatbed manual fastest setup", () => {
    expect(setupSpeed("flatbed_manual")).toBeGreaterThan(setupSpeed("cylinder_rotary"));
  });
});

describe("spCost", () => {
  it("smt stencil most expensive", () => {
    expect(spCost("smt_stencil")).toBeGreaterThan(spCost("flatbed_manual"));
  });
});

describe("automated", () => {
  it("flatbed auto is automated", () => {
    expect(automated("flatbed_auto")).toBe(true);
  });
  it("flatbed manual not automated", () => {
    expect(automated("flatbed_manual")).toBe(false);
  });
});

describe("forTextile", () => {
  it("carousel textile for textile", () => {
    expect(forTextile("carousel_textile")).toBe(true);
  });
  it("smt stencil not for textile", () => {
    expect(forTextile("smt_stencil")).toBe(false);
  });
});

describe("printerConfig", () => {
  it("carousel textile uses multi station rotate index", () => {
    expect(printerConfig("carousel_textile")).toBe("carousel_textile_screen_printer_multi_station_rotate_index");
  });
});

describe("bestUse", () => {
  it("smt stencil for electronics solder paste pcb assembly", () => {
    expect(bestUse("smt_stencil")).toBe("electronics_smt_stencil_printer_solder_paste_pcb_assembly");
  });
});

describe("screenPrinterTypes", () => {
  it("returns 5 types", () => {
    expect(screenPrinterTypes()).toHaveLength(5);
  });
});
