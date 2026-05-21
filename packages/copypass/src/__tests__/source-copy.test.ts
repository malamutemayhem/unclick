import { describe, expect, it } from "vitest";
import {
  CopyRoomCopyError,
  copyFromCopyRoomSourcePacket,
  createCopyRoomSourcePacket,
  verifyCopyRoomExactCopy,
} from "../source-copy.js";

describe("CopyRoom exact source copy", () => {
  it("copies source text without byte or character drift and emits a receipt", () => {
    const sourceText = "Prompt: keep this line exactly\r\nLabel: cafe\r\nCode: const value = 1;\r\n";
    const source = createCopyRoomSourcePacket({
      source_pointer: "copyroom://jobsmith/source.md",
      text: sourceText,
    });
    const result = copyFromCopyRoomSourcePacket({
      source,
      output_pointer: "boardroom://todo/59955cb6/receipt.md",
    });

    expect(result.output.text).toBe(sourceText);
    expect(result.output.bytes_base64).toBe(source.bytes_base64);
    expect(result.receipt.source_pointer).toBe("copyroom://jobsmith/source.md");
    expect(result.receipt.output_pointer).toBe("boardroom://todo/59955cb6/receipt.md");
    expect(result.receipt.source_hash).toBe(result.receipt.output_hash);
    expect(result.receipt.source_byte_count).toBe(Buffer.byteLength(sourceText, "utf8"));
    expect(result.receipt.output_byte_count).toBe(Buffer.byteLength(sourceText, "utf8"));
    expect(result.receipt.source_character_count).toBe(Array.from(sourceText).length);
    expect(result.receipt.output_character_count).toBe(Array.from(sourceText).length);
    expect(result.receipt.diff).toEqual({
      status: "pass",
      hash_match: true,
      byte_count_delta: 0,
      character_count_delta: 0,
    });
  });

  it("keeps receipts stable across many programmatic copies", () => {
    const source = createCopyRoomSourcePacket({
      source_pointer: "copyroom://docs/table.tsv",
      text: "label\tvalue\r\nAlpha\t1\r\nBeta\t2\r\n",
    });
    const receiptIds = new Set<string>();
    const hashes = new Set<string>();

    for (let index = 0; index < 10_000; index += 1) {
      const { receipt } = copyFromCopyRoomSourcePacket({
        source,
        output_pointer: "boardroom://todo/59955cb6/table.tsv",
      });

      receiptIds.add(receipt.receipt_id);
      hashes.add(receipt.output_hash);
      expect(receipt.diff.status).toBe("pass");
      expect(receipt.source_byte_count).toBe(receipt.output_byte_count);
      expect(receipt.source_character_count).toBe(receipt.output_character_count);
    }

    expect(receiptIds.size).toBe(1);
    expect(hashes.size).toBe(1);
  });

  it("fails closed when source packets are missing or drift is detected", () => {
    expectCopyRoomError(
      () =>
        createCopyRoomSourcePacket({
          source_pointer: "copyroom://missing",
        }),
      "COPYROOM_MISSING",
    );

    expectCopyRoomError(
      () =>
        createCopyRoomSourcePacket({
          source_pointer: "copyroom://mismatch",
          text: "source text",
          bytes_base64: Buffer.from("changed text", "utf8").toString("base64"),
        }),
      "FIDELITY_DRIFT_RISK",
    );

    const source = createCopyRoomSourcePacket({
      source_pointer: "copyroom://prompt",
      text: "Keep exactly this prompt.",
    });

    expectCopyRoomError(
      () =>
        verifyCopyRoomExactCopy({
          source,
          output: {
            output_pointer: "boardroom://todo/59955cb6/prompt",
            text: "Keep almost exactly this prompt.",
          },
        }),
      "FIDELITY_DRIFT_RISK",
    );
  });
});

function expectCopyRoomError(action: () => unknown, code: CopyRoomCopyError["code"]): void {
  try {
    action();
  } catch (error) {
    expect(error).toBeInstanceOf(CopyRoomCopyError);
    expect((error as CopyRoomCopyError).code).toBe(code);
    return;
  }

  throw new Error(`Expected CopyRoomCopyError ${code}`);
}
