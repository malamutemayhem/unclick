import { describe, it, expect } from "vitest";
import {
  threadEase, weavePrecision, materialSafe, handleGrip,
  bodkinCost, curved, forRibbon, tipShape,
  bestUse, bodkinWeaves,
} from "../bodkin-weave-calc.js";

describe("threadEase", () => {
  it("wide tape needle easiest thread", () => {
    expect(threadEase("wide_tape_needle")).toBeGreaterThan(threadEase("pointed_bone_push"));
  });
});

describe("weavePrecision", () => {
  it("pointed bone push most precise", () => {
    expect(weavePrecision("pointed_bone_push")).toBeGreaterThan(weavePrecision("wide_tape_needle"));
  });
});

describe("materialSafe", () => {
  it("curved hook weave safest", () => {
    expect(materialSafe("curved_hook_weave")).toBeGreaterThan(materialSafe("flat_ribbon_thread"));
  });
});

describe("handleGrip", () => {
  it("pointed bone push best grip", () => {
    expect(handleGrip("pointed_bone_push")).toBeGreaterThan(handleGrip("wide_tape_needle"));
  });
});

describe("bodkinCost", () => {
  it("curved hook weave most expensive", () => {
    expect(bodkinCost("curved_hook_weave")).toBeGreaterThan(bodkinCost("flat_ribbon_thread"));
  });
});

describe("curved", () => {
  it("curved hook weave is curved", () => {
    expect(curved("curved_hook_weave")).toBe(true);
  });
  it("flat ribbon thread not curved", () => {
    expect(curved("flat_ribbon_thread")).toBe(false);
  });
});

describe("forRibbon", () => {
  it("flat ribbon thread is for ribbon", () => {
    expect(forRibbon("flat_ribbon_thread")).toBe(true);
  });
  it("pointed bone push not for ribbon", () => {
    expect(forRibbon("pointed_bone_push")).toBe(false);
  });
});

describe("tipShape", () => {
  it("split eye pull uses split loop eye", () => {
    expect(tipShape("split_eye_pull")).toBe("split_loop_eye");
  });
});

describe("bestUse", () => {
  it("wide tape needle best for wide splint thread", () => {
    expect(bestUse("wide_tape_needle")).toBe("wide_splint_thread");
  });
});

describe("bodkinWeaves", () => {
  it("returns 5 types", () => {
    expect(bodkinWeaves()).toHaveLength(5);
  });
});
