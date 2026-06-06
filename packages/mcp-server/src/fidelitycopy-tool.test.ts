import { describe, expect, it } from "vitest";
import { fidelitycopyCopy, fidelitypassVerifyCopy } from "./fidelitycopy-tool.js";

describe("fidelitycopy-tool", () => {
  it("copies raw bytes with a PASS receipt", async () => {
    const source = Buffer.from([0, 1, 2, 3, 255]);
    const result = (await fidelitycopyCopy({
      source_base64: source.toString("base64"),
      source_ref: "copyroom://fixtures/raw.bin",
      destination_label: "raw fixture",
      mode: "raw_bytes",
    })) as {
      verdict?: string;
      output_base64?: string;
      receipt?: { mode?: string; verdict?: string; source_hash?: string; output_hash?: string; diff_summary?: string };
    };

    expect(result.verdict).toBe("PASS");
    expect(result.output_base64).toBe(source.toString("base64"));
    expect(result.receipt?.mode).toBe("raw_bytes");
    expect(result.receipt?.verdict).toBe("PASS");
    expect(result.receipt?.source_hash).toBe(result.receipt?.output_hash);
    expect(result.receipt?.diff_summary).toBe("zero-diff");
  });

  it("copies from a CopyRoom source packet without retyping from memory", async () => {
    const sourceText = "Copy this exact prompt.\nKeep spacing.";
    const result = (await fidelitycopyCopy({
      copyroom_source_packet: {
        source_id: "prompt-1",
        source_pointer: "copyroom://prompts/prompt-1",
        text: sourceText,
      },
      output_ref: "copyroom://outputs/prompt-1",
      mode: "text_exact",
      provenance_ref: "boardroom://todo/656728ef",
    })) as {
      verdict?: string;
      output_text?: string;
      receipt?: {
        mode?: string;
        source_ref?: string;
        output_ref?: string;
        verdict?: string;
        source_hash?: string;
        output_hash?: string;
      };
    };

    expect(result.verdict).toBe("PASS");
    expect(result.output_text).toBe(sourceText);
    expect(result.receipt?.mode).toBe("text_exact");
    expect(result.receipt?.source_ref).toBe("copyroom://prompts/prompt-1");
    expect(result.receipt?.output_ref).toBe("copyroom://outputs/prompt-1");
    expect(result.receipt?.source_hash).toBe(result.receipt?.output_hash);
  });

  it("blocks ambiguous CopyRoom source packets mixed with direct source text", async () => {
    const result = (await fidelitycopyCopy({
      copyroom_source_packet: {
        source_id: "prompt-2",
        source_pointer: "copyroom://prompts/prompt-2",
        text: "Packet source.",
      },
      source_text: "Direct source.",
      mode: "text_exact",
    })) as { error?: string };

    expect(result.error).toContain("copyroom_source_packet cannot be combined");
  });

  it("blocks one-character text mutation", async () => {
    const result = (await fidelitypassVerifyCopy({
      source_text: "Protected source copy.",
      output_text: "Protected source capy.",
      mode: "text_exact",
    })) as { verdict?: string; receipt?: { verdict?: string; action_needed?: string[] } };

    expect(result.verdict).toBe("BLOCKER");
    expect(result.receipt?.verdict).toBe("BLOCKER");
    expect(result.receipt?.action_needed?.[0]).toContain("FIDELITY_DRIFT_RISK");
  });

  it("blocks newline drift", async () => {
    const result = (await fidelitypassVerifyCopy({
      source_text: "Line 1\nLine 2",
      output_text: "Line 1\r\nLine 2",
      mode: "text_exact",
    })) as { verdict?: string; receipt?: { diff_summary?: string } };

    expect(result.verdict).toBe("BLOCKER");
    expect(result.receipt?.diff_summary).toContain("changed");
  });

  it("verifies output against a CopyRoom source packet and blocks drift", async () => {
    const result = (await fidelitypassVerifyCopy({
      copyroom_source_packet: {
        source_id: "prompt-3",
        source_pointer: "copyroom://prompts/prompt-3",
        text: "Exact source text.",
      },
      output_text: "Exact source test.",
      mode: "text_exact",
    })) as {
      verdict?: string;
      receipt?: { source_ref?: string; verdict?: string; action_needed?: string[]; diff_summary?: string };
    };

    expect(result.verdict).toBe("BLOCKER");
    expect(result.receipt?.source_ref).toBe("copyroom://prompts/prompt-3");
    expect(result.receipt?.verdict).toBe("BLOCKER");
    expect(result.receipt?.action_needed?.[0]).toContain("FIDELITY_DRIFT_RISK");
    expect(result.receipt?.diff_summary).toContain("changed");
  });

  it("blocks unicode normalization drift", async () => {
    const result = (await fidelitypassVerifyCopy({
      source_text: "cafe\u0301",
      output_text: "caf\u00e9",
      mode: "text_exact",
    })) as { verdict?: string; receipt?: { source_hash?: string; output_hash?: string } };

    expect(result.verdict).toBe("BLOCKER");
    expect(result.receipt?.source_hash).not.toBe(result.receipt?.output_hash);
  });

  it("passes canonical JSON with the same data and different key order", async () => {
    const result = (await fidelitypassVerifyCopy({
      source_text: '{"b":2,"a":1}',
      output_text: '{ "a": 1, "b": 2 }',
      mode: "json_canonical",
    })) as {
      verdict?: string;
      receipt?: {
        source_hash?: string;
        output_hash?: string;
        canonicalization?: { source_canonical_hash?: string; output_canonical_hash?: string };
      };
    };

    expect(result.verdict).toBe("PASS");
    expect(result.receipt?.source_hash).not.toBe(result.receipt?.output_hash);
    expect(result.receipt?.canonicalization?.source_canonical_hash).toBe(
      result.receipt?.canonicalization?.output_canonical_hash,
    );
  });

  it("passes approved transforms only when allowed_changes is present", async () => {
    const blocked = (await fidelitypassVerifyCopy({
      source_text: "lowercase",
      output_text: "LOWERCASE",
      mode: "approved_transform",
    })) as { verdict?: string };

    const passed = (await fidelitypassVerifyCopy({
      source_text: "lowercase",
      output_text: "LOWERCASE",
      mode: "approved_transform",
      allowed_changes: ["uppercase heading transform"],
    })) as { verdict?: string; receipt?: { allowed_changes?: string[] } };

    expect(blocked.verdict).not.toBe("PASS");
    expect(passed.verdict).toBe("PASS");
    expect(passed.receipt?.allowed_changes).toEqual(["uppercase heading transform"]);
  });

  it("suppresses prose-only AI proof without source and output bytes", async () => {
    const result = (await fidelitypassVerifyCopy({
      proof_text: "I copied it exactly, same text.",
    })) as { verdict?: string; error?: string; action_needed?: string[] };

    expect(result.verdict).toBe("SUPPRESS");
    expect(result.error).toContain("FIDELITYCOPY_RECEIPT_REQUIRED");
    expect(result.action_needed?.[0]).toContain("source_text/source_base64");
  });

  it("returns N/A when no exact copy is in scope", async () => {
    const result = (await fidelitypassVerifyCopy({
      exact_copy_required: false,
      scope_reason: "This is copy-quality review, not a 1:1 copy or transcription task.",
      provenance_ref: "boardroom://todo/fidelitypass-na",
    })) as {
      verdict?: string;
      receipt?: { kind?: string; status?: string; verdict?: string; reason?: string; action_needed?: string[] };
      action_needed?: string[];
    };

    expect(result.verdict).toBe("N/A");
    expect(result.receipt?.kind).toBe("fidelitypass_scope_receipt_v1");
    expect(result.receipt?.status).toBe("not_applicable");
    expect(result.receipt?.verdict).toBe("N/A");
    expect(result.receipt?.reason).toContain("copy-quality review");
    expect(result.action_needed).toEqual([]);
  });

  it("accepts copy_scope=not_applicable as the explicit XPass wrapper skip", async () => {
    const result = (await fidelitypassVerifyCopy({
      copy_scope: "not_applicable",
    })) as { verdict?: string; receipt?: { checked_scope?: string; reason?: string } };

    expect(result.verdict).toBe("N/A");
    expect(result.receipt?.checked_scope).toBe("no_exact_copy");
    expect(result.receipt?.reason).toContain("No exact 1:1 copy");
  });

  it("rejects contradictory FidelityPass scope hints", async () => {
    const result = (await fidelitypassVerifyCopy({
      copy_scope: "exact_copy",
      exact_copy_required: false,
    })) as { error?: string };

    expect(result.error).toContain("scope conflict");
  });

  it("rejects malformed base64 instead of creating a fake byte receipt", async () => {
    const result = (await fidelitycopyCopy({
      source_base64: "not valid base64",
      mode: "raw_bytes",
    })) as { error?: string; verdict?: string };

    expect(result.verdict).toBeUndefined();
    expect(result.error).toContain("source_base64 must be valid base64");
  });

  it("fails closed when a provided receipt does not match recomputed bytes", async () => {
    const copied = (await fidelitycopyCopy({
      source_text: "Original exact text",
      mode: "text_exact",
    })) as { receipt?: Record<string, unknown> };

    const result = (await fidelitypassVerifyCopy({
      source_text: "Original exact text",
      output_text: "Changed exact text",
      mode: "text_exact",
      receipt: copied.receipt,
    })) as { verdict?: string; error?: string };

    expect(result.verdict).toBe("BLOCKER");
    expect(result.error).toContain("FIDELITY_RECEIPT_MISMATCH");
  });
});
