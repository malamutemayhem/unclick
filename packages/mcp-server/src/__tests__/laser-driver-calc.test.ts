import { describe, it, expect } from "vitest";
import {
  dataRate, outputSwing, jitter, powerDraw,
  driverCost, dualRate, forDatacenter, interface_,
  bestUse, laserDrivers,
} from "../laser-driver-calc.js";

describe("dataRate", () => {
  it("coherent dsp ic highest data rate", () => {
    expect(dataRate("coherent_dsp_ic")).toBeGreaterThan(dataRate("linear_analog"));
  });
});

describe("outputSwing", () => {
  it("coherent dsp ic highest output swing", () => {
    expect(outputSwing("coherent_dsp_ic")).toBeGreaterThan(outputSwing("cml_current_mode"));
  });
});

describe("jitter", () => {
  it("coherent dsp ic lowest jitter", () => {
    expect(jitter("coherent_dsp_ic")).toBeGreaterThan(jitter("linear_analog"));
  });
});

describe("powerDraw", () => {
  it("coherent dsp ic highest power draw", () => {
    expect(powerDraw("coherent_dsp_ic")).toBeGreaterThan(powerDraw("burst_mode_pon"));
  });
});

describe("driverCost", () => {
  it("coherent dsp ic most expensive", () => {
    expect(driverCost("coherent_dsp_ic")).toBeGreaterThan(driverCost("linear_analog"));
  });
});

describe("dualRate", () => {
  it("burst mode pon is dual rate", () => {
    expect(dualRate("burst_mode_pon")).toBe(true);
  });
  it("cml current mode not dual rate", () => {
    expect(dualRate("cml_current_mode")).toBe(false);
  });
});

describe("forDatacenter", () => {
  it("tia modulator is for datacenter", () => {
    expect(forDatacenter("tia_modulator")).toBe(true);
  });
  it("linear analog not for datacenter", () => {
    expect(forDatacenter("linear_analog")).toBe(false);
  });
});

describe("interface_", () => {
  it("coherent dsp ic uses dp iq coherent 4ch", () => {
    expect(interface_("coherent_dsp_ic")).toBe("dp_iq_coherent_4ch");
  });
});

describe("bestUse", () => {
  it("coherent dsp ic best for 800g zr plus dwdm", () => {
    expect(bestUse("coherent_dsp_ic")).toBe("800g_zr_plus_dwdm");
  });
});

describe("laserDrivers", () => {
  it("returns 5 types", () => {
    expect(laserDrivers()).toHaveLength(5);
  });
});
