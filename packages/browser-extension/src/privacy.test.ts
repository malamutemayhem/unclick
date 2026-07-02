import { describe, expect, it } from "vitest";
import {
  canPromoteToPublic,
  canShareToPublic,
  DEFAULT_TIER,
  isPublicPromotable,
  K_ANONYMITY_THRESHOLD,
  shouldCapture,
} from "./privacy.js";
import { draftConnector } from "./connector-draft.js";
import type { Shape } from "./types.js";

const readShape: Shape = {
  method: "GET",
  host: "api.lu.ma",
  pathTemplate: "/event/{id}/guests",
  queryParams: [],
  requestHeaderNames: ["authorization"],
  responseHeaderNames: ["content-type"],
};

const writeShape: Shape = {
  method: "POST",
  host: "api.lu.ma",
  pathTemplate: "/event/{id}/guests",
  queryParams: [],
  requestHeaderNames: ["authorization"],
  responseHeaderNames: ["content-type"],
};

describe("privacy tiers", () => {
  it("defaults new sites to me-only", () => {
    expect(DEFAULT_TIER).toBe("me_only");
  });

  it("captures for me-only and public, never for off", () => {
    expect(shouldCapture("off")).toBe(false);
    expect(shouldCapture("me_only")).toBe(true);
    expect(shouldCapture("public")).toBe(true);
  });

  it("only public tier may ever share", () => {
    expect(canShareToPublic("off")).toBe(false);
    expect(canShareToPublic("me_only")).toBe(false);
    expect(canShareToPublic("public")).toBe(true);
  });
});

describe("k-anonymity gate", () => {
  it("requires the threshold number of distinct users", () => {
    expect(canPromoteToPublic(K_ANONYMITY_THRESHOLD - 1)).toBe(false);
    expect(canPromoteToPublic(K_ANONYMITY_THRESHOLD)).toBe(true);
  });
});

describe("isPublicPromotable", () => {
  it("promotes a read shape only when public and past the gate", () => {
    const draft = draftConnector([readShape]);
    expect(isPublicPromotable(draft, "public", 3)).toBe(true);
    expect(isPublicPromotable(draft, "me_only", 3)).toBe(false);
    expect(isPublicPromotable(draft, "public", 1)).toBe(false);
  });

  it("never promotes a write, even when public and past the gate", () => {
    const draft = draftConnector([writeShape]);
    expect(isPublicPromotable(draft, "public", 99)).toBe(false);
  });
});
