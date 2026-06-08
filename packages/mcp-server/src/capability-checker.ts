export interface CapabilitySet {
  capabilities: Set<string>;
}

export function createCapabilitySet(...caps: string[]): CapabilitySet {
  return { capabilities: new Set(caps) };
}

export function grant(set: CapabilitySet, ...caps: string[]): CapabilitySet {
  const next = new Set(set.capabilities);
  for (const c of caps) next.add(c);
  return { capabilities: next };
}

export function revoke(set: CapabilitySet, ...caps: string[]): CapabilitySet {
  const next = new Set(set.capabilities);
  for (const c of caps) next.delete(c);
  return { capabilities: next };
}

export function hasCapability(set: CapabilitySet, cap: string): boolean {
  if (set.capabilities.has("*")) return true;
  if (set.capabilities.has(cap)) return true;
  const parts = cap.split(".");
  for (let i = parts.length - 1; i > 0; i--) {
    const wildcard = parts.slice(0, i).join(".") + ".*";
    if (set.capabilities.has(wildcard)) return true;
  }
  return false;
}

export function hasAll(set: CapabilitySet, caps: string[]): boolean {
  return caps.every((c) => hasCapability(set, c));
}

export function hasAny(set: CapabilitySet, caps: string[]): boolean {
  return caps.some((c) => hasCapability(set, c));
}

export function merge(...sets: CapabilitySet[]): CapabilitySet {
  const merged = new Set<string>();
  for (const s of sets) {
    for (const c of s.capabilities) merged.add(c);
  }
  return { capabilities: merged };
}

export function intersect(a: CapabilitySet, b: CapabilitySet): CapabilitySet {
  const result = new Set<string>();
  for (const c of a.capabilities) {
    if (b.capabilities.has(c)) result.add(c);
  }
  return { capabilities: result };
}

export function listCapabilities(set: CapabilitySet): string[] {
  return [...set.capabilities].sort();
}
