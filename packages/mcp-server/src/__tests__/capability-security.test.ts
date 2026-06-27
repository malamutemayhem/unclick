import { describe, it, expect } from "vitest";
import { CapabilitySystem } from "../capability-security.js";

describe("CapabilitySystem", () => {
  it("grants capabilities", () => {
    const sys = new CapabilitySystem();
    const cap = sys.grant("alice", "/files", ["read", "write"]);
    expect(cap).toBeDefined();
    expect(sys.totalCapabilities()).toBe(1);
  });

  it("checks permissions", () => {
    const sys = new CapabilitySystem();
    const cap = sys.grant("alice", "/files", ["read", "write"]);
    expect(sys.check(cap, "/files", "read")).toBe(true);
    expect(sys.check(cap, "/files", "delete")).toBe(false);
  });

  it("checks resource matching", () => {
    const sys = new CapabilitySystem();
    const cap = sys.grant("alice", "/files", ["read"]);
    expect(sys.check(cap, "/other", "read")).toBe(false);
  });

  it("attenuates capabilities", () => {
    const sys = new CapabilitySystem();
    const parent = sys.grant("alice", "/files", ["read", "write", "delete"]);
    const child = sys.attenuate(parent, "bob", ["read"]);
    expect(child).not.toBeNull();
    expect(sys.check(child!, "/files", "read")).toBe(true);
    expect(sys.check(child!, "/files", "write")).toBe(false);
  });

  it("rejects invalid attenuation", () => {
    const sys = new CapabilitySystem();
    const parent = sys.grant("alice", "/files", ["read"]);
    const child = sys.attenuate(parent, "bob", ["read", "write"]);
    expect(child).toBeNull();
  });

  it("revokes capabilities", () => {
    const sys = new CapabilitySystem();
    const cap = sys.grant("alice", "/files", ["read"]);
    expect(sys.revoke(cap, "admin")).toBe(true);
    expect(sys.isRevoked(cap)).toBe(true);
    expect(sys.check(cap, "/files", "read")).toBe(false);
  });

  it("cascades revocation to descendants", () => {
    const sys = new CapabilitySystem();
    const parent = sys.grant("alice", "/files", ["read", "write"]);
    const child = sys.attenuate(parent, "bob", ["read"])!;
    sys.revoke(parent, "admin");
    expect(sys.isRevoked(child)).toBe(true);
  });

  it("lists capabilities by owner", () => {
    const sys = new CapabilitySystem();
    sys.grant("alice", "/files", ["read"]);
    sys.grant("alice", "/db", ["query"]);
    sys.grant("bob", "/files", ["read"]);
    expect(sys.listCapabilities("alice").length).toBe(2);
  });

  it("returns permissions for capability", () => {
    const sys = new CapabilitySystem();
    const cap = sys.grant("alice", "/files", ["read", "write"]);
    const perms = sys.permissionsFor(cap);
    expect(perms.sort()).toEqual(["read", "write"]);
  });

  it("tracks revocation history", () => {
    const sys = new CapabilitySystem();
    const cap = sys.grant("alice", "/files", ["read"]);
    sys.revoke(cap, "admin");
    const history = sys.revocationHistory();
    expect(history.length).toBe(1);
    expect(history[0].revokedBy).toBe("admin");
  });

  it("counts active capabilities", () => {
    const sys = new CapabilitySystem();
    const cap1 = sys.grant("alice", "/a", ["read"]);
    sys.grant("bob", "/b", ["read"]);
    sys.revoke(cap1, "admin");
    expect(sys.activeCapabilities()).toBe(1);
    expect(sys.totalCapabilities()).toBe(2);
  });
});
