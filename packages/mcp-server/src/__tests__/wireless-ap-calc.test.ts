import { describe, it, expect } from "vitest";
import {
  throughput, coverage, density, reliability,
  apCost, wifi6e, forOutdoor, antenna,
  bestUse, wirelessApTypes,
} from "../wireless-ap-calc.js";

describe("throughput", () => {
  it("stadium highest throughput", () => {
    expect(throughput("high_density_stadium")).toBeGreaterThan(throughput("wall_plate_hotel_room"));
  });
});

describe("coverage", () => {
  it("outdoor widest coverage", () => {
    expect(coverage("outdoor_mesh_hardened")).toBeGreaterThan(coverage("wall_plate_hotel_room"));
  });
});

describe("density", () => {
  it("stadium highest density", () => {
    expect(density("high_density_stadium")).toBeGreaterThan(density("outdoor_mesh_hardened"));
  });
});

describe("reliability", () => {
  it("industrial most reliable", () => {
    expect(reliability("industrial_hazardous_loc")).toBeGreaterThan(reliability("wall_plate_hotel_room"));
  });
});

describe("apCost", () => {
  it("stadium most expensive", () => {
    expect(apCost("high_density_stadium")).toBeGreaterThan(apCost("wall_plate_hotel_room"));
  });
});

describe("wifi6e", () => {
  it("indoor ceiling has wifi6e", () => {
    expect(wifi6e("indoor_ceiling_wifi6e")).toBe(true);
  });
  it("wall plate no wifi6e", () => {
    expect(wifi6e("wall_plate_hotel_room")).toBe(false);
  });
});

describe("forOutdoor", () => {
  it("outdoor mesh for outdoor", () => {
    expect(forOutdoor("outdoor_mesh_hardened")).toBe(true);
  });
  it("indoor ceiling not outdoor", () => {
    expect(forOutdoor("indoor_ceiling_wifi6e")).toBe(false);
  });
});

describe("antenna", () => {
  it("stadium uses 8x8 mimo", () => {
    expect(antenna("high_density_stadium")).toBe("internal_8x8_mu_mimo_bss");
  });
});

describe("bestUse", () => {
  it("industrial for refinery mine", () => {
    expect(bestUse("industrial_hazardous_loc")).toBe("refinery_mine_hazardous_area");
  });
});

describe("wirelessApTypes", () => {
  it("returns 5 types", () => {
    expect(wirelessApTypes()).toHaveLength(5);
  });
});
