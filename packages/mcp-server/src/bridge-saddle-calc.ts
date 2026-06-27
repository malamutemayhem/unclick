export type SaddleMaterial = "bone" | "tusq" | "brass" | "ivory_nut" | "graphite";

export function densityGPerCm3(material: SaddleMaterial): number {
  const d: Record<SaddleMaterial, number> = {
    bone: 1.9, tusq: 1.7, brass: 8.5, ivory_nut: 1.4, graphite: 2.1,
  };
  return d[material];
}

export function hardnessRating(material: SaddleMaterial): number {
  const h: Record<SaddleMaterial, number> = {
    bone: 7, tusq: 6, brass: 8, ivory_nut: 4, graphite: 3,
  };
  return h[material];
}

export function toneCharacter(material: SaddleMaterial): string {
  const t: Record<SaddleMaterial, string> = {
    bone: "warm_bright", tusq: "consistent_bright", brass: "metallic_sustain",
    ivory_nut: "warm_mellow", graphite: "smooth_dark",
  };
  return t[material];
}

export function sustainRating(material: SaddleMaterial): number {
  const s: Record<SaddleMaterial, number> = {
    bone: 8, tusq: 7, brass: 9, ivory_nut: 6, graphite: 5,
  };
  return s[material];
}

export function frictionCoefficient(material: SaddleMaterial): number {
  const f: Record<SaddleMaterial, number> = {
    bone: 0.3, tusq: 0.25, brass: 0.35, ivory_nut: 0.28, graphite: 0.1,
  };
  return f[material];
}

export function selfLubricating(material: SaddleMaterial): boolean {
  return material === "graphite" || material === "tusq";
}

export function shapingDifficulty(material: SaddleMaterial): number {
  const d: Record<SaddleMaterial, number> = {
    bone: 6, tusq: 4, brass: 8, ivory_nut: 3, graphite: 5,
  };
  return d[material];
}

export function consistencyRating(material: SaddleMaterial): number {
  const c: Record<SaddleMaterial, number> = {
    bone: 5, tusq: 9, brass: 8, ivory_nut: 4, graphite: 9,
  };
  return c[material];
}

export function costEstimate(material: SaddleMaterial): number {
  const c: Record<SaddleMaterial, number> = {
    bone: 8, tusq: 12, brass: 6, ivory_nut: 5, graphite: 10,
  };
  return c[material];
}

export function saddleMaterials(): SaddleMaterial[] {
  return ["bone", "tusq", "brass", "ivory_nut", "graphite"];
}
