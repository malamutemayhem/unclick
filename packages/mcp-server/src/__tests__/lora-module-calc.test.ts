import { describe, it, expect } from "vitest";
import {
  range, dataRate, powerDraw, networkSize,
  moduleCost, lorawan, forRemote, freqBand,
  bestUse, loraModules,
} from "../lora-module-calc.js";

describe("range", () => {
  it("lorawan gateway longest range", () => {
    expect(range("lorawan_gateway")).toBeGreaterThan(range("lora_2g4_high_band"));
  });
});

describe("dataRate", () => {
  it("lora 2g4 high band highest data rate", () => {
    expect(dataRate("lora_2g4_high_band")).toBeGreaterThan(dataRate("lora_sx127x_sub"));
  });
});

describe("powerDraw", () => {
  it("lora sx126x low best power draw", () => {
    expect(powerDraw("lora_sx126x_low")).toBeGreaterThan(powerDraw("lorawan_gateway"));
  });
});

describe("networkSize", () => {
  it("lorawan gateway largest network", () => {
    expect(networkSize("lorawan_gateway")).toBeGreaterThan(networkSize("lora_2g4_high_band"));
  });
});

describe("moduleCost", () => {
  it("lorawan gateway most expensive", () => {
    expect(moduleCost("lorawan_gateway")).toBeGreaterThan(moduleCost("lora_sx127x_sub"));
  });
});

describe("lorawan", () => {
  it("lorawan gateway is lorawan", () => {
    expect(lorawan("lorawan_gateway")).toBe(true);
  });
  it("lora sx127x sub not lorawan", () => {
    expect(lorawan("lora_sx127x_sub")).toBe(false);
  });
});

describe("forRemote", () => {
  it("lora sx127x sub is for remote", () => {
    expect(forRemote("lora_sx127x_sub")).toBe(true);
  });
  it("lora 2g4 high band not for remote", () => {
    expect(forRemote("lora_2g4_high_band")).toBe(false);
  });
});

describe("freqBand", () => {
  it("lora sx127x sub uses sub ghz 868 915", () => {
    expect(freqBand("lora_sx127x_sub")).toBe("sub_ghz_868_915");
  });
});

describe("bestUse", () => {
  it("lorawan gateway best for city wide iot network", () => {
    expect(bestUse("lorawan_gateway")).toBe("city_wide_iot_network");
  });
});

describe("loraModules", () => {
  it("returns 5 types", () => {
    expect(loraModules()).toHaveLength(5);
  });
});
