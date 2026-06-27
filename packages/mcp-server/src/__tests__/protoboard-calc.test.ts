import { describe, it, expect } from "vitest";
import {
  solderEase, traceQuality, durability, layoutFlex,
  boardCost, platedThrough, forSmd, copperPattern,
  bestUse, protoboards,
} from "../protoboard-calc.js";

describe("solderEase", () => {
  it("dot matrix plated easiest solder", () => {
    expect(solderEase("dot_matrix_plated")).toBeGreaterThan(solderEase("smd_adapter_proto"));
  });
});

describe("traceQuality", () => {
  it("dot matrix plated best trace quality", () => {
    expect(traceQuality("dot_matrix_plated")).toBeGreaterThan(traceQuality("perfboard_single_side"));
  });
});

describe("durability", () => {
  it("dot matrix plated most durable", () => {
    expect(durability("dot_matrix_plated")).toBeGreaterThan(durability("perfboard_single_side"));
  });
});

describe("layoutFlex", () => {
  it("perfboard single side most layout flex", () => {
    expect(layoutFlex("perfboard_single_side")).toBeGreaterThan(layoutFlex("bus_board_power_rail"));
  });
});

describe("boardCost", () => {
  it("smd adapter proto most expensive", () => {
    expect(boardCost("smd_adapter_proto")).toBeGreaterThan(boardCost("perfboard_single_side"));
  });
});

describe("platedThrough", () => {
  it("dot matrix plated is plated through", () => {
    expect(platedThrough("dot_matrix_plated")).toBe(true);
  });
  it("perfboard single side not plated through", () => {
    expect(platedThrough("perfboard_single_side")).toBe(false);
  });
});

describe("forSmd", () => {
  it("smd adapter proto is for smd", () => {
    expect(forSmd("smd_adapter_proto")).toBe(true);
  });
  it("perfboard single side not for smd", () => {
    expect(forSmd("perfboard_single_side")).toBe(false);
  });
});

describe("copperPattern", () => {
  it("stripboard copper strip uses parallel copper strip", () => {
    expect(copperPattern("stripboard_copper_strip")).toBe("parallel_copper_strip");
  });
});

describe("bestUse", () => {
  it("bus board power rail best for power distribution", () => {
    expect(bestUse("bus_board_power_rail")).toBe("power_distribution");
  });
});

describe("protoboards", () => {
  it("returns 5 types", () => {
    expect(protoboards()).toHaveLength(5);
  });
});
