import { describe, it, expect } from "vitest";
import {
  precision, scalability, flexibility, installEase,
  lcCost, addressable, forRetrofit, signal,
  bestUse, lightingControlTypes,
} from "../lighting-control-calc.js";

describe("precision", () => {
  it("dmx most precise", () => {
    expect(precision("dmx_512_architectural")).toBeGreaterThan(precision("0_10v_analog_dimmer"));
  });
});

describe("scalability", () => {
  it("poe most scalable", () => {
    expect(scalability("poe_ethernet_luminaire")).toBeGreaterThan(scalability("0_10v_analog_dimmer"));
  });
});

describe("flexibility", () => {
  it("dmx most flexible", () => {
    expect(flexibility("dmx_512_architectural")).toBeGreaterThan(flexibility("0_10v_analog_dimmer"));
  });
});

describe("installEase", () => {
  it("wireless easiest install", () => {
    expect(installEase("wireless_mesh_bluetooth")).toBeGreaterThan(installEase("dmx_512_architectural"));
  });
});

describe("lcCost", () => {
  it("poe most expensive", () => {
    expect(lcCost("poe_ethernet_luminaire")).toBeGreaterThan(lcCost("0_10v_analog_dimmer"));
  });
});

describe("addressable", () => {
  it("dali is addressable", () => {
    expect(addressable("dali_digital_addressable")).toBe(true);
  });
  it("0-10v not addressable", () => {
    expect(addressable("0_10v_analog_dimmer")).toBe(false);
  });
});

describe("forRetrofit", () => {
  it("wireless for retrofit", () => {
    expect(forRetrofit("wireless_mesh_bluetooth")).toBe(true);
  });
  it("dali not retrofit", () => {
    expect(forRetrofit("dali_digital_addressable")).toBe(false);
  });
});

describe("signal", () => {
  it("dmx uses rs485", () => {
    expect(signal("dmx_512_architectural")).toBe("dmx_512a_rs485_universe");
  });
});

describe("bestUse", () => {
  it("poe for smart building", () => {
    expect(bestUse("poe_ethernet_luminaire")).toBe("smart_building_iot_analytics");
  });
});

describe("lightingControlTypes", () => {
  it("returns 5 types", () => {
    expect(lightingControlTypes()).toHaveLength(5);
  });
});
