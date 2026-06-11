import { describe, it, expect } from "vitest";
import {
  bandwidth, intrusiveness, setupEase, traceDepth,
  dbgCost, realtime, forProduction, transport,
  bestUse, debugInterfaces,
} from "../debug-interface-calc.js";

describe("bandwidth", () => {
  it("etm core trace highest bandwidth", () => {
    expect(bandwidth("etm_core_trace")).toBeGreaterThan(bandwidth("uart_console"));
  });
});

describe("intrusiveness", () => {
  it("etm core trace least intrusive", () => {
    expect(intrusiveness("etm_core_trace")).toBeGreaterThan(intrusiveness("openocd_gdb"));
  });
});

describe("setupEase", () => {
  it("uart console easiest setup", () => {
    expect(setupEase("uart_console")).toBeGreaterThan(setupEase("etm_core_trace"));
  });
});

describe("traceDepth", () => {
  it("etm core trace deepest trace", () => {
    expect(traceDepth("etm_core_trace")).toBeGreaterThan(traceDepth("uart_console"));
  });
});

describe("dbgCost", () => {
  it("etm core trace most expensive", () => {
    expect(dbgCost("etm_core_trace")).toBeGreaterThan(dbgCost("uart_console"));
  });
});

describe("realtime", () => {
  it("segger rtt is realtime", () => {
    expect(realtime("segger_rtt")).toBe(true);
  });
  it("uart console not realtime", () => {
    expect(realtime("uart_console")).toBe(false);
  });
});

describe("forProduction", () => {
  it("uart console is for production", () => {
    expect(forProduction("uart_console")).toBe(true);
  });
  it("etm core trace not for production", () => {
    expect(forProduction("etm_core_trace")).toBe(false);
  });
});

describe("transport", () => {
  it("segger rtt uses swd memory buffer", () => {
    expect(transport("segger_rtt")).toBe("swd_memory_buffer");
  });
});

describe("bestUse", () => {
  it("etm core trace best for full instruction trace", () => {
    expect(bestUse("etm_core_trace")).toBe("full_instruction_trace");
  });
});

describe("debugInterfaces", () => {
  it("returns 5 types", () => {
    expect(debugInterfaces()).toHaveLength(5);
  });
});
