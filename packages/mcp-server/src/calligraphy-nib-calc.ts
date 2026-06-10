export type NibType = "broad" | "italic" | "flex" | "pointed" | "stub";

export function lineWidthMm(nib: NibType): number {
  const l: Record<NibType, number> = {
    broad: 1.5, italic: 1.1, flex: 0.8, pointed: 0.3, stub: 1.0,
  };
  return l[nib];
}

export function lineVariation(nib: NibType): number {
  const v: Record<NibType, number> = {
    broad: 3, italic: 7, flex: 10, pointed: 9, stub: 5,
  };
  return v[nib];
}

export function inkFlowRate(nib: NibType): number {
  const i: Record<NibType, number> = {
    broad: 9, italic: 7, flex: 5, pointed: 4, stub: 8,
  };
  return i[nib];
}

export function pressureSensitivity(nib: NibType): number {
  const p: Record<NibType, number> = {
    broad: 2, italic: 4, flex: 10, pointed: 9, stub: 3,
  };
  return p[nib];
}

export function beginnerFriendly(nib: NibType): boolean {
  const b: Record<NibType, boolean> = {
    broad: true, italic: true, flex: false, pointed: false, stub: true,
  };
  return b[nib];
}

export function bestScript(nib: NibType): string {
  const s: Record<NibType, string> = {
    broad: "uncial", italic: "italic", flex: "spencerian",
    pointed: "copperplate", stub: "blackletter",
  };
  return s[nib];
}

export function durabilityRating(nib: NibType): number {
  const d: Record<NibType, number> = {
    broad: 9, italic: 8, flex: 4, pointed: 5, stub: 8,
  };
  return d[nib];
}

export function maintenanceLevel(nib: NibType): number {
  const m: Record<NibType, number> = {
    broad: 2, italic: 3, flex: 7, pointed: 6, stub: 2,
  };
  return m[nib];
}

export function costEstimate(nib: NibType): number {
  const c: Record<NibType, number> = {
    broad: 8, italic: 10, flex: 25, pointed: 15, stub: 8,
  };
  return c[nib];
}

export function nibTypes(): NibType[] {
  return ["broad", "italic", "flex", "pointed", "stub"];
}
