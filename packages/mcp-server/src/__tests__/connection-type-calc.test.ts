import { describe, it, expect } from "vitest";
import {
  strength, stiffness, ductility, installEase,
  cnCost, moment, forSeismic, method,
  bestUse, connectionTypeTypes,
} from "../connection-type-calc.js";

describe("strength", () => {
  it("cjp weld strongest", () => {
    expect(strength("welded_complete_joint_cjp")).toBeGreaterThan(strength("pin_clevis_hinge"));
  });
});

describe("stiffness", () => {
  it("cjp weld stiffest", () => {
    expect(stiffness("welded_complete_joint_cjp")).toBeGreaterThan(stiffness("pin_clevis_hinge"));
  });
});

describe("ductility", () => {
  it("pin most ductile", () => {
    expect(ductility("pin_clevis_hinge")).toBeGreaterThan(ductility("bolted_slip_critical"));
  });
});

describe("installEase", () => {
  it("bearing bolt easiest install", () => {
    expect(installEase("bolted_bearing_snug")).toBeGreaterThan(installEase("welded_complete_joint_cjp"));
  });
});

describe("cnCost", () => {
  it("cjp weld most expensive", () => {
    expect(cnCost("welded_complete_joint_cjp")).toBeGreaterThan(cnCost("bolted_bearing_snug"));
  });
});

describe("moment", () => {
  it("cjp weld is moment connection", () => {
    expect(moment("welded_complete_joint_cjp")).toBe(true);
  });
  it("bearing bolt not moment", () => {
    expect(moment("bolted_bearing_snug")).toBe(false);
  });
});

describe("forSeismic", () => {
  it("slip critical for seismic", () => {
    expect(forSeismic("bolted_slip_critical")).toBe(true);
  });
  it("bearing bolt not for seismic", () => {
    expect(forSeismic("bolted_bearing_snug")).toBe(false);
  });
});

describe("method", () => {
  it("pin uses clevis plate", () => {
    expect(method("pin_clevis_hinge")).toBe("pin_through_clevis_plate");
  });
});

describe("bestUse", () => {
  it("fillet weld for gusset plate", () => {
    expect(bestUse("welded_fillet_lap")).toBe("gusset_plate_brace_connection");
  });
});

describe("connectionTypeTypes", () => {
  it("returns 5 types", () => {
    expect(connectionTypeTypes()).toHaveLength(5);
  });
});
