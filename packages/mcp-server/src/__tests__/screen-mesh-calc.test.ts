import { describe, it, expect } from "vitest";
import {
  inkDeposit, detailCapture, durability, tensionHold,
  meshCost, forTextile, forHalftone, threadType,
  bestPrint, screenMeshes,
} from "../screen-mesh-calc.js";

describe("inkDeposit", () => {
  it("low mesh textile most ink deposit", () => {
    expect(inkDeposit("low_mesh_textile")).toBeGreaterThan(inkDeposit("high_mesh_halftone"));
  });
});

describe("detailCapture", () => {
  it("ultra fine photo best detail capture", () => {
    expect(detailCapture("ultra_fine_photo")).toBeGreaterThan(detailCapture("low_mesh_textile"));
  });
});

describe("durability", () => {
  it("monofilament polyester most durable", () => {
    expect(durability("monofilament_polyester")).toBeGreaterThan(durability("ultra_fine_photo"));
  });
});

describe("tensionHold", () => {
  it("monofilament polyester best tension hold", () => {
    expect(tensionHold("monofilament_polyester")).toBeGreaterThan(tensionHold("low_mesh_textile"));
  });
});

describe("meshCost", () => {
  it("ultra fine photo more expensive than low mesh", () => {
    expect(meshCost("ultra_fine_photo")).toBeGreaterThan(meshCost("low_mesh_textile"));
  });
});

describe("forTextile", () => {
  it("low mesh textile is for textile", () => {
    expect(forTextile("low_mesh_textile")).toBe(true);
  });
  it("high mesh halftone is not for textile", () => {
    expect(forTextile("high_mesh_halftone")).toBe(false);
  });
});

describe("forHalftone", () => {
  it("high mesh halftone is for halftone", () => {
    expect(forHalftone("high_mesh_halftone")).toBe(true);
  });
  it("low mesh textile is not for halftone", () => {
    expect(forHalftone("low_mesh_textile")).toBe(false);
  });
});

describe("threadType", () => {
  it("ultra fine photo uses stainless steel mesh", () => {
    expect(threadType("ultra_fine_photo")).toBe("stainless_steel_mesh");
  });
});

describe("bestPrint", () => {
  it("low mesh textile best for heavy ink garment", () => {
    expect(bestPrint("low_mesh_textile")).toBe("heavy_ink_garment");
  });
});

describe("screenMeshes", () => {
  it("returns 5 types", () => {
    expect(screenMeshes()).toHaveLength(5);
  });
});
