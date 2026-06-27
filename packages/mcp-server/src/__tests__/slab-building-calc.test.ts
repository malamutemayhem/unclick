import { describe, it, expect } from "vitest";
import {
  thicknessMm, workTimeMinutes, warpingRisk,
  surfaceDetail, structuralStrength, moldRequired,
  joinable, bestProject, skillRequired, slabTechniques,
} from "../slab-building-calc.js";

describe("thicknessMm", () => {
  it("laminated slab is thickest", () => {
    expect(thicknessMm("laminated_slab")).toBeGreaterThan(
      thicknessMm("draped_slab")
    );
  });
});

describe("workTimeMinutes", () => {
  it("laminated slab takes longest", () => {
    expect(workTimeMinutes("laminated_slab")).toBeGreaterThan(
      workTimeMinutes("soft_slab")
    );
  });
});

describe("warpingRisk", () => {
  it("soft slab warps most", () => {
    expect(warpingRisk("soft_slab")).toBeGreaterThan(
      warpingRisk("laminated_slab")
    );
  });
});

describe("surfaceDetail", () => {
  it("textured slab has most detail", () => {
    expect(surfaceDetail("textured_slab")).toBeGreaterThan(
      surfaceDetail("soft_slab")
    );
  });
});

describe("structuralStrength", () => {
  it("laminated slab is strongest", () => {
    expect(structuralStrength("laminated_slab")).toBeGreaterThan(
      structuralStrength("soft_slab")
    );
  });
});

describe("moldRequired", () => {
  it("draped slab needs mold", () => {
    expect(moldRequired("draped_slab")).toBe(true);
  });
  it("hard slab does not", () => {
    expect(moldRequired("hard_slab")).toBe(false);
  });
});

describe("joinable", () => {
  it("hard slab is joinable", () => {
    expect(joinable("hard_slab")).toBe(true);
  });
  it("draped slab is not", () => {
    expect(joinable("draped_slab")).toBe(false);
  });
});

describe("bestProject", () => {
  it("hard slab best for box construction", () => {
    expect(bestProject("hard_slab")).toBe("box_construction");
  });
});

describe("skillRequired", () => {
  it("laminated slab needs most skill", () => {
    expect(skillRequired("laminated_slab")).toBeGreaterThan(
      skillRequired("soft_slab")
    );
  });
});

describe("slabTechniques", () => {
  it("returns 5 techniques", () => {
    expect(slabTechniques()).toHaveLength(5);
  });
});
