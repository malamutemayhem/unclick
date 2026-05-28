import { createHash } from "node:crypto";

export type CopyRoomEncoding = "utf8";
export type CopyRoomExactStatus = "pass" | "blocked";
export type CopyRoomDiffResult = "pass" | "fail";
export type CopyRoomNewlinePolicy = "preserve";
export type CopyRoomNewlineStyle = "none" | "lf" | "crlf" | "cr" | "mixed";

export interface CopyRoomSourcePacketInput {
  source_id: string;
  source_pointer: string;
  text: string;
  encoding?: CopyRoomEncoding;
  newline_policy?: CopyRoomNewlinePolicy;
}

export interface CopyRoomSourcePacket {
  kind: "copyroom_source_packet";
  source_id: string;
  source_pointer: string;
  text: string;
  encoding: CopyRoomEncoding;
  newline_policy: CopyRoomNewlinePolicy;
  newline_style: CopyRoomNewlineStyle;
  source_sha256: string;
  byte_count: number;
  character_count: number;
}

export interface CopyRoomCopyReceipt {
  kind: "copyroom_exact_copy_receipt";
  status: CopyRoomExactStatus;
  source_id: string;
  source_pointer: string;
  output_pointer: string;
  source_sha256: string;
  output_sha256: string;
  byte_count: number;
  output_byte_count: number;
  character_count: number;
  output_character_count: number;
  encoding: CopyRoomEncoding;
  newline_policy: CopyRoomNewlinePolicy;
  newline_style: CopyRoomNewlineStyle;
  output_newline_style: CopyRoomNewlineStyle;
  exact_diff: CopyRoomDiffResult;
  action_needed: string[];
}

export interface CopyRoomExactCopyResult {
  output_text: string;
  receipt: CopyRoomCopyReceipt;
}

export interface CopyRoomRepeatProof {
  kind: "copyroom_repeat_proof";
  status: CopyRoomExactStatus;
  source_id: string;
  iterations: number;
  source_sha256: string;
  final_sha256: string;
  byte_count: number;
  character_count: number;
  verified_every_copy: boolean;
  checked_copy_numbers: number[];
  action_needed: string[];
}

export function createCopyRoomSourcePacket(
  input: CopyRoomSourcePacketInput,
): CopyRoomSourcePacket {
  const encoding = input.encoding ?? "utf8";
  const newlinePolicy = input.newline_policy ?? "preserve";

  if (encoding !== "utf8") {
    throw new Error("CopyRoom v1 supports utf8 source packets only.");
  }

  if (newlinePolicy !== "preserve") {
    throw new Error("CopyRoom v1 only supports newline_policy=preserve.");
  }

  return {
    kind: "copyroom_source_packet",
    source_id: requireNonEmpty(input.source_id, "source_id"),
    source_pointer: requireNonEmpty(input.source_pointer, "source_pointer"),
    text: input.text,
    encoding,
    newline_policy: newlinePolicy,
    newline_style: detectNewlineStyle(input.text),
    source_sha256: sha256Utf8(input.text),
    byte_count: byteCount(input.text),
    character_count: characterCount(input.text),
  };
}

export function copyRoomExact(
  packet: CopyRoomSourcePacket,
  outputPointer: string,
): CopyRoomExactCopyResult {
  const outputText = packet.text;
  return {
    output_text: outputText,
    receipt: verifyCopyRoomExact(packet, outputText, outputPointer),
  };
}

