import { describe, it, expect } from "vitest";
import {
  durability, aesthetic, maintenance, paintability,
  faCost, rotResistant, forExterior, material,
  bestUse, fasciaTypeTypes,
} from "../fascia-type-calc.js";

describe("durability", () => {
  it("pvc most durable", () => {
    expect(durability("pvc_cellular_trim")).toBeGreaterThan(durability("wood_primed_painted"));
  });
});

describe("aesthetic", () => {
  it("composite best aesthetic", () => {
    expect(aesthetic("composite_capped_trim")).toBeGreaterThan(aesthetic("aluminum_wrap_coil"));
  });
});

describe("maintenance", () => {
  it("pvc lowest maintenance", () => {
    expect(maintenance("pvc_cellular_trim")).toBeGreaterThan(maintenance("wood_primed_painted"));
  });
});

describe("paintability", () => {
  it("wood most paintable", () => {
    expect(paintability("wood_primed_painted")).toBeGreaterThan(paintability("aluminum_wrap_coil"));
  });
});

describe("faCost", () => {
  it("composite most expensive", () => {
    expect(faCost("composite_capped_trim")).toBeGreaterThan(faCost("wood_primed_painted"));
  });
});

describe("rotResistant", () => {
  it("pvc is rot resistant", () => {
    expect(rotResistant("pvc_cellular_trim")).toBe(true);
  });
  it("wood not rot resistant", () => {
    expect(rotResistant("wood_primed_painted")).toBe(false);
  });
});

describe("forExterior", () => {
  it("all types for exterior", () => {
    expect(forExterior("wood_primed_painted")).toBe(true);
  });
});

describe("material", () => {
  it("aluminum uses coil stock", () => {
    expect(material("aluminum_wrap_coil")).toBe("aluminum_coil_stock_brake_formed");
  });
});

describe("bestUse", () => {
  it("pvc for coastal area", () => {
    expect(bestUse("pvc_cellular_trim")).toBe("coastal_moisture_prone_area");
  });
});

describe("fasciaTypeTypes", () => {
  it("returns 5 types", () => {
    expect(fasciaTypeTypes()).toHaveLength(5);
  });
});
