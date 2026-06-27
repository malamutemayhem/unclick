import { describe, it, expect } from "vitest";
import {
  speed, pinCount, traceDepth, intrusiveness,
  debugCost, realtime, forProduction, interface_,
  bestUse, jtagDebugs,
} from "../jtag-debug-calc.js";

describe("speed", () => {
  it("trace etm itm fastest speed", () => {
    expect(speed("trace_etm_itm")).toBeGreaterThan(speed("jtag_boundary_scan"));
  });
});

describe("pinCount", () => {
  it("swd arm serial fewest pins", () => {
    expect(pinCount("swd_arm_serial")).toBeGreaterThan(pinCount("jtag_ieee_1149"));
  });
});

describe("traceDepth", () => {
  it("trace etm itm deepest trace", () => {
    expect(traceDepth("trace_etm_itm")).toBeGreaterThan(traceDepth("jtag_boundary_scan"));
  });
});

describe("intrusiveness", () => {
  it("trace etm itm least intrusive", () => {
    expect(intrusiveness("trace_etm_itm")).toBeGreaterThan(intrusiveness("jtag_boundary_scan"));
  });
});

describe("debugCost", () => {
  it("trace etm itm most expensive", () => {
    expect(debugCost("trace_etm_itm")).toBeGreaterThan(debugCost("swd_arm_serial"));
  });
});

describe("realtime", () => {
  it("trace etm itm is realtime", () => {
    expect(realtime("trace_etm_itm")).toBe(true);
  });
  it("jtag ieee 1149 not realtime", () => {
    expect(realtime("jtag_ieee_1149")).toBe(false);
  });
});

describe("forProduction", () => {
  it("jtag ieee 1149 is for production", () => {
    expect(forProduction("jtag_ieee_1149")).toBe(true);
  });
  it("swd arm serial not for production", () => {
    expect(forProduction("swd_arm_serial")).toBe(false);
  });
});

describe("interface_", () => {
  it("trace etm itm uses trace port 4bit", () => {
    expect(interface_("trace_etm_itm")).toBe("trace_port_4bit");
  });
});

describe("bestUse", () => {
  it("trace etm itm best for rtos perf profiling", () => {
    expect(bestUse("trace_etm_itm")).toBe("rtos_perf_profiling");
  });
});

describe("jtagDebugs", () => {
  it("returns 5 types", () => {
    expect(jtagDebugs()).toHaveLength(5);
  });
});
