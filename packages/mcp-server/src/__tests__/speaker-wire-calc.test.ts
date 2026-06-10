import { describe, it, expect } from "vitest";
import {
  signalQuality, powerHandling, flexibility, installEase,
  wireCost, preterminated, hideable, conductorType,
  bestSetup, speakerWires,
} from "../speaker-wire-calc.js";

describe("signalQuality", () => {
  it("oxygen free ofc best signal quality", () => {
    expect(signalQuality("oxygen_free_ofc")).toBeGreaterThan(signalQuality("copper_16awg_basic"));
  });
});

describe("powerHandling", () => {
  it("oxygen free ofc best power handling", () => {
    expect(powerHandling("oxygen_free_ofc")).toBeGreaterThan(powerHandling("flat_adhesive_wall"));
  });
});

describe("flexibility", () => {
  it("flat adhesive wall most flexible", () => {
    expect(flexibility("flat_adhesive_wall")).toBeGreaterThan(flexibility("copper_12awg_thick"));
  });
});

describe("installEase", () => {
  it("banana plug terminated easiest install", () => {
    expect(installEase("banana_plug_terminated")).toBeGreaterThan(installEase("copper_12awg_thick"));
  });
});

describe("wireCost", () => {
  it("oxygen free ofc most expensive", () => {
    expect(wireCost("oxygen_free_ofc")).toBeGreaterThan(wireCost("copper_16awg_basic"));
  });
});

describe("preterminated", () => {
  it("banana plug terminated is preterminated", () => {
    expect(preterminated("banana_plug_terminated")).toBe(true);
  });
  it("copper 16awg basic is not preterminated", () => {
    expect(preterminated("copper_16awg_basic")).toBe(false);
  });
});

describe("hideable", () => {
  it("flat adhesive wall is hideable", () => {
    expect(hideable("flat_adhesive_wall")).toBe(true);
  });
  it("oxygen free ofc is not hideable", () => {
    expect(hideable("oxygen_free_ofc")).toBe(false);
  });
});

describe("conductorType", () => {
  it("oxygen free ofc uses ofc 4n purity strand", () => {
    expect(conductorType("oxygen_free_ofc")).toBe("ofc_4n_purity_strand");
  });
});

describe("bestSetup", () => {
  it("flat adhesive wall best for wall ceiling hidden", () => {
    expect(bestSetup("flat_adhesive_wall")).toBe("wall_ceiling_hidden");
  });
});

describe("speakerWires", () => {
  it("returns 5 types", () => {
    expect(speakerWires()).toHaveLength(5);
  });
});
