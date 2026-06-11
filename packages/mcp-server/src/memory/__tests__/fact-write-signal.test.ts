import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { classifyFactWriteSignal } from "../handlers.js";

describe("classifyFactWriteSignal", () => {
  it("labels a real fact write as fact_saved with a matching summary", () => {
    const signal = classifyFactWriteSignal({
      sourceKind: "fact",
      preview: "Chris prefers tables",
    });
    assert.equal(signal.action, "fact_saved");
    assert.equal(signal.summary, "Fact saved: Chris prefers tables");
    assert.equal(signal.deepLink, "/admin/memory?tab=facts");
  });

  it("never reads as a failed save when the write routed to episodic memory", () => {
    const signal = classifyFactWriteSignal({
      sourceKind: "episode",
      preview: "Decision recorded today",
    });
    assert.equal(signal.action, "fact_routed_to_episode");
    assert.match(signal.summary, /^Saved to episodic memory: /);
    assert.ok(!signal.action.includes("not_saved"));
  });

  it("keeps action and summary in agreement for write-gate rejections", () => {
    const signal = classifyFactWriteSignal({
      gateAction: "REJECT",
      sourceKind: "fact",
      preview: "duplicate text",
    });
    assert.equal(signal.action, "fact_rejected");
    assert.equal(signal.summary, "Memory write rejected by admission gate");
  });

  it("labels event-store routing as routed, not failed", () => {
    const signal = classifyFactWriteSignal({
      gateAction: "ROUTE_EVENT",
      sourceKind: "episode",
      preview: "transient status ping",
    });
    assert.equal(signal.action, "fact_routed_to_event");
    assert.equal(signal.summary, "Memory write routed to event store");
  });

  it("falls back to a generic summary when no preview text exists", () => {
    const signal = classifyFactWriteSignal({ sourceKind: "fact", preview: "" });
    assert.equal(signal.summary, "Fact saved to memory");
  });
});
