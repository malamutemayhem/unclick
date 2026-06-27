import { describe, it, expect } from "vitest";
import { SwimDetector } from "../swim-detector.js";

describe("SwimDetector", () => {
  it("join adds members", () => {
    const swim = new SwimDetector();
    swim.join("a");
    swim.join("b");
    expect(swim.memberCount).toBe(2);
    expect(swim.aliveCount).toBe(2);
  });

  it("leave removes members", () => {
    const swim = new SwimDetector();
    swim.join("a");
    swim.leave("a");
    expect(swim.memberCount).toBe(0);
  });

  it("ping keeps node alive", () => {
    const swim = new SwimDetector(3, 6);
    swim.join("a");
    for (let i = 0; i < 5; i++) {
      swim.ping("a");
      swim.advance();
    }
    expect(swim.getStatus("a")).toBe("alive");
  });

  it("suspects unresponsive nodes", () => {
    const swim = new SwimDetector(3, 6);
    swim.join("a");
    for (let i = 0; i < 4; i++) swim.advance();
    expect(swim.getStatus("a")).toBe("suspect");
  });

  it("marks dead after timeout", () => {
    const swim = new SwimDetector(3, 6);
    swim.join("a");
    for (let i = 0; i < 7; i++) swim.advance();
    expect(swim.getStatus("a")).toBe("dead");
  });

  it("ping revives suspect", () => {
    const swim = new SwimDetector(3, 6);
    swim.join("a");
    for (let i = 0; i < 4; i++) swim.advance();
    expect(swim.getStatus("a")).toBe("suspect");
    swim.ping("a");
    expect(swim.getStatus("a")).toBe("alive");
  });

  it("ping returns false for dead nodes", () => {
    const swim = new SwimDetector(3, 6);
    swim.join("a");
    for (let i = 0; i < 7; i++) swim.advance();
    expect(swim.ping("a")).toBe(false);
  });

  it("pingReq indirect probe", () => {
    const swim = new SwimDetector(3, 6);
    swim.join("a");
    swim.join("b");
    for (let i = 0; i < 4; i++) {
      swim.ping("b");
      swim.advance();
    }
    expect(swim.getStatus("a")).toBe("suspect");
    const result = swim.pingReq("a", ["b"]);
    expect(result).toBe(true);
    expect(swim.getStatus("a")).toBe("alive");
  });

  it("getMembers filters by status", () => {
    const swim = new SwimDetector(3, 6);
    swim.join("a");
    swim.join("b");
    for (let i = 0; i < 4; i++) swim.advance();
    const suspects = swim.getMembers("suspect");
    expect(suspects).toHaveLength(2);
  });

  it("refute clears suspect", () => {
    const swim = new SwimDetector(3, 6);
    swim.join("a");
    for (let i = 0; i < 4; i++) swim.advance();
    swim.refute("a");
    expect(swim.getStatus("a")).toBe("alive");
  });

  it("events are tracked", () => {
    const swim = new SwimDetector(2, 4);
    swim.join("a");
    for (let i = 0; i < 3; i++) swim.advance();
    const events = swim.getEvents();
    expect(events.some((e) => e.type === "join")).toBe(true);
    expect(events.some((e) => e.type === "suspect")).toBe(true);
    swim.clearEvents();
    expect(swim.getEvents()).toHaveLength(0);
  });

  it("currentTick advances", () => {
    const swim = new SwimDetector();
    expect(swim.currentTick).toBe(0);
    swim.advance();
    swim.advance();
    expect(swim.currentTick).toBe(2);
  });
});
