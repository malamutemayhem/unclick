import { describe, it, expect } from "vitest";
import {
  rigidity, cutEase, glueBond, archivalQuality,
  boardCost, acidFree, lightweight, boardMaterial,
  bestBinding, coverBoards,
} from "../cover-board-calc.js";

describe("rigidity", () => {
  it("binder board dense most rigid", () => {
    expect(rigidity("binder_board_dense")).toBeGreaterThan(rigidity("corrugated_flute_light"));
  });
});

describe("cutEase", () => {
  it("mat board color easiest to cut", () => {
    expect(cutEase("mat_board_color")).toBeGreaterThan(cutEase("wood_veneer_thin"));
  });
});

describe("glueBond", () => {
  it("davey grey standard best glue bond", () => {
    expect(glueBond("davey_grey_standard")).toBeGreaterThan(glueBond("wood_veneer_thin"));
  });
});

describe("archivalQuality", () => {
  it("mat board color best archival quality", () => {
    expect(archivalQuality("mat_board_color")).toBeGreaterThan(archivalQuality("corrugated_flute_light"));
  });
});

describe("boardCost", () => {
  it("binder board dense more expensive than corrugated", () => {
    expect(boardCost("binder_board_dense")).toBeGreaterThan(boardCost("corrugated_flute_light"));
  });
});

describe("acidFree", () => {
  it("mat board color is acid free", () => {
    expect(acidFree("mat_board_color")).toBe(true);
  });
  it("davey grey standard is not acid free", () => {
    expect(acidFree("davey_grey_standard")).toBe(false);
  });
});

describe("lightweight", () => {
  it("corrugated flute light is lightweight", () => {
    expect(lightweight("corrugated_flute_light")).toBe(true);
  });
  it("binder board dense is not lightweight", () => {
    expect(lightweight("binder_board_dense")).toBe(false);
  });
});

describe("boardMaterial", () => {
  it("mat board color uses cotton rag core", () => {
    expect(boardMaterial("mat_board_color")).toBe("cotton_rag_core");
  });
});

describe("bestBinding", () => {
  it("davey grey standard best for hardcover case bind", () => {
    expect(bestBinding("davey_grey_standard")).toBe("hardcover_case_bind");
  });
});

describe("coverBoards", () => {
  it("returns 5 types", () => {
    expect(coverBoards()).toHaveLength(5);
  });
});
