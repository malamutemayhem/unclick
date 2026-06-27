import { describe, it, expect } from "vitest";
import {
  clarityGloss, durability, drySpeed, buildLayer,
  lacquerCost, sprayApply, waterBased, resinBase,
  bestUse, lacquerCoats,
} from "../lacquer-coat-calc.js";

describe("clarityGloss", () => {
  it("acrylic lacquer clear highest clarity gloss", () => {
    expect(clarityGloss("acrylic_lacquer_clear")).toBeGreaterThan(clarityGloss("brushing_lacquer_hand"));
  });
});

describe("durability", () => {
  it("catalyzed lacquer hard most durable", () => {
    expect(durability("catalyzed_lacquer_hard")).toBeGreaterThan(durability("brushing_lacquer_hand"));
  });
});

describe("drySpeed", () => {
  it("nitrocellulose spray fastest dry", () => {
    expect(drySpeed("nitrocellulose_spray")).toBeGreaterThan(drySpeed("brushing_lacquer_hand"));
  });
});

describe("buildLayer", () => {
  it("catalyzed lacquer hard best build layer", () => {
    expect(buildLayer("catalyzed_lacquer_hard")).toBeGreaterThan(buildLayer("nitrocellulose_spray"));
  });
});

describe("lacquerCost", () => {
  it("catalyzed lacquer hard most expensive", () => {
    expect(lacquerCost("catalyzed_lacquer_hard")).toBeGreaterThan(lacquerCost("brushing_lacquer_hand"));
  });
});

describe("sprayApply", () => {
  it("nitrocellulose spray is spray apply", () => {
    expect(sprayApply("nitrocellulose_spray")).toBe(true);
  });
  it("brushing lacquer hand not spray apply", () => {
    expect(sprayApply("brushing_lacquer_hand")).toBe(false);
  });
});

describe("waterBased", () => {
  it("water lacquer safe is water based", () => {
    expect(waterBased("water_lacquer_safe")).toBe(true);
  });
  it("nitrocellulose spray not water based", () => {
    expect(waterBased("nitrocellulose_spray")).toBe(false);
  });
});

describe("resinBase", () => {
  it("acrylic lacquer clear uses acrylic thermoplastic", () => {
    expect(resinBase("acrylic_lacquer_clear")).toBe("acrylic_thermoplastic");
  });
});

describe("bestUse", () => {
  it("nitrocellulose spray best for fast spray furniture", () => {
    expect(bestUse("nitrocellulose_spray")).toBe("fast_spray_furniture");
  });
});

describe("lacquerCoats", () => {
  it("returns 5 types", () => {
    expect(lacquerCoats()).toHaveLength(5);
  });
});
