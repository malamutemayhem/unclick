import { describe, it, expect } from "vitest";
import {
  wireLength, timing, congestion, runtime,
  prCost, incremental, forAdvNode, algorithm,
  bestUse, placeRoutes,
} from "../place-route-calc.js";

describe("wireLength", () => {
  it("analytical global shortest wire length", () => {
    expect(wireLength("analytical_global")).toBeGreaterThan(wireLength("clock_tree_synthesis"));
  });
});

describe("timing", () => {
  it("clock tree synthesis best timing", () => {
    expect(timing("clock_tree_synthesis")).toBeGreaterThan(timing("partition_driven"));
  });
});

describe("congestion", () => {
  it("detail legalization best congestion", () => {
    expect(congestion("detail_legalization")).toBeGreaterThan(congestion("clock_tree_synthesis"));
  });
});

describe("runtime", () => {
  it("partition driven fastest runtime", () => {
    expect(runtime("partition_driven")).toBeGreaterThan(runtime("simulated_annealing"));
  });
});

describe("prCost", () => {
  it("clock tree synthesis most expensive", () => {
    expect(prCost("clock_tree_synthesis")).toBeGreaterThan(prCost("partition_driven"));
  });
});

describe("incremental", () => {
  it("detail legalization is incremental", () => {
    expect(incremental("detail_legalization")).toBe(true);
  });
  it("analytical global not incremental", () => {
    expect(incremental("analytical_global")).toBe(false);
  });
});

describe("forAdvNode", () => {
  it("analytical global for advanced node", () => {
    expect(forAdvNode("analytical_global")).toBe(true);
  });
  it("simulated annealing not for advanced node", () => {
    expect(forAdvNode("simulated_annealing")).toBe(false);
  });
});

describe("algorithm", () => {
  it("clock tree synthesis uses balanced h tree buffer", () => {
    expect(algorithm("clock_tree_synthesis")).toBe("balanced_h_tree_buffer");
  });
});

describe("bestUse", () => {
  it("detail legalization best for post place cell overlap fix", () => {
    expect(bestUse("detail_legalization")).toBe("post_place_cell_overlap_fix");
  });
});

describe("placeRoutes", () => {
  it("returns 5 types", () => {
    expect(placeRoutes()).toHaveLength(5);
  });
});
