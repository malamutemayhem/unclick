import { describe, it, expect } from "vitest";
import { ipValidate } from "./ipvalidate-tool.js";

describe("ipvalidate-tool", () => {
  it("validates a public IPv4", async () => {
    const r = await ipValidate({ ip: "8.8.8.8" }) as Record<string, unknown>;
    expect(r.valid).toBe(true);
    expect(r.version).toBe(4);
    expect(r.classification).toBe("public");
    expect(r.unclick_meta).toBeDefined();
  });

  it("classifies private IPv4", async () => {
    const r = await ipValidate({ ip: "192.168.1.1" }) as Record<string, unknown>;
    expect(r.valid).toBe(true);
    expect(r.classification).toMatch(/private/);
  });

  it("classifies loopback", async () => {
    const r = await ipValidate({ ip: "127.0.0.1" }) as Record<string, unknown>;
    expect(r.classification).toBe("loopback");
  });

  it("validates IPv6", async () => {
    const r = await ipValidate({ ip: "2001:0db8:85a3:0000:0000:8a2e:0370:7334" }) as Record<string, unknown>;
    expect(r.valid).toBe(true);
    expect(r.version).toBe(6);
  });

  it("rejects invalid IP", async () => {
    const r = await ipValidate({ ip: "999.999.999.999" }) as Record<string, unknown>;
    expect(r.valid).toBe(false);
  });

  it("rejects missing input", async () => {
    const r = await ipValidate({}) as Record<string, unknown>;
    expect(r.error).toMatch(/ip/i);
  });
});
