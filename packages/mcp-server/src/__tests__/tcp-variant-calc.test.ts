import { describe, it, expect } from "vitest";
import {
  throughput, fairness, latency, lossRecovery,
  tcCost, ecnAware, forWan, algorithm,
  bestUse, tcpVariants,
} from "../tcp-variant-calc.js";

describe("throughput", () => {
  it("bbr highest throughput", () => {
    expect(throughput("bbr_model_based")).toBeGreaterThan(throughput("reno_classic_aimd"));
  });
});

describe("fairness", () => {
  it("dctcp best fairness", () => {
    expect(fairness("dctcp_ecn_datacenter")).toBeGreaterThan(fairness("bbr_model_based"));
  });
});

describe("latency", () => {
  it("bbr lowest latency", () => {
    expect(latency("bbr_model_based")).toBeGreaterThan(latency("reno_classic_aimd"));
  });
});

describe("lossRecovery", () => {
  it("bbr best loss recovery", () => {
    expect(lossRecovery("bbr_model_based")).toBeGreaterThan(lossRecovery("reno_classic_aimd"));
  });
});

describe("tcCost", () => {
  it("bbr most expensive", () => {
    expect(tcCost("bbr_model_based")).toBeGreaterThan(tcCost("reno_classic_aimd"));
  });
});

describe("ecnAware", () => {
  it("dctcp is ecn aware", () => {
    expect(ecnAware("dctcp_ecn_datacenter")).toBe(true);
  });
  it("cubic not ecn aware", () => {
    expect(ecnAware("cubic_linux_default")).toBe(false);
  });
});

describe("forWan", () => {
  it("bbr for wan", () => {
    expect(forWan("bbr_model_based")).toBe(true);
  });
  it("dctcp not for wan", () => {
    expect(forWan("dctcp_ecn_datacenter")).toBe(false);
  });
});

describe("algorithm", () => {
  it("bbr uses bottleneck bandwidth rtt probe", () => {
    expect(algorithm("bbr_model_based")).toBe("bottleneck_bandwidth_rtt_probe");
  });
});

describe("bestUse", () => {
  it("dctcp best for datacenter east west", () => {
    expect(bestUse("dctcp_ecn_datacenter")).toBe("datacenter_east_west_traffic");
  });
});

describe("tcpVariants", () => {
  it("returns 5 types", () => {
    expect(tcpVariants()).toHaveLength(5);
  });
});
