import { describe, it, expect } from "vitest";
import {
  some, none, isSome, isNone, unwrapOption, unwrapOptionOr,
  mapOption, flatMapOption, filterOption, fromNullable, toNullable
} from "../option.js";

describe("option", () => {
  it("some creates Some", () => {
    const opt = some(42);
    expect(isSome(opt)).toBe(true);
    expect(isNone(opt)).toBe(false);
  });

  it("none creates None", () => {
    const opt = none();
    expect(isNone(opt)).toBe(true);
    expect(isSome(opt)).toBe(false);
  });

  it("unwrapOption returns value on Some", () => {
    expect(unwrapOption(some(42))).toBe(42);
  });

  it("unwrapOption throws on None", () => {
    expect(() => unwrapOption(none())).toThrow("Unwrap called on None");
  });

  it("unwrapOptionOr returns value on Some", () => {
    expect(unwrapOptionOr(some(42), 0)).toBe(42);
  });

  it("unwrapOptionOr returns fallback on None", () => {
    expect(unwrapOptionOr(none(), 0)).toBe(0);
  });

  it("mapOption transforms Some", () => {
    const opt = mapOption(some(5), (v: number) => v * 2);
    expect(unwrapOption(opt)).toBe(10);
  });

  it("mapOption passes through None", () => {
    const opt = mapOption(none<number>(), (v: number) => v * 2);
    expect(isNone(opt)).toBe(true);
  });

  it("flatMapOption chains", () => {
    const opt = flatMapOption(some(5), (v: number) => v > 3 ? some(v) : none());
    expect(unwrapOption(opt)).toBe(5);
  });

  it("filterOption keeps matching", () => {
    expect(isSome(filterOption(some(5), (v: number) => v > 3))).toBe(true);
    expect(isNone(filterOption(some(2), (v: number) => v > 3))).toBe(true);
  });

  it("fromNullable converts values", () => {
    expect(isSome(fromNullable(42))).toBe(true);
    expect(isNone(fromNullable(null))).toBe(true);
    expect(isNone(fromNullable(undefined))).toBe(true);
  });

  it("toNullable converts back", () => {
    expect(toNullable(some(42))).toBe(42);
    expect(toNullable(none())).toBe(null);
  });
});
