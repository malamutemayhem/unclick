import { describe, it, expect } from "vitest";
import {
  printAccuracy, speed, repeatability, flexibility,
  stCost, automated, forFinePitch, print,
  bestUse, stencilPrinterTypes,
} from "../stencil-printer-calc.js";

describe("printAccuracy", () => {
  it("jet printer most accurate", () => {
    expect(printAccuracy("jet_printer")).toBeGreaterThan(printAccuracy("manual_frame"));
  });
});

describe("speed", () => {
  it("dual platform fastest", () => {
    expect(speed("dual_platform")).toBeGreaterThan(speed("manual_frame"));
  });
});

describe("repeatability", () => {
  it("jet printer best repeatability", () => {
    expect(repeatability("jet_printer")).toBeGreaterThan(repeatability("manual_frame"));
  });
});

describe("flexibility", () => {
  it("jet printer most flexible", () => {
    expect(flexibility("jet_printer")).toBeGreaterThan(flexibility("full_auto_inline"));
  });
});

describe("stCost", () => {
  it("jet printer most expensive", () => {
    expect(stCost("jet_printer")).toBeGreaterThan(stCost("manual_frame"));
  });
});

describe("automated", () => {
  it("full auto inline is automated", () => {
    expect(automated("full_auto_inline")).toBe(true);
  });
  it("manual frame not automated", () => {
    expect(automated("manual_frame")).toBe(false);
  });
});

describe("forFinePitch", () => {
  it("full auto inline for fine pitch", () => {
    expect(forFinePitch("full_auto_inline")).toBe(true);
  });
  it("manual frame not for fine pitch", () => {
    expect(forFinePitch("manual_frame")).toBe(false);
  });
});

describe("print", () => {
  it("jet printer uses non contact dispense", () => {
    expect(print("jet_printer")).toBe("non_contact_jet_dispense_no_stencil_digital_pattern_paste");
  });
});

describe("bestUse", () => {
  it("dual platform for ultra high volume", () => {
    expect(bestUse("dual_platform")).toBe("ultra_high_volume_line_zero_idle_time_maximum_throughput");
  });
});

describe("stencilPrinterTypes", () => {
  it("returns 5 types", () => {
    expect(stencilPrinterTypes()).toHaveLength(5);
  });
});
