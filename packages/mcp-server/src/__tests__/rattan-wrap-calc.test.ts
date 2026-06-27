import { describe, it, expect } from "vitest";
import {
  wrapTight, coverSmooth, durability, flexBend,
  rattanCost, flat, forBinding, profile,
  bestUse, rattanWraps,
} from "../rattan-wrap-calc.js";

describe("wrapTight", () => {
  it("binder cane fine tightest wrap", () => {
    expect(wrapTight("binder_cane_fine")).toBeGreaterThan(wrapTight("round_reed_thick"));
  });
});

describe("coverSmooth", () => {
  it("flat oval medium smoothest cover", () => {
    expect(coverSmooth("flat_oval_medium")).toBeGreaterThan(coverSmooth("round_reed_thick"));
  });
});

describe("durability", () => {
  it("round reed thick most durable", () => {
    expect(durability("round_reed_thick")).toBeGreaterThan(durability("binder_cane_fine"));
  });
});

describe("flexBend", () => {
  it("binder cane fine most flexible", () => {
    expect(flexBend("binder_cane_fine")).toBeGreaterThan(flexBend("round_reed_thick"));
  });
});

describe("rattanCost", () => {
  it("binder cane fine most expensive", () => {
    expect(rattanCost("binder_cane_fine")).toBeGreaterThan(rattanCost("flat_reed_wide"));
  });
});

describe("flat", () => {
  it("flat oval medium is flat", () => {
    expect(flat("flat_oval_medium")).toBe(true);
  });
  it("binding cane narrow not flat", () => {
    expect(flat("binding_cane_narrow")).toBe(false);
  });
});

describe("forBinding", () => {
  it("binding cane narrow is for binding", () => {
    expect(forBinding("binding_cane_narrow")).toBe(true);
  });
  it("flat oval medium not for binding", () => {
    expect(forBinding("flat_oval_medium")).toBe(false);
  });
});

describe("profile", () => {
  it("round reed thick uses round solid core", () => {
    expect(profile("round_reed_thick")).toBe("round_solid_core");
  });
});

describe("bestUse", () => {
  it("binding cane narrow best for edge binding wrap", () => {
    expect(bestUse("binding_cane_narrow")).toBe("edge_binding_wrap");
  });
});

describe("rattanWraps", () => {
  it("returns 5 types", () => {
    expect(rattanWraps()).toHaveLength(5);
  });
});
