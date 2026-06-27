import { describe, it, expect } from "vitest";
import {
  portDensity, signalQuality, installEase, durability,
  panelCost, modular, forFiber, connectorType,
  bestUse, patchPanels,
} from "../patch-panel-calc.js";

describe("portDensity", () => {
  it("cat6 24port highest port density", () => {
    expect(portDensity("cat6_24port_1u")).toBeGreaterThan(portDensity("coax_bnc_16port"));
  });
});

describe("signalQuality", () => {
  it("fiber lc 12port best signal quality", () => {
    expect(signalQuality("fiber_lc_12port")).toBeGreaterThan(signalQuality("coax_bnc_16port"));
  });
});

describe("installEase", () => {
  it("keystone blank modular easiest install", () => {
    expect(installEase("keystone_blank_modular")).toBeGreaterThan(installEase("fiber_lc_12port"));
  });
});

describe("durability", () => {
  it("coax bnc most durable", () => {
    expect(durability("coax_bnc_16port")).toBeGreaterThan(durability("feed_through_rj45"));
  });
});

describe("panelCost", () => {
  it("fiber lc 12port most expensive", () => {
    expect(panelCost("fiber_lc_12port")).toBeGreaterThan(panelCost("keystone_blank_modular"));
  });
});

describe("modular", () => {
  it("keystone blank modular is modular", () => {
    expect(modular("keystone_blank_modular")).toBe(true);
  });
  it("cat6 24port not modular", () => {
    expect(modular("cat6_24port_1u")).toBe(false);
  });
});

describe("forFiber", () => {
  it("fiber lc 12port is for fiber", () => {
    expect(forFiber("fiber_lc_12port")).toBe(true);
  });
  it("cat6 24port not for fiber", () => {
    expect(forFiber("cat6_24port_1u")).toBe(false);
  });
});

describe("connectorType", () => {
  it("coax bnc uses bnc bulkhead female", () => {
    expect(connectorType("coax_bnc_16port")).toBe("bnc_bulkhead_female");
  });
});

describe("bestUse", () => {
  it("keystone blank modular best for mixed media custom panel", () => {
    expect(bestUse("keystone_blank_modular")).toBe("mixed_media_custom_panel");
  });
});

describe("patchPanels", () => {
  it("returns 5 types", () => {
    expect(patchPanels()).toHaveLength(5);
  });
});
