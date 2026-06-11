import { describe, it, expect } from "vitest";
import {
  propagDelay, inputOffset, overdrive, hysteresis,
  compCost, builtinHysteresis, forPower, output,
  bestUse, comparatorTypes,
} from "../comparator-type-calc.js";

describe("propagDelay", () => {
  it("latch regenerative fastest propagation", () => {
    expect(propagDelay("latch_regenerative")).toBeGreaterThan(propagDelay("open_drain_basic"));
  });
});

describe("inputOffset", () => {
  it("strobed clocked best input offset", () => {
    expect(inputOffset("strobed_clocked")).toBeGreaterThan(inputOffset("open_drain_basic"));
  });
});

describe("overdrive", () => {
  it("latch regenerative best overdrive", () => {
    expect(overdrive("latch_regenerative")).toBeGreaterThan(overdrive("open_drain_basic"));
  });
});

describe("hysteresis", () => {
  it("window dual ref best hysteresis", () => {
    expect(hysteresis("window_dual_ref")).toBeGreaterThan(hysteresis("open_drain_basic"));
  });
});

describe("compCost", () => {
  it("strobed clocked most expensive", () => {
    expect(compCost("strobed_clocked")).toBeGreaterThan(compCost("open_drain_basic"));
  });
});

describe("builtinHysteresis", () => {
  it("window dual ref has builtin hysteresis", () => {
    expect(builtinHysteresis("window_dual_ref")).toBe(true);
  });
  it("open drain basic no builtin hysteresis", () => {
    expect(builtinHysteresis("open_drain_basic")).toBe(false);
  });
});

describe("forPower", () => {
  it("window dual ref is for power", () => {
    expect(forPower("window_dual_ref")).toBe(true);
  });
  it("latch regenerative not for power", () => {
    expect(forPower("latch_regenerative")).toBe(false);
  });
});

describe("output", () => {
  it("latch regenerative uses diff latch", () => {
    expect(output("latch_regenerative")).toBe("diff_latch_q_qb");
  });
});

describe("bestUse", () => {
  it("window dual ref best for voltage supervisor", () => {
    expect(bestUse("window_dual_ref")).toBe("voltage_supervisor");
  });
});

describe("comparatorTypes", () => {
  it("returns 5 types", () => {
    expect(comparatorTypes()).toHaveLength(5);
  });
});
