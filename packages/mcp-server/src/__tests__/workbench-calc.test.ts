import { describe, it, expect } from "vitest";
import {
  workSurface, loadCapacity, portability, storageBuiltIn,
  benchCost, foldFlat, hasViseMount, topMaterial,
  bestShop, workbenches,
} from "../workbench-calc.js";

describe("workSurface", () => {
  it("traditional hardwood largest work surface", () => {
    expect(workSurface("traditional_hardwood")).toBeGreaterThan(workSurface("folding_portable"));
  });
});

describe("loadCapacity", () => {
  it("traditional hardwood highest load capacity", () => {
    expect(loadCapacity("traditional_hardwood")).toBeGreaterThan(loadCapacity("wall_mount_drop_leaf"));
  });
});

describe("portability", () => {
  it("folding portable most portable", () => {
    expect(portability("folding_portable")).toBeGreaterThan(portability("traditional_hardwood"));
  });
});

describe("storageBuiltIn", () => {
  it("steel frame mdf most built in storage", () => {
    expect(storageBuiltIn("steel_frame_mdf")).toBeGreaterThan(storageBuiltIn("wall_mount_drop_leaf"));
  });
});

describe("benchCost", () => {
  it("adjustable height electric most expensive", () => {
    expect(benchCost("adjustable_height_electric")).toBeGreaterThan(benchCost("folding_portable"));
  });
});

describe("foldFlat", () => {
  it("folding portable folds flat", () => {
    expect(foldFlat("folding_portable")).toBe(true);
  });
  it("traditional hardwood does not", () => {
    expect(foldFlat("traditional_hardwood")).toBe(false);
  });
});

describe("hasViseMount", () => {
  it("traditional hardwood has vise mount", () => {
    expect(hasViseMount("traditional_hardwood")).toBe(true);
  });
  it("wall mount drop leaf does not", () => {
    expect(hasViseMount("wall_mount_drop_leaf")).toBe(false);
  });
});

describe("topMaterial", () => {
  it("traditional hardwood uses solid maple butcher block", () => {
    expect(topMaterial("traditional_hardwood")).toBe("solid_maple_butcher_block");
  });
});

describe("bestShop", () => {
  it("folding portable best for jobsite temporary setup", () => {
    expect(bestShop("folding_portable")).toBe("jobsite_temporary_setup");
  });
});

describe("workbenches", () => {
  it("returns 5 types", () => {
    expect(workbenches()).toHaveLength(5);
  });
});
