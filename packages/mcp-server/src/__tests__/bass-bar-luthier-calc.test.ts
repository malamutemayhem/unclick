import { describe, it, expect } from "vitest";
import {
  toneTransfer, stiffness, fitAccuracy, carveEase,
  barCost, natural, preShaped, grainType,
  bestUse, bassBarLuthiers,
} from "../bass-bar-luthier-calc.js";

describe("toneTransfer", () => {
  it("spruce hand carved best tone transfer", () => {
    expect(toneTransfer("spruce_hand_carved")).toBeGreaterThan(toneTransfer("pre_shaped_standard"));
  });
});

describe("stiffness", () => {
  it("carbon fiber modern stiffest", () => {
    expect(stiffness("carbon_fiber_modern")).toBeGreaterThan(stiffness("scalloped_end_light"));
  });
});

describe("fitAccuracy", () => {
  it("spruce hand carved most accurate fit", () => {
    expect(fitAccuracy("spruce_hand_carved")).toBeGreaterThan(fitAccuracy("pre_shaped_standard"));
  });
});

describe("carveEase", () => {
  it("pre shaped standard easiest carve", () => {
    expect(carveEase("pre_shaped_standard")).toBeGreaterThan(carveEase("spruce_hand_carved"));
  });
});

describe("barCost", () => {
  it("carbon fiber modern most expensive", () => {
    expect(barCost("carbon_fiber_modern")).toBeGreaterThan(barCost("pre_shaped_standard"));
  });
});

describe("natural", () => {
  it("spruce hand carved is natural", () => {
    expect(natural("spruce_hand_carved")).toBe(true);
  });
  it("carbon fiber modern not natural", () => {
    expect(natural("carbon_fiber_modern")).toBe(false);
  });
});

describe("preShaped", () => {
  it("pre shaped standard is pre shaped", () => {
    expect(preShaped("pre_shaped_standard")).toBe(true);
  });
  it("spruce hand carved not pre shaped", () => {
    expect(preShaped("spruce_hand_carved")).toBe(false);
  });
});

describe("grainType", () => {
  it("spruce hand carved uses quarter sawn spruce", () => {
    expect(grainType("spruce_hand_carved")).toBe("quarter_sawn_spruce");
  });
});

describe("bestUse", () => {
  it("pre shaped standard best for student violin bar", () => {
    expect(bestUse("pre_shaped_standard")).toBe("student_violin_bar");
  });
});

describe("bassBarLuthiers", () => {
  it("returns 5 types", () => {
    expect(bassBarLuthiers()).toHaveLength(5);
  });
});
