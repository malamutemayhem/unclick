import { describe, it, expect } from "vitest";
import {
  heatTransfer, compactness, pressureRating, cleanability,
  phCost, expandable, forCorrosive, construction,
  bestUse, plateHeatExchangerTypes,
} from "../plate-heat-exchanger-calc.js";

describe("heatTransfer", () => {
  it("plate fin best heat transfer", () => {
    expect(heatTransfer("plate_fin_aluminum")).toBeGreaterThan(heatTransfer("welded_plate_block"));
  });
});

describe("compactness", () => {
  it("plate fin most compact", () => {
    expect(compactness("plate_fin_aluminum")).toBeGreaterThan(compactness("welded_plate_block"));
  });
});

describe("pressureRating", () => {
  it("welded plate highest pressure rating", () => {
    expect(pressureRating("welded_plate_block")).toBeGreaterThan(pressureRating("gasketed_plate_frame"));
  });
});

describe("cleanability", () => {
  it("gasketed plate best cleanability", () => {
    expect(cleanability("gasketed_plate_frame")).toBeGreaterThan(cleanability("brazed_plate_compact"));
  });
});

describe("phCost", () => {
  it("plate fin most expensive", () => {
    expect(phCost("plate_fin_aluminum")).toBeGreaterThan(phCost("brazed_plate_compact"));
  });
});

describe("expandable", () => {
  it("gasketed plate is expandable", () => {
    expect(expandable("gasketed_plate_frame")).toBe(true);
  });
  it("brazed plate not expandable", () => {
    expect(expandable("brazed_plate_compact")).toBe(false);
  });
});

describe("forCorrosive", () => {
  it("welded plate for corrosive", () => {
    expect(forCorrosive("welded_plate_block")).toBe(true);
  });
  it("gasketed plate not for corrosive", () => {
    expect(forCorrosive("gasketed_plate_frame")).toBe(false);
  });
});

describe("construction", () => {
  it("brazed plate uses copper brazed", () => {
    expect(construction("brazed_plate_compact")).toBe("copper_brazed_stainless_plates_no_gasket");
  });
});

describe("bestUse", () => {
  it("plate fin for cryogenic", () => {
    expect(bestUse("plate_fin_aluminum")).toBe("cryogenic_air_separation_lng_multi_stream");
  });
});

describe("plateHeatExchangerTypes", () => {
  it("returns 5 types", () => {
    expect(plateHeatExchangerTypes()).toHaveLength(5);
  });
});
