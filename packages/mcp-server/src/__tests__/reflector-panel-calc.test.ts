import { describe, it, expect } from "vitest";
import {
  bounceEfficiency, surfaceArea, portability, onePersonUse,
  reflectorCost, collapsible, multiSurface, coverMaterial,
  bestShoot, reflectorPanels,
} from "../reflector-panel-calc.js";

describe("bounceEfficiency", () => {
  it("sunbounce frame fabric best bounce", () => {
    expect(bounceEfficiency("sunbounce_frame_fabric")).toBeGreaterThan(bounceEfficiency("foam_core_diy"));
  });
});

describe("surfaceArea", () => {
  it("v flat studio board largest area", () => {
    expect(surfaceArea("v_flat_studio_board")).toBeGreaterThan(surfaceArea("tri_grip_handle"));
  });
});

describe("portability", () => {
  it("five in one disc most portable", () => {
    expect(portability("five_in_one_disc")).toBeGreaterThan(portability("v_flat_studio_board"));
  });
});

describe("onePersonUse", () => {
  it("tri grip handle best for one person", () => {
    expect(onePersonUse("tri_grip_handle")).toBeGreaterThan(onePersonUse("five_in_one_disc"));
  });
});

describe("reflectorCost", () => {
  it("sunbounce frame fabric most expensive", () => {
    expect(reflectorCost("sunbounce_frame_fabric")).toBeGreaterThan(reflectorCost("foam_core_diy"));
  });
});

describe("collapsible", () => {
  it("five in one disc is collapsible", () => {
    expect(collapsible("five_in_one_disc")).toBe(true);
  });
  it("v flat studio board is not", () => {
    expect(collapsible("v_flat_studio_board")).toBe(false);
  });
});

describe("multiSurface", () => {
  it("five in one disc has multi surface", () => {
    expect(multiSurface("five_in_one_disc")).toBe(true);
  });
  it("foam core diy does not", () => {
    expect(multiSurface("foam_core_diy")).toBe(false);
  });
});

describe("coverMaterial", () => {
  it("v flat studio board uses rigid fome core", () => {
    expect(coverMaterial("v_flat_studio_board")).toBe("rigid_fome_core_white_black");
  });
});

describe("bestShoot", () => {
  it("tri grip handle best for solo shooter fill light", () => {
    expect(bestShoot("tri_grip_handle")).toBe("solo_shooter_fill_light");
  });
});

describe("reflectorPanels", () => {
  it("returns 5 types", () => {
    expect(reflectorPanels()).toHaveLength(5);
  });
});
