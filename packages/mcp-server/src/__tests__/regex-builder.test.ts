import { describe, it, expect } from "vitest";
import { RegexBuilder, regex } from "../regex-builder.js";

describe("RegexBuilder", () => {
  it("builds literal patterns", () => {
    const re = regex().literal("hello.world").build();
    expect(re.test("hello.world")).toBe(true);
    expect(re.test("helloxworld")).toBe(false);
  });

  it("builds digit patterns", () => {
    const re = regex().startOfLine().digits().endOfLine().build();
    expect(re.test("12345")).toBe(true);
    expect(re.test("abc")).toBe(false);
  });

  it("builds word patterns", () => {
    const re = regex().words().build();
    expect(re.test("hello")).toBe(true);
  });

  it("handles anyOf and noneOf", () => {
    const re = regex().startOfLine().anyOf("aeiou").endOfLine().build();
    expect(re.test("a")).toBe(true);
    expect(re.test("b")).toBe(false);

    const re2 = regex().startOfLine().noneOf("aeiou").endOfLine().build();
    expect(re2.test("b")).toBe(true);
    expect(re2.test("a")).toBe(false);
  });

  it("handles groups", () => {
    const re = regex()
      .group((b) => b.digits())
      .build();
    const match = "abc123".match(re);
    expect(match).not.toBeNull();
    expect(match![1]).toBe("123");
  });

  it("handles named groups", () => {
    const re = regex()
      .group((b) => b.digits(), "num")
      .build();
    const match = "abc123".match(re);
    expect(match!.groups!.num).toBe("123");
  });

  it("handles optional", () => {
    const re = regex().startOfLine().literal("colour").literal("s").optional().endOfLine().build();
    expect(re.test("colour")).toBe(true);
    expect(re.test("colours")).toBe(true);
  });

  it("handles repeat", () => {
    const re = regex().startOfLine().digit().repeat(3).endOfLine().build();
    expect(re.test("123")).toBe(true);
    expect(re.test("12")).toBe(false);
    expect(re.test("1234")).toBe(false);
  });

  it("handles repeat range", () => {
    const re = regex().startOfLine().digit().repeat(2, 4).endOfLine().build();
    expect(re.test("12")).toBe(true);
    expect(re.test("1234")).toBe(true);
    expect(re.test("1")).toBe(false);
  });

  it("handles flags", () => {
    const re = regex().literal("hello").global().caseInsensitive().build();
    expect(re.flags).toContain("g");
    expect(re.flags).toContain("i");
    expect(re.test("HELLO")).toBe(true);
  });

  it("handles or", () => {
    const re = regex().startOfLine()
      .literal("cat").or((b) => b.literal("dog"))
      .endOfLine().build();
    expect(re.test("cat")).toBe(true);
    expect(re.test("dog")).toBe(true);
    expect(re.test("fish")).toBe(false);
  });

  it("toString returns pattern", () => {
    const b = regex().literal("hi").digits();
    expect(b.toString()).toBe("hi\\d+");
  });

  it("handles lookahead", () => {
    const re = regex().words().lookahead((b) => b.literal("!")).build();
    const match = "hello!".match(re);
    expect(match![0]).toBe("hello");
  });

  it("handles non-capture group", () => {
    const re = regex().nonCapture((b) => b.literal("ab")).oneOrMore().build();
    expect(re.test("ababab")).toBe(true);
  });
});
