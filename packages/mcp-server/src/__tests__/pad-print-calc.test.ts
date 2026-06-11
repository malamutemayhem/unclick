import { describe, it, expect } from "vitest";
import {
  speed, detail, colorCount, registration,
  ppCost, sealed, forRound, transfer,
  bestUse, padPrintTypes,
} from "../pad-print-calc.js";

describe("speed", () => {
  it("rotary multi station fastest", () => {
    expect(speed("rotary_multi_station")).toBeGreaterThan(speed("micro_pad_fine_detail"));
  });
});

describe("detail", () => {
  it("micro pad best detail", () => {
    expect(detail("micro_pad_fine_detail")).toBeGreaterThan(detail("open_inkwell_single_color"));
  });
});

describe("colorCount", () => {
  it("rotary most colors", () => {
    expect(colorCount("rotary_multi_station")).toBeGreaterThan(colorCount("open_inkwell_single_color"));
  });
});

describe("registration", () => {
  it("rotary best registration", () => {
    expect(registration("rotary_multi_station")).toBeGreaterThan(registration("open_inkwell_single_color"));
  });
});

describe("ppCost", () => {
  it("rotary most expensive", () => {
    expect(ppCost("rotary_multi_station")).toBeGreaterThan(ppCost("open_inkwell_single_color"));
  });
});

describe("sealed", () => {
  it("sealed cup is sealed", () => {
    expect(sealed("sealed_cup_enclosed")).toBe(true);
  });
  it("open inkwell not sealed", () => {
    expect(sealed("open_inkwell_single_color")).toBe(false);
  });
});

describe("forRound", () => {
  it("all pad print for round objects", () => {
    expect(forRound("open_inkwell_single_color")).toBe(true);
  });
});

describe("transfer", () => {
  it("micro pad uses fine etch", () => {
    expect(transfer("micro_pad_fine_detail")).toBe("micro_silicone_tip_fine_etch");
  });
});

describe("bestUse", () => {
  it("open inkwell for single color logo", () => {
    expect(bestUse("open_inkwell_single_color")).toBe("single_color_logo_promotional");
  });
});

describe("padPrintTypes", () => {
  it("returns 5 types", () => {
    expect(padPrintTypes()).toHaveLength(5);
  });
});
