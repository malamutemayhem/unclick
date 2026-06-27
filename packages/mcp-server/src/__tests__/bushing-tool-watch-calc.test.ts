import { describe, it, expect } from "vitest";
import {
  holeAccuracy, finishSmooth, speedWork, sizeRange,
  toolCost, powered, forPolish, cutMethod,
  bestUse, bushingToolWatches,
} from "../bushing-tool-watch-calc.js";

describe("holeAccuracy", () => {
  it("micro lathe turn most accurate", () => {
    expect(holeAccuracy("micro_lathe_turn")).toBeGreaterThan(holeAccuracy("burnisher_polish"));
  });
});

describe("finishSmooth", () => {
  it("burnisher polish smoothest finish", () => {
    expect(finishSmooth("burnisher_polish")).toBeGreaterThan(finishSmooth("broach_set_taper"));
  });
});

describe("speedWork", () => {
  it("press fit install fastest work", () => {
    expect(speedWork("press_fit_install")).toBeGreaterThan(speedWork("burnisher_polish"));
  });
});

describe("sizeRange", () => {
  it("micro lathe turn best size range", () => {
    expect(sizeRange("micro_lathe_turn")).toBeGreaterThan(sizeRange("burnisher_polish"));
  });
});

describe("toolCost", () => {
  it("micro lathe turn most expensive", () => {
    expect(toolCost("micro_lathe_turn")).toBeGreaterThan(toolCost("burnisher_polish"));
  });
});

describe("powered", () => {
  it("micro lathe turn is powered", () => {
    expect(powered("micro_lathe_turn")).toBe(true);
  });
  it("hand reamer standard not powered", () => {
    expect(powered("hand_reamer_standard")).toBe(false);
  });
});

describe("forPolish", () => {
  it("burnisher polish is for polish", () => {
    expect(forPolish("burnisher_polish")).toBe(true);
  });
  it("hand reamer standard not for polish", () => {
    expect(forPolish("hand_reamer_standard")).toBe(false);
  });
});

describe("cutMethod", () => {
  it("broach set taper uses tapered broach push", () => {
    expect(cutMethod("broach_set_taper")).toBe("tapered_broach_push");
  });
});

describe("bestUse", () => {
  it("hand reamer standard best for general bushing ream", () => {
    expect(bestUse("hand_reamer_standard")).toBe("general_bushing_ream");
  });
});

describe("bushingToolWatches", () => {
  it("returns 5 types", () => {
    expect(bushingToolWatches()).toHaveLength(5);
  });
});
