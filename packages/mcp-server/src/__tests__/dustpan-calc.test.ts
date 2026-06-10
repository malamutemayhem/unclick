import { describe, it, expect } from "vitest";
import {
  sweepEfficiency, ergonomics, capacity, compactStorage,
  dustpanCost, includesBrush, hasCover, lipMaterial,
  bestSpace, dustpans,
} from "../dustpan-calc.js";

describe("sweepEfficiency", () => {
  it("silicone lip seal best sweep efficiency", () => {
    expect(sweepEfficiency("silicone_lip_seal")).toBeGreaterThan(sweepEfficiency("basic_plastic_handheld"));
  });
});

describe("ergonomics", () => {
  it("long handle upright best ergonomics", () => {
    expect(ergonomics("long_handle_upright")).toBeGreaterThan(ergonomics("basic_plastic_handheld"));
  });
});

describe("capacity", () => {
  it("lobby commercial covered biggest capacity", () => {
    expect(capacity("lobby_commercial_covered")).toBeGreaterThan(capacity("basic_plastic_handheld"));
  });
});

describe("compactStorage", () => {
  it("brush combo snap set most compact", () => {
    expect(compactStorage("brush_combo_snap_set")).toBeGreaterThan(compactStorage("lobby_commercial_covered"));
  });
});

describe("dustpanCost", () => {
  it("lobby commercial covered most expensive", () => {
    expect(dustpanCost("lobby_commercial_covered")).toBeGreaterThan(dustpanCost("basic_plastic_handheld"));
  });
});

describe("includesBrush", () => {
  it("brush combo snap set includes brush", () => {
    expect(includesBrush("brush_combo_snap_set")).toBe(true);
  });
  it("basic plastic handheld does not", () => {
    expect(includesBrush("basic_plastic_handheld")).toBe(false);
  });
});

describe("hasCover", () => {
  it("lobby commercial covered has cover", () => {
    expect(hasCover("lobby_commercial_covered")).toBe(true);
  });
  it("long handle upright does not", () => {
    expect(hasCover("long_handle_upright")).toBe(false);
  });
});

describe("lipMaterial", () => {
  it("silicone lip seal uses silicone flush seal", () => {
    expect(lipMaterial("silicone_lip_seal")).toBe("silicone_flush_seal");
  });
});

describe("bestSpace", () => {
  it("long handle upright best for kitchen floor daily", () => {
    expect(bestSpace("long_handle_upright")).toBe("kitchen_floor_daily");
  });
});

describe("dustpans", () => {
  it("returns 5 types", () => {
    expect(dustpans()).toHaveLength(5);
  });
});
