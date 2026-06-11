import { describe, it, expect } from "vitest";
import {
  strength, span, fireResist, sustainability,
  tmCost, engineered, forMassTimber, species,
  bestUse, timberTypes,
} from "../timber-type-calc.js";

describe("strength", () => {
  it("lvl highest strength", () => {
    expect(strength("lvl_laminated_veneer")).toBeGreaterThan(strength("sawn_softwood_spf"));
  });
});

describe("span", () => {
  it("glulam longest span", () => {
    expect(span("glulam_beam_laminated")).toBeGreaterThan(span("sawn_softwood_spf"));
  });
});

describe("fireResist", () => {
  it("clt best fire resistance", () => {
    expect(fireResist("clt_cross_laminated")).toBeGreaterThan(fireResist("sawn_softwood_spf"));
  });
});

describe("sustainability", () => {
  it("clt most sustainable", () => {
    expect(sustainability("clt_cross_laminated")).toBeGreaterThan(sustainability("hardwood_oak_structural"));
  });
});

describe("tmCost", () => {
  it("hardwood oak most expensive", () => {
    expect(tmCost("hardwood_oak_structural")).toBeGreaterThan(tmCost("sawn_softwood_spf"));
  });
});

describe("engineered", () => {
  it("glulam is engineered", () => {
    expect(engineered("glulam_beam_laminated")).toBe(true);
  });
  it("sawn softwood not engineered", () => {
    expect(engineered("sawn_softwood_spf")).toBe(false);
  });
});

describe("forMassTimber", () => {
  it("clt for mass timber", () => {
    expect(forMassTimber("clt_cross_laminated")).toBe(true);
  });
  it("sawn softwood not for mass timber", () => {
    expect(forMassTimber("sawn_softwood_spf")).toBe(false);
  });
});

describe("species", () => {
  it("hardwood uses white oak quarter sawn", () => {
    expect(species("hardwood_oak_structural")).toBe("white_oak_quarter_sawn");
  });
});

describe("bestUse", () => {
  it("glulam best for long span beam arch", () => {
    expect(bestUse("glulam_beam_laminated")).toBe("long_span_beam_arch_gym");
  });
});

describe("timberTypes", () => {
  it("returns 5 types", () => {
    expect(timberTypes()).toHaveLength(5);
  });
});
