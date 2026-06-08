import { describe, it, expect } from "vitest";
import { ContractValidator } from "../contract-validator.js";

describe("ContractValidator", () => {
  it("string validates strings", () => {
    expect(ContractValidator.string()("hello").valid).toBe(true);
    expect(ContractValidator.string()(123).valid).toBe(false);
  });

  it("number validates numbers", () => {
    expect(ContractValidator.number()(42).valid).toBe(true);
    expect(ContractValidator.number()(NaN).valid).toBe(false);
  });

  it("boolean validates booleans", () => {
    expect(ContractValidator.boolean()(true).valid).toBe(true);
    expect(ContractValidator.boolean()("true").valid).toBe(false);
  });

  it("minLength checks string length", () => {
    expect(ContractValidator.minLength(3)("abc").valid).toBe(true);
    expect(ContractValidator.minLength(3)("ab").valid).toBe(false);
  });

  it("range checks numeric range", () => {
    expect(ContractValidator.range(0, 10)(5).valid).toBe(true);
    expect(ContractValidator.range(0, 10)(15).valid).toBe(false);
  });

  it("pattern checks regex", () => {
    expect(ContractValidator.pattern(/^\d+$/)("123").valid).toBe(true);
    expect(ContractValidator.pattern(/^\d+$/)("abc").valid).toBe(false);
  });

  it("oneOf checks membership", () => {
    expect(ContractValidator.oneOf(["a", "b"])("a").valid).toBe(true);
    expect(ContractValidator.oneOf(["a", "b"])("c").valid).toBe(false);
  });

  it("array validates items", () => {
    const v = ContractValidator.array(ContractValidator.number());
    expect(v([1, 2, 3]).valid).toBe(true);
    expect(v([1, "two"]).valid).toBe(false);
  });

  it("object validates schema", () => {
    const v = ContractValidator.object({
      name: ContractValidator.string(),
      age: ContractValidator.number(),
    });
    expect(v({ name: "Alice", age: 30 }).valid).toBe(true);
    expect(v({ name: "Bob", age: "thirty" }).valid).toBe(false);
  });

  it("optional allows null/undefined", () => {
    const v = ContractValidator.optional(ContractValidator.number());
    expect(v(undefined).valid).toBe(true);
    expect(v(null).valid).toBe(true);
    expect(v(42).valid).toBe(true);
    expect(v("hi").valid).toBe(false);
  });

  it("all requires all validators to pass", () => {
    const v = ContractValidator.all(ContractValidator.string(), ContractValidator.minLength(3));
    expect(v("hello").valid).toBe(true);
    expect(v("hi").valid).toBe(false);
  });

  it("any requires at least one validator to pass", () => {
    const v = ContractValidator.any(ContractValidator.string(), ContractValidator.number());
    expect(v("hello").valid).toBe(true);
    expect(v(42).valid).toBe(true);
    expect(v(true).valid).toBe(false);
  });
});
