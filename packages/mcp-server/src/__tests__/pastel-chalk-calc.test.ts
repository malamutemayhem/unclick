import { describe, it, expect } from "vitest";
import {
  pigmentLoad, blendAbility, detailControl, dustLevel,
  pastelCost, waterSoluble, layerable, binderType,
  bestSurface, pastelChalks,
} from "../pastel-chalk-calc.js";

describe("pigmentLoad", () => {
  it("soft pastel round highest pigment", () => {
    expect(pigmentLoad("soft_pastel_round")).toBeGreaterThan(pigmentLoad("pastel_pencil_thin"));
  });
});

describe("blendAbility", () => {
  it("pan pastel sponge best blending", () => {
    expect(blendAbility("pan_pastel_sponge")).toBeGreaterThan(blendAbility("hard_pastel_square"));
  });
});

describe("detailControl", () => {
  it("pastel pencil thin best detail", () => {
    expect(detailControl("pastel_pencil_thin")).toBeGreaterThan(detailControl("oil_pastel_creamy"));
  });
});

describe("dustLevel", () => {
  it("soft pastel round most dust", () => {
    expect(dustLevel("soft_pastel_round")).toBeGreaterThan(dustLevel("pan_pastel_sponge"));
  });
});

describe("pastelCost", () => {
  it("pan pastel sponge most expensive", () => {
    expect(pastelCost("pan_pastel_sponge")).toBeGreaterThan(pastelCost("oil_pastel_creamy"));
  });
});

describe("waterSoluble", () => {
  it("soft pastel round is not water soluble", () => {
    expect(waterSoluble("soft_pastel_round")).toBe(false);
  });
  it("oil pastel creamy is not water soluble", () => {
    expect(waterSoluble("oil_pastel_creamy")).toBe(false);
  });
});

describe("layerable", () => {
  it("soft pastel round is layerable", () => {
    expect(layerable("soft_pastel_round")).toBe(true);
  });
  it("oil pastel creamy is layerable", () => {
    expect(layerable("oil_pastel_creamy")).toBe(true);
  });
});

describe("binderType", () => {
  it("oil pastel creamy uses wax oil binder blend", () => {
    expect(binderType("oil_pastel_creamy")).toBe("wax_oil_binder_blend");
  });
});

describe("bestSurface", () => {
  it("soft pastel round best for sanded pastel paper", () => {
    expect(bestSurface("soft_pastel_round")).toBe("sanded_pastel_paper");
  });
});

describe("pastelChalks", () => {
  it("returns 5 types", () => {
    expect(pastelChalks()).toHaveLength(5);
  });
});
