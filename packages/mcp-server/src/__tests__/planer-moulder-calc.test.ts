import { describe, it, expect } from "vitest";
import {
  surfaceFinish, throughput, profileRange, thicknessAccuracy,
  pmCost, multiSide, forMoulding, planerConfig,
  bestUse, planerMoulderTypes,
} from "../planer-moulder-calc.js";

describe("surfaceFinish", () => {
  it("spiral head best surface finish", () => {
    expect(surfaceFinish("spiral_head")).toBeGreaterThan(surfaceFinish("single_side"));
  });
});

describe("throughput", () => {
  it("four side highest throughput", () => {
    expect(throughput("four_side")).toBeGreaterThan(throughput("spiral_head"));
  });
});

describe("profileRange", () => {
  it("moulder profiler widest profile range", () => {
    expect(profileRange("moulder_profiler")).toBeGreaterThan(profileRange("single_side"));
  });
});

describe("thicknessAccuracy", () => {
  it("four side best thickness accuracy", () => {
    expect(thicknessAccuracy("four_side")).toBeGreaterThan(thicknessAccuracy("single_side"));
  });
});

describe("pmCost", () => {
  it("four side most expensive", () => {
    expect(pmCost("four_side")).toBeGreaterThan(pmCost("single_side"));
  });
});

describe("multiSide", () => {
  it("four side is multi side", () => {
    expect(multiSide("four_side")).toBe(true);
  });
  it("single side not multi side", () => {
    expect(multiSide("single_side")).toBe(false);
  });
});

describe("forMoulding", () => {
  it("moulder profiler for moulding", () => {
    expect(forMoulding("moulder_profiler")).toBe(true);
  });
  it("single side not for moulding", () => {
    expect(forMoulding("single_side")).toBe(false);
  });
});

describe("planerConfig", () => {
  it("spiral head uses helical insert cutter smooth tearout free", () => {
    expect(planerConfig("spiral_head")).toBe("spiral_head_planer_helical_insert_cutter_smooth_tearout_free");
  });
});

describe("bestUse", () => {
  it("moulder profiler for custom millwork crown baseboard casing trim", () => {
    expect(bestUse("moulder_profiler")).toBe("custom_millwork_moulder_profiler_crown_baseboard_casing_trim");
  });
});

describe("planerMoulderTypes", () => {
  it("returns 5 types", () => {
    expect(planerMoulderTypes()).toHaveLength(5);
  });
});
