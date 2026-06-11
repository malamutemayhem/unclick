import { describe, it, expect } from "vitest";
import {
  strikeForce, controlSwing, faceLife, weightBalance,
  malletCost, deadBlow, forAssembly, headMaterial,
  bestUse, commanderMallets,
} from "../commander-mallet-calc.js";

describe("strikeForce", () => {
  it("lignum vitae dense strongest strike", () => {
    expect(strikeForce("lignum_vitae_dense")).toBeGreaterThan(strikeForce("poly_head_soft"));
  });
});

describe("controlSwing", () => {
  it("dead blow shot best control", () => {
    expect(controlSwing("dead_blow_shot")).toBeGreaterThan(controlSwing("lignum_vitae_dense"));
  });
});

describe("faceLife", () => {
  it("lignum vitae dense longest face life", () => {
    expect(faceLife("lignum_vitae_dense")).toBeGreaterThan(faceLife("round_head_beech"));
  });
});

describe("weightBalance", () => {
  it("dead blow shot best weight balance", () => {
    expect(weightBalance("dead_blow_shot")).toBeGreaterThan(weightBalance("lignum_vitae_dense"));
  });
});

describe("malletCost", () => {
  it("lignum vitae dense most expensive", () => {
    expect(malletCost("lignum_vitae_dense")).toBeGreaterThan(malletCost("poly_head_soft"));
  });
});

describe("deadBlow", () => {
  it("dead blow shot is dead blow", () => {
    expect(deadBlow("dead_blow_shot")).toBe(true);
  });
  it("round head beech not dead blow", () => {
    expect(deadBlow("round_head_beech")).toBe(false);
  });
});

describe("forAssembly", () => {
  it("round head beech is for assembly", () => {
    expect(forAssembly("round_head_beech")).toBe(true);
  });
  it("lignum vitae dense not for assembly", () => {
    expect(forAssembly("lignum_vitae_dense")).toBe(false);
  });
});

describe("headMaterial", () => {
  it("dead blow shot uses poly shell shot", () => {
    expect(headMaterial("dead_blow_shot")).toBe("poly_shell_shot");
  });
});

describe("bestUse", () => {
  it("lignum vitae dense best for heavy mortise drive", () => {
    expect(bestUse("lignum_vitae_dense")).toBe("heavy_mortise_drive");
  });
});

describe("commanderMallets", () => {
  it("returns 5 types", () => {
    expect(commanderMallets()).toHaveLength(5);
  });
});
