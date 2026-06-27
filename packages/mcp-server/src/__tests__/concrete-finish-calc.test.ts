import { describe, it, expect } from "vitest";
import {
  traction, aesthetic, durability, maintenance,
  cfCost, decorative, forExterior, process,
  bestUse, concreteFinishTypes,
} from "../concrete-finish-calc.js";

describe("traction", () => {
  it("broom finish best traction", () => {
    expect(traction("broom_finish_standard")).toBeGreaterThan(traction("trowel_smooth_hard"));
  });
});

describe("aesthetic", () => {
  it("stamped best aesthetic", () => {
    expect(aesthetic("stamped_pattern_color")).toBeGreaterThan(aesthetic("broom_finish_standard"));
  });
});

describe("durability", () => {
  it("polished most durable", () => {
    expect(durability("polished_grind_seal")).toBeGreaterThan(durability("stamped_pattern_color"));
  });
});

describe("maintenance", () => {
  it("polished low maintenance", () => {
    expect(maintenance("polished_grind_seal")).toBeGreaterThan(maintenance("stamped_pattern_color"));
  });
});

describe("cfCost", () => {
  it("polished most expensive", () => {
    expect(cfCost("polished_grind_seal")).toBeGreaterThan(cfCost("broom_finish_standard"));
  });
});

describe("decorative", () => {
  it("stamped is decorative", () => {
    expect(decorative("stamped_pattern_color")).toBe(true);
  });
  it("broom not decorative", () => {
    expect(decorative("broom_finish_standard")).toBe(false);
  });
});

describe("forExterior", () => {
  it("broom for exterior", () => {
    expect(forExterior("broom_finish_standard")).toBe(true);
  });
  it("polished not exterior", () => {
    expect(forExterior("polished_grind_seal")).toBe(false);
  });
});

describe("process", () => {
  it("polished uses diamond grind", () => {
    expect(process("polished_grind_seal")).toBe("diamond_grind_densify_polish");
  });
});

describe("bestUse", () => {
  it("exposed aggregate for patio", () => {
    expect(bestUse("exposed_aggregate_wash")).toBe("patio_pool_deck_decorative");
  });
});

describe("concreteFinishTypes", () => {
  it("returns 5 types", () => {
    expect(concreteFinishTypes()).toHaveLength(5);
  });
});
