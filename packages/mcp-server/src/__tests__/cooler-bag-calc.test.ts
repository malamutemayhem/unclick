import { describe, it, expect } from "vitest";
import {
  iceRetention, capacity, portability, storageWhenEmpty,
  coolerCost, leakProof, hasWheels, insulationType,
  bestOuting, coolerBags,
} from "../cooler-bag-calc.js";

describe("iceRetention", () => {
  it("hard shell rotomold best ice retention", () => {
    expect(iceRetention("hard_shell_rotomold")).toBeGreaterThan(iceRetention("soft_sided_lunch"));
  });
});

describe("capacity", () => {
  it("rolling wheeled large highest capacity", () => {
    expect(capacity("rolling_wheeled_large")).toBeGreaterThan(capacity("soft_sided_lunch"));
  });
});

describe("portability", () => {
  it("backpack hands free most portable", () => {
    expect(portability("backpack_hands_free")).toBeGreaterThan(portability("hard_shell_rotomold"));
  });
});

describe("storageWhenEmpty", () => {
  it("collapsible flat fold best storage when empty", () => {
    expect(storageWhenEmpty("collapsible_flat_fold")).toBeGreaterThan(storageWhenEmpty("hard_shell_rotomold"));
  });
});

describe("coolerCost", () => {
  it("hard shell rotomold most expensive", () => {
    expect(coolerCost("hard_shell_rotomold")).toBeGreaterThan(coolerCost("soft_sided_lunch"));
  });
});

describe("leakProof", () => {
  it("hard shell rotomold is leak proof", () => {
    expect(leakProof("hard_shell_rotomold")).toBe(true);
  });
  it("soft sided lunch is not", () => {
    expect(leakProof("soft_sided_lunch")).toBe(false);
  });
});

describe("hasWheels", () => {
  it("rolling wheeled large has wheels", () => {
    expect(hasWheels("rolling_wheeled_large")).toBe(true);
  });
  it("backpack hands free does not", () => {
    expect(hasWheels("backpack_hands_free")).toBe(false);
  });
});

describe("insulationType", () => {
  it("hard shell rotomold uses polyurethane injection thick", () => {
    expect(insulationType("hard_shell_rotomold")).toBe("polyurethane_injection_thick");
  });
});

describe("bestOuting", () => {
  it("backpack hands free best for hiking beach walk", () => {
    expect(bestOuting("backpack_hands_free")).toBe("hiking_beach_walk");
  });
});

describe("coolerBags", () => {
  it("returns 5 types", () => {
    expect(coolerBags()).toHaveLength(5);
  });
});
