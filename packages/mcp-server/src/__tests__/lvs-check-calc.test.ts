import { describe, it, expect } from "vitest";
import {
  accuracy, speed, capacity, debuggability,
  lvsCost, multiThread, forFoundry, method,
  bestUse, lvsChecks,
} from "../lvs-check-calc.js";

describe("accuracy", () => {
  it("flat exhaustive highest accuracy", () => {
    expect(accuracy("flat_exhaustive")).toBeGreaterThan(accuracy("incremental_delta"));
  });
});

describe("speed", () => {
  it("incremental delta fastest", () => {
    expect(speed("incremental_delta")).toBeGreaterThan(speed("flat_exhaustive"));
  });
});

describe("capacity", () => {
  it("hierarchical block largest capacity", () => {
    expect(capacity("hierarchical_block")).toBeGreaterThan(capacity("flat_exhaustive"));
  });
});

describe("debuggability", () => {
  it("schematic driven best debuggability", () => {
    expect(debuggability("schematic_driven")).toBeGreaterThan(debuggability("flat_exhaustive"));
  });
});

describe("lvsCost", () => {
  it("layout parasitic most expensive", () => {
    expect(lvsCost("layout_parasitic")).toBeGreaterThan(lvsCost("incremental_delta"));
  });
});

describe("multiThread", () => {
  it("flat exhaustive is multi threaded", () => {
    expect(multiThread("flat_exhaustive")).toBe(true);
  });
  it("schematic driven not multi threaded", () => {
    expect(multiThread("schematic_driven")).toBe(false);
  });
});

describe("forFoundry", () => {
  it("flat exhaustive for foundry", () => {
    expect(forFoundry("flat_exhaustive")).toBe(true);
  });
  it("incremental delta not for foundry", () => {
    expect(forFoundry("incremental_delta")).toBe(false);
  });
});

describe("method", () => {
  it("incremental delta uses diff based local recheck", () => {
    expect(method("incremental_delta")).toBe("diff_based_local_recheck");
  });
});

describe("bestUse", () => {
  it("hierarchical block best for soc billion transistor", () => {
    expect(bestUse("hierarchical_block")).toBe("soc_billion_transistor");
  });
});

describe("lvsChecks", () => {
  it("returns 5 types", () => {
    expect(lvsChecks()).toHaveLength(5);
  });
});
