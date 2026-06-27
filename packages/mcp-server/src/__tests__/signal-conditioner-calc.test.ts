import { describe, it, expect } from "vitest";
import {
  accuracy, throughput, isolation, bandwidth,
  scCost, galvanicIsolation, forFieldBus, conditionerConfig,
  bestUse, signalConditionerTypes,
} from "../signal-conditioner-calc.js";

describe("accuracy", () => {
  it("bridge conditioner best accuracy", () => {
    expect(accuracy("bridge_conditioner")).toBeGreaterThan(accuracy("filter_conditioner"));
  });
});

describe("throughput", () => {
  it("charge amplifier highest throughput", () => {
    expect(throughput("charge_amplifier")).toBeGreaterThan(throughput("bridge_conditioner"));
  });
});

describe("isolation", () => {
  it("isolation amplifier best isolation", () => {
    expect(isolation("isolation_amplifier")).toBeGreaterThan(isolation("filter_conditioner"));
  });
});

describe("bandwidth", () => {
  it("charge amplifier best bandwidth", () => {
    expect(bandwidth("charge_amplifier")).toBeGreaterThan(bandwidth("bridge_conditioner"));
  });
});

describe("scCost", () => {
  it("charge amplifier most expensive", () => {
    expect(scCost("charge_amplifier")).toBeGreaterThan(scCost("filter_conditioner"));
  });
});

describe("galvanicIsolation", () => {
  it("isolation amplifier has galvanic isolation", () => {
    expect(galvanicIsolation("isolation_amplifier")).toBe(true);
  });
  it("filter conditioner no galvanic isolation", () => {
    expect(galvanicIsolation("filter_conditioner")).toBe(false);
  });
});

describe("forFieldBus", () => {
  it("isolation amplifier for field bus", () => {
    expect(forFieldBus("isolation_amplifier")).toBe(true);
  });
  it("charge amplifier not for field bus", () => {
    expect(forFieldBus("charge_amplifier")).toBe(false);
  });
});

describe("conditionerConfig", () => {
  it("charge amplifier uses piezo high impedance convert voltage fast dynamic", () => {
    expect(conditionerConfig("charge_amplifier")).toBe("charge_amplifier_piezo_high_impedance_convert_voltage_fast_dynamic");
  });
});

describe("bestUse", () => {
  it("bridge conditioner for strain gauge excitation amplify balance precise", () => {
    expect(bestUse("bridge_conditioner")).toBe("strain_gauge_bridge_conditioner_excitation_amplify_balance_precise");
  });
});

describe("signalConditionerTypes", () => {
  it("returns 5 types", () => {
    expect(signalConditionerTypes()).toHaveLength(5);
  });
});
