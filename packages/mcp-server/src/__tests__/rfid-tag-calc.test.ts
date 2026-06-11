import { describe, it, expect } from "vitest";
import {
  readRange, dataCapacity, readSpeed, tagCost,
  durability, passive, forSupplyChain, frequency,
  bestUse, rfidTags,
} from "../rfid-tag-calc.js";

describe("readRange", () => {
  it("active beacon rtls longest read range", () => {
    expect(readRange("active_beacon_rtls")).toBeGreaterThan(readRange("lf_125khz_prox"));
  });
});

describe("dataCapacity", () => {
  it("active beacon rtls most data capacity", () => {
    expect(dataCapacity("active_beacon_rtls")).toBeGreaterThan(dataCapacity("lf_125khz_prox"));
  });
});

describe("readSpeed", () => {
  it("uhf rain epc fastest read speed", () => {
    expect(readSpeed("uhf_rain_epc")).toBeGreaterThan(readSpeed("lf_125khz_prox"));
  });
});

describe("tagCost", () => {
  it("active beacon rtls most expensive", () => {
    expect(tagCost("active_beacon_rtls")).toBeGreaterThan(tagCost("lf_125khz_prox"));
  });
});

describe("durability", () => {
  it("lf 125khz prox most durable", () => {
    expect(durability("lf_125khz_prox")).toBeGreaterThan(durability("active_beacon_rtls"));
  });
});

describe("passive", () => {
  it("uhf rain epc is passive", () => {
    expect(passive("uhf_rain_epc")).toBe(true);
  });
  it("active beacon rtls not passive", () => {
    expect(passive("active_beacon_rtls")).toBe(false);
  });
});

describe("forSupplyChain", () => {
  it("uhf rain epc is for supply chain", () => {
    expect(forSupplyChain("uhf_rain_epc")).toBe(true);
  });
  it("lf 125khz prox not for supply chain", () => {
    expect(forSupplyChain("lf_125khz_prox")).toBe(false);
  });
});

describe("frequency", () => {
  it("uhf rain epc uses uhf 860 960mhz", () => {
    expect(frequency("uhf_rain_epc")).toBe("uhf_860_960mhz");
  });
});

describe("bestUse", () => {
  it("active beacon rtls best for real time asset locate", () => {
    expect(bestUse("active_beacon_rtls")).toBe("real_time_asset_locate");
  });
});

describe("rfidTags", () => {
  it("returns 5 types", () => {
    expect(rfidTags()).toHaveLength(5);
  });
});
