import { describe, it, expect } from "vitest";
import {
  energyEfficiency, lifespan, colorRendering, instantOn,
  bulbCost, dimmable, containsMercury, techType,
  bestUse, lightBulbs,
} from "../light-bulb-calc.js";

describe("energyEfficiency", () => {
  it("led standard most efficient", () => {
    expect(energyEfficiency("led_standard")).toBeGreaterThan(energyEfficiency("incandescent_classic"));
  });
});

describe("lifespan", () => {
  it("led standard longest lifespan", () => {
    expect(lifespan("led_standard")).toBeGreaterThan(lifespan("halogen_bright"));
  });
});

describe("colorRendering", () => {
  it("incandescent classic best color rendering", () => {
    expect(colorRendering("incandescent_classic")).toBeGreaterThan(colorRendering("cfl_spiral"));
  });
});

describe("instantOn", () => {
  it("led standard instant on", () => {
    expect(instantOn("led_standard")).toBeGreaterThan(instantOn("cfl_spiral"));
  });
});

describe("bulbCost", () => {
  it("smart wifi color most expensive", () => {
    expect(bulbCost("smart_wifi_color")).toBeGreaterThan(bulbCost("incandescent_classic"));
  });
});

describe("dimmable", () => {
  it("led standard is dimmable", () => {
    expect(dimmable("led_standard")).toBe(true);
  });
  it("cfl spiral is not", () => {
    expect(dimmable("cfl_spiral")).toBe(false);
  });
});

describe("containsMercury", () => {
  it("cfl spiral contains mercury", () => {
    expect(containsMercury("cfl_spiral")).toBe(true);
  });
  it("led standard does not", () => {
    expect(containsMercury("led_standard")).toBe(false);
  });
});

describe("techType", () => {
  it("led standard uses semiconductor diode chip", () => {
    expect(techType("led_standard")).toBe("semiconductor_diode_chip");
  });
});

describe("bestUse", () => {
  it("smart wifi color best for mood scene voice control", () => {
    expect(bestUse("smart_wifi_color")).toBe("mood_scene_voice_control");
  });
});

describe("lightBulbs", () => {
  it("returns 5 types", () => {
    expect(lightBulbs()).toHaveLength(5);
  });
});
