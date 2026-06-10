import { describe, test } from "node:test";
import assert from "node:assert/strict";

import {
  classifyTools,
  lookupEntry,
  buildToolGuidance,
  searchToolIndex,
  buildCapabilityBriefing,
  TOOL_AWARENESS,
  type DetectedTool,
} from "../tool-awareness.js";

describe("classifyTools", () => {
  test("returns empty for an empty tool list", () => {
    assert.deepEqual(classifyTools([]), []);
  });

  test("detects a conflicting tool (Mem0) by exact pattern", () => {
    const result = classifyTools(["add-memory", "some_other_tool"]);
    assert.equal(result.length, 1);
    assert.equal(result[0].tool_name, "Mem0");
    assert.equal(result[0].classification, "conflicting");
    assert.equal(result[0].tool_category, "memory");
    assert.ok(result[0].matched_patterns.includes("add-memory"));
  });

  test("detects a replaceable tool (Exa)", () => {
    const result = classifyTools(["web_search_exa"]);
    assert.equal(result.length, 1);
    assert.equal(result[0].tool_name, "Exa");
    assert.equal(result[0].classification, "replaceable");
  });

  test("detects a compatible tool (GitHub)", () => {
    const result = classifyTools(["create_issue"]);
    assert.equal(result.length, 1);
    assert.equal(result[0].tool_name, "GitHub");
    assert.equal(result[0].classification, "compatible");
  });

  test("detects prefix-based patterns (Zep uses trailing underscore)", () => {
    const result = classifyTools(["zep_memory_store"]);
    assert.equal(result.length, 1);
    assert.equal(result[0].tool_name, "Zep");
  });

  test("deduplicates when multiple patterns match the same integration", () => {
    const result = classifyTools(["add-memory", "search-memories"]);
    const mem0 = result.filter((d) => d.tool_name === "Mem0");
    assert.equal(mem0.length, 1);
  });

  test("detects multiple integrations simultaneously", () => {
    const result = classifyTools([
      "add-memory",
      "web_search_exa",
      "create_issue",
    ]);
    const names = result.map((d) => d.tool_name);
    assert.ok(names.includes("Mem0"));
    assert.ok(names.includes("Exa"));
    assert.ok(names.includes("GitHub"));
  });

  test("returns nothing for unrecognized tool names", () => {
    assert.deepEqual(classifyTools(["my_custom_tool", "another_tool"]), []);
  });

  test("matches tools with underscore-based prefix patterns", () => {
    const result = classifyTools(["hindsight_recall"]);
    assert.equal(result[0].tool_name, "Hindsight");
  });

  test("matches Firecrawl replaceable tools", () => {
    const result = classifyTools(["firecrawl_scrape"]);
    assert.equal(result[0].tool_name, "Firecrawl");
    assert.equal(result[0].classification, "replaceable");
    assert.equal(result[0].tool_category, "scraping");
  });
});

describe("lookupEntry", () => {
  test("finds a conflicting entry by name", () => {
    const entry = lookupEntry("Mem0");
    assert.ok(entry !== null);
    assert.equal(entry!.name, "Mem0");
  });

  test("finds a replaceable entry by name", () => {
    const entry = lookupEntry("Exa");
    assert.ok(entry !== null);
    assert.equal(entry!.name, "Exa");
  });

  test("finds a compatible entry by name", () => {
    const entry = lookupEntry("Slack");
    assert.ok(entry !== null);
    assert.equal(entry!.name, "Slack");
  });

  test("returns null for unknown tool name", () => {
    assert.equal(lookupEntry("NonExistent"), null);
  });
});

