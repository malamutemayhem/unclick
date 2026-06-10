import { describe, it, expect } from "vitest";
import {
  strengthRating, difficultyLevel, toolsRequired,
  assemblyTimeMinutes, glueRequired, visibleFromOutside,
  bestApplication, disassemblyPossible, costRating, woodJoints,
} from "../wood-joint-calc.js";

describe("strengthRating", () => {
  it("mortise tenon is strongest", () => {
    expect(strengthRating("mortise_tenon")).toBeGreaterThan(
      strengthRating("biscuit")
    );
  });
});

describe("difficultyLevel", () => {
  it("dovetail is hardest", () => {
    expect(difficultyLevel("dovetail")).toBeGreaterThan(
      difficultyLevel("pocket_screw")
    );
  });
});

describe("toolsRequired", () => {
  it("mortise tenon needs most tools", () => {
    expect(toolsRequired("mortise_tenon")).toBeGreaterThan(
      toolsRequired("pocket_screw")
    );
  });
});

describe("assemblyTimeMinutes", () => {
  it("mortise tenon takes longest", () => {
    expect(assemblyTimeMinutes("mortise_tenon")).toBeGreaterThan(
      assemblyTimeMinutes("pocket_screw")
    );
  });
});

describe("glueRequired", () => {
  it("dovetail requires glue", () => {
    expect(glueRequired("dovetail")).toBe(true);
  });
  it("pocket screw does not", () => {
    expect(glueRequired("pocket_screw")).toBe(false);
  });
});

describe("visibleFromOutside", () => {
  it("dovetail is visible", () => {
    expect(visibleFromOutside("dovetail")).toBe(true);
  });
  it("biscuit is not", () => {
    expect(visibleFromOutside("biscuit")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("dovetail is best for drawers", () => {
    expect(bestApplication("dovetail")).toBe("drawers");
  });
});

describe("disassemblyPossible", () => {
  it("mortise tenon can be disassembled", () => {
    expect(disassemblyPossible("mortise_tenon")).toBe(true);
  });
  it("box joint cannot", () => {
    expect(disassemblyPossible("box_joint")).toBe(false);
  });
});

describe("costRating", () => {
  it("pocket screw is cheapest method", () => {
    expect(costRating("pocket_screw")).toBeGreaterThan(
      costRating("dovetail")
    );
  });
});

describe("woodJoints", () => {
  it("returns 5 joints", () => {
    expect(woodJoints()).toHaveLength(5);
  });
});
