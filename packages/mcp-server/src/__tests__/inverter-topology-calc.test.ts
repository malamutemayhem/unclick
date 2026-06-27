import { describe, it, expect } from "vitest";
import {
  efficiency, thd, voltage, complexity,
  invCost, multilevel, forSolar, switching,
  bestUse, inverterTopologies,
} from "../inverter-topology-calc.js";

describe("efficiency", () => {
  it("three level npc highest efficiency", () => {
    expect(efficiency("three_level_npc")).toBeGreaterThan(efficiency("two_level_vsi"));
  });
});

describe("thd", () => {
  it("cascaded h bridge lowest thd", () => {
    expect(thd("cascaded_h_bridge")).toBeGreaterThan(thd("two_level_vsi"));
  });
});

describe("voltage", () => {
  it("cascaded h bridge highest voltage", () => {
    expect(voltage("cascaded_h_bridge")).toBeGreaterThan(voltage("two_level_vsi"));
  });
});

describe("complexity", () => {
  it("matrix converter most complex", () => {
    expect(complexity("matrix_converter")).toBeGreaterThan(complexity("two_level_vsi"));
  });
});

describe("invCost", () => {
  it("cascaded h bridge most expensive", () => {
    expect(invCost("cascaded_h_bridge")).toBeGreaterThan(invCost("two_level_vsi"));
  });
});

describe("multilevel", () => {
  it("three level npc is multilevel", () => {
    expect(multilevel("three_level_npc")).toBe(true);
  });
  it("two level vsi not multilevel", () => {
    expect(multilevel("two_level_vsi")).toBe(false);
  });
});

describe("forSolar", () => {
  it("t type anpc for solar", () => {
    expect(forSolar("t_type_anpc")).toBe(true);
  });
  it("two level vsi not for solar", () => {
    expect(forSolar("two_level_vsi")).toBe(false);
  });
});

describe("switching", () => {
  it("matrix converter uses direct ac ac bidirectional", () => {
    expect(switching("matrix_converter")).toBe("direct_ac_ac_bidirectional");
  });
});

describe("bestUse", () => {
  it("cascaded h bridge best for statcom grid reactive", () => {
    expect(bestUse("cascaded_h_bridge")).toBe("statcom_grid_reactive");
  });
});

describe("inverterTopologies", () => {
  it("returns 5 types", () => {
    expect(inverterTopologies()).toHaveLength(5);
  });
});
