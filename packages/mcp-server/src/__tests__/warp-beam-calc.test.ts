import { describe, it, expect } from "vitest";
import {
  warpCapacity, tensionEven, setupSpeed, spaceNeeded,
  beamCost, partOfLoom, sectioned, beamShape,
  bestSetup, warpBeams,
} from "../warp-beam-calc.js";

describe("warpCapacity", () => {
  it("sectional beam peg most warp capacity", () => {
    expect(warpCapacity("sectional_beam_peg")).toBeGreaterThan(warpCapacity("warp_chain_board"));
  });
});

describe("tensionEven", () => {
  it("sectional beam peg most even tension", () => {
    expect(tensionEven("sectional_beam_peg")).toBeGreaterThan(tensionEven("warp_chain_board"));
  });
});

describe("setupSpeed", () => {
  it("sectional beam peg fastest setup", () => {
    expect(setupSpeed("sectional_beam_peg")).toBeGreaterThan(setupSpeed("cloth_beam_front"));
  });
});

describe("spaceNeeded", () => {
  it("warp chain board needs most space", () => {
    expect(spaceNeeded("warp_chain_board")).toBeGreaterThan(spaceNeeded("warping_mill_reel"));
  });
});

describe("beamCost", () => {
  it("sectional beam peg most expensive", () => {
    expect(beamCost("sectional_beam_peg")).toBeGreaterThan(beamCost("warp_chain_board"));
  });
});

describe("partOfLoom", () => {
  it("sectional beam peg is part of loom", () => {
    expect(partOfLoom("sectional_beam_peg")).toBe(true);
  });
  it("warp chain board is not part of loom", () => {
    expect(partOfLoom("warp_chain_board")).toBe(false);
  });
});

describe("sectioned", () => {
  it("sectional beam peg is sectioned", () => {
    expect(sectioned("sectional_beam_peg")).toBe(true);
  });
  it("plain beam smooth is not sectioned", () => {
    expect(sectioned("plain_beam_smooth")).toBe(false);
  });
});

describe("beamShape", () => {
  it("warping mill reel is vertical rotating reel", () => {
    expect(beamShape("warping_mill_reel")).toBe("vertical_rotating_reel");
  });
});

describe("bestSetup", () => {
  it("sectional beam peg best for long warp production", () => {
    expect(bestSetup("sectional_beam_peg")).toBe("long_warp_production");
  });
});

describe("warpBeams", () => {
  it("returns 5 types", () => {
    expect(warpBeams()).toHaveLength(5);
  });
});
