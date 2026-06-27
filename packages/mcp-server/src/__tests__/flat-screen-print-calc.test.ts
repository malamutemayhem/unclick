import { describe, it, expect } from "vitest";
import {
  printDetail, throughput, colorLayers, registrationAccuracy,
  fspCost, automated, forLargeRepeat, tableConfig,
  bestUse, flatScreenPrintTypes,
} from "../flat-screen-print-calc.js";

describe("printDetail", () => {
  it("precision textile best print detail", () => {
    expect(printDetail("precision_textile")).toBeGreaterThan(printDetail("manual_table"));
  });
});

describe("throughput", () => {
  it("precision textile highest throughput", () => {
    expect(throughput("precision_textile")).toBeGreaterThan(throughput("manual_table"));
  });
});

describe("colorLayers", () => {
  it("precision textile and automatic flatbed most color layers", () => {
    expect(colorLayers("precision_textile")).toBeGreaterThan(colorLayers("manual_table"));
  });
});

describe("registrationAccuracy", () => {
  it("precision textile best registration accuracy", () => {
    expect(registrationAccuracy("precision_textile")).toBeGreaterThan(registrationAccuracy("manual_table"));
  });
});

describe("fspCost", () => {
  it("precision textile most expensive", () => {
    expect(fspCost("precision_textile")).toBeGreaterThan(fspCost("manual_table"));
  });
});

describe("automated", () => {
  it("automatic flatbed is automated", () => {
    expect(automated("automatic_flatbed")).toBe(true);
  });
  it("manual table not automated", () => {
    expect(automated("manual_table")).toBe(false);
  });
});

describe("forLargeRepeat", () => {
  it("walk in large format for large repeat", () => {
    expect(forLargeRepeat("walk_in_large_format")).toBe(true);
  });
  it("semi auto carousel not for large repeat", () => {
    expect(forLargeRepeat("semi_auto_carousel")).toBe(false);
  });
});

describe("tableConfig", () => {
  it("walk in large format uses oversize frame", () => {
    expect(tableConfig("walk_in_large_format")).toBe("large_format_walk_in_frame_oversize_screen_banner_panel_print");
  });
});

describe("bestUse", () => {
  it("semi auto carousel for garment tshirt", () => {
    expect(bestUse("semi_auto_carousel")).toBe("garment_tshirt_screen_print_multi_color_apparel_decoration");
  });
});

describe("flatScreenPrintTypes", () => {
  it("returns 5 types", () => {
    expect(flatScreenPrintTypes()).toHaveLength(5);
  });
});
