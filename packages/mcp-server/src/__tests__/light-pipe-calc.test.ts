import { describe, it, expect } from "vitest";
import {
  transmission, flexibility, alignment, sizeCompact,
  pipeCost, flexible, forPanel, material,
  bestUse, lightPipes,
} from "../light-pipe-calc.js";

describe("transmission", () => {
  it("rigid acrylic round best transmission", () => {
    expect(transmission("rigid_acrylic_round")).toBeGreaterThan(transmission("flexible_silicone"));
  });
});

describe("flexibility", () => {
  it("flexible silicone most flexible", () => {
    expect(flexibility("flexible_silicone")).toBeGreaterThan(flexibility("rigid_acrylic_round"));
  });
});

describe("alignment", () => {
  it("right angle prism best alignment", () => {
    expect(alignment("right_angle_prism")).toBeGreaterThan(alignment("flexible_silicone"));
  });
});

describe("sizeCompact", () => {
  it("smd surface guide most compact", () => {
    expect(sizeCompact("smd_surface_guide")).toBeGreaterThan(sizeCompact("panel_mount_chrome"));
  });
});

describe("pipeCost", () => {
  it("panel mount chrome most expensive", () => {
    expect(pipeCost("panel_mount_chrome")).toBeGreaterThan(pipeCost("rigid_acrylic_round"));
  });
});

describe("flexible", () => {
  it("flexible silicone is flexible", () => {
    expect(flexible("flexible_silicone")).toBe(true);
  });
  it("rigid acrylic round not flexible", () => {
    expect(flexible("rigid_acrylic_round")).toBe(false);
  });
});

describe("forPanel", () => {
  it("panel mount chrome is for panel", () => {
    expect(forPanel("panel_mount_chrome")).toBe(true);
  });
  it("smd surface guide not for panel", () => {
    expect(forPanel("smd_surface_guide")).toBe(false);
  });
});

describe("material", () => {
  it("right angle prism uses polycarbonate prism", () => {
    expect(material("right_angle_prism")).toBe("polycarbonate_prism");
  });
});

describe("bestUse", () => {
  it("rigid acrylic round best for pcb to panel led route", () => {
    expect(bestUse("rigid_acrylic_round")).toBe("pcb_to_panel_led_route");
  });
});

describe("lightPipes", () => {
  it("returns 5 types", () => {
    expect(lightPipes()).toHaveLength(5);
  });
});
