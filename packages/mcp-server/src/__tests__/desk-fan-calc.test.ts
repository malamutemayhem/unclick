import { describe, it, expect } from "vitest";
import {
  airflow, noiseLevel, portability, aestheticAppeal,
  fanCost, usbPowered, oscillates, motorType,
  bestSpot, deskFans,
} from "../desk-fan-calc.js";

describe("airflow", () => {
  it("bladeless mini tower best airflow", () => {
    expect(airflow("bladeless_mini_tower")).toBeGreaterThan(airflow("usb_clip_on"));
  });
});

describe("noiseLevel", () => {
  it("dual blade quiet quietest", () => {
    expect(noiseLevel("dual_blade_quiet")).toBeGreaterThan(noiseLevel("retro_metal_tilt"));
  });
});

describe("portability", () => {
  it("usb clip on most portable", () => {
    expect(portability("usb_clip_on")).toBeGreaterThan(portability("retro_metal_tilt"));
  });
});

describe("aestheticAppeal", () => {
  it("retro metal tilt highest aesthetic appeal", () => {
    expect(aestheticAppeal("retro_metal_tilt")).toBeGreaterThan(aestheticAppeal("usb_clip_on"));
  });
});

describe("fanCost", () => {
  it("bladeless mini tower most expensive", () => {
    expect(fanCost("bladeless_mini_tower")).toBeGreaterThan(fanCost("usb_clip_on"));
  });
});

describe("usbPowered", () => {
  it("usb clip on is usb powered", () => {
    expect(usbPowered("usb_clip_on")).toBe(true);
  });
  it("retro metal tilt is not", () => {
    expect(usbPowered("retro_metal_tilt")).toBe(false);
  });
});

describe("oscillates", () => {
  it("bladeless mini tower oscillates", () => {
    expect(oscillates("bladeless_mini_tower")).toBe(true);
  });
  it("usb clip on does not", () => {
    expect(oscillates("usb_clip_on")).toBe(false);
  });
});

describe("motorType", () => {
  it("retro metal tilt uses ac motor metal blade", () => {
    expect(motorType("retro_metal_tilt")).toBe("ac_motor_metal_blade");
  });
});

describe("bestSpot", () => {
  it("dual blade quiet best for bedroom nightstand sleep", () => {
    expect(bestSpot("dual_blade_quiet")).toBe("bedroom_nightstand_sleep");
  });
});

describe("deskFans", () => {
  it("returns 5 types", () => {
    expect(deskFans()).toHaveLength(5);
  });
});
