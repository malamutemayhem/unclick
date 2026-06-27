import { describe, it, expect } from "vitest";
import {
  toastEvenness, speedToast, versatility, counterSpace,
  toasterCost, bagelMode, canBake, heatingElement,
  bestKitchen, toasters,
} from "../toaster-calc.js";

describe("toastEvenness", () => {
  it("smart screen most even toast", () => {
    expect(toastEvenness("smart_screen")).toBeGreaterThan(toastEvenness("pop_up_2_slice"));
  });
});

describe("speedToast", () => {
  it("conveyor commercial fastest toast", () => {
    expect(speedToast("conveyor_commercial")).toBeGreaterThan(speedToast("toaster_oven"));
  });
});

describe("versatility", () => {
  it("toaster oven most versatile", () => {
    expect(versatility("toaster_oven")).toBeGreaterThan(versatility("pop_up_2_slice"));
  });
});

describe("counterSpace", () => {
  it("pop up 2 slice least counter space", () => {
    expect(counterSpace("pop_up_2_slice")).toBeGreaterThan(counterSpace("conveyor_commercial"));
  });
});

describe("toasterCost", () => {
  it("conveyor commercial most expensive", () => {
    expect(toasterCost("conveyor_commercial")).toBeGreaterThan(toasterCost("pop_up_2_slice"));
  });
});

describe("bagelMode", () => {
  it("pop up 2 slice has bagel mode", () => {
    expect(bagelMode("pop_up_2_slice")).toBe(true);
  });
  it("toaster oven does not", () => {
    expect(bagelMode("toaster_oven")).toBe(false);
  });
});

describe("canBake", () => {
  it("toaster oven can bake", () => {
    expect(canBake("toaster_oven")).toBe(true);
  });
  it("pop up 4 slice cannot", () => {
    expect(canBake("pop_up_4_slice")).toBe(false);
  });
});

describe("heatingElement", () => {
  it("toaster oven uses quartz infrared element", () => {
    expect(heatingElement("toaster_oven")).toBe("quartz_infrared_element");
  });
});

describe("bestKitchen", () => {
  it("pop up 2 slice for small apartment quick", () => {
    expect(bestKitchen("pop_up_2_slice")).toBe("small_apartment_quick");
  });
});

describe("toasters", () => {
  it("returns 5 types", () => {
    expect(toasters()).toHaveLength(5);
  });
});
