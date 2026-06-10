import { describe, it, expect } from "vitest";
import {
  compartments, styleAppeal, durability, footprint,
  organizerCost, stackable, drawerIncluded, bodyMaterial,
  bestDesk, deskOrganizers,
} from "../desk-organizer-calc.js";

describe("compartments", () => {
  it("rotating carousel most compartments", () => {
    expect(compartments("rotating_carousel")).toBeGreaterThan(compartments("leather_valet"));
  });
});

describe("styleAppeal", () => {
  it("leather valet most stylish", () => {
    expect(styleAppeal("leather_valet")).toBeGreaterThan(styleAppeal("mesh_metal_multi"));
  });
});

describe("durability", () => {
  it("mesh metal multi most durable", () => {
    expect(durability("mesh_metal_multi")).toBeGreaterThan(durability("acrylic_clear"));
  });
});

describe("footprint", () => {
  it("bamboo tiered largest footprint", () => {
    expect(footprint("bamboo_tiered")).toBeGreaterThan(footprint("rotating_carousel"));
  });
});

describe("organizerCost", () => {
  it("leather valet most expensive", () => {
    expect(organizerCost("leather_valet")).toBeGreaterThan(organizerCost("mesh_metal_multi"));
  });
});

describe("stackable", () => {
  it("mesh metal multi is stackable", () => {
    expect(stackable("mesh_metal_multi")).toBe(true);
  });
  it("leather valet is not", () => {
    expect(stackable("leather_valet")).toBe(false);
  });
});

describe("drawerIncluded", () => {
  it("bamboo tiered includes drawer", () => {
    expect(drawerIncluded("bamboo_tiered")).toBe(true);
  });
  it("acrylic clear does not", () => {
    expect(drawerIncluded("acrylic_clear")).toBe(false);
  });
});

describe("bodyMaterial", () => {
  it("rotating carousel uses abs plastic swivel", () => {
    expect(bodyMaterial("rotating_carousel")).toBe("abs_plastic_swivel");
  });
});

describe("bestDesk", () => {
  it("leather valet for executive reception", () => {
    expect(bestDesk("leather_valet")).toBe("executive_reception");
  });
});

describe("deskOrganizers", () => {
  it("returns 5 types", () => {
    expect(deskOrganizers()).toHaveLength(5);
  });
});
