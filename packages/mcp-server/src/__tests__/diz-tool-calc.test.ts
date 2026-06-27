import { describe, it, expect } from "vitest";
import {
  fiberDraft, sizingEven, durability, holeRange,
  dizCost, natural, adjustable, holeMaterial,
  bestUse, dizTools,
} from "../diz-tool-calc.js";

describe("fiberDraft", () => {
  it("ceramic diz smooth best fiber draft", () => {
    expect(fiberDraft("ceramic_diz_smooth")).toBeGreaterThan(fiberDraft("shell_diz_natural"));
  });
});

describe("sizingEven", () => {
  it("ceramic diz smooth most even sizing", () => {
    expect(sizingEven("ceramic_diz_smooth")).toBeGreaterThan(sizingEven("shell_diz_natural"));
  });
});

describe("durability", () => {
  it("bone diz traditional most durable", () => {
    expect(durability("bone_diz_traditional")).toBeGreaterThan(durability("shell_diz_natural"));
  });
});

describe("holeRange", () => {
  it("adjustable diz set widest hole range", () => {
    expect(holeRange("adjustable_diz_set")).toBeGreaterThan(holeRange("shell_diz_natural"));
  });
});

describe("dizCost", () => {
  it("adjustable diz set most expensive", () => {
    expect(dizCost("adjustable_diz_set")).toBeGreaterThan(dizCost("shell_diz_natural"));
  });
});

describe("natural", () => {
  it("wooden diz standard is natural", () => {
    expect(natural("wooden_diz_standard")).toBe(true);
  });
  it("adjustable diz set not natural", () => {
    expect(natural("adjustable_diz_set")).toBe(false);
  });
});

describe("adjustable", () => {
  it("adjustable diz set is adjustable", () => {
    expect(adjustable("adjustable_diz_set")).toBe(true);
  });
  it("wooden diz standard not adjustable", () => {
    expect(adjustable("wooden_diz_standard")).toBe(false);
  });
});

describe("holeMaterial", () => {
  it("ceramic diz smooth uses glazed ceramic hole", () => {
    expect(holeMaterial("ceramic_diz_smooth")).toBe("glazed_ceramic_hole");
  });
});

describe("bestUse", () => {
  it("wooden diz standard best for general fiber diz", () => {
    expect(bestUse("wooden_diz_standard")).toBe("general_fiber_diz");
  });
});

describe("dizTools", () => {
  it("returns 5 types", () => {
    expect(dizTools()).toHaveLength(5);
  });
});
