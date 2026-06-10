import { describe, it, expect } from "vitest";
import {
  domeDepth, surfaceFinish, sizeVariety, durability,
  blockCost, nonMarring, includesPunches, blockMaterial,
  bestUse, dappingBlocks,
} from "../dapping-block-calc.js";

describe("domeDepth", () => {
  it("steel cube standard deepest dome", () => {
    expect(domeDepth("steel_cube_standard")).toBeGreaterThan(domeDepth("wood_form_soft"));
  });
});

describe("surfaceFinish", () => {
  it("brass round small best surface finish", () => {
    expect(surfaceFinish("brass_round_small")).toBeGreaterThan(surfaceFinish("lead_block_cushion"));
  });
});

describe("sizeVariety", () => {
  it("steel cube standard most size variety", () => {
    expect(sizeVariety("steel_cube_standard")).toBeGreaterThan(sizeVariety("urethane_die_set"));
  });
});

describe("durability", () => {
  it("steel cube standard most durable", () => {
    expect(durability("steel_cube_standard")).toBeGreaterThan(durability("wood_form_soft"));
  });
});

describe("blockCost", () => {
  it("urethane die set most expensive", () => {
    expect(blockCost("urethane_die_set")).toBeGreaterThan(blockCost("wood_form_soft"));
  });
});

describe("nonMarring", () => {
  it("wood form soft is non marring", () => {
    expect(nonMarring("wood_form_soft")).toBe(true);
  });
  it("steel cube standard not non marring", () => {
    expect(nonMarring("steel_cube_standard")).toBe(false);
  });
});

describe("includesPunches", () => {
  it("steel cube standard includes punches", () => {
    expect(includesPunches("steel_cube_standard")).toBe(true);
  });
  it("brass round small no punches", () => {
    expect(includesPunches("brass_round_small")).toBe(false);
  });
});

describe("blockMaterial", () => {
  it("steel cube standard uses hardened tool steel", () => {
    expect(blockMaterial("steel_cube_standard")).toBe("hardened_tool_steel");
  });
});

describe("bestUse", () => {
  it("steel cube standard best for metal dome forming", () => {
    expect(bestUse("steel_cube_standard")).toBe("metal_dome_forming");
  });
});

describe("dappingBlocks", () => {
  it("returns 5 types", () => {
    expect(dappingBlocks()).toHaveLength(5);
  });
});
