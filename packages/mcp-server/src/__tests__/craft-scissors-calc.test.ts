import { describe, it, expect } from "vitest";
import {
  cuttingPower, precision, ergonomic, versatility,
  scissorsCost, selfSharpening, replaceableBlade, bladeMaterial,
  bestCraft, craftScissors,
} from "../craft-scissors-calc.js";

describe("cuttingPower", () => {
  it("rotary cutter wheel best cutting power", () => {
    expect(cuttingPower("rotary_cutter_wheel")).toBeGreaterThan(cuttingPower("detail_precision_tip"));
  });
});

describe("precision", () => {
  it("detail precision tip most precise", () => {
    expect(precision("detail_precision_tip")).toBeGreaterThan(precision("pinking_zigzag"));
  });
});

describe("ergonomic", () => {
  it("spring action easy grip most ergonomic", () => {
    expect(ergonomic("spring_action_easy_grip")).toBeGreaterThan(ergonomic("pinking_zigzag"));
  });
});

describe("versatility", () => {
  it("rotary cutter wheel most versatile", () => {
    expect(versatility("rotary_cutter_wheel")).toBeGreaterThan(versatility("pinking_zigzag"));
  });
});

describe("scissorsCost", () => {
  it("rotary cutter wheel most expensive", () => {
    expect(scissorsCost("rotary_cutter_wheel")).toBeGreaterThan(scissorsCost("spring_action_easy_grip"));
  });
});

describe("selfSharpening", () => {
  it("spring action easy grip is self sharpening", () => {
    expect(selfSharpening("spring_action_easy_grip")).toBe(true);
  });
  it("fabric shears bent is not", () => {
    expect(selfSharpening("fabric_shears_bent")).toBe(false);
  });
});

describe("replaceableBlade", () => {
  it("rotary cutter wheel has replaceable blade", () => {
    expect(replaceableBlade("rotary_cutter_wheel")).toBe(true);
  });
  it("fabric shears bent does not", () => {
    expect(replaceableBlade("fabric_shears_bent")).toBe(false);
  });
});

describe("bladeMaterial", () => {
  it("rotary cutter wheel uses tungsten carbide disc", () => {
    expect(bladeMaterial("rotary_cutter_wheel")).toBe("tungsten_carbide_disc");
  });
});

describe("bestCraft", () => {
  it("spring action easy grip best for arthritis hand fatigue", () => {
    expect(bestCraft("spring_action_easy_grip")).toBe("arthritis_hand_fatigue");
  });
});

describe("craftScissors", () => {
  it("returns 5 types", () => {
    expect(craftScissors()).toHaveLength(5);
  });
});
