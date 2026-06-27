import { describe, it, expect } from "vitest";
import {
  throughput, range, powerDraw, latency,
  moduleCost, dualBand, forIot, standard,
  bestUse, wifiModules,
} from "../wifi-module-calc.js";

describe("throughput", () => {
  it("wifi6e 6ghz highest throughput", () => {
    expect(throughput("wifi6e_6ghz")).toBeGreaterThan(throughput("wifi4_n_2g4"));
  });
});

describe("range", () => {
  it("wifi halow iot longest range", () => {
    expect(range("wifi_halow_iot")).toBeGreaterThan(range("wifi6e_6ghz"));
  });
});

describe("powerDraw", () => {
  it("wifi halow iot lowest power draw score", () => {
    expect(powerDraw("wifi_halow_iot")).toBeGreaterThan(powerDraw("wifi5_ac_5g"));
  });
});

describe("latency", () => {
  it("wifi6e 6ghz best latency", () => {
    expect(latency("wifi6e_6ghz")).toBeGreaterThan(latency("wifi4_n_2g4"));
  });
});

describe("moduleCost", () => {
  it("wifi6e 6ghz most expensive", () => {
    expect(moduleCost("wifi6e_6ghz")).toBeGreaterThan(moduleCost("wifi4_n_2g4"));
  });
});

describe("dualBand", () => {
  it("wifi6 ax dual is dual band", () => {
    expect(dualBand("wifi6_ax_dual")).toBe(true);
  });
  it("wifi4 n 2g4 not dual band", () => {
    expect(dualBand("wifi4_n_2g4")).toBe(false);
  });
});

describe("forIot", () => {
  it("wifi halow iot is for iot", () => {
    expect(forIot("wifi_halow_iot")).toBe(true);
  });
  it("wifi5 ac 5g not for iot", () => {
    expect(forIot("wifi5_ac_5g")).toBe(false);
  });
});

describe("standard", () => {
  it("wifi4 n 2g4 uses ieee 802 11n", () => {
    expect(standard("wifi4_n_2g4")).toBe("ieee_802_11n");
  });
});

describe("bestUse", () => {
  it("wifi6e 6ghz best for ar vr low latency", () => {
    expect(bestUse("wifi6e_6ghz")).toBe("ar_vr_low_latency");
  });
});

describe("wifiModules", () => {
  it("returns 5 types", () => {
    expect(wifiModules()).toHaveLength(5);
  });
});
