import { describe, it, expect } from "vitest";
import {
  tempAccuracy, visibility, tempRange, reliability,
  coneCost, selfSupport, miniSize, coneShape,
  bestUse, witnessCones,
} from "../witness-cone-calc.js";

describe("tempAccuracy", () => {
  it("large cone standard most accurate temp", () => {
    expect(tempAccuracy("large_cone_standard")).toBeGreaterThan(tempAccuracy("junior_cone_mini"));
  });
});

describe("visibility", () => {
  it("large cone standard most visible", () => {
    expect(visibility("large_cone_standard")).toBeGreaterThan(visibility("junior_cone_mini"));
  });
});

describe("tempRange", () => {
  it("guard cone safety widest temp range", () => {
    expect(tempRange("guard_cone_safety")).toBeGreaterThan(tempRange("small_cone_low"));
  });
});

describe("reliability", () => {
  it("guard cone safety most reliable", () => {
    expect(reliability("guard_cone_safety")).toBeGreaterThan(reliability("junior_cone_mini"));
  });
});

describe("coneCost", () => {
  it("self support bar most expensive", () => {
    expect(coneCost("self_support_bar")).toBeGreaterThan(coneCost("small_cone_low"));
  });
});

describe("selfSupport", () => {
  it("self support bar is self support", () => {
    expect(selfSupport("self_support_bar")).toBe(true);
  });
  it("large cone standard not self support", () => {
    expect(selfSupport("large_cone_standard")).toBe(false);
  });
});

describe("miniSize", () => {
  it("junior cone mini is mini size", () => {
    expect(miniSize("junior_cone_mini")).toBe(true);
  });
  it("large cone standard not mini size", () => {
    expect(miniSize("large_cone_standard")).toBe(false);
  });
});

describe("coneShape", () => {
  it("guard cone safety uses guard warning cone", () => {
    expect(coneShape("guard_cone_safety")).toBe("guard_warning_cone");
  });
});

describe("bestUse", () => {
  it("large cone standard best for general fire witness", () => {
    expect(bestUse("large_cone_standard")).toBe("general_fire_witness");
  });
});

describe("witnessCones", () => {
  it("returns 5 types", () => {
    expect(witnessCones()).toHaveLength(5);
  });
});
