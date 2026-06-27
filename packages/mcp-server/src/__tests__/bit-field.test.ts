import { describe, it, expect } from "vitest";
import { BitField } from "../bit-field.js";

describe("bit-field", () => {
  it("set and has work", () => {
    const bf = new BitField(["read", "write", "exec"]);
    bf.set("read").set("exec");
    expect(bf.has("read")).toBe(true);
    expect(bf.has("write")).toBe(false);
    expect(bf.has("exec")).toBe(true);
  });

  it("unset clears a flag", () => {
    const bf = new BitField(["a", "b"]);
    bf.set("a").set("b").unset("a");
    expect(bf.has("a")).toBe(false);
    expect(bf.has("b")).toBe(true);
  });

  it("toggle flips a flag", () => {
    const bf = new BitField(["x"]);
    bf.toggle("x");
    expect(bf.has("x")).toBe(true);
    bf.toggle("x");
    expect(bf.has("x")).toBe(false);
  });

  it("hasAll checks multiple flags", () => {
    const bf = new BitField(["a", "b", "c"]);
    bf.set("a").set("b");
    expect(bf.hasAll("a", "b")).toBe(true);
    expect(bf.hasAll("a", "c")).toBe(false);
  });

  it("hasAny checks any flag", () => {
    const bf = new BitField(["a", "b", "c"]);
    bf.set("b");
    expect(bf.hasAny("a", "b")).toBe(true);
    expect(bf.hasAny("a", "c")).toBe(false);
  });

  it("toArray returns set flags", () => {
    const bf = new BitField(["x", "y", "z"]);
    bf.set("x").set("z");
    expect(bf.toArray()).toEqual(["x", "z"]);
  });

  it("toNumber and fromNumber roundtrip", () => {
    const bf = new BitField(["a", "b", "c"]);
    bf.set("a").set("c");
    const num = bf.toNumber();
    const bf2 = new BitField(["a", "b", "c"]).fromNumber(num);
    expect(bf2.has("a")).toBe(true);
    expect(bf2.has("b")).toBe(false);
    expect(bf2.has("c")).toBe(true);
  });

  it("clear resets all flags", () => {
    const bf = new BitField(["a", "b"]);
    bf.set("a").set("b").clear();
    expect(bf.toNumber()).toBe(0);
  });

  it("throws on unknown field", () => {
    const bf = new BitField(["a"]);
    expect(() => bf.set("nope")).toThrow("Unknown field");
  });
});
