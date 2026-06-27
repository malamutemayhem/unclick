export type SafeType = "fire_resistant" | "burglary" | "wall" | "floor" | "gun";

export function fireRating(s: SafeType): number {
  const m: Record<SafeType, number> = {
    fire_resistant: 10, burglary: 4, wall: 3, floor: 5, gun: 6,
  };
  return m[s];
}

export function burglaryRating(s: SafeType): number {
  const m: Record<SafeType, number> = {
    fire_resistant: 5, burglary: 10, wall: 6, floor: 8, gun: 7,
  };
  return m[s];
}

export function weightKg(s: SafeType): number {
  const m: Record<SafeType, number> = {
    fire_resistant: 8, burglary: 9, wall: 4, floor: 10, gun: 7,
  };
  return m[s];
}

export function concealability(s: SafeType): number {
  const m: Record<SafeType, number> = {
    fire_resistant: 3, burglary: 4, wall: 10, floor: 9, gun: 5,
  };
  return m[s];
}

export function storageCapacity(s: SafeType): number {
  const m: Record<SafeType, number> = {
    fire_resistant: 7, burglary: 6, wall: 4, floor: 5, gun: 10,
  };
  return m[s];
}

export function boltDown(s: SafeType): boolean {
  const m: Record<SafeType, boolean> = {
    fire_resistant: true, burglary: true, wall: false, floor: false, gun: true,
  };
  return m[s];
}

export function ulListed(s: SafeType): boolean {
  const m: Record<SafeType, boolean> = {
    fire_resistant: true, burglary: true, wall: false, floor: true, gun: true,
  };
  return m[s];
}

export function primaryContent(s: SafeType): string {
  const m: Record<SafeType, string> = {
    fire_resistant: "documents_media", burglary: "valuables_jewelry",
    wall: "cash_small_items", floor: "high_value_concealed",
    gun: "firearms_ammunition",
  };
  return m[s];
}

export function lockOptions(s: SafeType): string {
  const m: Record<SafeType, string> = {
    fire_resistant: "combo_electronic", burglary: "combo_redundant",
    wall: "key_electronic", floor: "combo_key",
    gun: "biometric_electronic",
  };
  return m[s];
}

export function safeTypes(): SafeType[] {
  return ["fire_resistant", "burglary", "wall", "floor", "gun"];
}
