import { describe, it, expect } from "vitest";
import {
  bandwidth, reach, portDensity, powerPerPort,
  ethCost, breakout, forSpine, optics,
  bestUse, ethernetSpeeds,
} from "../ethernet-speed-calc.js";

describe("bandwidth", () => {
  it("osfp 800g highest bandwidth", () => {
    expect(bandwidth("osfp_800g")).toBeGreaterThan(bandwidth("gbe_1g_copper"));
  });
});

describe("reach", () => {
  it("gbe 1g copper longest reach", () => {
    expect(reach("gbe_1g_copper")).toBeGreaterThan(reach("osfp_800g"));
  });
});

describe("portDensity", () => {
  it("gbe 1g copper highest port density", () => {
    expect(portDensity("gbe_1g_copper")).toBeGreaterThan(portDensity("osfp_800g"));
  });
});

describe("powerPerPort", () => {
  it("gbe 1g copper lowest power per port", () => {
    expect(powerPerPort("gbe_1g_copper")).toBeGreaterThan(powerPerPort("osfp_800g"));
  });
});

describe("ethCost", () => {
  it("osfp 800g most expensive", () => {
    expect(ethCost("osfp_800g")).toBeGreaterThan(ethCost("gbe_1g_copper"));
  });
});

describe("breakout", () => {
  it("qsfp56 100g supports breakout", () => {
    expect(breakout("qsfp56_100g")).toBe(true);
  });
  it("gbe 1g copper no breakout", () => {
    expect(breakout("gbe_1g_copper")).toBe(false);
  });
});

describe("forSpine", () => {
  it("qsfp dd 400g is for spine", () => {
    expect(forSpine("qsfp_dd_400g")).toBe(true);
  });
  it("gbe 1g copper not for spine", () => {
    expect(forSpine("gbe_1g_copper")).toBe(false);
  });
});

describe("optics", () => {
  it("osfp 800g uses osfp 2x400g lr", () => {
    expect(optics("osfp_800g")).toBe("osfp_2x400g_lr");
  });
});

describe("bestUse", () => {
  it("osfp 800g best for ai backend network", () => {
    expect(bestUse("osfp_800g")).toBe("ai_backend_network");
  });
});

describe("ethernetSpeeds", () => {
  it("returns 5 types", () => {
    expect(ethernetSpeeds()).toHaveLength(5);
  });
});
