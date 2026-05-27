import { describe, expect, it } from "vitest";
import { copypassRun, copypassStatus } from "./copypass-tool.js";

describe("copypass-tool", () => {
  it("requires copy_text", async () => {
    const result = (await copypassRun({})) as { error?: string };
    expect(result.error).toMatch(/copy_text or copyroom_source_packet is required/);
  });

  it("rejects invalid profiles", async () => {
    const result = (await copypassRun({
      copy_text: "Try the new operator stack.",
      profile: "turbo",
    })) as { error?: string };
    expect(result.error).toMatch(/profile must be one of/);
  });

  it("stores an in-memory deterministic run and exposes status", async () => {
    const run = (await copypassRun({
      copy_text: "The ultimate all-in-one solution. Coming soon.",
      channel: "homepage_hero",
      audience: "technical founders",
      goal: "clarity and conversion",
      profile: "smoke",
    })) as {
      run_id?: string;
      status?: string;
      finding_count?: number;
      copypass_verdict?: string;
      checks_attempted?: string[];
      overall_score?: number;
      summary?: { counts_by_severity?: { high?: number }; coverage_note?: string };
      verdict_summary?: { fail?: number };
      findings?: Array<{ check_id?: string }>;
    };

    expect(run.status).toBe("complete");
    expect(run.finding_count).toBeGreaterThan(0);
    expect(run.copypass_verdict).toBe("fail");
    expect(run.overall_score).toBeLessThan(100);
    expect(run.checks_attempted).toContain("internal-consistency");
    expect(run.summary?.coverage_note).toContain("caller-provided");
    expect(run.summary?.counts_by_severity?.high).toBeGreaterThan(0);
    expect(run.verdict_summary?.fail).toBeGreaterThan(0);
    expect(run.findings?.map((finding) => finding.check_id)).toContain("unsupported-superiority");
    expect(run.run_id).toBeTruthy();

    const status = (await copypassStatus({
      run_id: run.run_id,
    })) as {
      run_id?: string;
      status?: string;
      copypass_verdict?: string;
      checks_attempted?: string[];
      summary?: { posture?: string };
      target?: { channel?: string };
      findings?: Array<{ check_id?: string }>;
    };

    expect(status.run_id).toBe(run.run_id);
    expect(status.status).toBe("complete");
    expect(status.copypass_verdict).toBe("fail");
    expect(status.checks_attempted).toContain("audience-tone-fit");
    expect(status.summary?.posture).toContain("copy risks");
    expect(status.target?.channel).toBe("homepage_hero");
    expect(status.findings?.map((finding) => finding.check_id)).toContain("placeholder-copy");
  });

  it("detects MCP parity checks for tone fit and internal consistency", async () => {
    const run = (await copypassRun({
      copy_text: "Free forever. Paid only after setup fee. This insane billing deal is a no-brainer.",
      channel: "pricing_section",
      audience: "technical buyers",
      goal: "pricing clarity",
      profile: "deep",
    })) as {
      copypass_verdict?: string;
      findings?: Array<{ check_id?: string }>;
      summary?: { counts_by_severity?: { high?: number; medium?: number } };
    };

    const checkIds = run.findings?.map((finding) => finding.check_id) ?? [];

    expect(run.copypass_verdict).toBe("fail");
    expect(checkIds).toContain("internal-consistency");
    expect(checkIds).toContain("audience-tone-fit");
    expect(run.summary?.counts_by_severity?.high).toBeGreaterThan(0);
    expect(run.summary?.counts_by_severity?.medium).toBeGreaterThan(0);
  });

  it("passes clean scoped copy without pretending to certify external truth", async () => {
    const run = (await copypassRun({
      copy_text:
        "UnClick helps teams review AI work with shared context, public proof, and green checks. Start a free review.",
      channel: "homepage_hero",
      audience: "technical founders",
      goal: "clarity and trust",
      profile: "standard",
    })) as {
      status?: string;
      finding_count?: number;
      copypass_verdict?: string;
      overall_score?: number;
      disclaimer?: { compact?: string };
      not_checked?: Array<{ label?: string }>;
    };

    expect(run.status).toBe("complete");
    expect(run.finding_count).toBe(0);
    expect(run.copypass_verdict).toBe("pass");
    expect(run.overall_score).toBe(100);
    expect(run.disclaimer?.compact).toContain("Scoped review only");
    expect(run.not_checked?.map((item) => item.label)).toContain("Legal, brand, or factual approval");
  });

  it("attaches a CopyRoom exact-copy receipt from a source packet", async () => {
    const sourceText = "Line 1\r\nLine 2 with symbols: GBP, EUR, emoji ok";
    const run = (await copypassRun({
      copyroom_required: true,
      copyroom_source_packet: {
        source_id: "jobsmith-checklist-source",
        source_pointer: "apps/jobsmith/docs/copyroom/cv-checklists/cv-checklists_1.md",
        text: sourceText,
      },
      copyroom_output_pointer: "mcp://copypass/runs/jobsmith-checklist-source",
      channel: "jobsmith_rule_source",
      profile: "smoke",
    })) as {
      run_id?: string;
      status?: string;
      copyroom_receipt?: {
        status?: string;
        exact_diff?: string;
        source_pointer?: string;
        output_pointer?: string;
        source_sha256?: string;
        output_sha256?: string;
        byte_count?: number;
        output_byte_count?: number;
        character_count?: number;
        output_character_count?: number;
        newline_style?: string;
      };
    };

    expect(run.status).toBe("complete");
    expect(run.copyroom_receipt?.status).toBe("pass");
    expect(run.copyroom_receipt?.exact_diff).toBe("pass");
    expect(run.copyroom_receipt?.source_pointer).toBe(
      "apps/jobsmith/docs/copyroom/cv-checklists/cv-checklists_1.md",
    );
    expect(run.copyroom_receipt?.output_pointer).toBe("mcp://copypass/runs/jobsmith-checklist-source");
    expect(run.copyroom_receipt?.source_sha256).toBe(run.copyroom_receipt?.output_sha256);
    expect(run.copyroom_receipt?.byte_count).toBe(Buffer.byteLength(sourceText, "utf8"));
    expect(run.copyroom_receipt?.output_byte_count).toBe(run.copyroom_receipt?.byte_count);
    expect(run.copyroom_receipt?.character_count).toBe(Array.from(sourceText).length);
    expect(run.copyroom_receipt?.output_character_count).toBe(run.copyroom_receipt?.character_count);
    expect(run.copyroom_receipt?.newline_style).toBe("crlf");

    const status = (await copypassStatus({
      run_id: run.run_id,
    })) as { copyroom_receipt?: { status?: string; source_sha256?: string; output_sha256?: string } };

    expect(status.copyroom_receipt?.status).toBe("pass");
    expect(status.copyroom_receipt?.source_sha256).toBe(status.copyroom_receipt?.output_sha256);
  });

  it("blocks required CopyRoom receipt runs when the source packet is missing", async () => {
    const result = (await copypassRun({
      copy_text: "Exact source text needs a real CopyRoom packet.",
      copyroom_required: true,
      copyroom_output_pointer: "mcp://copypass/runs/missing-source",
    })) as { error?: string; run_id?: string; copyroom_receipt?: unknown };

    expect(result.run_id).toBeUndefined();
    expect(result.error).toContain("COPYROOM_MISSING");
    expect(result.copyroom_receipt).toBeNull();
  });

  it("still allows non-fidelity CopyPass runs without a CopyRoom packet", async () => {
    const result = (await copypassRun({
      copy_text: "A normal copy review can run without exact-copy proof.",
      profile: "smoke",
    })) as { status?: string; copyroom_receipt?: unknown };

    expect(result.status).toBe("complete");
    expect(result.copyroom_receipt).toBeNull();
  });

  it("blocks CopyRoom source-copy drift before creating a run", async () => {
    const result = (await copypassRun({
      copy_text: "Exact source text must not draft.",
      copyroom_source_packet: {
        source_id: "prompt-source",
        source_pointer: "copyroom://prompts/prompt-source",
        text: "Exact source text must not drift.",
      },
      copyroom_output_pointer: "mcp://copypass/runs/prompt-source",
    })) as {
      error?: string;
      run_id?: string;
      copyroom_receipt?: { status?: string; exact_diff?: string; action_needed?: string[] };
    };

    expect(result.run_id).toBeUndefined();
    expect(result.error).toContain("FIDELITY_DRIFT_RISK");
    expect(result.copyroom_receipt?.status).toBe("blocked");
    expect(result.copyroom_receipt?.exact_diff).toBe("fail");
    expect(result.copyroom_receipt?.action_needed?.[0]).toContain("FIDELITY_DRIFT_RISK");
  });

  it("returns a clear error for missing run ids", async () => {
    const status = (await copypassStatus({
      run_id: "missing-run-id",
    })) as { error?: string };
    expect(status.error).toMatch(/was not found in this MCP session/);
  });
});
