import { describe, it, expect } from "vitest";
import {
  stiffness, ductility, drift, detailing,
  bfCost, special, forSeismic, brace,
  bestUse, bracedFrameTypes,
} from "../braced-frame-calc.js";

describe("stiffness", () => {
  it("special concentric stiffest", () => {
    expect(stiffness("special_concentric_scbf")).toBeGreaterThan(stiffness("knee_braced_kbf"));
  });
});

describe("ductility", () => {
  it("buckling restrained most ductile", () => {
    expect(ductility("buckling_restrained_brbf")).toBeGreaterThan(ductility("ordinary_concentric_ocbf"));
  });
});

describe("drift", () => {
  it("special concentric best drift", () => {
    expect(drift("special_concentric_scbf")).toBeGreaterThan(drift("knee_braced_kbf"));
  });
});

describe("detailing", () => {
  it("ordinary simplest detailing", () => {
    expect(detailing("ordinary_concentric_ocbf")).toBeGreaterThan(detailing("eccentric_link_ebf"));
  });
});

describe("bfCost", () => {
  it("buckling restrained most expensive", () => {
    expect(bfCost("buckling_restrained_brbf")).toBeGreaterThan(bfCost("ordinary_concentric_ocbf"));
  });
});

describe("special", () => {
  it("eccentric is special", () => {
    expect(special("eccentric_link_ebf")).toBe(true);
  });
  it("ordinary not special", () => {
    expect(special("ordinary_concentric_ocbf")).toBe(false);
  });
});

describe("forSeismic", () => {
  it("buckling restrained for seismic", () => {
    expect(forSeismic("buckling_restrained_brbf")).toBe(true);
  });
  it("knee braced not for seismic", () => {
    expect(forSeismic("knee_braced_kbf")).toBe(false);
  });
});

describe("brace", () => {
  it("buckling restrained uses core plate", () => {
    expect(brace("buckling_restrained_brbf")).toBe("core_plate_mortar_casing");
  });
});

describe("bestUse", () => {
  it("eccentric for door opening", () => {
    expect(bestUse("eccentric_link_ebf")).toBe("seismic_with_door_opening");
  });
});

describe("bracedFrameTypes", () => {
  it("returns 5 types", () => {
    expect(bracedFrameTypes()).toHaveLength(5);
  });
});
