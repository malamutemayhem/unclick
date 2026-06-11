import { describe, it, expect } from "vitest";
import {
  seal, durability, flexibility, insulation,
  dsCost, adjustable, forRefrigerated, material,
  bestUse, dockSealTypes,
} from "../dock-seal-calc.js";

describe("seal", () => {
  it("inflatable best seal", () => {
    expect(seal("inflatable_air_bag")).toBeGreaterThan(seal("curtain_drape_shelter"));
  });
});

describe("durability", () => {
  it("rigid frame most durable", () => {
    expect(durability("rigid_frame_shelter")).toBeGreaterThan(durability("curtain_drape_shelter"));
  });
});

describe("flexibility", () => {
  it("inflatable most flexible", () => {
    expect(flexibility("inflatable_air_bag")).toBeGreaterThan(flexibility("compression_foam_pad"));
  });
});

describe("insulation", () => {
  it("inflatable best insulation", () => {
    expect(insulation("inflatable_air_bag")).toBeGreaterThan(insulation("curtain_drape_shelter"));
  });
});

describe("dsCost", () => {
  it("combo most expensive", () => {
    expect(dsCost("combo_seal_shelter")).toBeGreaterThan(dsCost("compression_foam_pad"));
  });
});

describe("adjustable", () => {
  it("inflatable is adjustable", () => {
    expect(adjustable("inflatable_air_bag")).toBe(true);
  });
  it("foam not adjustable", () => {
    expect(adjustable("compression_foam_pad")).toBe(false);
  });
});

describe("forRefrigerated", () => {
  it("inflatable for refrigerated", () => {
    expect(forRefrigerated("inflatable_air_bag")).toBe(true);
  });
  it("curtain not refrigerated", () => {
    expect(forRefrigerated("curtain_drape_shelter")).toBe(false);
  });
});

describe("material", () => {
  it("combo uses hybrid", () => {
    expect(material("combo_seal_shelter")).toBe("foam_pad_plus_curtain_hybrid");
  });
});

describe("bestUse", () => {
  it("foam for standard dock", () => {
    expect(bestUse("compression_foam_pad")).toBe("standard_flush_dock_general");
  });
});

describe("dockSealTypes", () => {
  it("returns 5 types", () => {
    expect(dockSealTypes()).toHaveLength(5);
  });
});
