import { describe, it, expect } from "vitest";
import { suffixAutomaton } from "./suffixauto-tool.js";

describe("suffixAutomaton", () => {
  it("counts distinct substrings of abcbc", async () => {
    const r = (await suffixAutomaton({ text: "abcbc" })) as any;
    expect(r.distinct_substrings).toBe(12);
    expect(r.text_length).toBe(5);
  });

  it("counts distinct substrings of aaa", async () => {
    const r = (await suffixAutomaton({ text: "aaa" })) as any;
    expect(r.distinct_substrings).toBe(3);
  });

  it("single character", async () => {
    const r = (await suffixAutomaton({ text: "x" })) as any;
    expect(r.distinct_substrings).toBe(1);
    expect(r.state_count).toBe(2);
  });

  it("all unique characters", async () => {
    const r = (await suffixAutomaton({ text: "abcd" })) as any;
    expect(r.distinct_substrings).toBe(10);
  });

  it("stamps meta", async () => {
    const r = (await suffixAutomaton({ text: "test" })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
