import { describe, it, expect } from "vitest";
import {
  capacity, span, hookHeight, precision,
  coCost, motorized, forHeavyDuty, config,
  bestUse, craneOverheadTypes,
} from "../crane-overhead-calc.js";

describe("capacity", () => {
  it("gantry full portal highest capacity", () => {
    expect(capacity("gantry_full_portal")).toBeGreaterThan(capacity("jib_pillar_mount"));
  });
});

describe("span", () => {
  it("gantry full portal longest span", () => {
    expect(span("gantry_full_portal")).toBeGreaterThan(span("jib_pillar_mount"));
  });
});

describe("hookHeight", () => {
  it("double girder top best hook height", () => {
    expect(hookHeight("double_girder_top")).toBeGreaterThan(hookHeight("jib_pillar_mount"));
  });
});

describe("precision", () => {
  it("jib pillar mount best precision", () => {
    expect(precision("jib_pillar_mount")).toBeGreaterThan(precision("gantry_full_portal"));
  });
});

describe("coCost", () => {
  it("gantry full portal most expensive", () => {
    expect(coCost("gantry_full_portal")).toBeGreaterThan(coCost("jib_pillar_mount"));
  });
});

describe("motorized", () => {
  it("double girder top is motorized", () => {
    expect(motorized("double_girder_top")).toBe(true);
  });
  it("jib pillar mount not motorized", () => {
    expect(motorized("jib_pillar_mount")).toBe(false);
  });
});

describe("forHeavyDuty", () => {
  it("double girder top for heavy duty", () => {
    expect(forHeavyDuty("double_girder_top")).toBe(true);
  });
  it("single girder under not for heavy duty", () => {
    expect(forHeavyDuty("single_girder_under")).toBe(false);
  });
});

describe("config", () => {
  it("gantry uses portal frame", () => {
    expect(config("gantry_full_portal")).toBe("self_supporting_portal_frame_rail_mounted_legs");
  });
});

describe("bestUse", () => {
  it("jib for workstation loading", () => {
    expect(bestUse("jib_pillar_mount")).toBe("workstation_machine_tool_loading_local_lift");
  });
});

describe("craneOverheadTypes", () => {
  it("returns 5 types", () => {
    expect(craneOverheadTypes()).toHaveLength(5);
  });
});
