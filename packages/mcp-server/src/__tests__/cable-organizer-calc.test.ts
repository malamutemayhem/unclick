import { describe, it, expect } from "vitest";
import {
  bundleCapacity, accessEase, aestheticClean, reusability,
  organizerCost, noDrill, fireRetardant, mountMethod,
  bestSetup, cableOrganizers,
} from "../cable-organizer-calc.js";

describe("bundleCapacity", () => {
  it("raceway wall channel most bundle capacity", () => {
    expect(bundleCapacity("raceway_wall_channel")).toBeGreaterThan(bundleCapacity("clip_mount_adhesive"));
  });
});

describe("accessEase", () => {
  it("velcro strap roll easiest access", () => {
    expect(accessEase("velcro_strap_roll")).toBeGreaterThan(accessEase("sleeve_neoprene"));
  });
});

describe("aestheticClean", () => {
  it("raceway wall channel cleanest aesthetic", () => {
    expect(aestheticClean("raceway_wall_channel")).toBeGreaterThan(aestheticClean("velcro_strap_roll"));
  });
});

describe("reusability", () => {
  it("velcro strap roll most reusable", () => {
    expect(reusability("velcro_strap_roll")).toBeGreaterThan(reusability("clip_mount_adhesive"));
  });
});

describe("organizerCost", () => {
  it("raceway wall channel most expensive", () => {
    expect(organizerCost("raceway_wall_channel")).toBeGreaterThan(organizerCost("velcro_strap_roll"));
  });
});

describe("noDrill", () => {
  it("velcro strap roll needs no drill", () => {
    expect(noDrill("velcro_strap_roll")).toBe(true);
  });
  it("raceway wall channel needs drill", () => {
    expect(noDrill("raceway_wall_channel")).toBe(false);
  });
});

describe("fireRetardant", () => {
  it("cable box hide is fire retardant", () => {
    expect(fireRetardant("cable_box_hide")).toBe(true);
  });
  it("velcro strap roll is not", () => {
    expect(fireRetardant("velcro_strap_roll")).toBe(false);
  });
});

describe("mountMethod", () => {
  it("clip mount adhesive uses 3m adhesive clip", () => {
    expect(mountMethod("clip_mount_adhesive")).toBe("3m_adhesive_clip");
  });
});

describe("bestSetup", () => {
  it("raceway wall channel for wall mount tv clean", () => {
    expect(bestSetup("raceway_wall_channel")).toBe("wall_mount_tv_clean");
  });
});

describe("cableOrganizers", () => {
  it("returns 5 types", () => {
    expect(cableOrganizers()).toHaveLength(5);
  });
});
