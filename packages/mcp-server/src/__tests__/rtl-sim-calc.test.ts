import { describe, it, expect } from "vitest";
import {
  speed, accuracy, capacity, debugability,
  simCost, synthesisReq, forSoc, engine,
  bestUse, rtlSims,
} from "../rtl-sim-calc.js";

describe("speed", () => {
  it("prototyping haps fastest", () => {
    expect(speed("prototyping_haps")).toBeGreaterThan(speed("formal_jaspergold"));
  });
});

describe("accuracy", () => {
  it("event driven vcs most accurate", () => {
    expect(accuracy("event_driven_vcs")).toBeGreaterThan(accuracy("prototyping_haps"));
  });
});

describe("capacity", () => {
  it("emulation palladium highest capacity", () => {
    expect(capacity("emulation_palladium")).toBeGreaterThan(capacity("formal_jaspergold"));
  });
});

describe("debugability", () => {
  it("event driven vcs best debugability", () => {
    expect(debugability("event_driven_vcs")).toBeGreaterThan(debugability("prototyping_haps"));
  });
});

describe("simCost", () => {
  it("emulation palladium most expensive", () => {
    expect(simCost("emulation_palladium")).toBeGreaterThan(simCost("cycle_accurate_verilator"));
  });
});

describe("synthesisReq", () => {
  it("emulation palladium requires synthesis", () => {
    expect(synthesisReq("emulation_palladium")).toBe(true);
  });
  it("event driven vcs no synthesis required", () => {
    expect(synthesisReq("event_driven_vcs")).toBe(false);
  });
});

describe("forSoc", () => {
  it("emulation palladium for soc", () => {
    expect(forSoc("emulation_palladium")).toBe(true);
  });
  it("formal jaspergold not for soc", () => {
    expect(forSoc("formal_jaspergold")).toBe(false);
  });
});

describe("engine", () => {
  it("cycle accurate verilator uses cpp model compile", () => {
    expect(engine("cycle_accurate_verilator")).toBe("cpp_model_compile");
  });
});

describe("bestUse", () => {
  it("formal jaspergold best for protocol property proof", () => {
    expect(bestUse("formal_jaspergold")).toBe("protocol_property_proof");
  });
});

describe("rtlSims", () => {
  it("returns 5 types", () => {
    expect(rtlSims()).toHaveLength(5);
  });
});
