import { describe, it, expect } from "vitest";
import {
  throughput, security, simplicity, mobility,
  vpCost, splitTunnel, forRemote, encryption,
  bestUse, vpnTypes,
} from "../vpn-type-calc.js";

describe("throughput", () => {
  it("wireguard highest throughput", () => {
    expect(throughput("wireguard_kernel")).toBeGreaterThan(throughput("openvpn_tls_udp"));
  });
});

describe("security", () => {
  it("ipsec most secure", () => {
    expect(security("ipsec_site_to_site")).toBeGreaterThan(security("mpls_l3vpn_provider"));
  });
});

describe("simplicity", () => {
  it("wireguard simplest", () => {
    expect(simplicity("wireguard_kernel")).toBeGreaterThan(simplicity("mpls_l3vpn_provider"));
  });
});

describe("mobility", () => {
  it("wireguard best mobility", () => {
    expect(mobility("wireguard_kernel")).toBeGreaterThan(mobility("mpls_l3vpn_provider"));
  });
});

describe("vpCost", () => {
  it("mpls most expensive", () => {
    expect(vpCost("mpls_l3vpn_provider")).toBeGreaterThan(vpCost("wireguard_kernel"));
  });
});

describe("splitTunnel", () => {
  it("wireguard supports split tunnel", () => {
    expect(splitTunnel("wireguard_kernel")).toBe(true);
  });
  it("ipsec no split tunnel", () => {
    expect(splitTunnel("ipsec_site_to_site")).toBe(false);
  });
});

describe("forRemote", () => {
  it("wireguard for remote", () => {
    expect(forRemote("wireguard_kernel")).toBe(true);
  });
  it("mpls not for remote", () => {
    expect(forRemote("mpls_l3vpn_provider")).toBe(false);
  });
});

describe("encryption", () => {
  it("wireguard uses chacha20 poly1305", () => {
    expect(encryption("wireguard_kernel")).toBe("chacha20_poly1305_curve25519");
  });
});

describe("bestUse", () => {
  it("sd wan best for hybrid wan failover", () => {
    expect(bestUse("sd_wan_overlay")).toBe("hybrid_wan_internet_mpls_failover");
  });
});

describe("vpnTypes", () => {
  it("returns 5 types", () => {
    expect(vpnTypes()).toHaveLength(5);
  });
});
