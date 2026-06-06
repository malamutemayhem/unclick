import { describe, expect, it } from "vitest";

import { shouldSuppressNoopHeartbeatPost } from "./fishbowl-quiet-post";

describe("shouldSuppressNoopHeartbeatPost", () => {
  it("does not change ordinary Boardroom posts unless the caller opts in", () => {
    expect(
      shouldSuppressNoopHeartbeatPost({
        text: "Heartbeat: nothing changed.",
        tags: ["heartbeat"],
      }),
    ).toBe(false);
  });

  it("suppresses explicit no-op heartbeat chatter when opted in", () => {
    expect(
      shouldSuppressNoopHeartbeatPost({
        text: "DONT_NOTIFY: quiet-status heartbeat, no user action needed.",
        tags: ["heartbeat"],
        suppressNoopHeartbeat: true,
      }),
    ).toBe(true);

    expect(
      shouldSuppressNoopHeartbeatPost({
        text: "UnClick healthy.",
        suppressNoopHeartbeat: true,
      }),
    ).toBe(true);
  });

  it("suppresses the dedicated no-op-heartbeat tag", () => {
    expect(
      shouldSuppressNoopHeartbeatPost({
        text: "Checked the lane; no new signals.",
        tags: ["no-op-heartbeat"],
        suppressNoopHeartbeat: true,
      }),
    ).toBe(true);
  });

  it("keeps action-needed heartbeat output visible", () => {
    expect(
      shouldSuppressNoopHeartbeatPost({
        text: "BLOCKER: state unchanged because missing proof still needs owner action.",
        tags: ["heartbeat", "blocker"],
        suppressNoopHeartbeat: true,
      }),
    ).toBe(false);
  });
});
