import { describe, it, expect } from "vitest";
import {
  chargeCurrent, efficiency, accuracy, thermalPerf,
  chargerCost, pathManagement, forWearable, protocol,
  bestUse, batteryChargers,
} from "../battery-charger-calc.js";

describe("chargeCurrent", () => {
  it("usbc pd pps highest charge current", () => {
    expect(chargeCurrent("usbc_pd_pps")).toBeGreaterThan(chargeCurrent("linear_cc_cv"));
  });
});

describe("efficiency", () => {
  it("switching buck charge highest efficiency", () => {
    expect(efficiency("switching_buck_charge")).toBeGreaterThan(efficiency("linear_cc_cv"));
  });
});

describe("accuracy", () => {
  it("usbc pd pps best accuracy", () => {
    expect(accuracy("usbc_pd_pps")).toBeGreaterThan(accuracy("wireless_qi2"));
  });
});

describe("thermalPerf", () => {
  it("switching buck charge best thermal perf", () => {
    expect(thermalPerf("switching_buck_charge")).toBeGreaterThan(thermalPerf("linear_cc_cv"));
  });
});

describe("chargerCost", () => {
  it("wireless qi2 most expensive", () => {
    expect(chargerCost("wireless_qi2")).toBeGreaterThan(chargerCost("linear_cc_cv"));
  });
});

describe("pathManagement", () => {
  it("switching buck charge has path management", () => {
    expect(pathManagement("switching_buck_charge")).toBe(true);
  });
  it("linear cc cv no path management", () => {
    expect(pathManagement("linear_cc_cv")).toBe(false);
  });
});

describe("forWearable", () => {
  it("linear cc cv is for wearable", () => {
    expect(forWearable("linear_cc_cv")).toBe(true);
  });
  it("switching buck charge not for wearable", () => {
    expect(forWearable("switching_buck_charge")).toBe(false);
  });
});

describe("protocol", () => {
  it("usbc pd pps uses pd3 1 pps avs", () => {
    expect(protocol("usbc_pd_pps")).toBe("pd3_1_pps_avs");
  });
});

describe("bestUse", () => {
  it("usbc pd pps best for laptop usbc charger", () => {
    expect(bestUse("usbc_pd_pps")).toBe("laptop_usbc_charger");
  });
});

describe("batteryChargers", () => {
  it("returns 5 types", () => {
    expect(batteryChargers()).toHaveLength(5);
  });
});
