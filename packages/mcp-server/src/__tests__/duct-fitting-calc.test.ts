import { describe, it, expect } from "vitest";
import {
  pressureLoss, turbulence, space, fabrication,
  dfCost, vaned, forMain, geometry,
  bestUse, ductFittingTypes,
} from "../duct-fitting-calc.js";

describe("pressureLoss", () => {
  it("tee highest pressure loss", () => {
    expect(pressureLoss("tee_branch_takeoff")).toBeGreaterThan(pressureLoss("reducer_concentric_taper"));
  });
});

describe("turbulence", () => {
  it("tee most turbulent", () => {
    expect(turbulence("tee_branch_takeoff")).toBeGreaterThan(turbulence("vane_turning_square_elbow"));
  });
});

describe("space", () => {
  it("vane turning most compact", () => {
    expect(space("vane_turning_square_elbow")).toBeGreaterThan(space("offset_s_shaped_transition"));
  });
});

describe("fabrication", () => {
  it("vane turning hardest to fabricate", () => {
    expect(fabrication("vane_turning_square_elbow")).toBeGreaterThan(fabrication("reducer_concentric_taper"));
  });
});

describe("dfCost", () => {
  it("vane turning most expensive", () => {
    expect(dfCost("vane_turning_square_elbow")).toBeGreaterThan(dfCost("reducer_concentric_taper"));
  });
});

describe("vaned", () => {
  it("vane turning is vaned", () => {
    expect(vaned("vane_turning_square_elbow")).toBe(true);
  });
  it("elbow not vaned", () => {
    expect(vaned("elbow_90_smooth_radius")).toBe(false);
  });
});

describe("forMain", () => {
  it("elbow for main", () => {
    expect(forMain("elbow_90_smooth_radius")).toBe(true);
  });
  it("offset not for main", () => {
    expect(forMain("offset_s_shaped_transition")).toBe(false);
  });
});

describe("geometry", () => {
  it("reducer uses tapered cone", () => {
    expect(geometry("reducer_concentric_taper")).toBe("tapered_cone_gradual_size_change");
  });
});

describe("bestUse", () => {
  it("vane turning for tight space", () => {
    expect(bestUse("vane_turning_square_elbow")).toBe("tight_space_square_turn_low_loss");
  });
});

describe("ductFittingTypes", () => {
  it("returns 5 types", () => {
    expect(ductFittingTypes()).toHaveLength(5);
  });
});
