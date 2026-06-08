import { describe, it, expect } from "vitest";
import { PermissionChecker } from "../permission-checker.js";

describe("PermissionChecker", () => {
  function makeChecker() {
    const pc = new PermissionChecker();
    pc.addRole({ name: "viewer", permissions: ["read"] });
    pc.addRole({ name: "editor", permissions: ["write"], inherits: ["viewer"] });
    pc.addRole({ name: "admin", permissions: ["*"] });
    return pc;
  }

  it("checks direct permission", () => {
    const pc = makeChecker();
    pc.assign("u1", "viewer");
    expect(pc.hasPermission("u1", "read")).toBe(true);
    expect(pc.hasPermission("u1", "write")).toBe(false);
  });

  it("checks inherited permission", () => {
    const pc = makeChecker();
    pc.assign("u1", "editor");
    expect(pc.hasPermission("u1", "read")).toBe(true);
    expect(pc.hasPermission("u1", "write")).toBe(true);
  });

  it("wildcard grants all permissions", () => {
    const pc = makeChecker();
    pc.assign("u1", "admin");
    expect(pc.hasPermission("u1", "anything")).toBe(true);
  });

  it("returns false for unassigned user", () => {
    const pc = makeChecker();
    expect(pc.hasPermission("nobody", "read")).toBe(false);
  });

  it("getPermissions aggregates all", () => {
    const pc = makeChecker();
    pc.assign("u1", "editor");
    const perms = pc.getPermissions("u1");
    expect(perms).toContain("read");
    expect(perms).toContain("write");
  });

  it("assign and revoke", () => {
    const pc = makeChecker();
    pc.assign("u1", "viewer");
    expect(pc.hasRole("u1", "viewer")).toBe(true);
    pc.revoke("u1", "viewer");
    expect(pc.hasRole("u1", "viewer")).toBe(false);
  });

  it("getRoles returns user roles", () => {
    const pc = makeChecker();
    pc.assign("u1", "viewer");
    pc.assign("u1", "editor");
    expect(pc.getRoles("u1").sort()).toEqual(["editor", "viewer"]);
  });

  it("removeRole deletes role definition", () => {
    const pc = makeChecker();
    expect(pc.removeRole("viewer")).toBe(true);
    pc.assign("u1", "viewer");
    expect(pc.hasPermission("u1", "read")).toBe(false);
  });

  it("handles circular inheritance safely", () => {
    const pc = new PermissionChecker();
    pc.addRole({ name: "a", permissions: ["x"], inherits: ["b"] });
    pc.addRole({ name: "b", permissions: ["y"], inherits: ["a"] });
    pc.assign("u1", "a");
    expect(pc.hasPermission("u1", "x")).toBe(true);
    expect(pc.hasPermission("u1", "y")).toBe(true);
  });
});
