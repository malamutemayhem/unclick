import { describe, it, expect } from "vitest";
import {
  filtration, capacity, biodiversity, maintenance,
  bwCost, permanentWater, forUrban, media,
  bestUse, bioswaleTypes,
} from "../bioswale-calc.js";

describe("filtration", () => {
  it("wetland best filtration", () => {
    expect(filtration("constructed_wetland_cell")).toBeGreaterThan(filtration("vegetated_channel_linear"));
  });
});

describe("capacity", () => {
  it("wetland highest capacity", () => {
    expect(capacity("constructed_wetland_cell")).toBeGreaterThan(capacity("bioretention_rain_garden"));
  });
});

describe("biodiversity", () => {
  it("wetland most biodiverse", () => {
    expect(biodiversity("constructed_wetland_cell")).toBeGreaterThan(biodiversity("vegetated_channel_linear"));
  });
});

describe("maintenance", () => {
  it("vegetated lowest maintenance", () => {
    expect(maintenance("vegetated_channel_linear")).toBeGreaterThan(maintenance("constructed_wetland_cell"));
  });
});

describe("bwCost", () => {
  it("wetland most expensive", () => {
    expect(bwCost("constructed_wetland_cell")).toBeGreaterThan(bwCost("vegetated_channel_linear"));
  });
});

describe("permanentWater", () => {
  it("wet swale has permanent water", () => {
    expect(permanentWater("wet_swale_permanent_pool")).toBe(true);
  });
  it("dry swale no permanent water", () => {
    expect(permanentWater("dry_swale_underdrain")).toBe(false);
  });
});

describe("forUrban", () => {
  it("bioretention for urban", () => {
    expect(forUrban("bioretention_rain_garden")).toBe(true);
  });
  it("wetland not urban", () => {
    expect(forUrban("constructed_wetland_cell")).toBe(false);
  });
});

describe("media", () => {
  it("bioretention uses sand compost", () => {
    expect(media("bioretention_rain_garden")).toBe("sand_compost_mulch_filter_bed");
  });
});

describe("bestUse", () => {
  it("vegetated for parking lot", () => {
    expect(bestUse("vegetated_channel_linear")).toBe("parking_lot_edge_road_median");
  });
});

describe("bioswaleTypes", () => {
  it("returns 5 types", () => {
    expect(bioswaleTypes()).toHaveLength(5);
  });
});
