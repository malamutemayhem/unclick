import { describe, it, expect } from "vitest";
import {
  coverage, speed, bugFind, reuse,
  vmCost, exhaustive, forIp, framework,
  bestUse, verificationMethods,
} from "../verification-method-calc.js";

describe("coverage", () => {
  it("formal assertion highest coverage", () => {
    expect(coverage("formal_assertion")).toBeGreaterThan(coverage("emulation_in_circuit"));
  });
});

describe("speed", () => {
  it("emulation in circuit fastest", () => {
    expect(speed("emulation_in_circuit")).toBeGreaterThan(speed("formal_assertion"));
  });
});

describe("bugFind", () => {
  it("formal assertion best bug finding", () => {
    expect(bugFind("formal_assertion")).toBeGreaterThan(bugFind("emulation_in_circuit"));
  });
});

describe("reuse", () => {
  it("portable stimulus pss most reusable", () => {
    expect(reuse("portable_stimulus_pss")).toBeGreaterThan(reuse("emulation_in_circuit"));
  });
});

describe("vmCost", () => {
  it("emulation in circuit most expensive", () => {
    expect(vmCost("emulation_in_circuit")).toBeGreaterThan(vmCost("coverage_directed"));
  });
});

describe("exhaustive", () => {
  it("formal assertion is exhaustive", () => {
    expect(exhaustive("formal_assertion")).toBe(true);
  });
  it("uvm constrained random not exhaustive", () => {
    expect(exhaustive("uvm_constrained_random")).toBe(false);
  });
});

describe("forIp", () => {
  it("uvm constrained random for ip", () => {
    expect(forIp("uvm_constrained_random")).toBe(true);
  });
  it("emulation in circuit not for ip", () => {
    expect(forIp("emulation_in_circuit")).toBe(false);
  });
});

describe("framework", () => {
  it("portable stimulus pss uses accellera pss graph", () => {
    expect(framework("portable_stimulus_pss")).toBe("accellera_pss_graph");
  });
});

describe("bestUse", () => {
  it("formal assertion best for protocol deadlock proof", () => {
    expect(bestUse("formal_assertion")).toBe("protocol_deadlock_proof");
  });
});

describe("verificationMethods", () => {
  it("returns 5 types", () => {
    expect(verificationMethods()).toHaveLength(5);
  });
});
