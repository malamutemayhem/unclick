import { describe, it, expect } from "vitest";
import {
  conversion, heatTransfer, mixingControl, scaleUp,
  prCost, continuous, forHighConversion, config,
  bestUse, pfrReactorTypes,
} from "../pfr-reactor-calc.js";

describe("conversion", () => {
  it("packed tube highest conversion", () => {
    expect(conversion("packed_tube_catalytic")).toBeGreaterThan(conversion("coiled_tube_compact"));
  });
});

describe("heatTransfer", () => {
  it("microreactor best heat transfer", () => {
    expect(heatTransfer("microreactor_flow")).toBeGreaterThan(heatTransfer("single_tube_lab"));
  });
});

describe("mixingControl", () => {
  it("microreactor best mixing control", () => {
    expect(mixingControl("microreactor_flow")).toBeGreaterThan(mixingControl("multi_tube_industrial"));
  });
});

describe("scaleUp", () => {
  it("multi tube best scale up", () => {
    expect(scaleUp("multi_tube_industrial")).toBeGreaterThan(scaleUp("microreactor_flow"));
  });
});

describe("prCost", () => {
  it("microreactor most expensive", () => {
    expect(prCost("microreactor_flow")).toBeGreaterThan(prCost("single_tube_lab"));
  });
});

describe("continuous", () => {
  it("all pfr reactors are continuous", () => {
    expect(continuous("single_tube_lab")).toBe(true);
  });
});

describe("forHighConversion", () => {
  it("packed tube for high conversion", () => {
    expect(forHighConversion("packed_tube_catalytic")).toBe(true);
  });
  it("coiled tube not for high conversion", () => {
    expect(forHighConversion("coiled_tube_compact")).toBe(false);
  });
});

describe("config", () => {
  it("microreactor uses microchannel", () => {
    expect(config("microreactor_flow")).toBe("microchannel_etched_plate_sub_mm_flow_path");
  });
});

describe("bestUse", () => {
  it("packed tube for methanol synthesis", () => {
    expect(bestUse("packed_tube_catalytic")).toBe("methanol_synthesis_fischer_tropsch_catalytic");
  });
});

describe("pfrReactorTypes", () => {
  it("returns 5 types", () => {
    expect(pfrReactorTypes()).toHaveLength(5);
  });
});
