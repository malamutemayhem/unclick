import { describe, it, expect } from "vitest";
import { RBAC } from "../permission-model.js";

describe("RBAC", () => {
  it("adds roles and assigns to users", () => {
    const rbac = new RBAC();
    rbac.addRole("admin", ["*:*"]);
    expect(rbac.assignRole("alice", "admin")).toBe(true);
    expect(rbac.getUserRoles("alice")).toEqual(["admin"]);
  });

  it("rejects assigning nonexistent role", () => {
    const rbac = new RBAC();
    expect(rbac.assignRole("alice", "missing")).toBe(false);
  });

  it("checks permissions through roles", () => {
    const rbac = new RBAC();
    rbac.addRole("editor", ["/posts:read", "/posts:update", "/posts:create"]);
    rbac.assignRole("bob", "editor");
    expect(rbac.check("bob", "read", "/posts")).toBe(true);
    expect(rbac.check("bob", "delete", "/posts")).toBe(false);
  });

  it("supports wildcard permissions", () => {
    const rbac = new RBAC();
    rbac.addRole("admin", ["*:*"]);
    rbac.assignRole("alice", "admin");
    expect(rbac.check("alice", "delete", "/anything")).toBe(true);
  });

  it("supports resource wildcard", () => {
    const rbac = new RBAC();
    rbac.addRole("viewer", ["/files:*"]);
    rbac.assignRole("bob", "viewer");
    expect(rbac.check("bob", "read", "/files")).toBe(true);
    expect(rbac.check("bob", "delete", "/files")).toBe(true);
  });

  it("inherits permissions from parent roles", () => {
    const rbac = new RBAC();
    rbac.addRole("viewer", ["/docs:read"]);
    rbac.addRole("editor", ["/docs:update"], ["viewer"]);
    rbac.assignRole("charlie", "editor");
    expect(rbac.check("charlie", "read", "/docs")).toBe(true);
    expect(rbac.check("charlie", "update", "/docs")).toBe(true);
  });

  it("resolves deep role inheritance", () => {
    const rbac = new RBAC();
    rbac.addRole("base", ["/sys:read"]);
    rbac.addRole("mid", [], ["base"]);
    rbac.addRole("top", [], ["mid"]);
    const perms = rbac.resolvePermissions("top");
    expect(perms.has("/sys:read")).toBe(true);
  });

  it("deny policy overrides allow", () => {
    const rbac = new RBAC();
    rbac.addRole("admin", ["*:*"]);
    rbac.assignRole("alice", "admin");
    rbac.addPolicy("deny", ["delete"], "/critical");
    expect(rbac.check("alice", "delete", "/critical")).toBe(false);
  });

  it("allow policy grants access", () => {
    const rbac = new RBAC();
    rbac.addPolicy("allow", ["read"], "/public");
    expect(rbac.check("anyone", "read", "/public")).toBe(true);
  });

  it("conditional policies", () => {
    const rbac = new RBAC();
    rbac.addPolicy("allow", ["read"], "*", (ctx) => ctx.hour as number >= 9 && (ctx.hour as number) <= 17);
    expect(rbac.check("user", "read", "/data", { hour: 12 })).toBe(true);
    expect(rbac.check("user", "read", "/data", { hour: 22 })).toBe(false);
  });

  it("revokes roles", () => {
    const rbac = new RBAC();
    rbac.addRole("editor", ["/docs:update"]);
    rbac.assignRole("bob", "editor");
    rbac.revokeRole("bob", "editor");
    expect(rbac.getUserRoles("bob")).toEqual([]);
  });

  it("counts roles and policies", () => {
    const rbac = new RBAC();
    rbac.addRole("a");
    rbac.addRole("b");
    rbac.addPolicy("allow", ["read"], "/x");
    expect(rbac.roleCount()).toBe(2);
    expect(rbac.policyCount()).toBe(1);
  });
});
