import { describe, it, expect } from "vitest";
import {
  throughput, latency, range, density,
  wifiCost, multiLink, forEnterprise, modulation,
  bestUse, wifiStandards,
} from "../wifi-standard-calc.js";

describe("throughput", () => {
  it("wifi 7 be mlo highest throughput", () => {
    expect(throughput("wifi_7_be_mlo")).toBeGreaterThan(throughput("wifi_4_n_mimo"));
  });
});

describe("latency", () => {
  it("wifi 7 be mlo lowest latency", () => {
    expect(latency("wifi_7_be_mlo")).toBeGreaterThan(latency("wifi_4_n_mimo"));
  });
});

describe("range", () => {
  it("wifi 4 n mimo best range", () => {
    expect(range("wifi_4_n_mimo")).toBeGreaterThan(range("wifi_6e_6ghz"));
  });
});

describe("density", () => {
  it("wifi 6e 6ghz best density", () => {
    expect(density("wifi_6e_6ghz")).toBeGreaterThan(density("wifi_4_n_mimo"));
  });
});

describe("wifiCost", () => {
  it("wifi 7 be mlo most expensive", () => {
    expect(wifiCost("wifi_7_be_mlo")).toBeGreaterThan(wifiCost("wifi_4_n_mimo"));
  });
});

describe("multiLink", () => {
  it("wifi 7 be mlo has multi link", () => {
    expect(multiLink("wifi_7_be_mlo")).toBe(true);
  });
  it("wifi 6 ax ofdma no multi link", () => {
    expect(multiLink("wifi_6_ax_ofdma")).toBe(false);
  });
});

describe("forEnterprise", () => {
  it("wifi 6 ax ofdma is for enterprise", () => {
    expect(forEnterprise("wifi_6_ax_ofdma")).toBe(true);
  });
  it("wifi 4 n mimo not for enterprise", () => {
    expect(forEnterprise("wifi_4_n_mimo")).toBe(false);
  });
});

describe("modulation", () => {
  it("wifi 7 be mlo uses ofdma 4096qam 320mhz", () => {
    expect(modulation("wifi_7_be_mlo")).toBe("ofdma_4096qam_320mhz");
  });
});

describe("bestUse", () => {
  it("wifi 6e 6ghz best for ar vr low latency", () => {
    expect(bestUse("wifi_6e_6ghz")).toBe("ar_vr_low_latency");
  });
});

describe("wifiStandards", () => {
  it("returns 5 types", () => {
    expect(wifiStandards()).toHaveLength(5);
  });
});
