import { createHash } from "node:crypto";
import { z } from "zod";

export const CopyRoomCopyBlockerCodeSchema = z.enum([
  "COPYROOM_MISSING",
  "FIDELITY_DRIFT_RISK",
]);

export const CopyRoomEncodingSchema = z.enum(["utf8", "binary"]);

export const CopyRoomSourcePacketSchema = z.object({
  source_pointer: z.string().min(1),
  text: z.string().optional(),
  bytes_base64: z.string().optional(),
  expected_sha256: z.string().regex(/^[a-f0-9]{64}$/i).optional(),
  encoding: CopyRoomEncodingSchema.default("utf8"),
  newline_policy: z.literal("preserve").default("preserve"),
});

export const CopyRoomCopiedOutputSchema = z.object({
  output_pointer: z.string().min(1),
  text: z.string().optional(),
  bytes_base64: z.string(),
  encoding: CopyRoomEncodingSchema,
  byte_count: z.number().int().nonnegative(),
  character_count: z.number().int().nonnegative().nullable(),
});

export const CopyRoomExactCopyReceiptSchema = z.object({
  receipt_id: z.string().min(1),
  source_pointer: z.string().min(1),
  output_pointer: z.string().min(1),
  status: z.literal("copied_exactly"),
  source_hash: z.string().regex(/^[a-f0-9]{64}$/),
  output_hash: z.string().regex(/^[a-f0-9]{64}$/),
  source_byte_count: z.number().int().nonnegative(),
  output_byte_count: z.number().int().nonnegative(),
  source_character_count: z.number().int().nonnegative().nullable(),
  output_character_count: z.number().int().nonnegative().nullable(),
  encoding: CopyRoomEncodingSchema,
  newline_policy: z.literal("preserve"),
  diff: z.object({
    status: z.literal("pass"),
    hash_match: z.literal(true),
    byte_count_delta: z.literal(0),
    character_count_delta: z.literal(0).nullable(),
  }),
});

export type CopyRoomCopyBlockerCode = z.output<typeof CopyRoomCopyBlockerCodeSchema>;
export type CopyRoomEncoding = z.output<typeof CopyRoomEncodingSchema>;
export type CopyRoomSourcePacket = z.output<typeof CopyRoomSourcePacketSchema>;
export type CopyRoomSourcePacketInput = z.input<typeof CopyRoomSourcePacketSchema>;
export type CopyRoomCopiedOutput = z.output<typeof CopyRoomCopiedOutputSchema>;
export type CopyRoomCopiedOutputInput = z.input<typeof CopyRoomCopiedOutputSchema>;
export type CopyRoomExactCopyReceipt = z.output<typeof CopyRoomExactCopyReceiptSchema>;

export interface CopyRoomExactCopyInput {
  source: CopyRoomSourcePacketInput;
  output_pointer: string;
}

export interface CopyRoomExactCopyResult {
  output: CopyRoomCopiedOutput;
  receipt: CopyRoomExactCopyReceipt;
}

export interface VerifyCopyRoomExactCopyInput {
  source: CopyRoomSourcePacketInput;
  output: {
    output_pointer: string;
    text?: string;
    bytes_base64?: string;
    encoding?: CopyRoomEncoding;
  };
}

export class CopyRoomCopyError extends Error {
  readonly code: CopyRoomCopyBlockerCode;

  constructor(code: CopyRoomCopyBlockerCode, message: string) {
    super(`${code}: ${message}`);
    this.name = "CopyRoomCopyError";
    this.code = code;
  }
}

export function createCopyRoomSourcePacket(
  input: CopyRoomSourcePacketInput,
): CopyRoomSourcePacket {
  const parsed = CopyRoomSourcePacketSchema.parse(input);
  const source = readSourcePacket(parsed);

  return CopyRoomSourcePacketSchema.parse({
    ...parsed,
    bytes_base64: parsed.bytes_base64 ?? source.bytes.toString("base64"),
    expected_sha256: parsed.expected_sha256 ?? source.hash,
  });
}

export function copyFromCopyRoomSourcePacket(
  input: CopyRoomExactCopyInput,
): CopyRoomExactCopyResult {
  const sourcePacket = CopyRoomSourcePacketSchema.parse(input.source);
  const source = readSourcePacket(sourcePacket);
  const output = CopyRoomCopiedOutputSchema.parse({
    output_pointer: input.output_pointer,
    text: sourcePacket.text,
    bytes_base64: source.bytes.toString("base64"),
    encoding: sourcePacket.encoding,
    byte_count: source.bytes.length,
    character_count: source.characterCount,
  });

  return {
    output,
    receipt: buildReceipt({
      sourcePacket,
      source,
      outputPointer: output.output_pointer,
      outputBytes: source.bytes,
      outputCharacterCount: output.character_count,
    }),
  };
}

export function verifyCopyRoomExactCopy(
  input: VerifyCopyRoomExactCopyInput,
): CopyRoomExactCopyReceipt {
  const sourcePacket = CopyRoomSourcePacketSchema.parse(input.source);
  const outputPacket = {
    ...input.output,
    encoding: input.output.encoding ?? sourcePacket.encoding,
  };
  const source = readSourcePacket(sourcePacket);
  const output = readOutputBytes(outputPacket);

  if (!source.bytes.equals(output.bytes)) {
    throw new CopyRoomCopyError(
      "FIDELITY_DRIFT_RISK",
      "Copied output bytes do not match the CopyRoom source packet.",
    );
  }

  return buildReceipt({
    sourcePacket,
    source,
    outputPointer: input.output.output_pointer,
    outputBytes: output.bytes,
    outputCharacterCount: output.characterCount,
  });
}

