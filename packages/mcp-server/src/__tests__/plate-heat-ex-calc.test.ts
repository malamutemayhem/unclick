import { describe, it, expect } from "vitest";
import {
  heatTransfer, compactness, pressureLimit, maintenance,
  phCost, expandable, forCorrosive, plate,
  bestUse, plateHeatExTypes,
} from "../plate-heat-ex-calc.js";

describe("heatTransfer", () => {
  it("plate fin aluminum best heat transfer", () => {
    expect(heatTransfer("plate_fin_aluminum")).toBeGreaterThan(heatTransfer("welded_plate_block"));
  });
});

describe("compactness", () => {
  it("brazed plate most compact", () => {
    expect(compactness("brazed_plate_compact")).toBeGreaterThan(compactness("welded_plate_block"));
  });
});

describe("pressureLimit", () => {
  it("welded plate highest pressure", () => {
    expect(pressureLimit("welded_plate_block")).toBeGreaterThan(pressureLimit("gasketed_plate_frame"));
  });
});

describe("maintenance", () => {
  it("gasketed plate easiest maintenance", () => {
    expect(maintenance("gasketed_plate_frame")).toBeGreaterThan(maintenance("brazed_plate_compact"));
  });
});

describe("phCost", () => {
  it("plate fin aluminum most expensive", () => {
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

describe("plate", () => {
  it("semi welded uses alternating pairs", () => {
    expect(plate("semi_welded_hybrid")).toBe("alternating_welded_gasketed_pair");
  });
});

describe("bestUse", () => {
  it("plate fin aluminum for cryogenic lng", () => {
    expect(bestUse("plate_fin_aluminum")).toBe("cryogenic_lng_air_separation_multi");
  });
});

describe("plateHeatExTypes", () => {
  it("returns 5 types", () => {
    expect(plateHeatExTypes()).toHaveLength(5);
  });
});
