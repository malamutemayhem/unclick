import { describe, it, expect } from "vitest";
import {
  keyFeel, expressiveness, repeatSpeed, maintenanceNeed,
  actionCost, velocitySensitive, aftertouch, mechanismType,
  bestPlayer, pianoActions,
} from "../piano-action-calc.js";

describe("keyFeel", () => {
  it("grand hammer best key feel", () => {
    expect(keyFeel("grand_hammer")).toBeGreaterThan(keyFeel("synth_spring"));
  });
});

describe("expressiveness", () => {
  it("grand hammer most expressive", () => {
    expect(expressiveness("grand_hammer")).toBeGreaterThan(expressiveness("synth_spring"));
  });
});

describe("repeatSpeed", () => {
  it("synth spring fastest repeat", () => {
    expect(repeatSpeed("synth_spring")).toBeGreaterThan(repeatSpeed("upright_vertical"));
  });
});

describe("maintenanceNeed", () => {
  it("synth spring least maintenance", () => {
    expect(maintenanceNeed("synth_spring")).toBeGreaterThan(maintenanceNeed("grand_hammer"));
  });
});

describe("actionCost", () => {
  it("grand hammer most expensive", () => {
    expect(actionCost("grand_hammer")).toBeGreaterThan(actionCost("synth_spring"));
  });
});

describe("velocitySensitive", () => {
  it("grand hammer is velocity sensitive", () => {
    expect(velocitySensitive("grand_hammer")).toBe(true);
  });
  it("synth spring is not", () => {
    expect(velocitySensitive("synth_spring")).toBe(false);
  });
});

describe("aftertouch", () => {
  it("semi weighted has aftertouch", () => {
    expect(aftertouch("semi_weighted")).toBe(true);
  });
  it("grand hammer does not", () => {
    expect(aftertouch("grand_hammer")).toBe(false);
  });
});

describe("mechanismType", () => {
  it("grand hammer uses double escapement gravity", () => {
    expect(mechanismType("grand_hammer")).toBe("double_escapement_gravity");
  });
});

describe("bestPlayer", () => {
  it("synth spring for beginner controller producer", () => {
    expect(bestPlayer("synth_spring")).toBe("beginner_controller_producer");
  });
});

describe("pianoActions", () => {
  it("returns 5 types", () => {
    expect(pianoActions()).toHaveLength(5);
  });
});
