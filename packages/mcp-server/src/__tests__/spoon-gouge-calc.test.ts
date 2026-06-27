import { describe, it, expect } from "vitest";
import {
  hollowDepth, cutWidth, controlFeel, sharpenEase,
  gougeCost, hooked, leftHand, edgeProfile,
  bestUse, spoonGouges,
} from "../spoon-gouge-calc.js";

describe("hollowDepth", () => {
  it("tight curl hook deepest hollow", () => {
    expect(hollowDepth("tight_curl_hook")).toBeGreaterThan(hollowDepth("straight_gouge_flat"));
  });
});

describe("cutWidth", () => {
  it("shallow sweep wide widest cut", () => {
    expect(cutWidth("shallow_sweep_wide")).toBeGreaterThan(cutWidth("tight_curl_hook"));
  });
});

describe("controlFeel", () => {
  it("straight gouge flat best control", () => {
    expect(controlFeel("straight_gouge_flat")).toBeGreaterThan(controlFeel("tight_curl_hook"));
  });
});

describe("sharpenEase", () => {
  it("straight gouge flat easiest to sharpen", () => {
    expect(sharpenEase("straight_gouge_flat")).toBeGreaterThan(sharpenEase("tight_curl_hook"));
  });
});

describe("gougeCost", () => {
  it("tight curl hook more expensive than straight", () => {
    expect(gougeCost("tight_curl_hook")).toBeGreaterThan(gougeCost("straight_gouge_flat"));
  });
});

describe("hooked", () => {
  it("tight curl hook is hooked", () => {
    expect(hooked("tight_curl_hook")).toBe(true);
  });
  it("straight gouge flat not hooked", () => {
    expect(hooked("straight_gouge_flat")).toBe(false);
  });
});

describe("leftHand", () => {
  it("left hand curve is left hand", () => {
    expect(leftHand("left_hand_curve")).toBe(true);
  });
  it("tight curl hook not left hand", () => {
    expect(leftHand("tight_curl_hook")).toBe(false);
  });
});

describe("edgeProfile", () => {
  it("tight curl hook uses tight hook curl", () => {
    expect(edgeProfile("tight_curl_hook")).toBe("tight_hook_curl");
  });
});

describe("bestUse", () => {
  it("deep bowl scoop best for kuksa cup carve", () => {
    expect(bestUse("deep_bowl_scoop")).toBe("kuksa_cup_carve");
  });
});

describe("spoonGouges", () => {
  it("returns 5 types", () => {
    expect(spoonGouges()).toHaveLength(5);
  });
});
