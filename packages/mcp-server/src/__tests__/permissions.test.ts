import { describe, it, expect } from "vitest";
import { Permissions, definePermissions } from "../permissions.js";

const FLAGS = definePermissions({
  READ: 1,
  WRITE: 2,
  DELETE: 4,
  ADMIN: 8,
});

describe("Permissions", () => {
  it("grant and has", () => {
    const p = new Permissions();
    p.grant(FLAGS.READ, FLAGS.WRITE);
    expect(p.has(FLAGS.READ)).toBe(true);
    expect(p.has(FLAGS.WRITE)).toBe(true);
    expect(p.has(FLAGS.DELETE)).toBe(false);
  });

  it("revoke", () => {
    const p = new Permissions();
    p.grant(FLAGS.READ, FLAGS.WRITE);
    p.revoke(FLAGS.WRITE);
    expect(p.has(FLAGS.WRITE)).toBe(false);
    expect(p.has(FLAGS.READ)).toBe(true);
  });

  it("toggle", () => {
    const p = new Permissions();
    p.toggle(FLAGS.READ);
    expect(p.has(FLAGS.READ)).toBe(true);
    p.toggle(FLAGS.READ);
    expect(p.has(FLAGS.READ)).toBe(false);
  });

  it("hasAny", () => {
    const p = new Permissions();
    p.grant(FLAGS.READ);
    expect(p.hasAny(FLAGS.READ, FLAGS.WRITE)).toBe(true);
    expect(p.hasAny(FLAGS.WRITE, FLAGS.DELETE)).toBe(false);
  });

  it("hasAll", () => {
    const p = new Permissions();
    p.grant(FLAGS.READ, FLAGS.WRITE);
    expect(p.hasAll(FLAGS.READ, FLAGS.WRITE)).toBe(true);
    expect(p.hasAll(FLAGS.READ, FLAGS.DELETE)).toBe(false);
  });

  it("toArray", () => {
    const p = new Permissions();
    p.grant(FLAGS.READ, FLAGS.ADMIN);
    expect(p.toArray(FLAGS).sort()).toEqual(["ADMIN", "READ"]);
  });

  it("equals and clone", () => {
    const a = new Permissions();
    a.grant(FLAGS.READ);
    const b = a.clone();
    expect(a.equals(b)).toBe(true);
    b.grant(FLAGS.WRITE);
    expect(a.equals(b)).toBe(false);
  });

  it("combine", () => {
    const a = new Permissions(FLAGS.READ);
    const b = new Permissions(FLAGS.WRITE);
    const c = Permissions.combine(a, b);
    expect(c.has(FLAGS.READ)).toBe(true);
    expect(c.has(FLAGS.WRITE)).toBe(true);
  });

  it("fromArray", () => {
    const p = Permissions.fromArray([FLAGS.READ, FLAGS.DELETE]);
    expect(p.has(FLAGS.READ)).toBe(true);
    expect(p.has(FLAGS.DELETE)).toBe(true);
    expect(p.has(FLAGS.WRITE)).toBe(false);
  });

  it("value returns raw flags", () => {
    const p = new Permissions(FLAGS.READ | FLAGS.WRITE);
    expect(p.value).toBe(3);
  });
});
