/**
 * Circle sharing: cross-user memory access gate.
 *
 * Pure predicate tests (no I/O). They prove the deny-by-default guarantee in
 * every direction: unknown identity, BYOD/local mode, missing or one-sided
 * consent, and revoked shares all deny, while a reader's own memory and a
 * fully-consented managed-cloud share are allowed.
 *
 * Run with: tsx --test src/memory/__tests__/circle.test.ts
 */

import { describe, test } from "node:test";
import assert from "node:assert/strict";

import {
  canReadCircleMemory,
  circleSharingEnabled,
  isCircleGrantActive,
  selectActiveGrant,
  type CircleGrant,
  type CircleReadRequest,
} from "../circle.js";

const OWNER = "ownerhash";
const READER = "readerhash";

function grant(over: Partial<CircleGrant> = {}): CircleGrant {
  return {
    owner_api_key_hash: OWNER,
    grantee_api_key_hash: READER,
    owner_enabled: true,
    grantee_enabled: true,
    revoked_at: null,
    ...over,
  };
}

function req(over: Partial<CircleReadRequest> = {}): CircleReadRequest {
  return {
    readerApiKeyHash: READER,
    ownerApiKeyHash: OWNER,
    mode: "managed",
    grants: [grant()],
    ...over,
  };
}

describe("circleSharingEnabled", () => {
  test("defaults off and only true for 1/true", () => {
    assert.equal(circleSharingEnabled({}), false);
    assert.equal(circleSharingEnabled({ MEMORY_CIRCLE_ENABLED: "" }), false);
    assert.equal(circleSharingEnabled({ MEMORY_CIRCLE_ENABLED: "0" }), false);
    assert.equal(circleSharingEnabled({ MEMORY_CIRCLE_ENABLED: "no" }), false);
    assert.equal(circleSharingEnabled({ MEMORY_CIRCLE_ENABLED: "1" }), true);
    assert.equal(circleSharingEnabled({ MEMORY_CIRCLE_ENABLED: "true" }), true);
    assert.equal(circleSharingEnabled({ MEMORY_CIRCLE_ENABLED: "TRUE" }), true);
  });
});

describe("isCircleGrantActive", () => {
  test("active only when both sides opt in and not revoked", () => {
    assert.equal(isCircleGrantActive(grant()), true);
    assert.equal(isCircleGrantActive(grant({ owner_enabled: false })), false);
    assert.equal(isCircleGrantActive(grant({ grantee_enabled: false })), false);
    assert.equal(isCircleGrantActive(grant({ owner_enabled: null })), false);
    assert.equal(isCircleGrantActive(grant({ grantee_enabled: null })), false);
    assert.equal(isCircleGrantActive(grant({ revoked_at: "2026-06-24T00:00:00Z" })), false);
    assert.equal(isCircleGrantActive(grant({ revoked_at: "   " })), true);
  });
});

describe("selectActiveGrant", () => {
  test("matches only the exact owner -> grantee direction", () => {
    assert.notEqual(selectActiveGrant([grant()], OWNER, READER), null);
    // Reverse direction does not authorize this read.
    assert.equal(selectActiveGrant([grant()], READER, OWNER), null);
    // Unrelated pair.
    assert.equal(selectActiveGrant([grant()], "other", READER), null);
    // Inactive grant is ignored.
    assert.equal(selectActiveGrant([grant({ owner_enabled: false })], OWNER, READER), null);
    assert.equal(selectActiveGrant([], OWNER, READER), null);
  });
});

describe("canReadCircleMemory", () => {
  test("allows a reader to read their own memory regardless of grants/mode", () => {
    assert.equal(
      canReadCircleMemory(req({ readerApiKeyHash: OWNER, grants: [] })),
      true,
    );
    assert.equal(
      canReadCircleMemory(req({ readerApiKeyHash: OWNER, ownerApiKeyHash: OWNER, mode: "byod", grants: [] })),
      true,
    );
  });

  test("denies when reader or owner identity is missing", () => {
    assert.equal(canReadCircleMemory(req({ readerApiKeyHash: null })), false);
    assert.equal(canReadCircleMemory(req({ ownerApiKeyHash: null })), false);
    assert.equal(canReadCircleMemory(req({ readerApiKeyHash: "  " })), false);
    assert.equal(canReadCircleMemory(req({ ownerApiKeyHash: "" })), false);
  });

  test("allows a cross-user read with a fully-consented grant in managed mode", () => {
    assert.equal(canReadCircleMemory(req()), true);
  });

  test("denies a cross-user read when sharing is not mutual or is revoked", () => {
    assert.equal(canReadCircleMemory(req({ grants: [grant({ owner_enabled: false })] })), false);
    assert.equal(canReadCircleMemory(req({ grants: [grant({ grantee_enabled: false })] })), false);
    assert.equal(canReadCircleMemory(req({ grants: [grant({ revoked_at: "2026-06-24T00:00:00Z" })] })), false);
    assert.equal(canReadCircleMemory(req({ grants: [] })), false);
  });

  test("denies any cross-user read outside managed cloud (BYOD/local cannot share)", () => {
    assert.equal(canReadCircleMemory(req({ mode: "byod" })), false);
    assert.equal(canReadCircleMemory(req({ mode: "local" })), false);
  });

  test("denies a cross-user read authorized only in the reverse direction", () => {
    const reverse = grant({ owner_api_key_hash: READER, grantee_api_key_hash: OWNER });
    assert.equal(canReadCircleMemory(req({ grants: [reverse] })), false);
  });
});
