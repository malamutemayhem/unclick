import { describe, it, expect } from "vitest";
import {
  moment, shear, adjustability, stiffness,
  bpCost, stiffened, forMoment, connection,
  bestUse, basePlateTypes,
} from "../base-plate-calc.js";

describe("moment", () => {
  it("moment base highest moment", () => {
    expect(moment("moment_base_stiffened_rib")).toBeGreaterThan(moment("pinned_base_single_bolt"));
  });
});

describe("shear", () => {
  it("moment base highest shear", () => {
    expect(shear("moment_base_stiffened_rib")).toBeGreaterThan(shear("pinned_base_single_bolt"));
  });
});

describe("adjustability", () => {
  it("leveling nut most adjustable", () => {
    expect(adjustability("leveling_nut_anchor_rod")).toBeGreaterThan(adjustability("moment_base_stiffened_rib"));
  });
});

describe("stiffness", () => {
  it("moment base stiffest", () => {
    expect(stiffness("moment_base_stiffened_rib")).toBeGreaterThan(stiffness("pinned_base_single_bolt"));
  });
});

describe("bpCost", () => {
  it("moment base most expensive", () => {
    expect(bpCost("moment_base_stiffened_rib")).toBeGreaterThan(bpCost("pinned_base_single_bolt"));
  });
});

describe("stiffened", () => {
  it("column base is stiffened", () => {
    expect(stiffened("column_base_welded_gusset")).toBe(true);
  });
  it("pinned base not stiffened", () => {
    expect(stiffened("pinned_base_single_bolt")).toBe(false);
  });
});

describe("forMoment", () => {
  it("moment base for moment", () => {
    expect(forMoment("moment_base_stiffened_rib")).toBe(true);
  });
  it("pinned base not for moment", () => {
    expect(forMoment("pinned_base_single_bolt")).toBe(false);
  });
});

describe("connection", () => {
  it("leveling nut uses double nut", () => {
    expect(connection("leveling_nut_anchor_rod")).toBe("double_nut_leveling_anchor_rod");
  });
});

describe("bestUse", () => {
  it("moment base for seismic rigid", () => {
    expect(bestUse("moment_base_stiffened_rib")).toBe("moment_frame_seismic_rigid_base");
  });
});

describe("basePlateTypes", () => {
  it("returns 5 types", () => {
    expect(basePlateTypes()).toHaveLength(5);
  });
});
