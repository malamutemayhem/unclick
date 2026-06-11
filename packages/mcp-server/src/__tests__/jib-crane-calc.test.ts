import { describe, it, expect } from "vitest";
import {
  liftCapacity, reach, rotation, installation,
  jcCost, freestanding, forWorkstation, boom,
  bestUse, jibCraneTypes,
} from "../jib-crane-calc.js";

describe("liftCapacity", () => {
  it("mast type highest lift capacity", () => {
    expect(liftCapacity("mast_type")).toBeGreaterThan(liftCapacity("articulating"));
  });
});

describe("reach", () => {
  it("mast type longest reach", () => {
    expect(reach("mast_type")).toBeGreaterThan(reach("wall_mounted"));
  });
});

describe("rotation", () => {
  it("mast type best rotation", () => {
    expect(rotation("mast_type")).toBeGreaterThan(rotation("portable_gantry"));
  });
});

describe("installation", () => {
  it("portable gantry easiest installation", () => {
    expect(installation("portable_gantry")).toBeGreaterThan(installation("mast_type"));
  });
});

describe("jcCost", () => {
  it("mast type most expensive", () => {
    expect(jcCost("mast_type")).toBeGreaterThan(jcCost("wall_mounted"));
  });
});

describe("freestanding", () => {
  it("floor mounted pillar is freestanding", () => {
    expect(freestanding("floor_mounted_pillar")).toBe(true);
  });
  it("wall mounted not freestanding", () => {
    expect(freestanding("wall_mounted")).toBe(false);
  });
});

describe("forWorkstation", () => {
  it("wall mounted for workstation", () => {
    expect(forWorkstation("wall_mounted")).toBe(true);
  });
  it("mast type not for workstation", () => {
    expect(forWorkstation("mast_type")).toBe(false);
  });
});

describe("boom", () => {
  it("articulating uses multi joint arm", () => {
    expect(boom("articulating")).toBe("multi_joint_arm_knuckle_fold_reach_around_obstacle_manual");
  });
});

describe("bestUse", () => {
  it("portable gantry for maintenance shop", () => {
    expect(bestUse("portable_gantry")).toBe("maintenance_shop_field_service_portable_temporary_lift");
  });
});

describe("jibCraneTypes", () => {
  it("returns 5 types", () => {
    expect(jibCraneTypes()).toHaveLength(5);
  });
});
