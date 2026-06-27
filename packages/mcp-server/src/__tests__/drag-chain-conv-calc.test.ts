import { describe, it, expect } from "vitest";
import {
  throughput, sealing, versatility, durability,
  dcCost, enclosed, forHot, chain,
  bestUse, dragChainConvTypes,
} from "../drag-chain-conv-calc.js";

describe("throughput", () => {
  it("en masse highest throughput", () => {
    expect(throughput("en_masse_bulk")).toBeGreaterThan(throughput("tubular_disc_chain"));
  });
});

describe("sealing", () => {
  it("tubular disc best sealing", () => {
    expect(sealing("tubular_disc_chain")).toBeGreaterThan(sealing("paddle_chain_reclaim"));
  });
});

describe("versatility", () => {
  it("tubular disc most versatile", () => {
    expect(versatility("tubular_disc_chain")).toBeGreaterThan(versatility("submerged_chain_ash"));
  });
});

describe("durability", () => {
  it("submerged chain ash most durable", () => {
    expect(durability("submerged_chain_ash")).toBeGreaterThan(durability("tubular_disc_chain"));
  });
});

describe("dcCost", () => {
  it("tubular disc and submerged chain most expensive", () => {
    expect(dcCost("tubular_disc_chain")).toBeGreaterThan(dcCost("drag_flight_scraper"));
  });
});

describe("enclosed", () => {
  it("en masse is enclosed", () => {
    expect(enclosed("en_masse_bulk")).toBe(true);
  });
  it("paddle chain not enclosed", () => {
    expect(enclosed("paddle_chain_reclaim")).toBe(false);
  });
});

describe("forHot", () => {
  it("submerged chain for hot material", () => {
    expect(forHot("submerged_chain_ash")).toBe(true);
  });
  it("en masse not for hot", () => {
    expect(forHot("en_masse_bulk")).toBe(false);
  });
});

describe("chain", () => {
  it("tubular disc uses disc puck cable", () => {
    expect(chain("tubular_disc_chain")).toBe("disc_puck_cable_tube_enclosed");
  });
});

describe("bestUse", () => {
  it("submerged chain for boiler bottom ash", () => {
    expect(bestUse("submerged_chain_ash")).toBe("boiler_bottom_ash_hot_clinker_remove");
  });
});

describe("dragChainConvTypes", () => {
  it("returns 5 types", () => {
    expect(dragChainConvTypes()).toHaveLength(5);
  });
});