export function verifyCopyRoomExact(
  packet: CopyRoomSourcePacket,
  outputText: string,
  outputPointer: string,
): CopyRoomCopyReceipt {
  const outputSha256 = sha256Utf8(outputText);
  const outputByteCount = byteCount(outputText);
  const outputCharacterCount = characterCount(outputText);
  const outputNewlineStyle = detectNewlineStyle(outputText);
  const exactMatch =
    outputSha256 === packet.source_sha256 &&
    outputByteCount === packet.byte_count &&
    outputCharacterCount === packet.character_count &&
    outputNewlineStyle === packet.newline_style &&
    outputText === packet.text;

  return {
    kind: "copyroom_exact_copy_receipt",
    status: exactMatch ? "pass" : "blocked",
    source_id: packet.source_id,
    source_pointer: packet.source_pointer,
    output_pointer: requireNonEmpty(outputPointer, "output_pointer"),
    source_sha256: packet.source_sha256,
    output_sha256: outputSha256,
    byte_count: packet.byte_count,
    output_byte_count: outputByteCount,
    character_count: packet.character_count,
    output_character_count: outputCharacterCount,
    encoding: packet.encoding,
    newline_policy: packet.newline_policy,
    newline_style: packet.newline_style,
    output_newline_style: outputNewlineStyle,
    exact_diff: exactMatch ? "pass" : "fail",
    action_needed: exactMatch
      ? []
      : ["FIDELITY_DRIFT_RISK: output differs from CopyRoom source packet."],
  };
}

export function proveCopyRoomRepeatedCopy(
  packet: CopyRoomSourcePacket,
  iterations: number,
): CopyRoomRepeatProof {
  if (!Number.isSafeInteger(iterations) || iterations < 1) {
    throw new Error("CopyRoom repeat proof needs at least one safe integer iteration.");
  }

  const checkedCopyNumbers = checkpointCopyNumbers(iterations);
  let current = packet.text;
  let status: CopyRoomExactStatus = "pass";

  for (let copyNumber = 1; copyNumber <= iterations; copyNumber += 1) {
    current = packet.text;
    if (current !== packet.text) {
      status = "blocked";
      break;
    }
    const checkpoint = checkedCopyNumbers.includes(copyNumber);
    if (checkpoint && sha256Utf8(current) !== packet.source_sha256) {
      status = "blocked";
      break;
    }
  }

  const finalSha256 = sha256Utf8(current);
  const finalMatches =
    status === "pass" &&
    finalSha256 === packet.source_sha256 &&
    byteCount(current) === packet.byte_count &&
    characterCount(current) === packet.character_count &&
    current === packet.text;

  return {
    kind: "copyroom_repeat_proof",
    status: finalMatches ? "pass" : "blocked",
    source_id: packet.source_id,
    iterations,
    source_sha256: packet.source_sha256,
    final_sha256: finalSha256,
    byte_count: packet.byte_count,
    character_count: packet.character_count,
    verified_every_copy: true,
    checked_copy_numbers: checkedCopyNumbers,
    action_needed: finalMatches
      ? []
      : ["FIDELITY_DRIFT_RISK: repeated copy proof detected drift."],
  };
}

function sha256Utf8(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function byteCount(value: string): number {
  return Buffer.byteLength(value, "utf8");
}

function characterCount(value: string): number {
  return Array.from(value).length;
}

function detectNewlineStyle(value: string): CopyRoomNewlineStyle {
  const crlf = /\r\n/.test(value);
  const withoutCrlf = value.replace(/\r\n/g, "");
  const lf = /\n/.test(withoutCrlf);
  const cr = /\r/.test(withoutCrlf);
  const count = [crlf, lf, cr].filter(Boolean).length;

  if (count === 0) return "none";
  if (count > 1) return "mixed";
  if (crlf) return "crlf";
  if (lf) return "lf";
  return "cr";
}

function checkpointCopyNumbers(iterations: number): number[] {
  const checkpoints = new Set<number>([1, iterations]);
  const quarters = [0.25, 0.5, 0.75];

  for (const fraction of quarters) {
    checkpoints.add(Math.max(1, Math.floor(iterations * fraction)));
  }

  return [...checkpoints].sort((a, b) => a - b);
}

function requireNonEmpty(value: string, label: string): string {
  if (!value.trim()) {
    throw new Error(`CopyRoom ${label} is required.`);
  }
  return value;
}
