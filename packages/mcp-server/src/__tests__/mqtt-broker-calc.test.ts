import { describe, it, expect } from "vitest";
import {
  throughput, clientCapacity, reliability, clustering,
  brokerCost, managed, forEdge, protocol,
  bestUse, mqttBrokers,
} from "../mqtt-broker-calc.js";

describe("throughput", () => {
  it("emqx enterprise highest throughput", () => {
    expect(throughput("emqx_enterprise")).toBeGreaterThan(throughput("mosquitto_light"));
  });
});

describe("clientCapacity", () => {
  it("emqx enterprise most clients", () => {
    expect(clientCapacity("emqx_enterprise")).toBeGreaterThan(clientCapacity("nanomq_edge"));
  });
});

describe("reliability", () => {
  it("emqx enterprise most reliable", () => {
    expect(reliability("emqx_enterprise")).toBeGreaterThan(reliability("nanomq_edge"));
  });
});

describe("clustering", () => {
  it("emqx enterprise best clustering", () => {
    expect(clustering("emqx_enterprise")).toBeGreaterThan(clustering("mosquitto_light"));
  });
});

describe("brokerCost", () => {
  it("emqx enterprise most expensive", () => {
    expect(brokerCost("emqx_enterprise")).toBeGreaterThan(brokerCost("mosquitto_light"));
  });
});

describe("managed", () => {
  it("hivemq cloud is managed", () => {
    expect(managed("hivemq_cloud")).toBe(true);
  });
  it("mosquitto light not managed", () => {
    expect(managed("mosquitto_light")).toBe(false);
  });
});

describe("forEdge", () => {
  it("nanomq edge is for edge", () => {
    expect(forEdge("nanomq_edge")).toBe(true);
  });
  it("emqx enterprise not for edge", () => {
    expect(forEdge("emqx_enterprise")).toBe(false);
  });
});

describe("protocol", () => {
  it("mosquitto light uses mqtt 3 1 1 core", () => {
    expect(protocol("mosquitto_light")).toBe("mqtt_3_1_1_core");
  });
});

describe("bestUse", () => {
  it("emqx enterprise best for million device platform", () => {
    expect(bestUse("emqx_enterprise")).toBe("million_device_platform");
  });
});

describe("mqttBrokers", () => {
  it("returns 5 types", () => {
    expect(mqttBrokers()).toHaveLength(5);
  });
});
