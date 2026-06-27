import { describe, it, expect } from "vitest";
import {
  optimality, speed, dynamicObs, smoothness,
  ppCost, anytime, forManipulator, search,
  bestUse, pathPlannings,
} from "../path-planning-calc.js";

describe("optimality", () => {
  it("astar most optimal", () => {
    expect(optimality("astar_grid_heuristic")).toBeGreaterThan(optimality("potential_field_virtual"));
  });
});

describe("speed", () => {
  it("dwa fastest", () => {
    expect(speed("dwa_dynamic_window")).toBeGreaterThan(speed("lattice_state_graph"));
  });
});

describe("dynamicObs", () => {
  it("dwa best dynamic obstacle handling", () => {
    expect(dynamicObs("dwa_dynamic_window")).toBeGreaterThan(dynamicObs("astar_grid_heuristic"));
  });
});

describe("smoothness", () => {
  it("lattice smoothest path", () => {
    expect(smoothness("lattice_state_graph")).toBeGreaterThan(smoothness("astar_grid_heuristic"));
  });
});

describe("ppCost", () => {
  it("lattice most expensive", () => {
    expect(ppCost("lattice_state_graph")).toBeGreaterThan(ppCost("potential_field_virtual"));
  });
});

describe("anytime", () => {
  it("rrt star is anytime", () => {
    expect(anytime("rrt_star_sampling")).toBe(true);
  });
  it("astar not anytime", () => {
    expect(anytime("astar_grid_heuristic")).toBe(false);
  });
});

describe("forManipulator", () => {
  it("rrt star for manipulator", () => {
    expect(forManipulator("rrt_star_sampling")).toBe(true);
  });
  it("dwa not for manipulator", () => {
    expect(forManipulator("dwa_dynamic_window")).toBe(false);
  });
});

describe("search", () => {
  it("dwa uses velocity space admissible arc", () => {
    expect(search("dwa_dynamic_window")).toBe("velocity_space_admissible_arc");
  });
});

describe("bestUse", () => {
  it("lattice best for autonomous vehicle lane plan", () => {
    expect(bestUse("lattice_state_graph")).toBe("autonomous_vehicle_lane_plan");
  });
});

describe("pathPlannings", () => {
  it("returns 5 types", () => {
    expect(pathPlannings()).toHaveLength(5);
  });
});
