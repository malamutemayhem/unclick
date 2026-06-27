import { describe, it, expect } from "vitest";
import {
  buoyancy, gripComfort, dragProfile, durability,
  boardCost, multiUse, chlorineResist, coreMaterial,
  bestSwimmer, kickboards,
} from "../kickboard-calc.js";

describe("buoyancy", () => {
  it("standard foam flat most buoyancy", () => {
    expect(buoyancy("standard_foam_flat")).toBeGreaterThan(buoyancy("torpedo_streamline_speed"));
  });
});

describe("gripComfort", () => {
  it("ergonomic contour grip best grip comfort", () => {
    expect(gripComfort("ergonomic_contour_grip")).toBeGreaterThan(gripComfort("standard_foam_flat"));
  });
});

describe("dragProfile", () => {
  it("torpedo streamline speed best drag profile", () => {
    expect(dragProfile("torpedo_streamline_speed")).toBeGreaterThan(dragProfile("standard_foam_flat"));
  });
});

describe("durability", () => {
  it("torpedo streamline speed most durable", () => {
    expect(durability("torpedo_streamline_speed")).toBeGreaterThan(durability("junior_small_light"));
  });
});

describe("boardCost", () => {
  it("ergonomic contour grip most expensive", () => {
    expect(boardCost("ergonomic_contour_grip")).toBeGreaterThan(boardCost("standard_foam_flat"));
  });
});

describe("multiUse", () => {
  it("pull buoy combo dual is multi use", () => {
    expect(multiUse("pull_buoy_combo_dual")).toBe(true);
  });
  it("standard foam flat is not multi use", () => {
    expect(multiUse("standard_foam_flat")).toBe(false);
  });
});

describe("chlorineResist", () => {
  it("all kickboards are chlorine resistant", () => {
    expect(chlorineResist("standard_foam_flat")).toBe(true);
    expect(chlorineResist("torpedo_streamline_speed")).toBe(true);
  });
});

describe("coreMaterial", () => {
  it("torpedo streamline speed uses hydrodynamic eva shell", () => {
    expect(coreMaterial("torpedo_streamline_speed")).toBe("hydrodynamic_eva_shell");
  });
});

describe("bestSwimmer", () => {
  it("ergonomic contour grip best for distance endurance", () => {
    expect(bestSwimmer("ergonomic_contour_grip")).toBe("distance_endurance");
  });
});

describe("kickboards", () => {
  it("returns 5 types", () => {
    expect(kickboards()).toHaveLength(5);
  });
});
