import { describe, expect, it } from "vitest";

import {
  buildCommonSensePassDogfoodReceipt,
  COMMONSENSEPASS_DOGFOOD_SCENARIO_IDS,
} from "../dogfood.js";

describe("CommonSensePass dogfood receipt", () => {
  it("proves the required worker sanity scenarios", () => {
    const receipt = buildCommonSensePassDogfoodReceipt({
      generatedAt: "2026-05-27T00:00:00.000Z",
    });

    expect(receipt.status).toBe("passing");
    expect(receipt.summary).toEqual({
      total: COMMONSENSEPASS_DOGFOOD_SCENARIO_IDS.length,
      passing: COMMONSENSEPASS_DOGFOOD_SCENARIO_IDS.length,
      failing: 0,
    });
    expect(receipt.results.map((result) => result.id)).toEqual([
      "false-quiet-with-backlog",
      "no-work-with-backlog",
      "duplicate-wake-suppress",
      "done-without-proof",
      "quiet-empty-queue-pass",
      "route-specialist-lane",
    ]);
    expect(receipt.results.map((result) => result.actual_verdict)).toEqual([
      "BLOCKER",
      "BLOCKER",
      "SUPPRESS",
      "BLOCKER",
      "PASS",
      "ROUTE",
    ]);
  });
});
