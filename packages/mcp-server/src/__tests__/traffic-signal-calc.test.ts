import { describe, it, expect } from "vitest";
import {
  throughputCapacity, installCost, maintenanceComplexity, congestionReduction,
  pedestrianSafety, requiresSensors, networkConnected, controlAlgorithm,
  bestApplication, trafficSignals,
} from "../traffic-signal-calc.js";

describe("throughputCapacity", () => {
  it("adaptive highest throughput", () => {
    expect(throughputCapacity("adaptive")).toBeGreaterThan(throughputCapacity("fixed_time"));
  });
});

describe("installCost", () => {
  it("adaptive most expensive", () => {
    expect(installCost("adaptive")).toBeGreaterThan(installCost("fixed_time"));
  });
});

describe("maintenanceComplexity", () => {
  it("adaptive most complex maintenance", () => {
    expect(maintenanceComplexity("adaptive")).toBeGreaterThan(maintenanceComplexity("fixed_time"));
  });
});

describe("congestionReduction", () => {
  it("adaptive best congestion reduction", () => {
    expect(congestionReduction("adaptive")).toBeGreaterThan(congestionReduction("fixed_time"));
  });
});

describe("pedestrianSafety", () => {
  it("adaptive safest for pedestrians", () => {
    expect(pedestrianSafety("adaptive")).toBeGreaterThan(pedestrianSafety("ramp_metering"));
  });
});

describe("requiresSensors", () => {
  it("actuated requires sensors", () => {
    expect(requiresSensors("actuated")).toBe(true);
  });
  it("fixed time does not", () => {
    expect(requiresSensors("fixed_time")).toBe(false);
  });
});

describe("networkConnected", () => {
  it("adaptive is network connected", () => {
    expect(networkConnected("adaptive")).toBe(true);
  });
  it("actuated is not", () => {
    expect(networkConnected("actuated")).toBe(false);
  });
});

describe("controlAlgorithm", () => {
  it("adaptive uses real time optimization", () => {
    expect(controlAlgorithm("adaptive")).toBe("real_time_optimization");
  });
});

describe("bestApplication", () => {
  it("ramp metering for freeway on ramp", () => {
    expect(bestApplication("ramp_metering")).toBe("freeway_on_ramp");
  });
});

describe("trafficSignals", () => {
  it("returns 5 signals", () => {
    expect(trafficSignals()).toHaveLength(5);
  });
});
