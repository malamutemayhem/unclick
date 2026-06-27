export type ShellMaterial = "maple" | "birch" | "mahogany" | "oak" | "walnut";

export function warmthRating(mat: ShellMaterial): number {
  const w: Record<ShellMaterial, number> = {
    maple: 8, birch: 5, mahogany: 9, oak: 6, walnut: 7,
  };
  return w[mat];
}

export function attackSharpness(mat: ShellMaterial): number {
  const a: Record<ShellMaterial, number> = {
    maple: 6, birch: 9, mahogany: 4, oak: 7, walnut: 5,
  };
  return a[mat];
}

export function sustainSeconds(mat: ShellMaterial): number {
  const s: Record<ShellMaterial, number> = {
    maple: 3.5, birch: 2.5, mahogany: 4.0, oak: 3.0, walnut: 3.2,
  };
  return s[mat];
}

export function volumeLevel(mat: ShellMaterial): number {
  const v: Record<ShellMaterial, number> = {
    maple: 7, birch: 9, mahogany: 6, oak: 8, walnut: 7,
  };
  return v[mat];
}

export function densityKgPerM3(mat: ShellMaterial): number {
  const d: Record<ShellMaterial, number> = {
    maple: 700, birch: 680, mahogany: 550, oak: 750, walnut: 640,
  };
  return d[mat];
}

export function tuningStability(mat: ShellMaterial): number {
  const t: Record<ShellMaterial, number> = {
    maple: 8, birch: 7, mahogany: 6, oak: 9, walnut: 7,
  };
  return t[mat];
}

export function bestGenre(mat: ShellMaterial): string {
  const b: Record<ShellMaterial, string> = {
    maple: "jazz", birch: "rock", mahogany: "blues",
    oak: "orchestral", walnut: "folk",
  };
  return b[mat];
}

export function plySuitable(mat: ShellMaterial): boolean {
  const p: Record<ShellMaterial, boolean> = {
    maple: true, birch: true, mahogany: false, oak: false, walnut: false,
  };
  return p[mat];
}

export function costPerShell(mat: ShellMaterial): number {
  const c: Record<ShellMaterial, number> = {
    maple: 120, birch: 90, mahogany: 150, oak: 100, walnut: 180,
  };
  return c[mat];
}

export function shellMaterials(): ShellMaterial[] {
  return ["maple", "birch", "mahogany", "oak", "walnut"];
}
