import { describe, it, expect } from "vitest";
import {
  airFlow, markFree, heatEven, stability,
  rackCost, reusable, stackable, rackMaterial,
  bestUse, firingRacks,
} from "../firing-rack-calc.js";

describe("airFlow", () => {
  it("mesh screen flat best air flow", () => {
    expect(airFlow("mesh_screen_flat")).toBeGreaterThan(airFlow("ceramic_post_stack"));
  });
});

describe("markFree", () => {
  it("ceramic post stack most mark free", () => {
    expect(markFree("ceramic_post_stack")).toBeGreaterThan(markFree("mesh_screen_flat"));
  });
});

describe("heatEven", () => {
  it("mesh screen flat most even heat", () => {
    expect(heatEven("mesh_screen_flat")).toBeGreaterThan(heatEven("firing_fork_lift"));
  });
});

describe("stability", () => {
  it("mesh screen flat most stable", () => {
    expect(stability("mesh_screen_flat")).toBeGreaterThan(stability("firing_fork_lift"));
  });
});

describe("rackCost", () => {
  it("firing fork lift most expensive", () => {
    expect(rackCost("firing_fork_lift")).toBeGreaterThan(rackCost("trivets_star_point"));
  });
});

describe("reusable", () => {
  it("mesh screen flat is reusable", () => {
    expect(reusable("mesh_screen_flat")).toBe(true);
  });
  it("stilts three point not reusable", () => {
    expect(reusable("stilts_three_point")).toBe(false);
  });
});

describe("stackable", () => {
  it("mesh screen flat is stackable", () => {
    expect(stackable("mesh_screen_flat")).toBe(true);
  });
  it("trivets star point not stackable", () => {
    expect(stackable("trivets_star_point")).toBe(false);
  });
});

describe("rackMaterial", () => {
  it("mesh screen flat uses stainless mesh wire", () => {
    expect(rackMaterial("mesh_screen_flat")).toBe("stainless_mesh_wire");
  });
});

describe("bestUse", () => {
  it("stilts three point best for glazed bottom fire", () => {
    expect(bestUse("stilts_three_point")).toBe("glazed_bottom_fire");
  });
});

describe("firingRacks", () => {
  it("returns 5 types", () => {
    expect(firingRacks()).toHaveLength(5);
  });
});
