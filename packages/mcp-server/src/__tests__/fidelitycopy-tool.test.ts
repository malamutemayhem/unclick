import { describe, expect, it } from "vitest";

import { ADDITIONAL_HANDLERS, ADDITIONAL_TOOLS } from "../tool-wiring.js";
import { fidelitycopyCopy, fidelitypassVerifyCopy } from "../fidelitycopy-tool.js";

describe("FidelityCopy deterministic copy tools", () => {
  it("registers fidelitycopy_copy and fidelitypass_verify_copy", () => {
    const names = ADDITIONAL_TOOLS.map((tool) => tool.name);
    expect(names).toContain("fidelitycopy_copy");
    expect(names).toContain("fidelitypass_verify_copy");
    expect(ADDITIONAL_HANDLERS).toHaveProperty("fidelitycopy_copy");
    expect(ADDITIONAL_HANDLERS).toHaveProperty("fidelitypass_verify_copy");
  });

  it("creates a raw byte exact PASS receipt", async () => {
    const source = Buffer.from("raw\0bytes\r\nsame", "utf8").toString("base64");
    const result = (await fidelitycopyCopy({
      source_ref: "copyroom://raw/source",
      destination_ref: "copyroom://raw/output",
      source_base64: source,
      mode: "raw_bytes",
    })) as { status?: string; verdict?: string; receipt?: { source_hash?: string; output_hash?: string; byte_count?: number } };

    expect(result.status).toBe("pass");
    expect(result.verdict).toBe("pass");
    expect(result.receipt?.source_hash).toBe(result.receipt?.output_hash);
    expect(result.receipt?.byte_count).toBe(Buffer.byteLength("raw\0bytes\r\nsame", "utf8"));
  });

  it("blocks newline drift in text_exact mode", async () => {
    const result = (await fidelitycopyCopy({
      source_ref: "copyroom://text/source",
      destination_ref: "copyroom://text/output",
      source_text: "Line 1\r\nLine 2",
      output_text: "Line 1\nLine 2",
      mode: "text_exact",
    })) as { status?: string; verdict?: string; receipt?: { output_newline_style?: string; action_needed?: string[] } };

    expect(result.status).toBe("blocked");
    expect(result.verdict).toBe("blocker");
    expect(result.receipt?.output_newline_style).toBe("lf");
    expect(result.receipt?.action_needed?.[0]).toContain("FIDELITY_DRIFT_RISK");
  });

  it("blocks UTF-8 normalization drift", async () => {
    const composed = "Cafe\u00e9";
    const decomposed = "Cafe\u0065\u0301";
    const result = (await fidelitypassVerifyCopy({
      source_ref: "copyroom://unicode/source",
      output_ref: "copyroom://unicode/output",
      source_text: composed,
      output_text: decomposed,
      mode: "text_exact",
    })) as { pass?: boolean; verdict?: string; receipt?: { source_hash?: string; output_hash?: string } };

    expect(result.pass).toBe(false);
    expect(result.verdict).toBe("blocker");
    expect(result.receipt?.source_hash).not.toBe(result.receipt?.output_hash);
  });

  it("passes JSON canonical copies with different key order", async () => {
    const result = (await fidelitypassVerifyCopy({
      source_ref: "copyroom://json/source",
      output_ref: "copyroom://json/output",
      source_text: '{ "b": 2, "a": { "z": true, "m": [3, 2, 1] } }',
      output_text: '{"a":{"m":[3,2,1],"z":true},"b":2}',
      mode: "json_canonical",
    })) as {
      pass?: boolean;
      receipt?: { canonicalization_mode?: string; source_canonical_hash?: string; output_canonical_hash?: string };
    };

    expect(result.pass).toBe(true);
    expect(result.receipt?.canonicalization_mode).toBe("json_sort_keys");
    expect(result.receipt?.source_canonical_hash).toBe(result.receipt?.output_canonical_hash);
  });

  it("passes approved transforms only with explicit transform proof", async () => {
    const result = (await fidelitycopyCopy({
      source_ref: "copyroom://transform/source",
      destination_ref: "copyroom://transform/output",
      source_text: "Name: Chris\n",
      output_text: "Name: Chris",
      mode: "approved_transform",
      approved_transform_ref: "transform://trim-final-newline/v1",
      allowed_changes: ["trim final newline"],
    })) as { status?: string; verdict?: string; receipt?: { approved_transform_ref?: string; allowed_changes?: string[] } };

    expect(result.status).toBe("pass");
    expect(result.verdict).toBe("pass");
    expect(result.receipt?.approved_transform_ref).toBe("transform://trim-final-newline/v1");
    expect(result.receipt?.allowed_changes).toEqual(["trim final newline"]);
  });

  it("suppresses AI retype attempts even when text matches", async () => {
    const result = (await fidelitycopyCopy({
      source_ref: "copyroom://ai-retype/source",
      destination_ref: "copyroom://ai-retype/output",
      source_text: "Exact prompt text",
      output_text: "Exact prompt text",
      mode: "text_exact",
      output_provenance: "ai_retype",
    })) as { status?: string; verdict?: string; receipt?: { action_needed?: string[]; output_provenance?: string } };

    expect(result.status).toBe("blocked");
    expect(result.verdict).toBe("suppress");
    expect(result.receipt?.output_provenance).toBe("ai_retype");
    expect(result.receipt?.action_needed?.[0]).toContain("AI_RETYPE_SUPPRESS");
  });

  it("verifies stored receipts by receipt_id", async () => {
    const copy = (await fidelitycopyCopy({
      source_ref: "copyroom://stored/source",
      destination_ref: "copyroom://stored/output",
      source_text: "Stored receipt proof",
      mode: "raw_bytes",
    })) as { receipt_id?: string };

    const verify = (await fidelitypassVerifyCopy({
      receipt_id: copy.receipt_id,
    })) as { pass?: boolean; verified_from?: string; receipt_id?: string };

    expect(verify.pass).toBe(true);
    expect(verify.verified_from).toBe("receipt");
    expect(verify.receipt_id).toBe(copy.receipt_id);
  });
});
