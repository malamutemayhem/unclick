import { describe, it, expect } from "vitest";
import { PermissionChecker } from "../permission-checker.js";

describe("PermissionChecker", () => {
  it("grants exact permission", () => {
    const checker = new PermissionChecker();
    checker.addRole({
      name: "editor",
      permissions: [{ resource: "posts", action: "edit" }],
    });
    expect(checker.can("editor", "posts", "edit")).toBe(true);
    expect(checker.can("editor", "posts", "delete")).toBe(false);
  });

  it("wildcard resource matches all", () => {
    const checker = new PermissionChecker();
    checker.addRole({
      name: "admin",
      permissions: [{ resource: "*", action: "*" }],
    });
    expect(checker.can("admin", "anything", "everything")).toBe(true);
  });

  it("wildcard action matches all actions on resource", () => {
    const checker = new PermissionChecker();
    checker.addRole({
      name: "owner",
      permissions: [{ resource: "posts", action: "*" }],
    });
    expect(checker.can("owner", "posts", "read")).toBe(true);
    expect(checker.can("owner", "posts", "delete")).toBe(true);
    expect(checker.can("owner", "users", "read")).toBe(false);
  });

  it("inherits permissions from parent role", () => {
    const checker = new PermissionChecker();
    checker.addRole({
      name: "viewer",
      permissions: [{ resource: "posts", action: "read" }],
    });
    checker.addRole({
      name: "editor",
      permissions: [{ resource: "posts", action: "edit" }],
      inherits: ["viewer"],
    });
    expect(checker.can("editor", "posts", "read")).toBe(true);
    expect(checker.can("editor", "posts", "edit")).toBe(true);
  });

  it("handles multi-level inheritance", () => {
    const checker = new PermissionChecker();
    checker.addRole({ name: "base", permissions: [{ resource: "x", action: "read" }] });
    checker.addRole({ name: "mid", permissions: [{ resource: "x", action: "write" }], inherits: ["base"] });
    checker.addRole({ name: "top", permissions: [{ resource: "x", action: "delete" }], inherits: ["mid"] });
    expect(checker.can("top", "x", "read")).toBe(true);
    expect(checker.can("top", "x", "write")).toBe(true);
    expect(checker.can("top", "x", "delete")).toBe(true);
  });

  it("handles circular inheritance without infinite loop", () => {
    const checker = new PermissionChecker();
    checker.addRole({ name: "a", permissions: [{ resource: "x", action: "read" }], inherits: ["b"] });
    checker.addRole({ name: "b", permissions: [{ resource: "y", action: "read" }], inherits: ["a"] });
    expect(checker.can("a", "x", "read")).toBe(true);
    expect(checker.can("a", "y", "read")).toBe(true);
  });

  it("returns false for unknown role", () => {
    const checker = new PermissionChecker();
    expect(checker.can("ghost", "anything", "anything")).toBe(false);
  });

  it("lists roles", () => {
    const checker = new PermissionChecker();
    checker.addRole({ name: "admin", permissions: [] });
    checker.addRole({ name: "viewer", permissions: [] });
    expect(checker.listRoles()).toEqual(["admin", "viewer"]);
  });
});
