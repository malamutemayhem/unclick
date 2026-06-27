import { describe, it, expect } from "vitest";
import {
  layerCount, signalIntegrity, thermalPerf, routingDensity,
  stackupCost, impedanceCtrl, forRf, dielectric,
  bestUse, pcbStackups,
} from "../pcb-stackup-calc.js";

describe("layerCount", () => {
  it("eight layer hdi most layers", () => {
    expect(layerCount("eight_layer_hdi")).toBeGreaterThan(layerCount("two_layer_fr4"));
  });
});

describe("signalIntegrity", () => {
  it("eight layer hdi best signal integrity", () => {
    expect(signalIntegrity("eight_layer_hdi")).toBeGreaterThan(signalIntegrity("two_layer_fr4"));
  });
});

describe("thermalPerf", () => {
  it("eight layer hdi best thermal performance", () => {
    expect(thermalPerf("eight_layer_hdi")).toBeGreaterThan(thermalPerf("two_layer_fr4"));
  });
});

describe("routingDensity", () => {
  it("eight layer hdi highest routing density", () => {
    expect(routingDensity("eight_layer_hdi")).toBeGreaterThan(routingDensity("two_layer_fr4"));
  });
});

describe("stackupCost", () => {
  it("eight layer hdi most expensive", () => {
    expect(stackupCost("eight_layer_hdi")).toBeGreaterThan(stackupCost("two_layer_fr4"));
  });
});

describe("impedanceCtrl", () => {
  it("four layer sig pwr has impedance control", () => {
    expect(impedanceCtrl("four_layer_sig_pwr")).toBe(true);
  });
  it("two layer fr4 no impedance control", () => {
    expect(impedanceCtrl("two_layer_fr4")).toBe(false);
  });
});

describe("forRf", () => {
  it("six layer impedance is for rf", () => {
    expect(forRf("six_layer_impedance")).toBe(true);
  });
  it("two layer fr4 not for rf", () => {
    expect(forRf("two_layer_fr4")).toBe(false);
  });
});

describe("dielectric", () => {
  it("eight layer hdi uses low loss megtron6", () => {
    expect(dielectric("eight_layer_hdi")).toBe("low_loss_megtron6");
  });
});

describe("bestUse", () => {
  it("eight layer hdi best for fpga high speed design", () => {
    expect(bestUse("eight_layer_hdi")).toBe("fpga_high_speed_design");
  });
});

describe("pcbStackups", () => {
  it("returns 5 types", () => {
    expect(pcbStackups()).toHaveLength(5);
  });
});