function readSourcePacket(packet: CopyRoomSourcePacket): {
  bytes: Buffer;
  hash: string;
  characterCount: number | null;
} {
  const textBytes = packet.text === undefined ? null : Buffer.from(packet.text, "utf8");
  const rawBytes =
    packet.bytes_base64 === undefined ? null : decodeBase64(packet.bytes_base64);

  if (!textBytes && !rawBytes) {
    throw new CopyRoomCopyError(
      "COPYROOM_MISSING",
      "CopyRoom source packet must include text or bytes_base64.",
    );
  }

  if (textBytes && rawBytes && !textBytes.equals(rawBytes)) {
    throw new CopyRoomCopyError(
      "FIDELITY_DRIFT_RISK",
      "CopyRoom source text and bytes_base64 describe different bytes.",
    );
  }

  const bytes = rawBytes ?? textBytes;
  if (!bytes) {
    throw new CopyRoomCopyError("COPYROOM_MISSING", "CopyRoom source bytes missing.");
  }

  const hash = sha256(bytes);
  if (packet.expected_sha256 && packet.expected_sha256.toLowerCase() !== hash) {
    throw new CopyRoomCopyError(
      "FIDELITY_DRIFT_RISK",
      "CopyRoom source packet hash does not match its bytes.",
    );
  }

  return {
    bytes,
    hash,
    characterCount: packet.text === undefined ? null : countCharacters(packet.text),
  };
}

function readOutputBytes(output: {
  text?: string;
  bytes_base64?: string;
}): { bytes: Buffer; characterCount: number | null } {
  const textBytes = output.text === undefined ? null : Buffer.from(output.text, "utf8");
  const rawBytes =
    output.bytes_base64 === undefined ? null : decodeBase64(output.bytes_base64);

  if (!textBytes && !rawBytes) {
    throw new CopyRoomCopyError(
      "COPYROOM_MISSING",
      "Copied output must include text or bytes_base64.",
    );
  }

  if (textBytes && rawBytes && !textBytes.equals(rawBytes)) {
    throw new CopyRoomCopyError(
      "FIDELITY_DRIFT_RISK",
      "Copied output text and bytes_base64 describe different bytes.",
    );
  }

  const bytes = rawBytes ?? textBytes;
  if (!bytes) {
    throw new CopyRoomCopyError("COPYROOM_MISSING", "Copied output bytes missing.");
  }

  return {
    bytes,
    characterCount: output.text === undefined ? null : countCharacters(output.text),
  };
}

function buildReceipt(input: {
  sourcePacket: CopyRoomSourcePacket;
  source: { bytes: Buffer; hash: string; characterCount: number | null };
  outputPointer: string;
  outputBytes: Buffer;
  outputCharacterCount: number | null;
}): CopyRoomExactCopyReceipt {
  const outputHash = sha256(input.outputBytes);

  if (input.source.hash !== outputHash || input.source.bytes.length !== input.outputBytes.length) {
    throw new CopyRoomCopyError(
      "FIDELITY_DRIFT_RISK",
      "CopyRoom receipt cannot pass because output differs from source.",
    );
  }

  const characterDelta =
    input.source.characterCount === null || input.outputCharacterCount === null
      ? null
      : input.outputCharacterCount - input.source.characterCount;

  if (characterDelta !== null && characterDelta !== 0) {
    throw new CopyRoomCopyError(
      "FIDELITY_DRIFT_RISK",
      "CopyRoom receipt cannot pass because character counts differ.",
    );
  }

  return CopyRoomExactCopyReceiptSchema.parse({
    receipt_id: createReceiptId(
      input.sourcePacket.source_pointer,
      input.outputPointer,
      input.source.hash,
    ),
    source_pointer: input.sourcePacket.source_pointer,
    output_pointer: input.outputPointer,
    status: "copied_exactly",
    source_hash: input.source.hash,
    output_hash: outputHash,
    source_byte_count: input.source.bytes.length,
    output_byte_count: input.outputBytes.length,
    source_character_count: input.source.characterCount,
    output_character_count: input.outputCharacterCount,
    encoding: input.sourcePacket.encoding,
    newline_policy: input.sourcePacket.newline_policy,
    diff: {
      status: "pass",
      hash_match: true,
      byte_count_delta: 0,
      character_count_delta: characterDelta,
    },
  });
}

function decodeBase64(value: string): Buffer {
  const normalized = value.replace(/\s+/g, "");
  const bytes = Buffer.from(normalized, "base64");
  const roundTrip = bytes.toString("base64").replace(/=+$/, "");

  if (roundTrip !== normalized.replace(/=+$/, "")) {
    throw new CopyRoomCopyError(
      "FIDELITY_DRIFT_RISK",
      "Invalid base64 bytes in CopyRoom source-copy packet.",
    );
  }

  return bytes;
}

function sha256(bytes: Buffer): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function countCharacters(text: string): number {
  return Array.from(text).length;
}

function createReceiptId(
  sourcePointer: string,
  outputPointer: string,
  sourceHash: string,
): string {
  const idHash = sha256(Buffer.from(`${sourcePointer}\0${outputPointer}\0${sourceHash}`));
  return `copyroom:${idHash.slice(0, 16)}`;
}
