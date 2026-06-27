import { describe, it, expect } from "vitest";
import {
  videoResolution, fieldOfView, nightVision, installEase,
  deviceCost, requiresWiring, hasLocalStorage, powerSource,
  bestUseCase, smartDoorbells,
} from "../smart-doorbell-calc.js";

describe("videoResolution", () => {
  it("video wired best resolution", () => {
    expect(videoResolution("video_wired")).toBeGreaterThan(videoResolution("peephole_cam"));
  });
});

describe("fieldOfView", () => {
  it("video wired widest field", () => {
    expect(fieldOfView("video_wired")).toBeGreaterThan(fieldOfView("peephole_cam"));
  });
});

describe("nightVision", () => {
  it("video wired best night vision", () => {
    expect(nightVision("video_wired")).toBeGreaterThan(nightVision("peephole_cam"));
  });
});

describe("installEase", () => {
  it("peephole cam easiest install", () => {
    expect(installEase("peephole_cam")).toBeGreaterThan(installEase("intercom_panel"));
  });
});

describe("deviceCost", () => {
  it("intercom panel most expensive", () => {
    expect(deviceCost("intercom_panel")).toBeGreaterThan(deviceCost("peephole_cam"));
  });
});

describe("requiresWiring", () => {
  it("video wired requires wiring", () => {
    expect(requiresWiring("video_wired")).toBe(true);
  });
  it("video battery does not", () => {
    expect(requiresWiring("video_battery")).toBe(false);
  });
});

describe("hasLocalStorage", () => {
  it("video wired has local storage", () => {
    expect(hasLocalStorage("video_wired")).toBe(true);
  });
  it("video battery does not", () => {
    expect(hasLocalStorage("video_battery")).toBe(false);
  });
});

describe("powerSource", () => {
  it("video solar uses solar panel battery hybrid", () => {
    expect(powerSource("video_solar")).toBe("solar_panel_battery_hybrid");
  });
});

describe("bestUseCase", () => {
  it("peephole cam for apartment condo door", () => {
    expect(bestUseCase("peephole_cam")).toBe("apartment_condo_door");
  });
});

describe("smartDoorbells", () => {
  it("returns 5 types", () => {
    expect(smartDoorbells()).toHaveLength(5);
  });
});
