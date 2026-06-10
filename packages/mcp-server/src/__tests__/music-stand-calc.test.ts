import { describe, it, expect } from "vitest";
import {
  sheetCapacity, standStability, portabilityScore, heightRange,
  standCost, foldFlat, heavyBase, deskMaterial,
  bestVenue, musicStands,
} from "../music-stand-calc.js";

describe("sheetCapacity", () => {
  it("conductor heavy most sheet capacity", () => {
    expect(sheetCapacity("conductor_heavy")).toBeGreaterThan(sheetCapacity("clip_on_portable"));
  });
});

describe("standStability", () => {
  it("conductor heavy most stable", () => {
    expect(standStability("conductor_heavy")).toBeGreaterThan(standStability("wire_folding"));
  });
});

describe("portabilityScore", () => {
  it("clip on portable most portable", () => {
    expect(portabilityScore("clip_on_portable")).toBeGreaterThan(portabilityScore("conductor_heavy"));
  });
});

describe("heightRange", () => {
  it("conductor heavy tallest height range", () => {
    expect(heightRange("conductor_heavy")).toBeGreaterThan(heightRange("clip_on_portable"));
  });
});

describe("standCost", () => {
  it("conductor heavy most expensive", () => {
    expect(standCost("conductor_heavy")).toBeGreaterThan(standCost("wire_folding"));
  });
});

describe("foldFlat", () => {
  it("wire folding folds flat", () => {
    expect(foldFlat("wire_folding")).toBe(true);
  });
  it("solid orchestral does not", () => {
    expect(foldFlat("solid_orchestral")).toBe(false);
  });
});

describe("heavyBase", () => {
  it("conductor heavy has heavy base", () => {
    expect(heavyBase("conductor_heavy")).toBe(true);
  });
  it("wire folding does not", () => {
    expect(heavyBase("wire_folding")).toBe(false);
  });
});

describe("deskMaterial", () => {
  it("conductor heavy uses solid wood large desk", () => {
    expect(deskMaterial("conductor_heavy")).toBe("solid_wood_large_desk");
  });
});

describe("bestVenue", () => {
  it("solid orchestral for orchestra pit concert hall", () => {
    expect(bestVenue("solid_orchestral")).toBe("orchestra_pit_concert_hall");
  });
});

describe("musicStands", () => {
  it("returns 5 types", () => {
    expect(musicStands()).toHaveLength(5);
  });
});
