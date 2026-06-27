import { describe, it, expect } from "vitest";
import {
  heatRetain, burnConsist, tipVariety, durability,
  pointCost, screwMount, multiTip, tipAlloy,
  bestUse, solidPoints,
} from "../solid-point-calc.js";

describe("heatRetain", () => {
  it("copper heavy duty best heat retain", () => {
    expect(heatRetain("copper_heavy_duty")).toBeGreaterThan(heatRetain("carbide_tip_hard"));
  });
});

describe("burnConsist", () => {
  it("carbide tip hard most consistent burn", () => {
    expect(burnConsist("carbide_tip_hard")).toBeGreaterThan(burnConsist("brass_screw_in"));
  });
});

describe("tipVariety", () => {
  it("interchangeable set most tip variety", () => {
    expect(tipVariety("interchangeable_set")).toBeGreaterThan(tipVariety("carbide_tip_hard"));
  });
});

describe("durability", () => {
  it("carbide tip hard most durable", () => {
    expect(durability("carbide_tip_hard")).toBeGreaterThan(durability("brass_screw_in"));
  });
});

describe("pointCost", () => {
  it("carbide tip hard most expensive", () => {
    expect(pointCost("carbide_tip_hard")).toBeGreaterThan(pointCost("brass_screw_in"));
  });
});

describe("screwMount", () => {
  it("brass screw in has screw mount", () => {
    expect(screwMount("brass_screw_in")).toBe(true);
  });
  it("interchangeable set no screw mount", () => {
    expect(screwMount("interchangeable_set")).toBe(false);
  });
});

describe("multiTip", () => {
  it("interchangeable set is multi tip", () => {
    expect(multiTip("interchangeable_set")).toBe(true);
  });
  it("brass screw in not multi tip", () => {
    expect(multiTip("brass_screw_in")).toBe(false);
  });
});

describe("tipAlloy", () => {
  it("brass screw in uses solid brass machined", () => {
    expect(tipAlloy("brass_screw_in")).toBe("solid_brass_machined");
  });
});

describe("bestUse", () => {
  it("carbide tip hard best for hardwood detail burn", () => {
    expect(bestUse("carbide_tip_hard")).toBe("hardwood_detail_burn");
  });
});

describe("solidPoints", () => {
  it("returns 5 types", () => {
    expect(solidPoints()).toHaveLength(5);
  });
});
