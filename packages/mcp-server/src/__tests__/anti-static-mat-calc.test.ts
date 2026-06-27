import { describe, it, expect } from "vitest";
import {
  surfaceResist, durability, chemResist, sizeRange,
  matCost, grounded, portable, material,
  bestUse, antiStaticMats,
} from "../anti-static-mat-calc.js";

describe("surfaceResist", () => {
  it("bench mat two layer best surface resist", () => {
    expect(surfaceResist("bench_mat_two_layer")).toBeGreaterThan(surfaceResist("dissipative_tray_liner"));
  });
});

describe("durability", () => {
  it("floor mat standing most durable", () => {
    expect(durability("floor_mat_standing")).toBeGreaterThan(durability("dissipative_tray_liner"));
  });
});

describe("chemResist", () => {
  it("bench mat two layer best chem resist", () => {
    expect(chemResist("bench_mat_two_layer")).toBeGreaterThan(chemResist("dissipative_tray_liner"));
  });
});

describe("sizeRange", () => {
  it("table runner roll widest size range", () => {
    expect(sizeRange("table_runner_roll")).toBeGreaterThan(sizeRange("portable_field_kit"));
  });
});

describe("matCost", () => {
  it("floor mat standing most expensive", () => {
    expect(matCost("floor_mat_standing")).toBeGreaterThan(matCost("dissipative_tray_liner"));
  });
});

describe("grounded", () => {
  it("bench mat two layer is grounded", () => {
    expect(grounded("bench_mat_two_layer")).toBe(true);
  });
  it("dissipative tray liner not grounded", () => {
    expect(grounded("dissipative_tray_liner")).toBe(false);
  });
});

describe("portable", () => {
  it("portable field kit is portable", () => {
    expect(portable("portable_field_kit")).toBe(true);
  });
  it("bench mat two layer not portable", () => {
    expect(portable("bench_mat_two_layer")).toBe(false);
  });
});

describe("material", () => {
  it("floor mat standing uses vinyl conductive foam", () => {
    expect(material("floor_mat_standing")).toBe("vinyl_conductive_foam");
  });
});

describe("bestUse", () => {
  it("table runner roll best for long bench coverage", () => {
    expect(bestUse("table_runner_roll")).toBe("long_bench_coverage");
  });
});

describe("antiStaticMats", () => {
  it("returns 5 types", () => {
    expect(antiStaticMats()).toHaveLength(5);
  });
});
