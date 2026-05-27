import type { SecurityPack } from "../types/pack-schema.js";

const PACKS = new Map<string, SecurityPack>();

export function registerPack(pack: SecurityPack): SecurityPack {
  PACKS.set(pack.id, pack);
  return pack;
}

export function getRegisteredPack(packId: string): SecurityPack | undefined {
  return PACKS.get(packId);
}

export function __resetPackStoreForTests(): void {
  PACKS.clear();
}
