import { describe, it, expect } from "vitest";
import {
  firmness, flexBend, durability, sizeRange,
  cordCost, synthetic, forOutdoor, coreMaterial,
  bestUse, pipingCords,
} from "../piping-cord-calc.js";

describe("firmness", () => {
  it("welting cord firm most firm", () => {
    expect(firmness("welting_cord_firm")).toBeGreaterThan(firmness("foam_cord_soft"));
  });
});

describe("flexBend", () => {
  it("foam cord soft most flexible", () => {
    expect(flexBend("foam_cord_soft")).toBeGreaterThan(flexBend("welting_cord_firm"));
  });
});

describe("durability", () => {
  it("polyester cord durable most durable", () => {
    expect(durability("polyester_cord_durable")).toBeGreaterThan(durability("jute_cord_natural"));
  });
});

describe("sizeRange", () => {
  it("cotton cord standard best size range", () => {
    expect(sizeRange("cotton_cord_standard")).toBeGreaterThan(sizeRange("jute_cord_natural"));
  });
});

describe("cordCost", () => {
  it("welting cord firm most expensive", () => {
    expect(cordCost("welting_cord_firm")).toBeGreaterThan(cordCost("jute_cord_natural"));
  });
});

describe("synthetic", () => {
  it("polyester cord durable is synthetic", () => {
    expect(synthetic("polyester_cord_durable")).toBe(true);
  });
  it("cotton cord standard not synthetic", () => {
    expect(synthetic("cotton_cord_standard")).toBe(false);
  });
});

describe("forOutdoor", () => {
  it("polyester cord durable is for outdoor", () => {
    expect(forOutdoor("polyester_cord_durable")).toBe(true);
  });
  it("cotton cord standard not for outdoor", () => {
    expect(forOutdoor("cotton_cord_standard")).toBe(false);
  });
});

describe("coreMaterial", () => {
  it("foam cord soft uses closed cell foam", () => {
    expect(coreMaterial("foam_cord_soft")).toBe("closed_cell_foam");
  });
});

describe("bestUse", () => {
  it("cotton cord standard best for general piping edge", () => {
    expect(bestUse("cotton_cord_standard")).toBe("general_piping_edge");
  });
});

describe("pipingCords", () => {
  it("returns 5 types", () => {
    expect(pipingCords()).toHaveLength(5);
  });
});
