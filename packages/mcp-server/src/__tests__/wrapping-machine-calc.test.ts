import { describe, it, expect } from "vitest";
import {
  speed, filmUsage, loadStability, automation,
  wmCost, heatRequired, forPallet, method,
  bestUse, wrappingMachineTypes,
} from "../wrapping-machine-calc.js";

describe("speed", () => {
  it("flow wrap horizontal fastest", () => {
    expect(speed("flow_wrap_horizontal")).toBeGreaterThan(speed("stretch_wrap_turntable"));
  });
});

describe("filmUsage", () => {
  it("pallet hood stretch most efficient film usage", () => {
    expect(filmUsage("pallet_hood_stretch")).toBeGreaterThan(filmUsage("shrink_wrap_tunnel"));
  });
});

describe("loadStability", () => {
  it("pallet hood stretch best load stability", () => {
    expect(loadStability("pallet_hood_stretch")).toBeGreaterThan(loadStability("flow_wrap_horizontal"));
  });
});

describe("automation", () => {
  it("stretch wrap rotary arm most automated", () => {
    expect(automation("stretch_wrap_rotary_arm")).toBeGreaterThan(automation("stretch_wrap_turntable"));
  });
});

describe("wmCost", () => {
  it("pallet hood stretch most expensive", () => {
    expect(wmCost("pallet_hood_stretch")).toBeGreaterThan(wmCost("stretch_wrap_turntable"));
  });
});

describe("heatRequired", () => {
  it("shrink wrap tunnel requires heat", () => {
    expect(heatRequired("shrink_wrap_tunnel")).toBe(true);
  });
  it("stretch wrap turntable no heat required", () => {
    expect(heatRequired("stretch_wrap_turntable")).toBe(false);
  });
});

describe("forPallet", () => {
  it("stretch wrap turntable for pallet", () => {
    expect(forPallet("stretch_wrap_turntable")).toBe(true);
  });
  it("shrink wrap tunnel not for pallet", () => {
    expect(forPallet("shrink_wrap_tunnel")).toBe(false);
  });
});

describe("method", () => {
  it("flow wrap uses horizontal pillow pack", () => {
    expect(method("flow_wrap_horizontal")).toBe("horizontal_pillow_pack_form_fill_seal_continuous");
  });
});

describe("bestUse", () => {
  it("pallet hood stretch for outdoor stored pallet", () => {
    expect(bestUse("pallet_hood_stretch")).toBe("outdoor_stored_pallet_building_material_weather_wrap");
  });
});

describe("wrappingMachineTypes", () => {
  it("returns 5 types", () => {
    expect(wrappingMachineTypes()).toHaveLength(5);
  });
});
