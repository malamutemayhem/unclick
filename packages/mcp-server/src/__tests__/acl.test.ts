import { describe, it, expect } from "vitest";
import { AccessControlList } from "../acl.js";

describe("AccessControlList", () => {
  it("grants and checks permissions", () => {
    const acl = new AccessControlList();
    acl.grant("alice", "read", "write");
    expect(acl.check("alice", "read")).toBe(true);
    expect(acl.check("alice", "delete")).toBe(false);
  });

  it("admin implies all permissions", () => {
    const acl = new AccessControlList();
    acl.grant("superuser", "admin");
    expect(acl.check("superuser", "read")).toBe(true);
    expect(acl.check("superuser", "write")).toBe(true);
    expect(acl.check("superuser", "delete")).toBe(true);
  });

  it("revokes permissions", () => {
    const acl = new AccessControlList();
    acl.grant("bob", "read", "write");
    acl.revoke("bob", "write");
    expect(acl.check("bob", "write")).toBe(false);
    expect(acl.check("bob", "read")).toBe(true);
  });

  it("group permissions", () => {
    const acl = new AccessControlList();
    acl.addToGroup("charlie", "editors");
    acl.grantGroup("editors", "read", "write");
    expect(acl.check("charlie", "read")).toBe(true);
    expect(acl.check("charlie", "delete")).toBe(false);
  });

  it("getPermissions includes group perms", () => {
    const acl = new AccessControlList();
    acl.grant("dave", "read");
    acl.addToGroup("dave", "admins");
    acl.grantGroup("admins", "admin");
    const perms = acl.getPermissions("dave");
    expect(perms).toContain("read");
    expect(perms).toContain("admin");
  });

  it("listPrincipals excludes groups", () => {
    const acl = new AccessControlList();
    acl.grant("eve", "read");
    acl.grantGroup("staff", "read");
    expect(acl.listPrincipals()).toEqual(["eve"]);
  });

  it("clear wipes everything", () => {
    const acl = new AccessControlList();
    acl.grant("x", "read");
    acl.clear();
    expect(acl.check("x", "read")).toBe(false);
  });
});
