import { describe, it, expect } from "vitest";
import {
  throughput, range, reliability, latency,
  commCost, broadband, forSmartGrid, modulation,
  bestUse, powerlineComms,
} from "../powerline-comm-calc.js";

describe("throughput", () => {
  it("broadband bpl highest throughput", () => {
    expect(throughput("broadband_bpl")).toBeGreaterThan(throughput("g3_plc_ofdm"));
  });
});

describe("range", () => {
  it("g3 plc ofdm longest range", () => {
    expect(range("g3_plc_ofdm")).toBeGreaterThan(range("broadband_bpl"));
  });
});

describe("reliability", () => {
  it("g3 plc ofdm most reliable", () => {
    expect(reliability("g3_plc_ofdm")).toBeGreaterThan(reliability("broadband_bpl"));
  });
});

describe("latency", () => {
  it("broadband bpl best latency", () => {
    expect(latency("broadband_bpl")).toBeGreaterThan(latency("g3_plc_ofdm"));
  });
});

describe("commCost", () => {
  it("broadband bpl most expensive", () => {
    expect(commCost("broadband_bpl")).toBeGreaterThan(commCost("g3_plc_ofdm"));
  });
});

describe("broadband", () => {
  it("homeplug av2 is broadband", () => {
    expect(broadband("homeplug_av2")).toBe(true);
  });
  it("g3 plc ofdm not broadband", () => {
    expect(broadband("g3_plc_ofdm")).toBe(false);
  });
});

describe("forSmartGrid", () => {
  it("g3 plc ofdm is for smart grid", () => {
    expect(forSmartGrid("g3_plc_ofdm")).toBe(true);
  });
  it("homeplug av2 not for smart grid", () => {
    expect(forSmartGrid("homeplug_av2")).toBe(false);
  });
});

describe("modulation", () => {
  it("homeplug av2 uses ofdm mimo beamform", () => {
    expect(modulation("homeplug_av2")).toBe("ofdm_mimo_beamform");
  });
});

describe("bestUse", () => {
  it("g3 plc ofdm best for smart meter ami grid", () => {
    expect(bestUse("g3_plc_ofdm")).toBe("smart_meter_ami_grid");
  });
});

describe("powerlineComms", () => {
  it("returns 5 types", () => {
    expect(powerlineComms()).toHaveLength(5);
  });
});