describe("buildToolGuidance", () => {
  test("places conflicting tools in conflicts when nudgeable", () => {
    const detections: DetectedTool[] = [
      { tool_name: "Mem0", tool_category: "memory", classification: "conflicting", matched_patterns: ["add-memory"] },
    ];
    const guidance = buildToolGuidance(detections, new Set(["Mem0"]));
    assert.equal(guidance.conflicts.length, 1);
    assert.equal(guidance.conflicts[0].tool, "Mem0");
    assert.equal(guidance.conflicts[0].severity, "high");
    assert.equal(guidance.conflicts[0].action, "remove");
    assert.ok(guidance.conflicts[0].instructions !== undefined);
  });

  test("skips conflicting tools that are not nudgeable", () => {
    const detections: DetectedTool[] = [
      { tool_name: "Mem0", tool_category: "memory", classification: "conflicting", matched_patterns: ["add-memory"] },
    ];
    const guidance = buildToolGuidance(detections, new Set());
    assert.equal(guidance.conflicts.length, 0);
  });

  test("places replaceable tools in suggestions when nudgeable", () => {
    const detections: DetectedTool[] = [
      { tool_name: "Exa", tool_category: "search", classification: "replaceable", matched_patterns: ["web_search_exa"] },
    ];
    const guidance = buildToolGuidance(detections, new Set(["Exa"]));
    assert.equal(guidance.suggestions.length, 1);
    assert.equal(guidance.suggestions[0].tool, "Exa");
    assert.equal(guidance.suggestions[0].severity, "info");
    assert.equal(guidance.suggestions[0].action, "try_alternative");
    assert.equal(guidance.suggestions[0].alternative, "web_search");
  });

  test("places compatible tools in the compatible list", () => {
    const detections: DetectedTool[] = [
      { tool_name: "GitHub", tool_category: "dev", classification: "compatible", matched_patterns: ["create_issue"] },
    ];
    const guidance = buildToolGuidance(detections, new Set());
    assert.deepEqual(guidance.compatible, ["GitHub"]);
    assert.equal(guidance.conflicts.length, 0);
    assert.equal(guidance.suggestions.length, 0);
  });

  test("handles mixed detections", () => {
    const detections: DetectedTool[] = [
      { tool_name: "Mem0", tool_category: "memory", classification: "conflicting", matched_patterns: ["add-memory"] },
      { tool_name: "Exa", tool_category: "search", classification: "replaceable", matched_patterns: ["web_search_exa"] },
      { tool_name: "Slack", tool_category: "comms", classification: "compatible", matched_patterns: ["slack_send"] },
    ];
    const guidance = buildToolGuidance(detections, new Set(["Mem0", "Exa"]));
    assert.equal(guidance.conflicts.length, 1);
    assert.equal(guidance.suggestions.length, 1);
    assert.deepEqual(guidance.compatible, ["Slack"]);
  });
});

describe("searchToolIndex", () => {
  test("returns empty for empty query", () => {
    assert.deepEqual(searchToolIndex(""), []);
  });

  test("returns empty for stopwords-only query", () => {
    assert.deepEqual(searchToolIndex("the and for from"), []);
  });

  test("respects limit parameter", () => {
    const results = searchToolIndex("weather forecast", 2);
    assert.ok(results.length <= 2);
  });

  test("returns results with app, name, and description", () => {
    const results = searchToolIndex("weather forecast");
    if (results.length > 0) {
      assert.ok("app" in results[0]);
      assert.ok("name" in results[0]);
      assert.ok("description" in results[0]);
    }
  });

  test("boosts exact app name matches", () => {
    const results = searchToolIndex("spotify");
    if (results.length > 0) {
      assert.ok(results.some((r) => r.app === "spotify"));
    }
  });
});

describe("buildCapabilityBriefing", () => {
  test("returns instruction, how, and areas fields", () => {
    const briefing = buildCapabilityBriefing();
    assert.ok(typeof briefing.instruction === "string");
    assert.ok(briefing.instruction.length > 0);
    assert.ok(typeof briefing.how === "string");
    assert.ok(Array.isArray(briefing.areas));
    assert.ok(briefing.areas.length > 0);
  });

  test("areas contain arrow-separated intent and app mappings", () => {
    const briefing = buildCapabilityBriefing();
    const arrowAreas = briefing.areas.filter((a) => a.includes("->"));
    assert.ok(arrowAreas.length > 0);
  });
});

describe("TOOL_AWARENESS catalog integrity", () => {
  test("every entry has a name and at least one pattern", () => {
    for (const list of [TOOL_AWARENESS.conflicting, TOOL_AWARENESS.replaceable, TOOL_AWARENESS.compatible]) {
      for (const entry of list) {
        assert.ok(entry.name.length > 0, `entry missing name`);
        assert.ok(entry.toolPatterns.length > 0, `${entry.name} has no patterns`);
      }
    }
  });

  test("conflicting entries all have nudge messages", () => {
    for (const entry of TOOL_AWARENESS.conflicting) {
      assert.ok(entry.nudgeMessage, `${entry.name} missing nudgeMessage`);
    }
  });

  test("replaceable entries all have nudge messages and alternatives", () => {
    for (const entry of TOOL_AWARENESS.replaceable) {
      assert.ok(entry.nudgeMessage, `${entry.name} missing nudgeMessage`);
      assert.ok(entry.unclickAlternative, `${entry.name} missing unclickAlternative`);
    }
  });
});
