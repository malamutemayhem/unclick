import { describe, it, expect } from "vitest";
import {
  cordSmooth, speedBraid, controlLoop, comfortGrip,
  lucetCost, natural, ergonomic, forkMaterial,
  bestUse, lucetForks,
} from "../lucet-fork-calc.js";

describe("cordSmooth", () => {
  it("bone lucet smooth smoothest cord", () => {
    expect(cordSmooth("bone_lucet_smooth")).toBeGreaterThan(cordSmooth("wooden_lucet_standard"));
  });
});

describe("speedBraid", () => {
  it("ergonomic lucet grip fastest braid", () => {
    expect(speedBraid("ergonomic_lucet_grip")).toBeGreaterThan(speedBraid("mini_lucet_fine"));
  });
});

describe("controlLoop", () => {
  it("mini lucet fine best loop control", () => {
    expect(controlLoop("mini_lucet_fine")).toBeGreaterThan(controlLoop("metal_lucet_durable"));
  });
});

describe("comfortGrip", () => {
  it("ergonomic lucet grip most comfortable", () => {
    expect(comfortGrip("ergonomic_lucet_grip")).toBeGreaterThan(comfortGrip("metal_lucet_durable"));
  });
});

describe("lucetCost", () => {
  it("ergonomic lucet grip most expensive", () => {
    expect(lucetCost("ergonomic_lucet_grip")).toBeGreaterThan(lucetCost("wooden_lucet_standard"));
  });
});

describe("natural", () => {
  it("wooden lucet standard is natural", () => {
    expect(natural("wooden_lucet_standard")).toBe(true);
  });
  it("metal lucet durable not natural", () => {
    expect(natural("metal_lucet_durable")).toBe(false);
  });
});

describe("ergonomic", () => {
  it("ergonomic lucet grip is ergonomic", () => {
    expect(ergonomic("ergonomic_lucet_grip")).toBe(true);
  });
  it("wooden lucet standard not ergonomic", () => {
    expect(ergonomic("wooden_lucet_standard")).toBe(false);
  });
});

describe("forkMaterial", () => {
  it("bone lucet smooth uses polished bone fork", () => {
    expect(forkMaterial("bone_lucet_smooth")).toBe("polished_bone_fork");
  });
});

describe("bestUse", () => {
  it("wooden lucet standard best for general cord braid", () => {
    expect(bestUse("wooden_lucet_standard")).toBe("general_cord_braid");
  });
});

describe("lucetForks", () => {
  it("returns 5 types", () => {
    expect(lucetForks()).toHaveLength(5);
  });
});
