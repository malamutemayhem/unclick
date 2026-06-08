import { describe, it, expect } from "vitest";
import {
  literal, regex, sequence, choice, zeroOrMore, oneOrMore,
  optional, not, peek, map, lazy, eof, token, sepBy,
} from "../peg-parser.js";

describe("literal", () => {
  it("matches exact string", () => {
    const r = literal("hello")("hello world");
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.value).toBe("hello");
      expect(r.rest).toBe(" world");
    }
  });

  it("fails on mismatch", () => {
    expect(literal("abc")("xyz").ok).toBe(false);
  });
});

describe("regex", () => {
  it("matches pattern", () => {
    const r = regex(/[0-9]+/)("123abc");
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.value).toBe("123");
      expect(r.rest).toBe("abc");
    }
  });
});

describe("sequence", () => {
  it("matches all in order", () => {
    const r = sequence(literal("a"), literal("b"))("abc");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value).toEqual(["a", "b"]);
  });

  it("fails if any part fails", () => {
    expect(sequence(literal("a"), literal("c"))("ab").ok).toBe(false);
  });
});

describe("choice", () => {
  it("picks first match", () => {
    const r = choice(literal("x"), literal("a"))("abc");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value).toBe("a");
  });
});

describe("zeroOrMore", () => {
  it("matches multiple", () => {
    const r = zeroOrMore(literal("a"))("aaab");
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.value).toEqual(["a", "a", "a"]);
      expect(r.rest).toBe("b");
    }
  });

  it("matches zero", () => {
    const r = zeroOrMore(literal("x"))("abc");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value).toEqual([]);
  });
});

describe("oneOrMore", () => {
  it("requires at least one", () => {
    expect(oneOrMore(literal("x"))("abc").ok).toBe(false);
  });

  it("matches multiple", () => {
    const r = oneOrMore(regex(/[a-z]/))("abc123");
    expect(r.ok).toBe(true);
    if (r.ok) expect((r.value as string[]).length).toBe(3);
  });
});

describe("optional", () => {
  it("returns null on no match", () => {
    const r = optional(literal("x"))("abc");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value).toBeNull();
  });
});

describe("not and peek", () => {
  it("not succeeds when rule fails", () => {
    expect(not(literal("x"))("abc").ok).toBe(true);
  });

  it("peek does not consume", () => {
    const r = peek(literal("a"))("abc");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.rest).toBe("abc");
  });
});

describe("map", () => {
  it("transforms result", () => {
    const num = map(regex(/[0-9]+/), (v) => Number(v));
    const r = num("42rest");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value).toBe(42);
  });
});

describe("sepBy", () => {
  it("parses comma-separated values", () => {
    const num = regex(/[0-9]+/);
    const r = sepBy(num, literal(","))("1,2,3");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value).toEqual(["1", "2", "3"]);
  });

  it("returns empty on no match", () => {
    const r = sepBy(literal("x"), literal(","))("abc");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value).toEqual([]);
  });
});

describe("eof", () => {
  it("matches end of input", () => {
    expect(eof()("").ok).toBe(true);
    expect(eof()("x").ok).toBe(false);
  });
});

describe("lazy", () => {
  it("defers rule creation", () => {
    const r = lazy(() => literal("hello"));
    expect(r("hello").ok).toBe(true);
  });
});
