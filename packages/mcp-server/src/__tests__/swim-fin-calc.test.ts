import { describe, it, expect } from "vitest";
import {
  propulsion, kickEfficiency, comfort, portability,
  finCost, adjustableFit, poolAllowed, bladeMaterial,
  bestActivity, swimFins,
} from "../swim-fin-calc.js";

describe("propulsion", () => {
  it("monofin dolphin kick most propulsion", () => {
    expect(propulsion("monofin_dolphin_kick")).toBeGreaterThan(propulsion("short_blade_training"));
  });
});

describe("kickEfficiency", () => {
  it("monofin dolphin kick best kick efficiency", () => {
    expect(kickEfficiency("monofin_dolphin_kick")).toBeGreaterThan(kickEfficiency("adjustable_strap_snorkel"));
  });
});

describe("comfort", () => {
  it("short blade training most comfortable", () => {
    expect(comfort("short_blade_training")).toBeGreaterThan(comfort("monofin_dolphin_kick"));
  });
});

describe("portability", () => {
  it("short blade training most portable", () => {
    expect(portability("short_blade_training")).toBeGreaterThan(portability("monofin_dolphin_kick"));
  });
});

describe("finCost", () => {
  it("monofin dolphin kick most expensive", () => {
    expect(finCost("monofin_dolphin_kick")).toBeGreaterThan(finCost("short_blade_training"));
  });
});

describe("adjustableFit", () => {
  it("adjustable strap snorkel has adjustable fit", () => {
    expect(adjustableFit("adjustable_strap_snorkel")).toBe(true);
  });
  it("short blade training has no adjustable fit", () => {
    expect(adjustableFit("short_blade_training")).toBe(false);
  });
});

describe("poolAllowed", () => {
  it("short blade training is pool allowed", () => {
    expect(poolAllowed("short_blade_training")).toBe(true);
  });
  it("adjustable strap snorkel is not pool allowed", () => {
    expect(poolAllowed("adjustable_strap_snorkel")).toBe(false);
  });
});

describe("bladeMaterial", () => {
  it("monofin dolphin kick uses fiberglass carbon plate", () => {
    expect(bladeMaterial("monofin_dolphin_kick")).toBe("fiberglass_carbon_plate");
  });
});

describe("bestActivity", () => {
  it("short blade training best for pool lap training", () => {
    expect(bestActivity("short_blade_training")).toBe("pool_lap_training");
  });
});

describe("swimFins", () => {
  it("returns 5 types", () => {
    expect(swimFins()).toHaveLength(5);
  });
});
