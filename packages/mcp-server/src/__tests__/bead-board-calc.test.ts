import { describe, it, expect } from "vitest";
import {
  layoutSpace, beadGrip, portability, measureMarks,
  boardCost, hasChannel, multiStrand, boardMaterial,
  bestUse, beadBoards,
} from "../bead-board-calc.js";

describe("layoutSpace", () => {
  it("multi strand wide most layout space", () => {
    expect(layoutSpace("multi_strand_wide")).toBeGreaterThan(layoutSpace("bead_mat_flat"));
  });
});

describe("beadGrip", () => {
  it("bead mat flat best bead grip", () => {
    expect(beadGrip("bead_mat_flat")).toBeGreaterThan(beadGrip("design_tray_compartment"));
  });
});

describe("portability", () => {
  it("bead mat flat most portable", () => {
    expect(portability("bead_mat_flat")).toBeGreaterThan(portability("multi_strand_wide"));
  });
});

describe("measureMarks", () => {
  it("u shaped necklace best measure marks", () => {
    expect(measureMarks("u_shaped_necklace")).toBeGreaterThan(measureMarks("bead_mat_flat"));
  });
});

describe("boardCost", () => {
  it("multi strand wide most expensive", () => {
    expect(boardCost("multi_strand_wide")).toBeGreaterThan(boardCost("bead_mat_flat"));
  });
});

describe("hasChannel", () => {
  it("flocked channel basic has channel", () => {
    expect(hasChannel("flocked_channel_basic")).toBe(true);
  });
  it("bead mat flat has no channel", () => {
    expect(hasChannel("bead_mat_flat")).toBe(false);
  });
});

describe("multiStrand", () => {
  it("multi strand wide is multi strand", () => {
    expect(multiStrand("multi_strand_wide")).toBe(true);
  });
  it("flocked channel basic is not multi strand", () => {
    expect(multiStrand("flocked_channel_basic")).toBe(false);
  });
});

describe("boardMaterial", () => {
  it("design tray compartment uses wood compartment tray", () => {
    expect(boardMaterial("design_tray_compartment")).toBe("wood_compartment_tray");
  });
});

describe("bestUse", () => {
  it("u shaped necklace best for necklace length plan", () => {
    expect(bestUse("u_shaped_necklace")).toBe("necklace_length_plan");
  });
});

describe("beadBoards", () => {
  it("returns 5 types", () => {
    expect(beadBoards()).toHaveLength(5);
  });
});
