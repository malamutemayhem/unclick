import { describe, expect, it } from "vitest";
import {
  copyRoomExact,
  createCopyRoomSourcePacket,
  proveCopyRoomRepeatedCopy,
  verifyCopyRoomExact,
} from "../copyroom.js";

describe("CopyRoom exact-copy engine", () => {
  it("copies exact source text and produces a passing receipt", () => {
    const packet = createCopyRoomSourcePacket({
      source_id: "source-1",
      source_pointer: "copyroom://packets/source-1",
      text: "Line 1\r\nLine 2 with symbols: £, €, emoji ✅",
    });

    const result = copyRoomExact(packet, "copyroom://outputs/source-1");

    expect(result.output_text).toBe(packet.text);
    expect(result.receipt.status).toBe("pass");
    expect(result.receipt.exact_diff).toBe("pass");
    expect(result.receipt.source_sha256).toBe(result.receipt.output_sha256);
    expect(result.receipt.byte_count).toBe(result.receipt.output_byte_count);
    expect(result.receipt.character_count).toBe(result.receipt.output_character_count);
    expect(result.receipt.newline_style).toBe("crlf");
    expect(result.receipt.action_needed).toEqual([]);
  });

  it("fails closed when one character shifts", () => {
    const packet = createCopyRoomSourcePacket({
      source_id: "source-2",
      source_pointer: "copyroom://packets/source-2",
      text: "Exact source text must not drift.",
    });

    const receipt = verifyCopyRoomExact(
      packet,
      "Exact source text must not draft.",
      "copyroom://outputs/source-2",
    );

    expect(receipt.status).toBe("blocked");
    expect(receipt.exact_diff).toBe("fail");
    expect(receipt.source_sha256).not.toBe(receipt.output_sha256);
    expect(receipt.action_needed[0]).toContain("FIDELITY_DRIFT_RISK");
  });

  it("proves repeated programmatic copies without changing bytes or characters", () => {
    const packet = createCopyRoomSourcePacket({
      source_id: "source-3",
      source_pointer: "copyroom://packets/source-3",
      text: "A repeat-safe source packet.\nDo not retype this.",
    });

    const proof = proveCopyRoomRepeatedCopy(packet, 1_000_000);

    expect(proof.status).toBe("pass");
    expect(proof.iterations).toBe(1_000_000);
    expect(proof.verified_every_copy).toBe(true);
    expect(proof.source_sha256).toBe(proof.final_sha256);
    expect(proof.byte_count).toBe(packet.byte_count);
    expect(proof.character_count).toBe(packet.character_count);
    expect(proof.checked_copy_numbers).toEqual([1, 250000, 500000, 750000, 1000000]);
    expect(proof.action_needed).toEqual([]);
  });
});
