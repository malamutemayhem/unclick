import { describe, it, expect } from "vitest";
import {
  materialRemoval, surfaceFinish, precisionControl, shapeAccess,
  fileCost, forFinishing, curvedShape, toothPattern,
  bestTask, metalFiles,
} from "../metal-file-calc.js";

describe("materialRemoval", () => {
  it("bastard cut coarse best material removal", () => {
    expect(materialRemoval("bastard_cut_coarse")).toBeGreaterThan(materialRemoval("needle_file_precision"));
  });
});

describe("surfaceFinish", () => {
  it("needle file precision best surface finish", () => {
    expect(surfaceFinish("needle_file_precision")).toBeGreaterThan(surfaceFinish("bastard_cut_coarse"));
  });
});

describe("precisionControl", () => {
  it("needle file precision best precision control", () => {
    expect(precisionControl("needle_file_precision")).toBeGreaterThan(precisionControl("bastard_cut_coarse"));
  });
});

describe("shapeAccess", () => {
  it("riffler curved reach best shape access", () => {
    expect(shapeAccess("riffler_curved_reach")).toBeGreaterThan(shapeAccess("bastard_cut_coarse"));
  });
});

describe("fileCost", () => {
  it("riffler curved reach more expensive than bastard cut", () => {
    expect(fileCost("riffler_curved_reach")).toBeGreaterThan(fileCost("bastard_cut_coarse"));
  });
});

describe("forFinishing", () => {
  it("smooth cut fine is for finishing", () => {
    expect(forFinishing("smooth_cut_fine")).toBe(true);
  });
  it("bastard cut coarse is not for finishing", () => {
    expect(forFinishing("bastard_cut_coarse")).toBe(false);
  });
});

describe("curvedShape", () => {
  it("riffler curved reach has curved shape", () => {
    expect(curvedShape("riffler_curved_reach")).toBe(true);
  });
  it("smooth cut fine does not have curved shape", () => {
    expect(curvedShape("smooth_cut_fine")).toBe(false);
  });
});

describe("toothPattern", () => {
  it("bastard cut coarse uses single cut diagonal", () => {
    expect(toothPattern("bastard_cut_coarse")).toBe("single_cut_diagonal");
  });
});

describe("bestTask", () => {
  it("needle file precision best for jewelry clock detail", () => {
    expect(bestTask("needle_file_precision")).toBe("jewelry_clock_detail");
  });
});

describe("metalFiles", () => {
  it("returns 5 types", () => {
    expect(metalFiles()).toHaveLength(5);
  });
});
