import { describe, it, expect } from "vitest";
import { StateHistory } from "../state-history.js";

describe("StateHistory", () => {
  it("saves and retrieves snapshots", () => {
    const h = new StateHistory<number>();
    h.save(1);
    h.save(2);
    expect(h.count).toBe(2);
    expect(h.latest?.state).toBe(2);
    expect(h.oldest?.state).toBe(1);
  });

  it("clones state on save", () => {
    const h = new StateHistory<{ x: number }>();
    const obj = { x: 1 };
    h.save(obj);
    obj.x = 99;
    expect(h.latest?.state.x).toBe(1);
  });

  it("respects maxSnapshots", () => {
    const h = new StateHistory<number>(3);
    h.save(1);
    h.save(2);
    h.save(3);
    h.save(4);
    expect(h.count).toBe(3);
    expect(h.oldest?.state).toBe(2);
  });

  it("at returns snapshot by index", () => {
    const h = new StateHistory<string>();
    h.save("a");
    h.save("b");
    expect(h.at(0)?.state).toBe("a");
    expect(h.at(1)?.state).toBe("b");
    expect(h.at(5)).toBeUndefined();
  });

  it("findByLabel returns most recent matching label", () => {
    const h = new StateHistory<number>();
    h.save(1, "v1");
    h.save(2, "v2");
    h.save(3, "v1");
    expect(h.findByLabel("v1")?.state).toBe(3);
  });

  it("findByLabel returns undefined for missing label", () => {
    const h = new StateHistory<number>();
    h.save(1, "v1");
    expect(h.findByLabel("missing")).toBeUndefined();
  });

  it("since filters by timestamp", () => {
    const h = new StateHistory<number>();
    h.save(1);
    const ts = Date.now() + 1;
    h.save(2);
    h.save(3);
    const filtered = h.since(ts);
    expect(filtered.length).toBeGreaterThanOrEqual(0);
  });

  it("revert truncates history", () => {
    const h = new StateHistory<number>();
    h.save(10);
    h.save(20);
    h.save(30);
    const state = h.revert(1);
    expect(state).toBe(20);
    expect(h.count).toBe(2);
  });

  it("revert returns undefined for invalid index", () => {
    const h = new StateHistory<number>();
    expect(h.revert(5)).toBeUndefined();
  });

  it("clear removes all snapshots", () => {
    const h = new StateHistory<number>();
    h.save(1);
    h.save(2);
    h.clear();
    expect(h.count).toBe(0);
    expect(h.latest).toBeUndefined();
  });

  it("toArray returns copy", () => {
    const h = new StateHistory<number>();
    h.save(1);
    h.save(2);
    const arr = h.toArray();
    expect(arr).toHaveLength(2);
    arr.pop();
    expect(h.count).toBe(2);
  });

  it("diff returns from/to snapshots", () => {
    const h = new StateHistory<number>();
    h.save(10);
    h.save(20);
    h.save(30);
    const d = h.diff(0, 2);
    expect(d?.from.state).toBe(10);
    expect(d?.to.state).toBe(30);
  });

  it("diff returns undefined for invalid indices", () => {
    const h = new StateHistory<number>();
    expect(h.diff(0, 1)).toBeUndefined();
  });

  it("latest/oldest undefined on empty history", () => {
    const h = new StateHistory<number>();
    expect(h.latest).toBeUndefined();
    expect(h.oldest).toBeUndefined();
  });
});
