import { describe, it, expect } from "vitest";
import {
  weaveEven, setupEase, yarnRange, portability,
  loomCost, round, adjustable, pegSpacing,
  bestUse, pegLooms,
} from "../peg-loom-calc.js";

describe("weaveEven", () => {
  it("fine gauge thin most even weave", () => {
    expect(weaveEven("fine_gauge_thin")).toBeGreaterThan(weaveEven("large_gauge_bulky"));
  });
});

describe("setupEase", () => {
  it("large gauge bulky easiest setup", () => {
    expect(setupEase("large_gauge_bulky")).toBeGreaterThan(setupEase("adjustable_peg_multi"));
  });
});

describe("yarnRange", () => {
  it("adjustable peg multi widest yarn range", () => {
    expect(yarnRange("adjustable_peg_multi")).toBeGreaterThan(yarnRange("fine_gauge_thin"));
  });
});

describe("portability", () => {
  it("fine gauge thin most portable", () => {
    expect(portability("fine_gauge_thin")).toBeGreaterThan(portability("adjustable_peg_multi"));
  });
});

describe("loomCost", () => {
  it("adjustable peg multi most expensive", () => {
    expect(loomCost("adjustable_peg_multi")).toBeGreaterThan(loomCost("large_gauge_bulky"));
  });
});

describe("round", () => {
  it("round peg circle is round", () => {
    expect(round("round_peg_circle")).toBe(true);
  });
  it("rectangular peg standard not round", () => {
    expect(round("rectangular_peg_standard")).toBe(false);
  });
});

describe("adjustable", () => {
  it("adjustable peg multi is adjustable", () => {
    expect(adjustable("adjustable_peg_multi")).toBe(true);
  });
  it("rectangular peg standard not adjustable", () => {
    expect(adjustable("rectangular_peg_standard")).toBe(false);
  });
});

describe("pegSpacing", () => {
  it("adjustable peg multi uses variable slot peg", () => {
    expect(pegSpacing("adjustable_peg_multi")).toBe("variable_slot_peg");
  });
});

describe("bestUse", () => {
  it("rectangular peg standard best for general peg weave", () => {
    expect(bestUse("rectangular_peg_standard")).toBe("general_peg_weave");
  });
});

describe("pegLooms", () => {
  it("returns 5 types", () => {
    expect(pegLooms()).toHaveLength(5);
  });
});
