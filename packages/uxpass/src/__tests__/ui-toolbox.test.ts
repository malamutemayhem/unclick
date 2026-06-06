import { describe, expect, it } from "vitest";
import {
  UI_TOOLBOX_GATE_IDS,
  UI_TOOLBOX_SOURCES,
  UI_TOOLBOX_SOURCE_IDS,
  assessUIToolboxCandidate,
  buildUIToolboxScoreboard,
  getUIToolboxSource,
  recommendedUIToolboxSources,
} from "../ui-toolbox.js";

const completeEvidence = Object.fromEntries(
  UI_TOOLBOX_GATE_IDS.map((gate) => [gate, true]),
);

describe("UI_TOOLBOX_SOURCES", () => {
  it("keeps source ids unique and aligned with the exported id list", () => {
    const ids = UI_TOOLBOX_SOURCES.map((source) => source.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toEqual([...UI_TOOLBOX_SOURCE_IDS]);
  });

  it("includes the highly recommended UI toolbox sources", () => {
    expect(getUIToolboxSource("shadcn-ui")?.tier).toBe("core");
    expect(getUIToolboxSource("radix-ui")?.tier).toBe("core");
    expect(getUIToolboxSource("react-aria-components")?.tier).toBe("core");
    expect(getUIToolboxSource("base-ui")?.tier).toBe("core");
    expect(getUIToolboxSource("motion")?.tier).toBe("core");
    expect(getUIToolboxSource("21st-dev")?.tier).toBe("recommended");
    expect(getUIToolboxSource("magic-ui")?.tier).toBe("recommended");
    expect(getUIToolboxSource("aceternity-ui")?.tier).toBe("recommended");
    expect(getUIToolboxSource("origin-ui")?.tier).toBe("recommended");
  });

  it("returns only core and recommended sources for the default shortlist", () => {
    const tiers = new Set(recommendedUIToolboxSources().map((source) => source.tier));
    expect([...tiers].sort()).toEqual(["core", "recommended"]);
    expect(recommendedUIToolboxSources().map((source) => source.id)).toContain("21st-dev");
  });
});

describe("assessUIToolboxCandidate", () => {
  it("approves a core source when all required gates have evidence", () => {
    const result = assessUIToolboxCandidate({
      source_id: "motion",
      component_name: "AnimatedToolbar",
      evidence: completeEvidence,
    });
    expect(result.status).toBe("approved");
    expect(result.missing_gates).toEqual([]);
  });

  it("requires provenance, reduced motion, mobile, performance, brand, and screenshot proof for 21st.dev", () => {
    const result = assessUIToolboxCandidate({
      source_id: "21st-dev",
      component_name: "Scroll Morph Hero",
      evidence: {
        "source-provenance": "https://21st.dev/r/example/scroll-morph-hero",
        "license-ok": true,
      },
    });
    expect(result.status).toBe("needs-proof");
    expect(result.missing_gates).toEqual([
      "a11y-primitive",
      "design-system-fit",
      "mobile-fit",
      "reduced-motion",
      "performance-budget",
      "brand-fit",
      "product-specificity",
      "screenshot-proof",
    ]);
  });

  it("blocks advisory-only sources as component sources", () => {
    const result = assessUIToolboxCandidate({
      source_id: "ui-ux-pro-max",
      intended_use: "Install generated hero component",
      evidence: completeEvidence,
    });
    expect(result.status).toBe("blocked");
    expect(result.warnings.join(" ")).toMatch(/Advisory source only/);
  });

  it("fails closed on unknown sources", () => {
    const result = assessUIToolboxCandidate({ source_id: "random-gallery-pack" });
    expect(result.status).toBe("unknown-source");
    expect(result.next_action).toMatch(/Add the source/);
  });
});

describe("buildUIToolboxScoreboard", () => {
  it("summarises approved, blocked, unknown, and needs-proof candidates", () => {
    const scoreboard = buildUIToolboxScoreboard([
      { source_id: "shadcn-ui", evidence: completeEvidence },
      { source_id: "21st-dev", evidence: { "source-provenance": true, "license-ok": true } },
      { source_id: "ui-ux-pro-max", evidence: completeEvidence },
      { source_id: "unknown-kit" },
    ]);

    expect(scoreboard).toMatchObject({
      total: 4,
      approved: 1,
      needs_proof: 1,
      blocked: 1,
      unknown_source: 1,
    });
    expect(scoreboard.by_tier.core).toBe(1);
    expect(scoreboard.by_tier.recommended).toBe(1);
    expect(scoreboard.by_tier.advisory).toBe(1);
    expect(scoreboard.missing_gate_counts["screenshot-proof"]).toBeGreaterThanOrEqual(1);
    expect(scoreboard.recommended_next_action).toMatch(/Replace blocked or unknown sources/);
  });
});
