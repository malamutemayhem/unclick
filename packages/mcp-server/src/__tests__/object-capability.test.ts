import { describe, it, expect } from "vitest";
import { CapabilitySystem } from "../object-capability.js";

describe("CapabilitySystem", () => {
  it("mints capabilities", () => {
    const cs = new CapabilitySystem();
    const id = cs.mint("file:/tmp", ["read", "write"]);
    expect(cs.isValid(id)).toBe(true);
    expect(cs.getPermissions(id)).toContain("read");
    expect(cs.getPermissions(id)).toContain("write");
  });

  it("check verifies permission", () => {
    const cs = new CapabilitySystem();
    const id = cs.mint("db:users", ["read", "write"]);
    expect(cs.check(id, "read")).toBe(true);
    expect(cs.check(id, "delete")).toBe(false);
  });

  it("attenuate creates restricted child", () => {
    const cs = new CapabilitySystem();
    const parent = cs.mint("file:/data", ["read", "write", "exec"]);
    const child = cs.attenuate(parent, ["read"]);
    expect(child).not.toBeNull();
    expect(cs.check(child!, "read")).toBe(true);
    expect(cs.check(child!, "write")).toBe(false);
  });

  it("attenuate rejects escalation", () => {
    const cs = new CapabilitySystem();
    const parent = cs.mint("api:/v1", ["read"]);
    const child = cs.attenuate(parent, ["read", "write"]);
    expect(child).toBeNull();
  });

  it("revoke cascades to children", () => {
    const cs = new CapabilitySystem();
    const parent = cs.mint("net:*", ["connect", "listen"]);
    const child = cs.attenuate(parent, ["connect"]);
    const count = cs.revoke(parent);
    expect(count).toBe(2);
    expect(cs.isValid(parent)).toBe(false);
    expect(cs.isValid(child!)).toBe(false);
  });

  it("child check validates parent chain", () => {
    const cs = new CapabilitySystem();
    const parent = cs.mint("resource", ["read"]);
    const child = cs.attenuate(parent, ["read"]);
    cs.revoke(parent);
    expect(cs.check(child!, "read")).toBe(false);
  });

  it("attenuate on revoked cap returns null", () => {
    const cs = new CapabilitySystem();
    const id = cs.mint("x", ["r"]);
    cs.revoke(id);
    expect(cs.attenuate(id, ["r"])).toBeNull();
  });

  it("getCapability returns details", () => {
    const cs = new CapabilitySystem();
    const id = cs.mint("file:/etc", ["read"]);
    const cap = cs.getCapability(id);
    expect(cap).toBeDefined();
    expect(cap!.resource).toBe("file:/etc");
    expect(cap!.revoked).toBe(false);
  });

  it("children returns child capabilities", () => {
    const cs = new CapabilitySystem();
    const parent = cs.mint("db", ["r", "w"]);
    const c1 = cs.attenuate(parent, ["r"]);
    const c2 = cs.attenuate(parent, ["w"]);
    const kids = cs.children(parent);
    expect(kids).toContain(c1);
    expect(kids).toContain(c2);
  });

  it("totalCount and activeCount", () => {
    const cs = new CapabilitySystem();
    const a = cs.mint("x", ["r"]);
    cs.mint("y", ["w"]);
    cs.revoke(a);
    expect(cs.totalCount).toBe(2);
    expect(cs.activeCount).toBe(1);
  });

  it("getPermissions returns empty for revoked", () => {
    const cs = new CapabilitySystem();
    const id = cs.mint("x", ["r", "w"]);
    cs.revoke(id);
    expect(cs.getPermissions(id)).toEqual([]);
  });

  it("log tracks actions", () => {
    const cs = new CapabilitySystem();
    cs.mint("test", ["r"]);
    expect(cs.getLog().length).toBeGreaterThan(0);
    cs.clearLog();
    expect(cs.getLog()).toHaveLength(0);
  });
});
