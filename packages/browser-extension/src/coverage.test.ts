import { describe, expect, it } from "vitest";
import { coverageForHost, coverageLabel, shouldOfferLearn } from "./coverage.js";
import type { Shape } from "./types.js";

function shape(method: string): Shape {
  return {
    method,
    host: "bobsgaragedoors.com.au",
    pathTemplate: `/api/${method.toLowerCase()}`,
    queryParams: [],
    requestHeaderNames: [],
    responseHeaderNames: [],
  };
}

describe("coverageForHost", () => {
  it("counts endpoints, reads, and writes", () => {
    const cov = coverageForHost([shape("GET"), shape("GET"), shape("POST")]);
    expect(cov).toEqual({ endpoints: 3, reads: 2, writes: 1 });
  });

  it("labels coverage honestly", () => {
    expect(coverageLabel({ endpoints: 0, reads: 0, writes: 0 })).toBe("nothing learned yet");
    expect(coverageLabel({ endpoints: 3, reads: 2, writes: 1 })).toBe(
      "3 endpoint(s): 2 read, 1 write",
    );
  });
});

describe("shouldOfferLearn", () => {
  const base = {
    host: "bobsgaragedoors.com.au",
    tier: "me_only" as const,
    hasOAuthConnector: false,
    alreadyLearned: false,
  };

  it("offers for a fresh no-API site that is not off", () => {
    expect(shouldOfferLearn(base)).toBe(true);
  });

  it("does not offer when off, already learned, or it has OAuth", () => {
    expect(shouldOfferLearn({ ...base, tier: "off" })).toBe(false);
    expect(shouldOfferLearn({ ...base, alreadyLearned: true })).toBe(false);
    expect(shouldOfferLearn({ ...base, hasOAuthConnector: true })).toBe(false);
  });
});
