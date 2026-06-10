import { describe, it, expect } from "vitest";
import {
  heatOutput, uvbOutput, bulbLifespan, energyEfficiency,
  lampCost, nightSafe, visibleLight, bulbType,
  bestReptile, reptileLamps,
} from "../reptile-lamp-calc.js";

describe("heatOutput", () => {
  it("ceramic heat emitter highest heat output", () => {
    expect(heatOutput("ceramic_heat_emitter")).toBeGreaterThan(heatOutput("led_plant_grow"));
  });
});

describe("uvbOutput", () => {
  it("uvb fluorescent highest uvb output", () => {
    expect(uvbOutput("uvb_fluorescent")).toBeGreaterThan(uvbOutput("basking_spot"));
  });
});

describe("bulbLifespan", () => {
  it("ceramic heat emitter longest lifespan", () => {
    expect(bulbLifespan("ceramic_heat_emitter")).toBeGreaterThan(bulbLifespan("basking_spot"));
  });
});

describe("energyEfficiency", () => {
  it("led plant grow most energy efficient", () => {
    expect(energyEfficiency("led_plant_grow")).toBeGreaterThan(energyEfficiency("mercury_vapor"));
  });
});

describe("lampCost", () => {
  it("mercury vapor most expensive", () => {
    expect(lampCost("mercury_vapor")).toBeGreaterThan(lampCost("basking_spot"));
  });
});

describe("nightSafe", () => {
  it("ceramic heat emitter is night safe", () => {
    expect(nightSafe("ceramic_heat_emitter")).toBe(true);
  });
  it("basking spot is not", () => {
    expect(nightSafe("basking_spot")).toBe(false);
  });
});

describe("visibleLight", () => {
  it("basking spot has visible light", () => {
    expect(visibleLight("basking_spot")).toBe(true);
  });
  it("ceramic heat emitter does not", () => {
    expect(visibleLight("ceramic_heat_emitter")).toBe(false);
  });
});

describe("bulbType", () => {
  it("mercury vapor uses self ballasted arc", () => {
    expect(bulbType("mercury_vapor")).toBe("self_ballasted_arc");
  });
});

describe("bestReptile", () => {
  it("ceramic heat emitter for nocturnal snake heat", () => {
    expect(bestReptile("ceramic_heat_emitter")).toBe("nocturnal_snake_heat");
  });
});

describe("reptileLamps", () => {
  it("returns 5 types", () => {
    expect(reptileLamps()).toHaveLength(5);
  });
});
