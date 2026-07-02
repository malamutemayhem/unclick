/**
 * Circle consent write path: validation and guard tests.
 *
 * These tests cover the input validation that happens before any DB call.
 * They use a mock Supabase client to verify the consent operations enforce:
 *   - self-share rejection
 *   - missing identity rejection
 *   - correct role enforcement on revoke
 *   - correct query construction
 *
 * Run with: tsx --test src/memory/__tests__/circle-consent.test.ts
 */

import { describe, test, mock } from "node:test";
import assert from "node:assert/strict";

import {
  createShareOffer,
  acceptShare,
  revokeShare,
  listShares,
  fetchCircleGrants,
} from "../circle-consent.js";

const OWNER = "ownerhash";
const GRANTEE = "granteehash";

function mockRow(overrides: Record<string, unknown> = {}) {
  return {
    owner_api_key_hash: OWNER,
    grantee_api_key_hash: GRANTEE,
    owner_enabled: true,
    grantee_enabled: false,
    revoked_at: null,
    created_at: "2026-06-25T00:00:00Z",
    updated_at: "2026-06-25T00:00:00Z",
    ...overrides,
  };
}

function mockSupabase(opts: {
  returnData?: unknown;
  returnError?: unknown;
  selectData?: unknown[];
} = {}) {
  const terminal = {
    data: opts.returnData ?? null,
    error: opts.returnError ?? null,
  };

  const chainable: Record<string, unknown> = {};
  chainable.select = () => chainable;
  chainable.single = () => terminal;
  chainable.eq = () => chainable;
  chainable.is = () => chainable;
  chainable.order = () => ({
    data: opts.selectData ?? [],
    error: null,
  });

  const fromCalls: string[] = [];

  return {
    from: (table: string) => {
      fromCalls.push(table);
      return {
        upsert: () => chainable,
        update: () => chainable,
        select: () => chainable,
        ...chainable,
      };
    },
    _fromCalls: fromCalls,
  } as any;
}

describe("createShareOffer", () => {
  test("rejects self-share", async () => {
    const sb = mockSupabase();
    const result = await createShareOffer(sb, OWNER, OWNER);
    assert.equal(result.ok, false);
    assert.match(result.error!, /yourself/);
    assert.equal(sb._fromCalls.length, 0);
  });

  test("rejects empty owner", async () => {
    const sb = mockSupabase();
    const result = await createShareOffer(sb, "", GRANTEE);
    assert.equal(result.ok, false);
    assert.match(result.error!, /Owner/);
  });

  test("rejects empty grantee", async () => {
    const sb = mockSupabase();
    const result = await createShareOffer(sb, OWNER, "");
    assert.equal(result.ok, false);
    assert.match(result.error!, /Grantee/);
  });

  test("rejects whitespace-only identity", async () => {
    const sb = mockSupabase();
    const result = await createShareOffer(sb, OWNER, "   ");
    assert.equal(result.ok, false);
    assert.match(result.error!, /Grantee/);
  });

  test("calls upsert on valid input", async () => {
    const row = mockRow();
    const sb = mockSupabase({ returnData: row });
    const result = await createShareOffer(sb, OWNER, GRANTEE);
    assert.equal(result.ok, true);
    assert.ok(result.grant);
    assert.equal(sb._fromCalls[0], "circle_link_permissions");
  });

  test("returns error on DB failure", async () => {
    const sb = mockSupabase({
      returnError: { message: "unique violation", code: "23505" },
    });
    const result = await createShareOffer(sb, OWNER, GRANTEE);
    assert.equal(result.ok, false);
    assert.match(result.error!, /unique violation/);
  });
});

describe("acceptShare", () => {
  test("rejects self-share", async () => {
    const sb = mockSupabase();
    const result = await acceptShare(sb, OWNER, OWNER);
    assert.equal(result.ok, false);
    assert.match(result.error!, /yourself/);
  });

  test("returns friendly error when no pending offer exists", async () => {
    const sb = mockSupabase({
      returnError: { message: "not found", code: "PGRST116" },
    });
    const result = await acceptShare(sb, OWNER, GRANTEE);
    assert.equal(result.ok, false);
    assert.match(result.error!, /No pending share offer/);
  });

  test("succeeds with valid pending offer", async () => {
    const row = mockRow({ grantee_enabled: true });
    const sb = mockSupabase({ returnData: row });
    const result = await acceptShare(sb, OWNER, GRANTEE);
    assert.equal(result.ok, true);
    assert.ok(result.grant);
  });
});

describe("revokeShare", () => {
  test("rejects self-share pair", async () => {
    const sb = mockSupabase();
    const result = await revokeShare(sb, OWNER, OWNER, OWNER);
    assert.equal(result.ok, false);
    assert.match(result.error!, /yourself/);
  });

  test("rejects revoker who is neither owner nor grantee", async () => {
    const sb = mockSupabase();
    const result = await revokeShare(sb, OWNER, GRANTEE, "intruder");
    assert.equal(result.ok, false);
    assert.match(result.error!, /Only the owner or grantee/);
  });

  test("allows owner to revoke", async () => {
    const row = mockRow({ revoked_at: "2026-06-25T00:00:00Z" });
    const sb = mockSupabase({ returnData: row });
    const result = await revokeShare(sb, OWNER, GRANTEE, OWNER);
    assert.equal(result.ok, true);
  });

  test("allows grantee to revoke", async () => {
    const row = mockRow({ revoked_at: "2026-06-25T00:00:00Z" });
    const sb = mockSupabase({ returnData: row });
    const result = await revokeShare(sb, OWNER, GRANTEE, GRANTEE);
    assert.equal(result.ok, true);
  });

  test("returns friendly error when nothing to revoke", async () => {
    const sb = mockSupabase({
      returnError: { message: "not found", code: "PGRST116" },
    });
    const result = await revokeShare(sb, OWNER, GRANTEE, OWNER);
    assert.equal(result.ok, false);
    assert.match(result.error!, /No active or pending share/);
  });

  test("rejects empty revoker", async () => {
    const sb = mockSupabase();
    const result = await revokeShare(sb, OWNER, GRANTEE, "");
    assert.equal(result.ok, false);
    assert.match(result.error!, /Revoker/);
  });
});

describe("listShares", () => {
  test("rejects empty caller", async () => {
    const sb = mockSupabase();
    const result = await listShares(sb, "");
    assert.equal(result.ok, false);
    assert.match(result.error!, /Caller/);
  });

  test("returns shares with role and active annotation", async () => {
    const ownedRow = mockRow({ owner_enabled: true, grantee_enabled: true });

    let selectCallCount = 0;
    const chainable: Record<string, unknown> = {};
    chainable.eq = () => chainable;
    chainable.order = () => {
      selectCallCount++;
      if (selectCallCount === 1) return { data: [ownedRow], error: null };
      return { data: [], error: null };
    };

    const sb = {
      from: () => ({
        select: () => chainable,
      }),
    } as any;

    const result = await listShares(sb, OWNER);
    assert.equal(result.ok, true);
    assert.equal(result.shares.length, 1);
    assert.equal(result.shares[0].role, "owner");
    assert.equal(result.shares[0].active, true);
  });
});

describe("fetchCircleGrants", () => {
  test("returns empty for blank owner", async () => {
    const sb = mockSupabase();
    const grants = await fetchCircleGrants(sb, "", GRANTEE);
    assert.deepEqual(grants, []);
  });

  test("returns empty for blank reader", async () => {
    const sb = mockSupabase();
    const grants = await fetchCircleGrants(sb, OWNER, "");
    assert.deepEqual(grants, []);
  });
});
