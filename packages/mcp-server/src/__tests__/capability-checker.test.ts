import { describe, it, expect } from "vitest";
import { createCapabilitySet, grant, revoke, hasCapability, hasAll, hasAny, merge, intersect, listCapabilities } from "../capability-checker.js";

describe("createCapabilitySet", () => {
  it("creates with initial caps", () => {
    const s = createCapabilitySet("read", "write");
    expect(hasCapability(s, "read")).toBe(true);
    expect(hasCapability(s, "delete")).toBe(false);
  });
});

describe("grant/revoke", () => {
  it("grants new caps", () => {
    const s = grant(createCapabilitySet("read"), "write");
    expect(hasCapability(s, "write")).toBe(true);
  });

  it("revokes caps", () => {
    const s = revoke(createCapabilitySet("read", "write"), "write");
    expect(hasCapability(s, "write")).toBe(false);
  });
});

describe("wildcard matching", () => {
  it("matches global wildcard", () => {
    const s = createCapabilitySet("*");
    expect(hasCapability(s, "anything")).toBe(true);
  });

  it("matches hierarchical wildcard", () => {
    const s = createCapabilitySet("files.*");
    expect(hasCapability(s, "files.read")).toBe(true);
    expect(hasCapability(s, "files.write")).toBe(true);
    expect(hasCapability(s, "users.read")).toBe(false);
  });
});

describe("hasAll/hasAny", () => {
  it("hasAll checks all", () => {
    const s = createCapabilitySet("a", "b", "c");
    expect(hasAll(s, ["a", "b"])).toBe(true);
    expect(hasAll(s, ["a", "d"])).toBe(false);
  });

  it("hasAny checks any", () => {
    const s = createCapabilitySet("a");
    expect(hasAny(s, ["a", "b"])).toBe(true);
    expect(hasAny(s, ["x", "y"])).toBe(false);
  });
});

describe("merge/intersect", () => {
  it("merges sets", () => {
    const a = createCapabilitySet("read");
    const b = createCapabilitySet("write");
    const m = merge(a, b);
    expect(hasAll(m, ["read", "write"])).toBe(true);
  });

  it("intersects sets", () => {
    const a = createCapabilitySet("read", "write");
    const b = createCapabilitySet("write", "delete");
    const i = intersect(a, b);
    expect(listCapabilities(i)).toEqual(["write"]);
  });
});
