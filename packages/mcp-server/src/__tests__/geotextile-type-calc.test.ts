import { describe, it, expect } from "vitest";
import {
  tensile, filtration, drainage, durability,
  gtCost, permeable, forReinforcement, structure,
  bestUse, geotextileTypes,
} from "../geotextile-type-calc.js";

describe("tensile", () => {
  it("geogrid highest tensile", () => {
    expect(tensile("geogrid_biaxial_polymer")).toBeGreaterThan(tensile("nonwoven_needlepunch"));
  });
});

describe("filtration", () => {
  it("nonwoven best filtration", () => {
    expect(filtration("nonwoven_needlepunch")).toBeGreaterThan(filtration("geogrid_biaxial_polymer"));
  });
});

describe("drainage", () => {
  it("composite best drainage", () => {
    expect(drainage("composite_geocomposite")).toBeGreaterThan(drainage("woven_slit_film"));
  });
});

describe("durability", () => {
  it("geogrid most durable", () => {
    expect(durability("geogrid_biaxial_polymer")).toBeGreaterThan(durability("knitted_warp_stitch"));
  });
});

describe("gtCost", () => {
  it("composite most expensive", () => {
    expect(gtCost("composite_geocomposite")).toBeGreaterThan(gtCost("nonwoven_needlepunch"));
  });
});

describe("permeable", () => {
  it("nonwoven is permeable", () => {
    expect(permeable("nonwoven_needlepunch")).toBe(true);
  });
  it("woven not permeable", () => {
    expect(permeable("woven_slit_film")).toBe(false);
  });
});

describe("forReinforcement", () => {
  it("woven for reinforcement", () => {
    expect(forReinforcement("woven_slit_film")).toBe(true);
  });
  it("nonwoven not for reinforcement", () => {
    expect(forReinforcement("nonwoven_needlepunch")).toBe(false);
  });
});

describe("structure", () => {
  it("geogrid uses extruded grid", () => {
    expect(structure("geogrid_biaxial_polymer")).toBe("extruded_punched_stretched_grid");
  });
});

describe("bestUse", () => {
  it("nonwoven for separation filtration", () => {
    expect(bestUse("nonwoven_needlepunch")).toBe("separation_filtration_drainage");
  });
});

describe("geotextileTypes", () => {
  it("returns 5 types", () => {
    expect(geotextileTypes()).toHaveLength(5);
  });
});
