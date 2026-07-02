import { describe, it, expect } from "vitest";
import { cidrCalculate } from "./cidr-tool.js";

describe("cidr-tool", () => {
  it("calculates /24 subnet", async () => {
    const r = await cidrCalculate({ cidr: "192.168.1.0/24" }) as Record<string, unknown>;
    expect(r.network_address).toBe("192.168.1.0");
    expect(r.broadcast_address).toBe("192.168.1.255");
    expect(r.subnet_mask).toBe("255.255.255.0");
    expect(r.total_hosts).toBe(256);
    expect(r.usable_hosts).toBe(254);
    expect(r.unclick_meta).toBeDefined();
  });

  it("calculates /16 subnet", async () => {
    const r = await cidrCalculate({ cidr: "10.0.0.0/16" }) as Record<string, unknown>;
    expect(r.network_address).toBe("10.0.0.0");
    expect(r.total_hosts).toBe(65536);
  });

  it("rejects invalid CIDR", async () => {
    const r = await cidrCalculate({ cidr: "abc" }) as Record<string, unknown>;
    expect(r.error).toMatch(/invalid/i);
  });

  it("rejects missing cidr", async () => {
    const r = await cidrCalculate({}) as Record<string, unknown>;
    expect(r.error).toMatch(/cidr/i);
  });
});
