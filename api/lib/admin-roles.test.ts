import { describe, expect, it } from "vitest";
import { canManageSystemConnectors, deriveRole } from "./admin-roles";

describe("project admin roles", () => {
  it("uses an explicit God allowlist before the general Superuser list", () => {
    const admins = new Set(["owner@example.test", "worker@example.test"]);
    const gods = new Set(["owner@example.test"]);
    expect(deriveRole("owner@example.test", null, admins, gods)).toBe("god");
    expect(deriveRole("worker@example.test", null, admins, gods)).toBe("superuser");
    expect(canManageSystemConnectors("superuser", admins, gods)).toBe(false);
  });

  it("allows a single legacy admin to bootstrap the master store", () => {
    expect(canManageSystemConnectors("superuser", new Set(["owner@example.test"]), new Set())).toBe(true);
  });
});
