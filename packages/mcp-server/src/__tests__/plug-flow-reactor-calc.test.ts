import { describe, it, expect } from "vitest";
import {
  conversion, heatTransfer, mixing, residence,
  prCost, continuous, forFastReact, geometry,
  bestUse, plugFlowReactorTypes,
} from "../plug-flow-reactor-calc.js";

describe("conversion", () => {
  it("multi tube shell highest conversion", () => {
    expect(conversion("multi_tube_shell_cool")).toBeGreaterThan(conversion("single_tube_isothermal"));
  });
});

describe("heatTransfer", () => {
  it("microreactor best heat transfer", () => {
    expect(heatTransfer("microreactor_channel")).toBeGreaterThan(heatTransfer("single_tube_isothermal"));
  });
});

describe("mixing", () => {
  it("microreactor best mixing", () => {
    expect(mixing("microreactor_channel")).toBeGreaterThan(mixing("single_tube_isothermal"));
  });
});

describe("residence", () => {
  it("oscillatory baffled longest residence", () => {
    expect(residence("oscillatory_baffled")).toBeGreaterThan(residence("microreactor_channel"));
  });
});

describe("prCost", () => {
  it("microreactor most expensive", () => {
    expect(prCost("microreactor_channel")).toBeGreaterThan(prCost("single_tube_isothermal"));
  });
});

describe("continuous", () => {
  it("all plug flow reactors are continuous", () => {
    expect(continuous("single_tube_isothermal")).toBe(true);
    expect(continuous("microreactor_channel")).toBe(true);
  });
});

describe("forFastReact", () => {
  it("microreactor for fast reactions", () => {
    expect(forFastReact("microreactor_channel")).toBe(true);
  });
  it("single tube not for fast reactions", () => {
    expect(forFastReact("single_tube_isothermal")).toBe(false);
  });
});

describe("geometry", () => {
  it("oscillatory baffled uses baffled tube", () => {
    expect(geometry("oscillatory_baffled")).toBe("baffled_tube_oscillate_piston_plug");
  });
});

describe("bestUse", () => {
  it("microreactor for hazardous fast react", () => {
    expect(bestUse("microreactor_channel")).toBe("hazardous_fast_react_precise_control");
  });
});

describe("plugFlowReactorTypes", () => {
  it("returns 5 types", () => {
    expect(plugFlowReactorTypes()).toHaveLength(5);
  });
});
