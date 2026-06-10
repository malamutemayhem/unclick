import { describe, it, expect } from "vitest";
import {
  storageCapacity, installEase, mirrorQuality, aestheticClean,
  cabinetCost, flushMount, hasLighting, doorType,
  bestBathroom, medicineCabinets,
} from "../medicine-cabinet-calc.js";

describe("storageCapacity", () => {
  it("recessed mirror highest storage capacity", () => {
    expect(storageCapacity("recessed_mirror")).toBeGreaterThan(storageCapacity("open_shelf_modern"));
  });
});

describe("installEase", () => {
  it("surface mount basic easiest install", () => {
    expect(installEase("surface_mount_basic")).toBeGreaterThan(installEase("recessed_mirror"));
  });
});

describe("mirrorQuality", () => {
  it("lighted led mirror best mirror quality", () => {
    expect(mirrorQuality("lighted_led_mirror")).toBeGreaterThan(mirrorQuality("surface_mount_basic"));
  });
});

describe("aestheticClean", () => {
  it("lighted led mirror most aesthetic", () => {
    expect(aestheticClean("lighted_led_mirror")).toBeGreaterThan(aestheticClean("surface_mount_basic"));
  });
});

describe("cabinetCost", () => {
  it("lighted led mirror most expensive", () => {
    expect(cabinetCost("lighted_led_mirror")).toBeGreaterThan(cabinetCost("surface_mount_basic"));
  });
});

describe("flushMount", () => {
  it("recessed mirror is flush mount", () => {
    expect(flushMount("recessed_mirror")).toBe(true);
  });
  it("surface mount basic is not", () => {
    expect(flushMount("surface_mount_basic")).toBe(false);
  });
});

describe("hasLighting", () => {
  it("lighted led mirror has lighting", () => {
    expect(hasLighting("lighted_led_mirror")).toBe(true);
  });
  it("recessed mirror does not", () => {
    expect(hasLighting("recessed_mirror")).toBe(false);
  });
});

describe("doorType", () => {
  it("open shelf modern uses no door open face", () => {
    expect(doorType("open_shelf_modern")).toBe("no_door_open_face");
  });
});

describe("bestBathroom", () => {
  it("lighted led mirror best for luxury spa vanity", () => {
    expect(bestBathroom("lighted_led_mirror")).toBe("luxury_spa_vanity");
  });
});

describe("medicineCabinets", () => {
  it("returns 5 types", () => {
    expect(medicineCabinets()).toHaveLength(5);
  });
});
