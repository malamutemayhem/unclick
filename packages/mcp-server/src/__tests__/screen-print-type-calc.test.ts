import { describe, it, expect } from "vitest";
import {
  speed, inkDeposit, detail, versatility,
  spCost, rotary, forTextile, mesh,
  bestUse, screenPrintTypes,
} from "../screen-print-type-calc.js";

describe("speed", () => {
  it("rotary screen fastest", () => {
    expect(speed("rotary_screen_continuous")).toBeGreaterThan(speed("flatbed_manual_clamp"));
  });
});

describe("inkDeposit", () => {
  it("stencil highest ink deposit", () => {
    expect(inkDeposit("stencil_solder_paste_smt")).toBeGreaterThan(inkDeposit("pad_transfer_indirect"));
  });
});

describe("detail", () => {
  it("pad transfer best detail", () => {
    expect(detail("pad_transfer_indirect")).toBeGreaterThan(detail("rotary_screen_continuous"));
  });
});

describe("versatility", () => {
  it("flatbed manual most versatile", () => {
    expect(versatility("flatbed_manual_clamp")).toBeGreaterThan(versatility("stencil_solder_paste_smt"));
  });
});

describe("spCost", () => {
  it("rotary most expensive", () => {
    expect(spCost("rotary_screen_continuous")).toBeGreaterThan(spCost("flatbed_manual_clamp"));
  });
});

describe("rotary", () => {
  it("rotary screen is rotary", () => {
    expect(rotary("rotary_screen_continuous")).toBe(true);
  });
  it("flatbed not rotary", () => {
    expect(rotary("flatbed_manual_clamp")).toBe(false);
  });
});

describe("forTextile", () => {
  it("flatbed for textile", () => {
    expect(forTextile("flatbed_manual_clamp")).toBe(true);
  });
  it("pad transfer not for textile", () => {
    expect(forTextile("pad_transfer_indirect")).toBe(false);
  });
});

describe("mesh", () => {
  it("stencil uses laser cut stainless", () => {
    expect(mesh("stencil_solder_paste_smt")).toBe("laser_cut_stainless_stencil");
  });
});

describe("bestUse", () => {
  it("flatbed manual for short run tshirt", () => {
    expect(bestUse("flatbed_manual_clamp")).toBe("short_run_tshirt_poster_art");
  });
});

describe("screenPrintTypes", () => {
  it("returns 5 types", () => {
    expect(screenPrintTypes()).toHaveLength(5);
  });
});
