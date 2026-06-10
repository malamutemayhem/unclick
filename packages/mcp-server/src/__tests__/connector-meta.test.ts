import { describe, expect, it } from "vitest";

import { stampMeta, type ConnectorMeta } from "../connector-meta.js";

const baseMeta: ConnectorMeta = {
  source: "Test API v1",
  fetched_at: "2024-06-15T12:00:00Z",
  next_steps: ["Do something next"],
};

describe("stampMeta", () => {
  it("merges meta into an object result", () => {
    const result = { price: 42, name: "widget" };
    const stamped = stampMeta(result, baseMeta);
    expect(stamped.price).toBe(42);
    expect(stamped.name).toBe("widget");
    expect(stamped.unclick_meta).toBeDefined();
  });

  it("stamps source, fetched_at, and next_steps", () => {
    const stamped = stampMeta({ ok: true }, baseMeta);
    const meta = stamped.unclick_meta as any;
    expect(meta.source).toBe("Test API v1");
    expect(meta.fetched_at).toBe("2024-06-15T12:00:00Z");
    expect(meta.next_steps).toEqual(["Do something next"]);
  });

  it("defaults defaults_used to empty array", () => {
    const stamped = stampMeta({ ok: true }, baseMeta);
    const meta = stamped.unclick_meta as any;
    expect(meta.defaults_used).toEqual([]);
  });

  it("preserves provided defaults_used", () => {
    const meta: ConnectorMeta = {
      ...baseMeta,
      defaults_used: ["preferred_currency"],
    };
    const stamped = stampMeta({ ok: true }, meta);
    expect((stamped.unclick_meta as any).defaults_used).toEqual(["preferred_currency"]);
  });

  it("wraps arrays under data key", () => {
    const stamped = stampMeta([1, 2, 3], baseMeta);
    expect(stamped.data).toEqual([1, 2, 3]);
    expect(stamped.unclick_meta).toBeDefined();
  });

  it("wraps primitives under data key", () => {
    const stamped = stampMeta("hello", baseMeta);
    expect(stamped.data).toBe("hello");
    expect(stamped.unclick_meta).toBeDefined();
  });

  it("wraps numbers under data key", () => {
    const stamped = stampMeta(42, baseMeta);
    expect(stamped.data).toBe(42);
  });

  it("wraps null under data key", () => {
    const stamped = stampMeta(null, baseMeta);
    expect(stamped.data).toBeNull();
    expect(stamped.unclick_meta).toBeDefined();
  });

  it("does not overwrite existing fields on object results", () => {
    const result = { price: 10, currency: "AUD" };
    const stamped = stampMeta(result, baseMeta);
    expect(stamped.price).toBe(10);
    expect(stamped.currency).toBe("AUD");
  });

  it("handles empty object result", () => {
    const stamped = stampMeta({}, baseMeta);
    expect(stamped.unclick_meta).toBeDefined();
    expect(Object.keys(stamped)).toContain("unclick_meta");
  });
});
