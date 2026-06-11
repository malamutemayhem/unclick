import { describe, it, expect } from "vitest";
import {
  channels, processing, comms, environmental,
  rtCost, modular, forRemote, connectivity,
  bestUse, rtuTypes,
} from "../rtu-type-calc.js";

describe("channels", () => {
  it("modular most channels", () => {
    expect(channels("modular_rack_expandable")).toBeGreaterThan(channels("cellular_iot_gateway"));
  });
});

describe("processing", () => {
  it("modular best processing", () => {
    expect(processing("modular_rack_expandable")).toBeGreaterThan(processing("single_board_compact"));
  });
});

describe("comms", () => {
  it("cellular best comms", () => {
    expect(comms("cellular_iot_gateway")).toBeGreaterThan(comms("single_board_compact"));
  });
});

describe("environmental", () => {
  it("ruggedized best environmental", () => {
    expect(environmental("ruggedized_outdoor_ip67")).toBeGreaterThan(environmental("modular_rack_expandable"));
  });
});

describe("rtCost", () => {
  it("modular most expensive", () => {
    expect(rtCost("modular_rack_expandable")).toBeGreaterThan(rtCost("single_board_compact"));
  });
});

describe("modular", () => {
  it("modular rack is modular", () => {
    expect(modular("modular_rack_expandable")).toBe(true);
  });
  it("single board not modular", () => {
    expect(modular("single_board_compact")).toBe(false);
  });
});

describe("forRemote", () => {
  it("ruggedized for remote", () => {
    expect(forRemote("ruggedized_outdoor_ip67")).toBe(true);
  });
  it("single board not for remote", () => {
    expect(forRemote("single_board_compact")).toBe(false);
  });
});

describe("connectivity", () => {
  it("cellular uses 4g lte mqtt", () => {
    expect(connectivity("cellular_iot_gateway")).toBe("4g_lte_mqtt_cloud_native");
  });
});

describe("bestUse", () => {
  it("solar for off grid", () => {
    expect(bestUse("solar_powered_remote")).toBe("off_grid_water_level_weather_stn");
  });
});

describe("rtuTypes", () => {
  it("returns 5 types", () => {
    expect(rtuTypes()).toHaveLength(5);
  });
});
