import { describe, it, expect } from "vitest";
import {
  flow, head, reliability, maintenance,
  gpCost, duplex, forCommercial, impeller,
  bestUse, grinderPumpTypes,
} from "../grinder-pump-calc.js";

describe("flow", () => {
  it("commercial highest flow", () => {
    expect(flow("commercial_duplex")).toBeGreaterThan(flow("marine_rv_compact"));
  });
});

describe("head", () => {
  it("high head highest", () => {
    expect(head("high_head_pressure")).toBeGreaterThan(head("marine_rv_compact"));
  });
});

describe("reliability", () => {
  it("commercial most reliable", () => {
    expect(reliability("commercial_duplex")).toBeGreaterThan(reliability("marine_rv_compact"));
  });
});

describe("maintenance", () => {
  it("high head highest maintenance", () => {
    expect(maintenance("high_head_pressure")).toBeGreaterThan(maintenance("marine_rv_compact"));
  });
});

describe("gpCost", () => {
  it("high head most expensive", () => {
    expect(gpCost("high_head_pressure")).toBeGreaterThan(gpCost("marine_rv_compact"));
  });
});

describe("duplex", () => {
  it("commercial is duplex", () => {
    expect(duplex("commercial_duplex")).toBe(true);
  });
  it("residential not duplex", () => {
    expect(duplex("residential_simplex")).toBe(false);
  });
});

describe("forCommercial", () => {
  it("commercial duplex for commercial", () => {
    expect(forCommercial("commercial_duplex")).toBe(true);
  });
  it("residential not commercial", () => {
    expect(forCommercial("residential_simplex")).toBe(false);
  });
});

describe("impeller", () => {
  it("marine uses macerator", () => {
    expect(impeller("marine_rv_compact")).toBe("compact_macerator_12v_24v");
  });
});

describe("bestUse", () => {
  it("residential for basement", () => {
    expect(bestUse("residential_simplex")).toBe("basement_bathroom_below_sewer");
  });
});

describe("grinderPumpTypes", () => {
  it("returns 5 types", () => {
    expect(grinderPumpTypes()).toHaveLength(5);
  });
});
