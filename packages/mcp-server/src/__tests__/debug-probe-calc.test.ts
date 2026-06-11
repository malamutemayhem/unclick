import { describe, it, expect } from "vitest";
import {
  bandwidth, intrusiveness, multicore, traceDepth,
  dbCost, realtime, forProduction, interface_,
  bestUse, debugProbes,
} from "../debug-probe-calc.js";

describe("bandwidth", () => {
  it("trace etm highest bandwidth", () => {
    expect(bandwidth("trace_etm_streaming")).toBeGreaterThan(bandwidth("uart_printf_debug"));
  });
});

describe("intrusiveness", () => {
  it("trace etm least intrusive", () => {
    expect(intrusiveness("trace_etm_streaming")).toBeGreaterThan(intrusiveness("uart_printf_debug"));
  });
});

describe("multicore", () => {
  it("trace etm best multicore", () => {
    expect(multicore("trace_etm_streaming")).toBeGreaterThan(multicore("uart_printf_debug"));
  });
});

describe("traceDepth", () => {
  it("trace etm deepest trace", () => {
    expect(traceDepth("trace_etm_streaming")).toBeGreaterThan(traceDepth("uart_printf_debug"));
  });
});

describe("dbCost", () => {
  it("trace etm most expensive", () => {
    expect(dbCost("trace_etm_streaming")).toBeGreaterThan(dbCost("uart_printf_debug"));
  });
});

describe("realtime", () => {
  it("trace etm is realtime", () => {
    expect(realtime("trace_etm_streaming")).toBe(true);
  });
  it("swd not realtime", () => {
    expect(realtime("swd_arm_serial_wire")).toBe(false);
  });
});

describe("forProduction", () => {
  it("jtag boundary scan for production", () => {
    expect(forProduction("jtag_boundary_scan")).toBe(true);
  });
  it("uart printf not for production", () => {
    expect(forProduction("uart_printf_debug")).toBe(false);
  });
});

describe("interface_", () => {
  it("swd uses swdio swclk 2wire", () => {
    expect(interface_("swd_arm_serial_wire")).toBe("swdio_swclk_2wire");
  });
});

describe("bestUse", () => {
  it("trace etm best for real time code coverage", () => {
    expect(bestUse("trace_etm_streaming")).toBe("real_time_code_coverage_profile");
  });
});

describe("debugProbes", () => {
  it("returns 5 types", () => {
    expect(debugProbes()).toHaveLength(5);
  });
});
