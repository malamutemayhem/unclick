import { describe, it, expect } from "vitest";
import {
  overhead, reliability, latency, security,
  complexity, confirmable, forConstrained, transport,
  bestUse, coapConfigs,
} from "../coap-config-calc.js";

describe("overhead", () => {
  it("coap core udp lowest overhead", () => {
    expect(overhead("coap_core_udp")).toBeGreaterThan(overhead("coap_dtls_secure"));
  });
});

describe("reliability", () => {
  it("coap block transfer most reliable", () => {
    expect(reliability("coap_block_transfer")).toBeGreaterThan(reliability("coap_group_multicast"));
  });
});

describe("latency", () => {
  it("coap group multicast best latency", () => {
    expect(latency("coap_group_multicast")).toBeGreaterThan(latency("coap_dtls_secure"));
  });
});

describe("security", () => {
  it("coap dtls secure best security", () => {
    expect(security("coap_dtls_secure")).toBeGreaterThan(security("coap_core_udp"));
  });
});

describe("complexity", () => {
  it("coap dtls secure most complex", () => {
    expect(complexity("coap_dtls_secure")).toBeGreaterThan(complexity("coap_core_udp"));
  });
});

describe("confirmable", () => {
  it("coap core udp is confirmable", () => {
    expect(confirmable("coap_core_udp")).toBe(true);
  });
  it("coap group multicast not confirmable", () => {
    expect(confirmable("coap_group_multicast")).toBe(false);
  });
});

describe("forConstrained", () => {
  it("coap core udp is for constrained", () => {
    expect(forConstrained("coap_core_udp")).toBe(true);
  });
  it("coap dtls secure not for constrained", () => {
    expect(forConstrained("coap_dtls_secure")).toBe(false);
  });
});

describe("transport", () => {
  it("coap core udp uses udp simple req res", () => {
    expect(transport("coap_core_udp")).toBe("udp_simple_req_res");
  });
});

describe("bestUse", () => {
  it("coap dtls secure best for secure lwm2m bootstrap", () => {
    expect(bestUse("coap_dtls_secure")).toBe("secure_lwm2m_bootstrap");
  });
});

describe("coapConfigs", () => {
  it("returns 5 types", () => {
    expect(coapConfigs()).toHaveLength(5);
  });
});
