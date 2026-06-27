import { describe, it, expect } from "vitest";
import { ACL, RBAC } from "../access-control.js";

describe("ACL", () => {
  it("grant and check", () => {
    const acl = new ACL();
    acl.grant("alice", "file1", "read", "write");
    expect(acl.check("alice", "file1", "read")).toBe(true);
    expect(acl.check("alice", "file1", "write")).toBe(true);
    expect(acl.check("alice", "file1", "delete")).toBe(false);
  });

  it("revoke removes permission", () => {
    const acl = new ACL();
    acl.grant("bob", "doc", "read", "write");
    acl.revoke("bob", "doc", "write");
    expect(acl.check("bob", "doc", "read")).toBe(true);
    expect(acl.check("bob", "doc", "write")).toBe(false);
  });

  it("check returns false for unknown subject", () => {
    const acl = new ACL();
    expect(acl.check("unknown", "file", "read")).toBe(false);
  });

  it("getPermissions returns granted permissions", () => {
    const acl = new ACL();
    acl.grant("alice", "file1", "read", "execute");
    const perms = acl.getPermissions("alice", "file1");
    expect(perms).toContain("read");
    expect(perms).toContain("execute");
    expect(perms).toHaveLength(2);
  });

  it("getSubjects returns subjects with access", () => {
    const acl = new ACL();
    acl.grant("alice", "file1", "read");
    acl.grant("bob", "file1", "write");
    const subjects = acl.getSubjects("file1");
    expect(subjects).toContain("alice");
    expect(subjects).toContain("bob");
  });

  it("getPermissions returns empty for unknown", () => {
    const acl = new ACL();
    expect(acl.getPermissions("nobody", "nothing")).toEqual([]);
  });
});

describe("RBAC", () => {
  it("role-based access check", () => {
    const rbac = new RBAC();
    rbac.addRole("editor");
    rbac.grantToRole("editor", "docs", "read", "write");
    rbac.assignRole("alice", "editor");
    expect(rbac.check("alice", "docs", "read")).toBe(true);
    expect(rbac.check("alice", "docs", "delete")).toBe(false);
  });

  it("role hierarchy", () => {
    const rbac = new RBAC();
    rbac.addRole("viewer");
    rbac.grantToRole("viewer", "files", "read");
    rbac.addRole("editor", "viewer");
    rbac.grantToRole("editor", "files", "write");
    rbac.assignRole("bob", "editor");
    expect(rbac.check("bob", "files", "read")).toBe(true);
    expect(rbac.check("bob", "files", "write")).toBe(true);
  });

  it("removeRole revokes access", () => {
    const rbac = new RBAC();
    rbac.addRole("admin");
    rbac.grantToRole("admin", "system", "admin");
    rbac.assignRole("charlie", "admin");
    expect(rbac.check("charlie", "system", "admin")).toBe(true);
    rbac.removeRole("charlie", "admin");
    expect(rbac.check("charlie", "system", "admin")).toBe(false);
  });

  it("getUserRoles returns assigned roles", () => {
    const rbac = new RBAC();
    rbac.addRole("r1");
    rbac.addRole("r2");
    rbac.assignRole("user1", "r1");
    rbac.assignRole("user1", "r2");
    expect(rbac.getUserRoles("user1")).toHaveLength(2);
  });

  it("check returns false for no roles", () => {
    const rbac = new RBAC();
    expect(rbac.check("nobody", "res", "read")).toBe(false);
  });

  it("getRolePermissions", () => {
    const rbac = new RBAC();
    rbac.addRole("viewer");
    rbac.grantToRole("viewer", "data", "read");
    expect(rbac.getRolePermissions("viewer", "data")).toContain("read");
    expect(rbac.getRolePermissions("viewer", "other")).toEqual([]);
  });
});
