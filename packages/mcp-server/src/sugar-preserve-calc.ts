export type PreserveType = "jam" | "jelly" | "marmalade" | "conserve" | "fruit_butter";

export function sugarToFruitRatio(preserve: PreserveType): number {
  const r: Record<PreserveType, number> = {
    jam: 0.75, jelly: 0.85, marmalade: 0.80, conserve: 0.60, fruit_butter: 0.40,
  };
  return r[preserve];
}

export function cookingMinutes(preserve: PreserveType): number {
  const c: Record<PreserveType, number> = {
    jam: 20, jelly: 30, marmalade: 45, conserve: 25, fruit_butter: 60,
  };
  return c[preserve];
}

export function pectinRequired(preserve: PreserveType): boolean {
  const p: Record<PreserveType, boolean> = {
    jam: true, jelly: true, marmalade: false, conserve: false, fruit_butter: false,
  };
  return p[preserve];
}

export function textureThickness(preserve: PreserveType): number {
  const t: Record<PreserveType, number> = {
    jam: 7, jelly: 9, marmalade: 6, conserve: 5, fruit_butter: 8,
  };
  return t[preserve];
}

export function fruitChunks(preserve: PreserveType): boolean {
  const f: Record<PreserveType, boolean> = {
    jam: true, jelly: false, marmalade: true, conserve: true, fruit_butter: false,
  };
  return f[preserve];
}

export function shelfLifeMonths(preserve: PreserveType): number {
  const s: Record<PreserveType, number> = {
    jam: 12, jelly: 18, marmalade: 18, conserve: 10, fruit_butter: 8,
  };
  return s[preserve];
}

export function bestFruit(preserve: PreserveType): string {
  const b: Record<PreserveType, string> = {
    jam: "strawberry", jelly: "grape", marmalade: "orange",
    conserve: "mixed_berry", fruit_butter: "apple",
  };
  return b[preserve];
}

export function canningRequired(preserve: PreserveType): boolean {
  const c: Record<PreserveType, boolean> = {
    jam: true, jelly: true, marmalade: true, conserve: true, fruit_butter: true,
  };
  return c[preserve];
}

export function difficultyRating(preserve: PreserveType): number {
  const d: Record<PreserveType, number> = {
    jam: 3, jelly: 5, marmalade: 6, conserve: 2, fruit_butter: 4,
  };
  return d[preserve];
}

export function preserveTypes(): PreserveType[] {
  return ["jam", "jelly", "marmalade", "conserve", "fruit_butter"];
}
