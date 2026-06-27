import { describe, it, expect } from "vitest";
import {
  shapeControl, detailWork, clayRemoval, surfaceFinish,
  toolCost, forThrowing, removesDay, toolMaterial,
  bestStage, clayTools,
} from "../clay-tool-calc.js";

describe("shapeControl", () => {
  it("wooden rib shape best shape control", () => {
    expect(shapeControl("wooden_rib_shape")).toBeGreaterThan(shapeControl("sponge_compress_water"));
  });
});

describe("detailWork", () => {
  it("needle detail score best detail work", () => {
    expect(detailWork("needle_detail_score")).toBeGreaterThan(detailWork("sponge_compress_water"));
  });
});

describe("clayRemoval", () => {
  it("wire loop trim best clay removal", () => {
    expect(clayRemoval("wire_loop_trim")).toBeGreaterThan(clayRemoval("sponge_compress_water"));
  });
});

describe("surfaceFinish", () => {
  it("metal kidney smooth best surface finish", () => {
    expect(surfaceFinish("metal_kidney_smooth")).toBeGreaterThan(surfaceFinish("needle_detail_score"));
  });
});

describe("toolCost", () => {
  it("metal kidney smooth more expensive than wire loop", () => {
    expect(toolCost("metal_kidney_smooth")).toBeGreaterThan(toolCost("wire_loop_trim"));
  });
});

describe("forThrowing", () => {
  it("wooden rib shape is for throwing", () => {
    expect(forThrowing("wooden_rib_shape")).toBe(true);
  });
  it("wire loop trim is not for throwing", () => {
    expect(forThrowing("wire_loop_trim")).toBe(false);
  });
});

describe("removesDay", () => {
  it("wire loop trim removes clay", () => {
    expect(removesDay("wire_loop_trim")).toBe(true);
  });
  it("wooden rib shape does not remove clay", () => {
    expect(removesDay("wooden_rib_shape")).toBe(false);
  });
});

describe("toolMaterial", () => {
  it("sponge compress water uses natural sea sponge", () => {
    expect(toolMaterial("sponge_compress_water")).toBe("natural_sea_sponge");
  });
});

describe("bestStage", () => {
  it("wooden rib shape best for wet throwing form", () => {
    expect(bestStage("wooden_rib_shape")).toBe("wet_throwing_form");
  });
});

describe("clayTools", () => {
  it("returns 5 types", () => {
    expect(clayTools()).toHaveLength(5);
  });
});
