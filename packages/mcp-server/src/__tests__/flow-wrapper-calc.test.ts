import { describe, it, expect } from "vitest";
import {
  sealQuality, throughput, productRange, filmEconomy,
  fwCost__, modified_atm, forBakery, wrapperConfig,
  bestUse, flowWrapperTypes,
} from "../flow-wrapper-calc.js";

describe("sealQuality", () => {
  it("box motion best seal quality", () => {
    expect(sealQuality("box_motion")).toBeGreaterThan(sealQuality("rotary_jaw"));
  });
});

describe("throughput", () => {
  it("horizontal flow highest throughput", () => {
    expect(throughput("horizontal_flow")).toBeGreaterThan(throughput("box_motion"));
  });
});

describe("productRange", () => {
  it("box motion best product range", () => {
    expect(productRange("box_motion")).toBeGreaterThan(productRange("rotary_jaw"));
  });
});

describe("filmEconomy", () => {
  it("rotary jaw best film economy", () => {
    expect(filmEconomy("rotary_jaw")).toBeGreaterThan(filmEconomy("box_motion"));
  });
});

describe("fwCost__", () => {
  it("box motion most expensive", () => {
    expect(fwCost__("box_motion")).toBeGreaterThan(fwCost__("fin_seal_flow"));
  });
});

describe("modified_atm", () => {
  it("box motion supports modified atmosphere", () => {
    expect(modified_atm("box_motion")).toBe(true);
  });
  it("horizontal flow no modified atmosphere", () => {
    expect(modified_atm("horizontal_flow")).toBe(false);
  });
});

describe("forBakery", () => {
  it("horizontal flow for bakery", () => {
    expect(forBakery("horizontal_flow")).toBe(true);
  });
  it("inverted flow not for bakery", () => {
    expect(forBakery("inverted_flow")).toBe(false);
  });
});

describe("wrapperConfig", () => {
  it("rotary jaw uses rotating seal jaw continuous high speed", () => {
    expect(wrapperConfig("rotary_jaw")).toBe("rotary_jaw_flow_wrapper_rotating_seal_jaw_continuous_high_speed");
  });
});

describe("bestUse", () => {
  it("box motion for fresh produce map gas flush extend shelf", () => {
    expect(bestUse("box_motion")).toBe("fresh_produce_box_motion_flow_wrapper_map_gas_flush_extend_shelf");
  });
});

describe("flowWrapperTypes", () => {
  it("returns 5 types", () => {
    expect(flowWrapperTypes()).toHaveLength(5);
  });
});
