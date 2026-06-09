import { describe, it, expect } from "vitest";
import { RBAC, allow, allowAll, superAdmin } from "../rbac.js";

describe("RBAC", () => {
  it("creates roles and assigns to users", () => {
    const rbac = new RBAC();
    rbac.addRole("admin", [superAdmin()]);
    rbac.assignRole("user1", "admin");
    expect(rbac.hasRole("user1", "admin")).toBe(true);
    expect(rbac.getUserRoles("user1")).toEqual(["admin"]);
  });

  it("checks permissions", () => {
    const rbac = new RBAC();
    rbac.addRole("editor", [allow("posts", "read"), allow("posts", "write")]);
    rbac.assignRole("user1", "editor");
    expect(rbac.can("user1", "posts", "read")).toBe(true);
    expect(rbac.can("user1", "posts", "write")).toBe(true);
    expect(rbac.can("user1", "posts", "delete")).toBe(false);
  });

  it("cannot checks inverse", () => {
    const rbac = new RBAC();
    rbac.addRole("viewer", [allow("posts", "read")]);
    rbac.assignRole("user1", "viewer");
    expect(rbac.cannot("user1", "posts", "write")).toBe(true);
  });

  it("supports wildcard permissions", () => {
    const rbac = new RBAC();
    rbac.addRole("admin", [superAdmin()]);
    rbac.assignRole("user1", "admin");
    expect(rbac.can("user1", "anything", "anything")).toBe(true);
  });

  it("supports resource wildcard", () => {
    const rbac = new RBAC();
    rbac.addRole("editor", [allowAll("posts")]);
    rbac.assignRole("user1", "editor");
    expect(rbac.can("user1", "posts", "read")).toBe(true);
    expect(rbac.can("user1", "posts", "delete")).toBe(true);
  });

  it("supports role inheritance", () => {
    const rbac = new RBAC();
    rbac.addRole("viewer", [allow("posts", "read")]);
    rbac.addRole("editor", [allow("posts", "write")], ["viewer"]);
    rbac.assignRole("user1", "editor");
    expect(rbac.can("user1", "posts", "read")).toBe(true);
    expect(rbac.can("user1", "posts", "write")).toBe(true);
  });

  it("supports conditional permissions", () => {
    const rbac = new RBAC();
    rbac.addRole("author", [
      allow("posts", "edit", (ctx) => ctx.ownerId === ctx.userId),
    ]);
    rbac.assignRole("user1", "author");
    expect(rbac.can("user1", "posts", "edit", { ownerId: "user1", userId: "user1" })).toBe(true);
    expect(rbac.can("user1", "posts", "edit", { ownerId: "user2", userId: "user1" })).toBe(false);
  });

  it("revokes roles", () => {
    const rbac = new RBAC();
    rbac.addRole("admin", [superAdmin()]);
    rbac.assignRole("user1", "admin");
    rbac.revokeRole("user1", "admin");
    expect(rbac.can("user1", "posts", "read")).toBe(false);
  });

  it("lists roles", () => {
    const rbac = new RBAC();
    rbac.addRole("admin", []);
    rbac.addRole("editor", []);
    expect(rbac.listRoles()).toEqual(["admin", "editor"]);
  });

  it("gets all permissions for user", () => {
    const rbac = new RBAC();
    rbac.addRole("viewer", [allow("posts", "read")]);
    rbac.addRole("editor", [allow("posts", "write")]);
    rbac.assignRole("user1", "viewer");
    rbac.assignRole("user1", "editor");
    const perms = rbac.getAllPermissions("user1");
    expect(perms).toHaveLength(2);
  });

  it("handles missing user gracefully", () => {
    const rbac = new RBAC();
    expect(rbac.can("nobody", "posts", "read")).toBe(false);
    expect(rbac.getUserRoles("nobody")).toEqual([]);
  });

  it("throws on invalid role assignment", () => {
    const rbac = new RBAC();
    expect(() => rbac.assignRole("user1", "nonexistent")).toThrow("not found");
  });

  it("prevents circular inheritance", () => {
    const rbac = new RBAC();
    rbac.addRole("a", [allow("x", "y")], ["b"]);
    rbac.addRole("b", [], ["a"]);
    rbac.assignRole("user1", "a");
    expect(rbac.can("user1", "x", "y")).toBe(true);
  });
});
