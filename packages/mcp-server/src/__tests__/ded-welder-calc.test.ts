import { describe, it, expect } from "vitest";
import {
  depositionRate, throughput, surfaceFinish, materialEfficiency,
  ddCost, nearNetShape, forRepair, welderConfig,
  bestUse, dedWelderTypes,
} from "../ded-welder-calc.js";

describe("depositionRate", () => {
  it("arc wire ded best deposition rate", () => {
    expect(depositionRate("arc_wire_ded")).toBeGreaterThan(depositionRate("hybrid_ded_mill"));
  });
});

describe("throughput", () => {
  it("arc wire ded highest throughput", () => {
    expect(throughput("arc_wire_ded")).toBeGreaterThan(throughput("hybrid_ded_mill"));
  });
});

describe("surfaceFinish", () => {
  it("hybrid ded mill best surface finish", () => {
    expect(surfaceFinish("hybrid_ded_mill")).toBeGreaterThan(surfaceFinish("arc_wire_ded"));
  });
});

describe("materialEfficiency", () => {
  it("laser wire ded best material efficiency", () => {
    expect(materialEfficiency("laser_wire_ded")).toBeGreaterThan(materialEfficiency("laser_powder_ded"));
  });
});

describe("ddCost", () => {
  it("hybrid ded mill most expensive", () => {
    expect(ddCost("hybrid_ded_mill")).toBeGreaterThan(ddCost("arc_wire_ded"));
  });
});

describe("nearNetShape", () => {
  it("laser powder ded is near net shape", () => {
    expect(nearNetShape("laser_powder_ded")).toBe(true);
  });
  it("arc wire ded not near net shape", () => {
    expect(nearNetShape("arc_wire_ded")).toBe(false);
  });
});

describe("forRepair", () => {
  it("laser powder ded for repair", () => {
    expect(forRepair("laser_powder_ded")).toBe(true);
  });
  it("arc wire ded not for repair", () => {
    expect(forRepair("arc_wire_ded")).toBe(false);
  });
});

describe("welderConfig", () => {
  it("hybrid ded mill uses laser deposit then cnc mill same setup", () => {
    expect(welderConfig("hybrid_ded_mill")).toBe("hybrid_ded_mill_welder_laser_deposit_then_cnc_mill_same_setup");
  });
});

describe("bestUse", () => {
  it("arc wire ded for large preform steel wall near net machine", () => {
    expect(bestUse("arc_wire_ded")).toBe("large_preform_arc_wire_ded_welder_steel_wall_near_net_machine");
  });
});

describe("dedWelderTypes", () => {
  it("returns 5 types", () => {
    expect(dedWelderTypes()).toHaveLength(5);
  });
});
