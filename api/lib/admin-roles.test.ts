import { describe, expect, it } from "vitest";
import {
  canManageSystemConnectors,
  deriveRole,
  deriveUserManagementRole,
  guardTargetAction,
} from "./admin-roles";

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

  it("labels the protected GOD account and records an assigned superuser", () => {
    expect(deriveUserManagementRole("creativelead@malamutemayhem.com", null)).toEqual({
      role: "god",
      source: "god",
    });
    expect(deriveUserManagementRole("worker@example.test", { unclick_role: "superuser" })).toEqual({
      role: "superuser",
      source: "assigned",
    });
  });

  it("refuses every mutation to GOD and the self-lockout paths", () => {
    const envEmails = new Set(["admin@example.test"]);
    expect(guardTargetAction({
      action: "delete_user",
      callerId: "admin-id",
      target: { id: "god-id", email: "creativelead@malamutemayhem.com" },
      envEmails,
    }).allowed).toBe(false);
    expect(guardTargetAction({
      action: "set_suspended",
      callerId: "admin-id",
      target: { id: "admin-id", email: "admin@example.test" },
      envEmails,
      suspending: true,
    }).allowed).toBe(false);
    expect(guardTargetAction({
      action: "set_role",
      callerId: "another-admin-id",
      target: { id: "admin-id", email: "admin@example.test" },
      envEmails,
      nextRole: "user",
    }).allowed).toBe(false);
  });
});
