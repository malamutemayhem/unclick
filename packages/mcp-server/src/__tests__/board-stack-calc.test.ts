import { describe, it, expect } from "vitest";
import {
  signalLayers, powerIntegrity, routingDensity, thermalManage,
  stackCost, innerPlanes, forHighSpeed, stackConfig,
  bestUse, boardStacks,
} from "../board-stack-calc.js";

describe("signalLayers", () => {
  it("ten plus backplane most signal layers", () => {
    expect(signalLayers("ten_plus_backplane")).toBeGreaterThan(signalLayers("two_layer_standard"));
  });
});

describe("powerIntegrity", () => {
  it("ten plus backplane best power integrity", () => {
    expect(powerIntegrity("ten_plus_backplane")).toBeGreaterThan(powerIntegrity("two_layer_standard"));
  });
});

describe("routingDensity", () => {
  it("ten plus backplane highest routing density", () => {
    expect(routingDensity("ten_plus_backplane")).toBeGreaterThan(routingDensity("two_layer_standard"));
  });
});

describe("thermalManage", () => {
  it("ten plus backplane best thermal manage", () => {
    expect(thermalManage("ten_plus_backplane")).toBeGreaterThan(thermalManage("two_layer_standard"));
  });
});

describe("stackCost", () => {
  it("ten plus backplane most expensive", () => {
    expect(stackCost("ten_plus_backplane")).toBeGreaterThan(stackCost("two_layer_standard"));
  });
});

describe("innerPlanes", () => {
  it("four layer signal has inner planes", () => {
    expect(innerPlanes("four_layer_signal")).toBe(true);
  });
  it("two layer standard no inner planes", () => {
    expect(innerPlanes("two_layer_standard")).toBe(false);
  });
});

describe("forHighSpeed", () => {
  it("eight layer hdi is for high speed", () => {
    expect(forHighSpeed("eight_layer_hdi")).toBe(true);
  });
  it("two layer standard not for high speed", () => {
    expect(forHighSpeed("two_layer_standard")).toBe(false);
  });
});

describe("stackConfig", () => {
  it("four layer signal uses sig gnd pwr sig", () => {
    expect(stackConfig("four_layer_signal")).toBe("sig_gnd_pwr_sig");
  });
});

describe("bestUse", () => {
  it("two layer standard best for simple low density board", () => {
    expect(bestUse("two_layer_standard")).toBe("simple_low_density_board");
  });
});

describe("boardStacks", () => {
  it("returns 5 types", () => {
    expect(boardStacks()).toHaveLength(5);
  });
});
