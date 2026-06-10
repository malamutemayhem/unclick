export type MemoryTypeKind = "sensory" | "short_term" | "long_term" | "episodic" | "procedural";

export function durationSeconds(m2: MemoryTypeKind): number {
  const m: Record<MemoryTypeKind, number> = {
    sensory: 1, short_term: 30, long_term: 999999, episodic: 999999, procedural: 999999,
  };
  return m[m2];
}

export function capacityItems(m2: MemoryTypeKind): number {
  const m: Record<MemoryTypeKind, number> = {
    sensory: 12, short_term: 7, long_term: 10, episodic: 8, procedural: 10,
  };
  return m[m2];
}

export function retrievalSpeed(m2: MemoryTypeKind): number {
  const m: Record<MemoryTypeKind, number> = {
    sensory: 10, short_term: 9, long_term: 5, episodic: 6, procedural: 8,
  };
  return m[m2];
}

export function encodingEffort(m2: MemoryTypeKind): number {
  const m: Record<MemoryTypeKind, number> = {
    sensory: 1, short_term: 3, long_term: 8, episodic: 7, procedural: 9,
  };
  return m[m2];
}

export function decayRate(m2: MemoryTypeKind): number {
  const m: Record<MemoryTypeKind, number> = {
    sensory: 10, short_term: 8, long_term: 2, episodic: 4, procedural: 1,
  };
  return m[m2];
}

export function conscious(m2: MemoryTypeKind): boolean {
  const m: Record<MemoryTypeKind, boolean> = {
    sensory: false, short_term: true, long_term: true, episodic: true, procedural: false,
  };
  return m[m2];
}

export function declarative(m2: MemoryTypeKind): boolean {
  const m: Record<MemoryTypeKind, boolean> = {
    sensory: false, short_term: true, long_term: true, episodic: true, procedural: false,
  };
  return m[m2];
}

export function brainRegion(m2: MemoryTypeKind): string {
  const m: Record<MemoryTypeKind, string> = {
    sensory: "thalamus", short_term: "prefrontal_cortex",
    long_term: "hippocampus", episodic: "medial_temporal",
    procedural: "basal_ganglia",
  };
  return m[m2];
}

export function exampleTask(m2: MemoryTypeKind): string {
  const m: Record<MemoryTypeKind, string> = {
    sensory: "visual_afterimage", short_term: "phone_number",
    long_term: "vocabulary", episodic: "birthday_party",
    procedural: "riding_bicycle",
  };
  return m[m2];
}

export function memoryTypeKinds(): MemoryTypeKind[] {
  return ["sensory", "short_term", "long_term", "episodic", "procedural"];
}
