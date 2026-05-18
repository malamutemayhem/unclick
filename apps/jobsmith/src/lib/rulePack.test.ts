import { describe, expect, it } from "vitest";
import {
  EM_DASH_RULE,
  GPT4_LEXICON,
  GPT4_LEXICON_RULE,
  JOBSMITH_UNIVERSAL_RULES_V1,
  lookupRuleCheck,
  regexRuleCheck,
  runRulePack,
  type Rule,
} from "./rulePack";

describe("runRulePack engine", () => {
  it("returns errorFree=true and zero totals on empty rule pack", () => {
    const result = runRulePack("anything", []);
    expect(result.violations).toEqual([]);
    expect(result.totals).toEqual({ ERROR: 0, WARN: 0, INFO: 0 });
    expect(result.errorFree).toBe(true);
    expect(Object.values(result.byBand).reduce((acc, n) => acc + n, 0)).toBe(0);
  });

  it("aggregates totals by severity and band in rule-declaration order", () => {
    const text = "I will delve into a vibrant tapestry — really crucial work.";
    const result = runRulePack(text, JOBSMITH_UNIVERSAL_RULES_V1);

    const ids = result.violations.map((v) => v.ruleId);
    expect(ids.indexOf("B3-em-dash")).toBeLessThan(ids.indexOf("B3-gpt4-lexicon"));

    expect(result.totals.ERROR).toBeGreaterThan(0);
    expect(result.totals.WARN).toBeGreaterThan(0);
    expect(result.errorFree).toBe(false);
    expect(result.byBand["ai-tell-vocabulary"]).toBe(result.violations.length);
  });

  it("isolates rule pack mutations: re-running on the same text reproduces identical output", () => {
    const text = "delve, delve, delve — and a vibrant tapestry.";
    const a = runRulePack(text, JOBSMITH_UNIVERSAL_RULES_V1);
    const b = runRulePack(text, JOBSMITH_UNIVERSAL_RULES_V1);
    expect(a).toEqual(b);
  });
});

describe("EM_DASH_RULE", () => {
  it("flags em dash and en dash with ERROR severity and exact offsets", () => {
    const text = "Hello \u2014 world, and also \u2013 cheers.";
    const violations = EM_DASH_RULE.check(text);
    expect(violations).toHaveLength(2);
    expect(violations[0]).toMatchObject({
      ruleId: "B3-em-dash",
      band: "ai-tell-vocabulary",
      severity: "ERROR",
      match: "\u2014",
    });
    expect(text.slice(violations[0].start, violations[0].end)).toBe("\u2014");
    expect(text.slice(violations[1].start, violations[1].end)).toBe("\u2013");
  });

  it("passes clean text without dashes", () => {
    expect(EM_DASH_RULE.check("Clean copy. No dashes. Plain commas, colons: and full stops.")).toEqual([]);
  });

  it("does not match regular hyphens or minus signs", () => {
    expect(EM_DASH_RULE.check("Self-employed designer earned -5% revenue dip in Q1.")).toEqual([]);
  });
});

describe("GPT4_LEXICON_RULE", () => {
  it("flags lexicon words case-insensitively and surfaces the matched term", () => {
    const text = "I will Delve into the intricate tapestry of leverage.";
    const violations = GPT4_LEXICON_RULE.check(text);
    const matched = violations.map((v) => v.match.toLowerCase());
    expect(matched).toEqual(expect.arrayContaining(["delve", "intricate", "tapestry", "leverage"]));
    for (const v of violations) {
      expect(v.severity).toBe("WARN");
      expect(v.band).toBe("ai-tell-vocabulary");
    }
  });

  it("does not match lexicon substrings inside larger words", () => {
    expect(GPT4_LEXICON_RULE.check("Subleveraged tapestries are irrelevant.")).toEqual([]);
  });

  it("covers every term in the curated GPT4_LEXICON list", () => {
    for (const term of GPT4_LEXICON) {
      const violations = GPT4_LEXICON_RULE.check(`Sentence containing ${term} once.`);
      expect(violations).toHaveLength(1);
      expect(violations[0].match.toLowerCase()).toBe(term);
    }
  });
});

describe("regexRuleCheck builder", () => {
  it("throws when the pattern is missing the global flag", () => {
    expect(() =>
      regexRuleCheck({
        ruleId: "test-non-global",
        band: "ai-tell-vocabulary",
        severity: "INFO",
        pattern: /abc/,
        messageFor: () => "non-global pattern",
      }),
    ).toThrow(/global flag/);
  });

  it("does not get stuck on zero-width matches", () => {
    const check = regexRuleCheck({
      ruleId: "test-zero-width",
      band: "ai-tell-vocabulary",
      severity: "INFO",
      pattern: /(?=word)/g,
      messageFor: () => "boundary",
    });
    expect(() => check("word word word")).not.toThrow();
  });
});

describe("lookupRuleCheck builder", () => {
  it("returns an empty check for an empty lexicon", () => {
    const check = lookupRuleCheck({
      ruleId: "test-empty",
      band: "ai-tell-vocabulary",
      severity: "INFO",
      lexicon: [],
      messageFor: () => "empty",
    });
    expect(check("delve into the tapestry")).toEqual([]);
  });

  it("escapes regex metacharacters in lexicon terms so dots match literally", () => {
    const rule: Rule = {
      id: "test-meta",
      band: "ai-tell-vocabulary",
      severity: "INFO",
      summary: "test metachars",
      checkKind: "lookup",
      source: "test",
      check: lookupRuleCheck({
        ruleId: "test-meta",
        band: "ai-tell-vocabulary",
        severity: "INFO",
        lexicon: ["a.b"],
        messageFor: (term) => `matched ${term}`,
      }),
    };
    // The literal "a.b" should match, but "axb" must NOT match because the
    // dot is escaped rather than treated as a regex wildcard.
    expect(rule.check("see a.b here").map((v) => v.match)).toEqual(["a.b"]);
    expect(rule.check("see axb here")).toEqual([]);
  });
});

describe("JOBSMITH_UNIVERSAL_RULES_V1 contract", () => {
  it("declares stable ids that match the canonical markdown source", () => {
    const ids = JOBSMITH_UNIVERSAL_RULES_V1.map((r) => r.id);
    expect(ids).toEqual(["B3-em-dash", "B3-gpt4-lexicon"]);
  });

  it("every rule cites a source", () => {
    for (const rule of JOBSMITH_UNIVERSAL_RULES_V1) {
      expect(rule.source.length).toBeGreaterThan(0);
    }
  });

  it("severity tally over the seed pack matches docs counts (1 ERROR, 1 WARN, 0 INFO)", () => {
    const counts = { ERROR: 0, WARN: 0, INFO: 0 } as Record<string, number>;
    for (const rule of JOBSMITH_UNIVERSAL_RULES_V1) {
      counts[rule.severity] += 1;
    }
    expect(counts).toEqual({ ERROR: 1, WARN: 1, INFO: 0 });
  });
});
