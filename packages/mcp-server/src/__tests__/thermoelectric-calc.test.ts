import { describe, it, expect } from "vitest";
import {
  zt, tempRange, efficiency, durability,
  teCost, toxicFree, forWaste, material,
  bestUse, thermoelectrics,
} from "../thermoelectric-calc.js";

describe("zt", () => {
  it("skutterudite highest zt", () => {
    expect(zt("skutterudite")).toBeGreaterThan(zt("silicon_germanium"));
  });
});

describe("tempRange", () => {
  it("silicon germanium widest temp range", () => {
    expect(tempRange("silicon_germanium")).toBeGreaterThan(tempRange("bismuth_telluride"));
  });
});

describe("efficiency", () => {
  it("skutterudite highest efficiency", () => {
    expect(efficiency("skutterudite")).toBeGreaterThan(efficiency("silicon_germanium"));
  });
});

describe("durability", () => {
  it("silicon germanium most durable", () => {
    expect(durability("silicon_germanium")).toBeGreaterThan(durability("skutterudite"));
  });
});

describe("teCost", () => {
  it("skutterudite most expensive", () => {
    expect(teCost("skutterudite")).toBeGreaterThan(teCost("bismuth_telluride"));
  });
});

describe("toxicFree", () => {
  it("silicon germanium is toxic free", () => {
    expect(toxicFree("silicon_germanium")).toBe(true);
  });
  it("bismuth telluride not toxic free", () => {
    expect(toxicFree("bismuth_telluride")).toBe(false);
  });
});

describe("forWaste", () => {
  it("lead telluride is for waste heat", () => {
    expect(forWaste("lead_telluride")).toBe(true);
  });
  it("bismuth telluride not for waste heat", () => {
    expect(forWaste("bismuth_telluride")).toBe(false);
  });
});

describe("material", () => {
  it("skutterudite uses cosb3 filled cage", () => {
    expect(material("skutterudite")).toBe("cosb3_filled_cage");
  });
});

describe("bestUse", () => {
  it("silicon germanium best for rtg space probe", () => {
    expect(bestUse("silicon_germanium")).toBe("rtg_space_probe");
  });
});

describe("thermoelectrics", () => {
  it("returns 5 types", () => {
    expect(thermoelectrics()).toHaveLength(5);
  });
});
