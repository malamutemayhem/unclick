/**
 * Shadow-lane guard for the standalone backend factory.
 *
 * When UNCLICK_API_KEY and SUPABASE_URL are both set, the account's
 * registered lane must win over the explicit URL, otherwise one env var
 * silently forks memory into single-tenant tables no other seat reads.
 *
 * Run with: tsx --test src/memory/__tests__/backend-lane-guard.test.ts
 */

import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { decideStandaloneLane } from "../db.js";

const registered = {
  supabase_url: "https://account-project.supabase.co",
  service_role_key: "srk-registered",
};

describe("decideStandaloneLane (shadow-lane guard)", () => {
  test("uses the explicit URL with no warning for pure BYOD (no account key)", () => {
    const decision = decideStandaloneLane({
      hasApiKey: false,
      supabaseUrl: "https://my-own-project.supabase.co",
      registered: null,
    });
    assert.deepEqual(decision, { use: "explicit", warning: null });
  });

  test("prefers the account's registered lane over an explicit URL", () => {
    const decision = decideStandaloneLane({
      hasApiKey: true,
      supabaseUrl: "https://somewhere-else.supabase.co",
      registered,
    });
    assert.equal(decision.use, "registered");
    if (decision.use === "registered") {
      assert.equal(decision.url_mismatch, true);
    }
  });

  test("reports no mismatch when the explicit URL matches the registered lane", () => {
    const decision = decideStandaloneLane({
      hasApiKey: true,
      supabaseUrl: "https://ACCOUNT-project.supabase.co/",
      registered,
    });
    assert.equal(decision.use, "registered");
    if (decision.use === "registered") {
      assert.equal(decision.url_mismatch, false);
    }
  });

  test("warns about the shadow lane when an account key is set but no lane is registered", () => {
    const decision = decideStandaloneLane({
      hasApiKey: true,
      supabaseUrl: "https://central-unclick-project.supabase.co",
      registered: null,
    });
    assert.equal(decision.use, "explicit");
    if (decision.use === "explicit") {
      assert.ok(decision.warning);
      assert.match(decision.warning ?? "", /shadow-lane/);
      assert.match(decision.warning ?? "", /UNCLICK_MEMORY_REQUIRE_REGISTERED_LANE/);
    }
  });
});
