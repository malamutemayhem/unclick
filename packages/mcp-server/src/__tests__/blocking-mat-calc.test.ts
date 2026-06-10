import { describe, it, expect } from "vitest";
import {
  surfaceArea, pinHold, portability, waterResist,
  matCost, hasGrid, expandable, matMaterial,
  bestUse, blockingMats,
} from "../blocking-mat-calc.js";

describe("surfaceArea", () => {
  it("interlocking foam grid largest area", () => {
    expect(surfaceArea("interlocking_foam_grid")).toBeGreaterThan(surfaceArea("wool_pressing_thick"));
  });
});

describe("pinHold", () => {
  it("cork board natural best pin hold", () => {
    expect(pinHold("cork_board_natural")).toBeGreaterThan(pinHold("rubber_grid_roll"));
  });
});

describe("portability", () => {
  it("rubber grid roll most portable", () => {
    expect(portability("rubber_grid_roll")).toBeGreaterThan(portability("cork_board_natural"));
  });
});

describe("waterResist", () => {
  it("rubber grid roll best water resistance", () => {
    expect(waterResist("rubber_grid_roll")).toBeGreaterThan(waterResist("wool_pressing_thick"));
  });
});

describe("matCost", () => {
  it("wool pressing thick most expensive", () => {
    expect(matCost("wool_pressing_thick")).toBeGreaterThan(matCost("interlocking_foam_grid"));
  });
});

describe("hasGrid", () => {
  it("interlocking foam grid has grid", () => {
    expect(hasGrid("interlocking_foam_grid")).toBe(true);
  });
  it("cork board natural has no grid", () => {
    expect(hasGrid("cork_board_natural")).toBe(false);
  });
});

describe("expandable", () => {
  it("interlocking foam grid is expandable", () => {
    expect(expandable("interlocking_foam_grid")).toBe(true);
  });
  it("rubber grid roll is not expandable", () => {
    expect(expandable("rubber_grid_roll")).toBe(false);
  });
});

describe("matMaterial", () => {
  it("cork board natural uses compressed cork slab", () => {
    expect(matMaterial("cork_board_natural")).toBe("compressed_cork_slab");
  });
});

describe("bestUse", () => {
  it("interlocking foam grid best for large shawl blanket", () => {
    expect(bestUse("interlocking_foam_grid")).toBe("large_shawl_blanket");
  });
});

describe("blockingMats", () => {
  it("returns 5 types", () => {
    expect(blockingMats()).toHaveLength(5);
  });
});
