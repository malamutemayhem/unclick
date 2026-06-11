import { describe, it, expect } from "vitest";
import {
  strikeForce, controlAim, speedSwing, fatigueResist,
  sledgeCost, doubleFace, forHelper, headWeight,
  bestUse, sledgeForges,
} from "../sledge-forge-calc.js";

describe("strikeForce", () => {
  it("double face flat strongest strike force", () => {
    expect(strikeForce("double_face_flat")).toBeGreaterThan(strikeForce("striking_hammer_helper"));
  });
});

describe("controlAim", () => {
  it("striking hammer helper best control aim", () => {
    expect(controlAim("striking_hammer_helper")).toBeGreaterThan(controlAim("straight_peen_standard"));
  });
});

describe("speedSwing", () => {
  it("striking hammer helper fastest swing", () => {
    expect(speedSwing("striking_hammer_helper")).toBeGreaterThan(speedSwing("double_face_flat"));
  });
});

describe("fatigueResist", () => {
  it("striking hammer helper best fatigue resist", () => {
    expect(fatigueResist("striking_hammer_helper")).toBeGreaterThan(fatigueResist("double_face_flat"));
  });
});

describe("sledgeCost", () => {
  it("dog head sledge most expensive", () => {
    expect(sledgeCost("dog_head_sledge")).toBeGreaterThan(sledgeCost("straight_peen_standard"));
  });
});

describe("doubleFace", () => {
  it("double face flat has double face", () => {
    expect(doubleFace("double_face_flat")).toBe(true);
  });
  it("straight peen standard not double face", () => {
    expect(doubleFace("straight_peen_standard")).toBe(false);
  });
});

describe("forHelper", () => {
  it("striking hammer helper is for helper", () => {
    expect(forHelper("striking_hammer_helper")).toBe(true);
  });
  it("straight peen standard not for helper", () => {
    expect(forHelper("straight_peen_standard")).toBe(false);
  });
});

describe("headWeight", () => {
  it("double face flat uses extra heavy 4500g", () => {
    expect(headWeight("double_face_flat")).toBe("extra_heavy_4500g");
  });
});

describe("bestUse", () => {
  it("double face flat best for maximum forge move", () => {
    expect(bestUse("double_face_flat")).toBe("maximum_forge_move");
  });
});

describe("sledgeForges", () => {
  it("returns 5 types", () => {
    expect(sledgeForges()).toHaveLength(5);
  });
});
