import { describe, it, expect } from "vitest";
import {
  hoseCapacity, easeOfUse, durability, portability,
  reelCost, autoRewind, hidesHose, reelMaterial,
  bestYard, hoseReels,
} from "../hose-reel-calc.js";

describe("hoseCapacity", () => {
  it("cart wheeled portable most hose capacity", () => {
    expect(hoseCapacity("cart_wheeled_portable")).toBeGreaterThan(hoseCapacity("freestanding_decorative_pot"));
  });
});

describe("easeOfUse", () => {
  it("retractable auto rewind easiest to use", () => {
    expect(easeOfUse("retractable_auto_rewind")).toBeGreaterThan(easeOfUse("wall_mount_crank_manual"));
  });
});

describe("durability", () => {
  it("wall mount crank manual most durable", () => {
    expect(durability("wall_mount_crank_manual")).toBeGreaterThan(durability("retractable_auto_rewind"));
  });
});

describe("portability", () => {
  it("cart wheeled portable most portable", () => {
    expect(portability("cart_wheeled_portable")).toBeGreaterThan(portability("wall_mount_crank_manual"));
  });
});

describe("reelCost", () => {
  it("retractable auto rewind most expensive", () => {
    expect(reelCost("retractable_auto_rewind")).toBeGreaterThan(reelCost("wall_mount_crank_manual"));
  });
});

describe("autoRewind", () => {
  it("retractable auto rewind has auto rewind", () => {
    expect(autoRewind("retractable_auto_rewind")).toBe(true);
  });
  it("cart wheeled portable has no auto rewind", () => {
    expect(autoRewind("cart_wheeled_portable")).toBe(false);
  });
});

describe("hidesHose", () => {
  it("hideaway box enclosed hides hose", () => {
    expect(hidesHose("hideaway_box_enclosed")).toBe(true);
  });
  it("wall mount crank manual does not hide hose", () => {
    expect(hidesHose("wall_mount_crank_manual")).toBe(false);
  });
});

describe("reelMaterial", () => {
  it("cart wheeled portable uses steel frame pneumatic", () => {
    expect(reelMaterial("cart_wheeled_portable")).toBe("steel_frame_pneumatic");
  });
});

describe("bestYard", () => {
  it("retractable auto rewind best for patio clean look", () => {
    expect(bestYard("retractable_auto_rewind")).toBe("patio_clean_look");
  });
});

describe("hoseReels", () => {
  it("returns 5 types", () => {
    expect(hoseReels()).toHaveLength(5);
  });
});
