import { describe, it, expect } from "vitest";
import {
  flowCapacity, tightShutoff, abrasionResist, operatingTorque,
  pvCost, multiport, forDiverting, plug,
  bestUse, plugValveControlTypes,
} from "../plug-valve-control-calc.js";

describe("flowCapacity", () => {
  it("lubricated plug highest flow", () => {
    expect(flowCapacity("lubricated_plug_std")).toBeGreaterThan(flowCapacity("lined_plug_corrosive"));
  });
});

describe("tightShutoff", () => {
  it("non lubricated ptfe tightest shutoff", () => {
    expect(tightShutoff("non_lubricated_ptfe")).toBeGreaterThan(tightShutoff("multiport_plug_divert"));
  });
});

describe("abrasionResist", () => {
  it("lubricated plug best abrasion resist", () => {
    expect(abrasionResist("lubricated_plug_std")).toBeGreaterThan(abrasionResist("lined_plug_corrosive"));
  });
});

describe("operatingTorque", () => {
  it("eccentric plug lowest torque", () => {
    expect(operatingTorque("eccentric_plug_rotary")).toBeGreaterThan(operatingTorque("multiport_plug_divert"));
  });
});

describe("pvCost", () => {
  it("multiport most expensive", () => {
    expect(pvCost("multiport_plug_divert")).toBeGreaterThan(pvCost("lubricated_plug_std"));
  });
});

describe("multiport", () => {
  it("multiport plug is multiport", () => {
    expect(multiport("multiport_plug_divert")).toBe(true);
  });
  it("lubricated plug not multiport", () => {
    expect(multiport("lubricated_plug_std")).toBe(false);
  });
});

describe("forDiverting", () => {
  it("multiport for diverting", () => {
    expect(forDiverting("multiport_plug_divert")).toBe(true);
  });
  it("eccentric not for diverting", () => {
    expect(forDiverting("eccentric_plug_rotary")).toBe(false);
  });
});

describe("plug", () => {
  it("lined plug uses pfa lining", () => {
    expect(plug("lined_plug_corrosive")).toBe("pfa_or_pp_lined_plug_body_corrosion_barrier");
  });
});

describe("bestUse", () => {
  it("eccentric for process control", () => {
    expect(bestUse("eccentric_plug_rotary")).toBe("process_control_modulating_throttling_service");
  });
});

describe("plugValveControlTypes", () => {
  it("returns 5 types", () => {
    expect(plugValveControlTypes()).toHaveLength(5);
  });
});
