import { describe, it, expect } from "vitest";
import {
  surfacePrep, paperLayers, adhesiveAmount, sealerCoats,
  dryingTimeMin, totalDryingTime, paperNeeded, wrinklePrevention,
  cuttingTool, projectTime, costEstimate, surfaceTypes,
} from "../decoupage-calc.js";

describe("surfacePrep", () => {
  it("wood needs sanding", () => {
    expect(surfacePrep("wood")).toContain("sand");
  });
  it("glass needs alcohol", () => {
    expect(surfacePrep("glass")).toContain("alcohol");
  });
});

describe("paperLayers", () => {
  it("tissue = 5 layers", () => {
    expect(paperLayers("tissue")).toBe(5);
  });
  it("cardstock = 1 layer", () => {
    expect(paperLayers("cardstock")).toBe(1);
  });
});

describe("adhesiveAmount", () => {
  it("positive ml", () => {
    expect(adhesiveAmount(200, 3)).toBeGreaterThan(0);
  });
});

describe("sealerCoats", () => {
  it("resin needs fewest coats", () => {
    expect(sealerCoats("resin")).toBeLessThan(sealerCoats("pva"));
  });
});

describe("dryingTimeMin", () => {
  it("resin takes longest", () => {
    expect(dryingTimeMin("resin")).toBeGreaterThan(dryingTimeMin("mod_podge"));
  });
});

describe("totalDryingTime", () => {
  it("3 coats x 20 min = 60", () => {
    expect(totalDryingTime(3, 20)).toBe(60);
  });
});

describe("paperNeeded", () => {
  it("more than area with overlap", () => {
    expect(paperNeeded(200)).toBeGreaterThan(200);
  });
});

describe("wrinklePrevention", () => {
  it("returns instructions", () => {
    expect(typeof wrinklePrevention("tissue")).toBe("string");
  });
});

describe("cuttingTool", () => {
  it("tissue = tear", () => {
    expect(cuttingTool("tissue")).toContain("tear");
  });
});

describe("projectTime", () => {
  it("positive minutes", () => {
    expect(projectTime(200, 3, "mod_podge")).toBeGreaterThan(0);
  });
});

describe("costEstimate", () => {
  it("positive cost", () => {
    expect(costEstimate(200, "mod_podge")).toBeGreaterThan(0);
  });
});

describe("surfaceTypes", () => {
  it("returns 6 types", () => {
    expect(surfaceTypes()).toHaveLength(6);
  });
});
