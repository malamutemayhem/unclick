import { describe, it, expect } from "vitest";
import {
  gripStrength, sizeRange, durability, visibility,
  protectorCost, reusable, decorative, protectorMaterial,
  bestUse, pointProtectors,
} from "../point-protector-calc.js";

describe("gripStrength", () => {
  it("silicone grip color best grip", () => {
    expect(gripStrength("silicone_grip_color")).toBeGreaterThan(gripStrength("bead_decorative_end"));
  });
});

describe("sizeRange", () => {
  it("coil spring wire widest size range", () => {
    expect(sizeRange("coil_spring_wire")).toBeGreaterThan(sizeRange("bead_decorative_end"));
  });
});

describe("durability", () => {
  it("coil spring wire most durable", () => {
    expect(durability("coil_spring_wire")).toBeGreaterThan(durability("bead_decorative_end"));
  });
});

describe("visibility", () => {
  it("bead decorative end most visible", () => {
    expect(visibility("bead_decorative_end")).toBeGreaterThan(visibility("tube_connector_join"));
  });
});

describe("protectorCost", () => {
  it("bead decorative end most expensive", () => {
    expect(protectorCost("bead_decorative_end")).toBeGreaterThan(protectorCost("rubber_cap_basic"));
  });
});

describe("reusable", () => {
  it("rubber cap basic is reusable", () => {
    expect(reusable("rubber_cap_basic")).toBe(true);
  });
  it("silicone grip color is reusable", () => {
    expect(reusable("silicone_grip_color")).toBe(true);
  });
});

describe("decorative", () => {
  it("bead decorative end is decorative", () => {
    expect(decorative("bead_decorative_end")).toBe(true);
  });
  it("rubber cap basic is not decorative", () => {
    expect(decorative("rubber_cap_basic")).toBe(false);
  });
});

describe("protectorMaterial", () => {
  it("coil spring wire uses stainless steel coil", () => {
    expect(protectorMaterial("coil_spring_wire")).toBe("stainless_steel_coil");
  });
});

describe("bestUse", () => {
  it("wristlet small travel best for commute knit quick", () => {
    expect(bestUse("silicone_grip_color")).toBe("multiple_project_sort");
  });
});

describe("pointProtectors", () => {
  it("returns 5 types", () => {
    expect(pointProtectors()).toHaveLength(5);
  });
});
