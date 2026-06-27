import { describe, it, expect } from "vitest";
import {
  cutPrecision, barConsistency, speedOutput, decorativeEdge,
  cutterCost, cutsMultiple, wavyEdge, bladeType,
  bestSoap, soapCutters,
} from "../soap-cutter-calc.js";

describe("cutPrecision", () => {
  it("log splitter slab best cut precision", () => {
    expect(cutPrecision("log_splitter_slab")).toBeGreaterThan(cutPrecision("crinkle_wave_blade"));
  });
});

describe("barConsistency", () => {
  it("wire cutter multi best bar consistency", () => {
    expect(barConsistency("wire_cutter_multi")).toBeGreaterThan(barConsistency("crinkle_wave_blade"));
  });
});

describe("speedOutput", () => {
  it("wire cutter multi fastest speed", () => {
    expect(speedOutput("wire_cutter_multi")).toBeGreaterThan(speedOutput("column_cutter_round"));
  });
});

describe("decorativeEdge", () => {
  it("crinkle wave blade best decorative edge", () => {
    expect(decorativeEdge("crinkle_wave_blade")).toBeGreaterThan(decorativeEdge("wire_cutter_multi"));
  });
});

describe("cutterCost", () => {
  it("wire cutter multi more expensive than single blade", () => {
    expect(cutterCost("wire_cutter_multi")).toBeGreaterThan(cutterCost("single_blade_straight"));
  });
});

describe("cutsMultiple", () => {
  it("wire cutter multi cuts multiple", () => {
    expect(cutsMultiple("wire_cutter_multi")).toBe(true);
  });
  it("single blade straight does not cut multiple", () => {
    expect(cutsMultiple("single_blade_straight")).toBe(false);
  });
});

describe("wavyEdge", () => {
  it("crinkle wave blade has wavy edge", () => {
    expect(wavyEdge("crinkle_wave_blade")).toBe(true);
  });
  it("wire cutter multi does not have wavy edge", () => {
    expect(wavyEdge("wire_cutter_multi")).toBe(false);
  });
});

describe("bladeType", () => {
  it("wire cutter multi uses stainless wire array", () => {
    expect(bladeType("wire_cutter_multi")).toBe("stainless_wire_array");
  });
});

describe("bestSoap", () => {
  it("crinkle wave blade best for artisan rustic edge", () => {
    expect(bestSoap("crinkle_wave_blade")).toBe("artisan_rustic_edge");
  });
});

describe("soapCutters", () => {
  it("returns 5 types", () => {
    expect(soapCutters()).toHaveLength(5);
  });
});
