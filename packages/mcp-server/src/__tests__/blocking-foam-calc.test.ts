import { describe, it, expect } from "vitest";
import {
  pinSupport, portability, surfaceSmoothness, coverage,
  foamCost, waterproof, stackable, foamMaterial,
  bestUse, blockingFoams,
} from "../blocking-foam-calc.js";

describe("pinSupport", () => {
  it("thick dense firm best pin support", () => {
    expect(pinSupport("thick_dense_firm")).toBeGreaterThan(pinSupport("thin_portable_light"));
  });
});

describe("portability", () => {
  it("thin portable light most portable", () => {
    expect(portability("thin_portable_light")).toBeGreaterThan(portability("extra_large_blanket"));
  });
});

describe("surfaceSmoothness", () => {
  it("waterproof closed cell smoothest surface", () => {
    expect(surfaceSmoothness("waterproof_closed_cell")).toBeGreaterThan(surfaceSmoothness("thin_portable_light"));
  });
});

describe("coverage", () => {
  it("extra large blanket most coverage", () => {
    expect(coverage("extra_large_blanket")).toBeGreaterThan(coverage("contoured_shaped_edge"));
  });
});

describe("foamCost", () => {
  it("extra large blanket most expensive", () => {
    expect(foamCost("extra_large_blanket")).toBeGreaterThan(foamCost("thin_portable_light"));
  });
});

describe("waterproof", () => {
  it("waterproof closed cell is waterproof", () => {
    expect(waterproof("waterproof_closed_cell")).toBe(true);
  });
  it("thick dense firm is not waterproof", () => {
    expect(waterproof("thick_dense_firm")).toBe(false);
  });
});

describe("stackable", () => {
  it("thick dense firm is stackable", () => {
    expect(stackable("thick_dense_firm")).toBe(true);
  });
  it("contoured shaped edge is not stackable", () => {
    expect(stackable("contoured_shaped_edge")).toBe(false);
  });
});

describe("foamMaterial", () => {
  it("waterproof closed cell uses closed cell neoprene", () => {
    expect(foamMaterial("waterproof_closed_cell")).toBe("closed_cell_neoprene");
  });
});

describe("bestUse", () => {
  it("extra large blanket best for blanket afghan large", () => {
    expect(bestUse("extra_large_blanket")).toBe("blanket_afghan_large");
  });
});

describe("blockingFoams", () => {
  it("returns 5 types", () => {
    expect(blockingFoams()).toHaveLength(5);
  });
});
