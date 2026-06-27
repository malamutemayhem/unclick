import { describe, it, expect } from "vitest";
import {
  markClarity, fabricSafe, patternTransfer, versatility,
  wheelCost, perforates, dualWheel, wheelProfile,
  bestUse, pounceWheels,
} from "../pounce-wheel-calc.js";

describe("markClarity", () => {
  it("serrated edge perf clearest mark", () => {
    expect(markClarity("serrated_edge_perf")).toBeGreaterThan(markClarity("blunt_trace_no_mark"));
  });
});

describe("fabricSafe", () => {
  it("blunt trace no mark most fabric safe", () => {
    expect(fabricSafe("blunt_trace_no_mark")).toBeGreaterThan(fabricSafe("serrated_edge_perf"));
  });
});

describe("patternTransfer", () => {
  it("serrated edge perf best pattern transfer", () => {
    expect(patternTransfer("serrated_edge_perf")).toBeGreaterThan(patternTransfer("blunt_trace_no_mark"));
  });
});

describe("versatility", () => {
  it("adjustable space set most versatile", () => {
    expect(versatility("adjustable_space_set")).toBeGreaterThan(versatility("blunt_trace_no_mark"));
  });
});

describe("wheelCost", () => {
  it("double line parallel more expensive", () => {
    expect(wheelCost("double_line_parallel")).toBeGreaterThan(wheelCost("single_line_basic"));
  });
});

describe("perforates", () => {
  it("single line basic perforates", () => {
    expect(perforates("single_line_basic")).toBe(true);
  });
  it("blunt trace no mark does not perforate", () => {
    expect(perforates("blunt_trace_no_mark")).toBe(false);
  });
});

describe("dualWheel", () => {
  it("double line parallel is dual wheel", () => {
    expect(dualWheel("double_line_parallel")).toBe(true);
  });
  it("single line basic not dual wheel", () => {
    expect(dualWheel("single_line_basic")).toBe(false);
  });
});

describe("wheelProfile", () => {
  it("single line basic uses single spike wheel", () => {
    expect(wheelProfile("single_line_basic")).toBe("single_spike_wheel");
  });
});

describe("bestUse", () => {
  it("blunt trace no mark best for delicate fabric trace", () => {
    expect(bestUse("blunt_trace_no_mark")).toBe("delicate_fabric_trace");
  });
});

describe("pounceWheels", () => {
  it("returns 5 types", () => {
    expect(pounceWheels()).toHaveLength(5);
  });
});
