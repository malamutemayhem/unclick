import { describe, it, expect } from "vitest";
import {
  scalability, latency, security, dataRetention,
  scadaCost, cloudNative, forCritical, protocol,
  bestUse, scadaArchs,
} from "../scada-arch-calc.js";

describe("scalability", () => {
  it("cloud iot scada most scalable", () => {
    expect(scalability("cloud_iot_scada")).toBeGreaterThan(scalability("classic_poll_rtu"));
  });
});

describe("latency", () => {
  it("edge compute scada lowest latency", () => {
    expect(latency("edge_compute_scada")).toBeGreaterThan(latency("cloud_iot_scada"));
  });
});

describe("security", () => {
  it("distributed dcs best security", () => {
    expect(security("distributed_dcs")).toBeGreaterThan(security("cloud_iot_scada"));
  });
});

describe("dataRetention", () => {
  it("historian first best data retention", () => {
    expect(dataRetention("historian_first")).toBeGreaterThan(dataRetention("classic_poll_rtu"));
  });
});

describe("scadaCost", () => {
  it("distributed dcs most expensive", () => {
    expect(scadaCost("distributed_dcs")).toBeGreaterThan(scadaCost("classic_poll_rtu"));
  });
});

describe("cloudNative", () => {
  it("cloud iot scada is cloud native", () => {
    expect(cloudNative("cloud_iot_scada")).toBe(true);
  });
  it("distributed dcs not cloud native", () => {
    expect(cloudNative("distributed_dcs")).toBe(false);
  });
});

describe("forCritical", () => {
  it("distributed dcs is for critical", () => {
    expect(forCritical("distributed_dcs")).toBe(true);
  });
  it("cloud iot scada not for critical", () => {
    expect(forCritical("cloud_iot_scada")).toBe(false);
  });
});

describe("protocol", () => {
  it("edge compute scada uses tsn opcua edge", () => {
    expect(protocol("edge_compute_scada")).toBe("tsn_opcua_edge");
  });
});

describe("bestUse", () => {
  it("historian first best for process analytics ml", () => {
    expect(bestUse("historian_first")).toBe("process_analytics_ml");
  });
});

describe("scadaArchs", () => {
  it("returns 5 types", () => {
    expect(scadaArchs()).toHaveLength(5);
  });
});
