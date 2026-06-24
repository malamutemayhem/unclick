import { describe, expect, it } from "vitest";
import type { LinkPermissionRow } from "./account-links-model.js";
import { canGranteeReadOwner, ownersSharingWith } from "./circle-access.js";

const OWNER = "owner-1";
const GRANTEE = "grantee-1";

function row(overrides: Partial<LinkPermissionRow>): LinkPermissionRow {
  return {
    link_id: "link-1",
    permission: "shared_memory",
    owner_user_id: OWNER,
    grantee_user_id: GRANTEE,
    owner_enabled: true,
    grantee_enabled: true,
    ...overrides,
  };
}

describe("canGranteeReadOwner", () => {
  it("allows when both sides opted in", () => {
    expect(
      canGranteeReadOwner([row({})], {
        ownerUserId: OWNER,
        granteeUserId: GRANTEE,
        permission: "shared_memory",
      }),
    ).toBe(true);
  });

  it("denies when only the owner opted in (no grantee accept)", () => {
    expect(
      canGranteeReadOwner([row({ grantee_enabled: false })], {
        ownerUserId: OWNER,
        granteeUserId: GRANTEE,
        permission: "shared_memory",
      }),
    ).toBe(false);
  });

  it("denies when only the grantee opted in (owner not giving)", () => {
    expect(
      canGranteeReadOwner([row({ owner_enabled: false })], {
        ownerUserId: OWNER,
        granteeUserId: GRANTEE,
        permission: "shared_memory",
      }),
    ).toBe(false);
  });

  it("denies when neither side is enabled", () => {
    expect(
      canGranteeReadOwner([row({ owner_enabled: false, grantee_enabled: false })], {
        ownerUserId: OWNER,
        granteeUserId: GRANTEE,
        permission: "shared_memory",
      }),
    ).toBe(false);
  });

  it("treats null enabled flags as not enabled", () => {
    expect(
      canGranteeReadOwner([row({ owner_enabled: null, grantee_enabled: null })], {
        ownerUserId: OWNER,
        granteeUserId: GRANTEE,
        permission: "shared_memory",
      }),
    ).toBe(false);
  });

  it("does not leak across permissions", () => {
    expect(
      canGranteeReadOwner([row({ permission: "shared_orchestrator" })], {
        ownerUserId: OWNER,
        granteeUserId: GRANTEE,
        permission: "shared_memory",
      }),
    ).toBe(false);
  });

  it("does not treat the reverse direction as a grant", () => {
    const reverse = row({ owner_user_id: GRANTEE, grantee_user_id: OWNER });
    expect(
      canGranteeReadOwner([reverse], {
        ownerUserId: OWNER,
        granteeUserId: GRANTEE,
        permission: "shared_memory",
      }),
    ).toBe(false);
  });

  it("never grants self-access", () => {
    expect(
      canGranteeReadOwner([row({ owner_user_id: OWNER, grantee_user_id: OWNER })], {
        ownerUserId: OWNER,
        granteeUserId: OWNER,
        permission: "shared_memory",
      }),
    ).toBe(false);
  });

  it("finds the active row among several", () => {
    const rows = [
      row({ grantee_enabled: false }),
      row({ link_id: "link-2" }),
      row({ permission: "shared_orchestrator", owner_enabled: false }),
    ];
    expect(
      canGranteeReadOwner(rows, {
        ownerUserId: OWNER,
        granteeUserId: GRANTEE,
        permission: "shared_memory",
      }),
    ).toBe(true);
  });

  it("denies on empty input", () => {
    expect(
      canGranteeReadOwner([], {
        ownerUserId: OWNER,
        granteeUserId: GRANTEE,
        permission: "shared_memory",
      }),
    ).toBe(false);
  });
});

describe("ownersSharingWith", () => {
  it("returns only owners with an active share to the grantee", () => {
    const rows = [
      row({ owner_user_id: "owner-a" }),
      row({ owner_user_id: "owner-b", grantee_enabled: false }),
      row({ owner_user_id: "owner-c" }),
    ];
    expect(
      ownersSharingWith(rows, { granteeUserId: GRANTEE, permission: "shared_memory" }).sort(),
    ).toEqual(["owner-a", "owner-c"]);
  });

  it("de-duplicates owners across multiple rows", () => {
    const rows = [
      row({ owner_user_id: "owner-a", link_id: "l1" }),
      row({ owner_user_id: "owner-a", link_id: "l2" }),
    ];
    expect(
      ownersSharingWith(rows, { granteeUserId: GRANTEE, permission: "shared_memory" }),
    ).toEqual(["owner-a"]);
  });

  it("scopes by permission", () => {
    const rows = [
      row({ owner_user_id: "owner-a", permission: "shared_orchestrator" }),
      row({ owner_user_id: "owner-b", permission: "shared_memory" }),
    ];
    expect(
      ownersSharingWith(rows, { granteeUserId: GRANTEE, permission: "shared_memory" }),
    ).toEqual(["owner-b"]);
  });

  it("excludes self and returns empty when nothing is shared", () => {
    expect(
      ownersSharingWith([row({ owner_user_id: GRANTEE, grantee_user_id: GRANTEE })], {
        granteeUserId: GRANTEE,
        permission: "shared_memory",
      }),
    ).toEqual([]);
  });
});
