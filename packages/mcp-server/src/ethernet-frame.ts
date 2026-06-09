export interface EthernetFrame {
  dstMac: string;
  srcMac: string;
  etherType: number;
  vlanTag?: VlanTag;
  payload: number[];
  fcs: number;
}

export interface VlanTag {
  priority: number;
  dei: boolean;
  vlanId: number;
}

export function buildFrame(
  dstMac: string,
  srcMac: string,
  etherType: number,
  payload: number[],
  vlanTag?: VlanTag
): EthernetFrame {
  const fcs = computeCRC32(payload);
  return {
    dstMac: dstMac.toLowerCase(),
    srcMac: srcMac.toLowerCase(),
    etherType,
    vlanTag,
    payload: [...payload],
    fcs,
  };
}

export function serialize(frame: EthernetFrame): number[] {
  const bytes: number[] = [];
  bytes.push(...macToBytes(frame.dstMac));
  bytes.push(...macToBytes(frame.srcMac));

  if (frame.vlanTag) {
    bytes.push(0x81, 0x00);
    const tci = (frame.vlanTag.priority << 13) | (frame.vlanTag.dei ? 1 << 12 : 0) | frame.vlanTag.vlanId;
    bytes.push((tci >> 8) & 0xff, tci & 0xff);
  }

  bytes.push((frame.etherType >> 8) & 0xff, frame.etherType & 0xff);
  bytes.push(...frame.payload);
  bytes.push(
    (frame.fcs >>> 24) & 0xff,
    (frame.fcs >>> 16) & 0xff,
    (frame.fcs >>> 8) & 0xff,
    frame.fcs & 0xff
  );
  return bytes;
}

export function deserialize(bytes: number[]): EthernetFrame | null {
  if (bytes.length < 18) return null;

  const dstMac = bytesToMac(bytes.slice(0, 6));
  const srcMac = bytesToMac(bytes.slice(6, 12));

  let offset = 12;
  let vlanTag: VlanTag | undefined;

  const possibleVlan = (bytes[offset] << 8) | bytes[offset + 1];
  if (possibleVlan === 0x8100) {
    offset += 2;
    const tci = (bytes[offset] << 8) | bytes[offset + 1];
    vlanTag = {
      priority: (tci >> 13) & 0x07,
      dei: !!(tci & 0x1000),
      vlanId: tci & 0x0fff,
    };
    offset += 2;
  }

  const etherType = (bytes[offset] << 8) | bytes[offset + 1];
  offset += 2;

  const payload = bytes.slice(offset, bytes.length - 4);
  const fcs =
    ((bytes[bytes.length - 4] << 24) |
      (bytes[bytes.length - 3] << 16) |
      (bytes[bytes.length - 2] << 8) |
      bytes[bytes.length - 1]) >>> 0;

  return { dstMac, srcMac, etherType, vlanTag, payload, fcs };
}

export function isBroadcast(mac: string): boolean {
  return mac.toLowerCase() === "ff:ff:ff:ff:ff:ff";
}

export function isMulticast(mac: string): boolean {
  const firstByte = parseInt(mac.split(":")[0], 16);
  return (firstByte & 0x01) === 1;
}

export function isUnicast(mac: string): boolean {
  return !isBroadcast(mac) && !isMulticast(mac);
}

export function frameSize(frame: EthernetFrame): number {
  let size = 14 + frame.payload.length + 4;
  if (frame.vlanTag) size += 4;
  return size;
}

function macToBytes(mac: string): number[] {
  return mac.split(":").map((h) => parseInt(h, 16));
}

function bytesToMac(bytes: number[]): string {
  return bytes.map((b) => b.toString(16).padStart(2, "0")).join(":");
}

function computeCRC32(data: number[]): number {
  let crc = 0xffffffff;
  for (const byte of data) {
    crc ^= byte;
    for (let j = 0; j < 8; j++) {
      if (crc & 1) {
        crc = (crc >>> 1) ^ 0xedb88320;
      } else {
        crc = crc >>> 1;
      }
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}
