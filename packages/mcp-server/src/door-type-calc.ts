export type DoorType = "panel" | "flush" | "french" | "barn" | "pivot";

export function soundInsulation(d: DoorType): number {
  const m: Record<DoorType, number> = {
    panel: 7, flush: 5, french: 3, barn: 4, pivot: 8,
  };
  return m[d];
}

export function naturalLight(d: DoorType): number {
  const m: Record<DoorType, number> = {
    panel: 3, flush: 1, french: 10, barn: 2, pivot: 6,
  };
  return m[d];
}

export function spaceEfficiency(d: DoorType): number {
  const m: Record<DoorType, number> = {
    panel: 5, flush: 5, french: 3, barn: 9, pivot: 7,
  };
  return m[d];
}

export function aestheticImpact(d: DoorType): number {
  const m: Record<DoorType, number> = {
    panel: 6, flush: 4, french: 9, barn: 8, pivot: 10,
  };
  return m[d];
}

export function durabilityYears(d: DoorType): number {
  const m: Record<DoorType, number> = {
    panel: 30, flush: 20, french: 25, barn: 35, pivot: 40,
  };
  return m[d];
}

export function requiresTrack(d: DoorType): boolean {
  const m: Record<DoorType, boolean> = {
    panel: false, flush: false, french: false, barn: true, pivot: false,
  };
  return m[d];
}

export function doubleDoor(d: DoorType): boolean {
  const m: Record<DoorType, boolean> = {
    panel: false, flush: false, french: true, barn: false, pivot: false,
  };
  return m[d];
}

export function bestLocation(d: DoorType): string {
  const m: Record<DoorType, string> = {
    panel: "interior_room", flush: "modern_closet", french: "patio_access",
    barn: "farmhouse_room", pivot: "grand_entrance",
  };
  return m[d];
}

export function costMultiplier(d: DoorType): number {
  const m: Record<DoorType, number> = {
    panel: 1.0, flush: 0.7, french: 1.5, barn: 1.3, pivot: 2.5,
  };
  return m[d];
}

export function doorTypes(): DoorType[] {
  return ["panel", "flush", "french", "barn", "pivot"];
}
