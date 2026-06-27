import { describe, it, expect } from "vitest";
import {
  inkPush, edgeSharpness, inkDeposit, bladeLife,
  squeegeeCost, forGraphic, forFloodCoat, bladeMaterial,
  bestPrint, printSqueegees,
} from "../print-squeegee-calc.js";

describe("inkPush", () => {
  it("sharp edge graphic best ink push", () => {
    expect(inkPush("sharp_edge_graphic")).toBeGreaterThan(inkPush("flat_edge_flood"));
  });
});

describe("edgeSharpness", () => {
  it("sharp edge graphic sharpest edge", () => {
    expect(edgeSharpness("sharp_edge_graphic")).toBeGreaterThan(edgeSharpness("round_edge_textile"));
  });
});

describe("inkDeposit", () => {
  it("flat edge flood most ink deposit", () => {
    expect(inkDeposit("flat_edge_flood")).toBeGreaterThan(inkDeposit("sharp_edge_graphic"));
  });
});

describe("bladeLife", () => {
  it("composite dual blade longest blade life", () => {
    expect(bladeLife("composite_dual_blade")).toBeGreaterThan(bladeLife("v_notch_specialty"));
  });
});

describe("squeegeeCost", () => {
  it("v notch specialty more expensive than round edge", () => {
    expect(squeegeeCost("v_notch_specialty")).toBeGreaterThan(squeegeeCost("round_edge_textile"));
  });
});

describe("forGraphic", () => {
  it("sharp edge graphic is for graphic", () => {
    expect(forGraphic("sharp_edge_graphic")).toBe(true);
  });
  it("round edge textile is not for graphic", () => {
    expect(forGraphic("round_edge_textile")).toBe(false);
  });
});

describe("forFloodCoat", () => {
  it("flat edge flood is for flood coat", () => {
    expect(forFloodCoat("flat_edge_flood")).toBe(true);
  });
  it("sharp edge graphic is not for flood coat", () => {
    expect(forFloodCoat("sharp_edge_graphic")).toBe(false);
  });
});

describe("bladeMaterial", () => {
  it("composite dual blade uses dual layer sandwich", () => {
    expect(bladeMaterial("composite_dual_blade")).toBe("dual_layer_sandwich");
  });
});

describe("bestPrint", () => {
  it("round edge textile best for thick ink garment", () => {
    expect(bestPrint("round_edge_textile")).toBe("thick_ink_garment");
  });
});

describe("printSqueegees", () => {
  it("returns 5 types", () => {
    expect(printSqueegees()).toHaveLength(5);
  });
});
