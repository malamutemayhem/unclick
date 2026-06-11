import { describe, it, expect } from "vitest";
import {
  heatEven, capacity, tempControl, durability,
  kettleCost, powered, portable, heatSource,
  bestUse, tarKettles,
} from "../tar-kettle-calc.js";

describe("heatEven", () => {
  it("copper bottom even most even heat", () => {
    expect(heatEven("copper_bottom_even")).toBeGreaterThan(heatEven("portable_field_small"));
  });
});

describe("capacity", () => {
  it("cast iron standard best capacity", () => {
    expect(capacity("cast_iron_standard")).toBeGreaterThan(capacity("portable_field_small"));
  });
});

describe("tempControl", () => {
  it("electric heated modern best temp control", () => {
    expect(tempControl("electric_heated_modern")).toBeGreaterThan(tempControl("portable_field_small"));
  });
});

describe("durability", () => {
  it("cast iron standard most durable", () => {
    expect(durability("cast_iron_standard")).toBeGreaterThan(durability("portable_field_small"));
  });
});

describe("kettleCost", () => {
  it("electric heated modern most expensive", () => {
    expect(kettleCost("electric_heated_modern")).toBeGreaterThan(kettleCost("portable_field_small"));
  });
});

describe("powered", () => {
  it("electric heated modern is powered", () => {
    expect(powered("electric_heated_modern")).toBe(true);
  });
  it("cast iron standard not powered", () => {
    expect(powered("cast_iron_standard")).toBe(false);
  });
});

describe("portable", () => {
  it("portable field small is portable", () => {
    expect(portable("portable_field_small")).toBe(true);
  });
  it("cast iron standard not portable", () => {
    expect(portable("cast_iron_standard")).toBe(false);
  });
});

describe("heatSource", () => {
  it("double wall safe uses water jacket fire", () => {
    expect(heatSource("double_wall_safe")).toBe("water_jacket_fire");
  });
});

describe("bestUse", () => {
  it("cast iron standard best for general tar heat", () => {
    expect(bestUse("cast_iron_standard")).toBe("general_tar_heat");
  });
});

describe("tarKettles", () => {
  it("returns 5 types", () => {
    expect(tarKettles()).toHaveLength(5);
  });
});
