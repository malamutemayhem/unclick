export type SilkType = "mulberry" | "tussah" | "muga" | "eri" | "spider";

export function fiberDenierRange(silk: SilkType): number {
  const f: Record<SilkType, number> = {
    mulberry: 1, tussah: 3, muga: 2, eri: 4, spider: 0.5,
  };
  return f[silk];
}

export function tensileStrengthMpa(silk: SilkType): number {
  const t: Record<SilkType, number> = {
    mulberry: 500, tussah: 400, muga: 450, eri: 350, spider: 1000,
  };
  return t[silk];
}

export function luster(silk: SilkType): number {
  const l: Record<SilkType, number> = {
    mulberry: 10, tussah: 6, muga: 9, eri: 4, spider: 7,
  };
  return l[silk];
}

export function drapeability(silk: SilkType): number {
  const d: Record<SilkType, number> = {
    mulberry: 10, tussah: 7, muga: 8, eri: 5, spider: 6,
  };
  return d[silk];
}

export function dyeAbsorption(silk: SilkType): number {
  const a: Record<SilkType, number> = {
    mulberry: 10, tussah: 6, muga: 7, eri: 8, spider: 3,
  };
  return a[silk];
}

export function commerciallyFarmed(silk: SilkType): boolean {
  const c: Record<SilkType, boolean> = {
    mulberry: true, tussah: true, muga: true, eri: true, spider: false,
  };
  return c[silk];
}

export function naturalColor(silk: SilkType): string {
  const n: Record<SilkType, string> = {
    mulberry: "white", tussah: "honey", muga: "golden",
    eri: "cream", spider: "translucent",
  };
  return n[silk];
}

export function bestApplication(silk: SilkType): string {
  const b: Record<SilkType, string> = {
    mulberry: "sari", tussah: "furnishing", muga: "bridal_wear",
    eri: "shawls", spider: "biomedical",
  };
  return b[silk];
}

export function costPerKg(silk: SilkType): number {
  const c: Record<SilkType, number> = {
    mulberry: 60, tussah: 40, muga: 200, eri: 30, spider: 30000,
  };
  return c[silk];
}

export function silkTypes(): SilkType[] {
  return ["mulberry", "tussah", "muga", "eri", "spider"];
}
