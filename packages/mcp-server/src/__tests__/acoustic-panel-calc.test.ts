import { describe, it, expect } from "vitest";
import {
  soundAbsorb, aesthetics, installEase, frequencyRange,
  panelCost, fireRetardant, ecoFriendly, coreMaterial,
  bestRoom, acousticPanels,
} from "../acoustic-panel-calc.js";

describe("soundAbsorb", () => {
  it("fiberglass wrapped pro most sound absorb", () => {
    expect(soundAbsorb("fiberglass_wrapped_pro")).toBeGreaterThan(soundAbsorb("foam_wedge_budget"));
  });
});

describe("aesthetics", () => {
  it("wood slat diffuser best aesthetics", () => {
    expect(aesthetics("wood_slat_diffuser")).toBeGreaterThan(aesthetics("foam_wedge_budget"));
  });
});

describe("installEase", () => {
  it("foam wedge budget easiest install", () => {
    expect(installEase("foam_wedge_budget")).toBeGreaterThan(installEase("bass_trap_corner"));
  });
});

describe("frequencyRange", () => {
  it("bass trap corner widest frequency range", () => {
    expect(frequencyRange("bass_trap_corner")).toBeGreaterThan(frequencyRange("foam_wedge_budget"));
  });
});

describe("panelCost", () => {
  it("fiberglass wrapped pro most expensive", () => {
    expect(panelCost("fiberglass_wrapped_pro")).toBeGreaterThan(panelCost("foam_wedge_budget"));
  });
});

describe("fireRetardant", () => {
  it("fiberglass wrapped pro is fire retardant", () => {
    expect(fireRetardant("fiberglass_wrapped_pro")).toBe(true);
  });
  it("foam wedge budget is not fire retardant", () => {
    expect(fireRetardant("foam_wedge_budget")).toBe(false);
  });
});

describe("ecoFriendly", () => {
  it("polyester felt eco is eco friendly", () => {
    expect(ecoFriendly("polyester_felt_eco")).toBe(true);
  });
  it("foam wedge budget is not eco friendly", () => {
    expect(ecoFriendly("foam_wedge_budget")).toBe(false);
  });
});

describe("coreMaterial", () => {
  it("bass trap corner uses mineral wool rockwool", () => {
    expect(coreMaterial("bass_trap_corner")).toBe("mineral_wool_rockwool");
  });
});

describe("bestRoom", () => {
  it("fiberglass wrapped pro best for recording studio mix", () => {
    expect(bestRoom("fiberglass_wrapped_pro")).toBe("recording_studio_mix");
  });
});

describe("acousticPanels", () => {
  it("returns 5 types", () => {
    expect(acousticPanels()).toHaveLength(5);
  });
});
