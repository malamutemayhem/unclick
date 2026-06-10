export type DoorHingeType = "butt_mortise" | "spring_self_close" | "concealed_european" | "piano_continuous" | "pivot_floor_mount";

export function loadCapacity(t: DoorHingeType): number {
  const m: Record<DoorHingeType, number> = {
    butt_mortise: 7, spring_self_close: 6, concealed_european: 5, piano_continuous: 10, pivot_floor_mount: 9,
  };
  return m[t];
}

export function concealability(t: DoorHingeType): number {
  const m: Record<DoorHingeType, number> = {
    butt_mortise: 5, spring_self_close: 4, concealed_european: 10, piano_continuous: 2, pivot_floor_mount: 8,
  };
  return m[t];
}

export function installEase(t: DoorHingeType): number {
  const m: Record<DoorHingeType, number> = {
    butt_mortise: 6, spring_self_close: 7, concealed_european: 4, piano_continuous: 3, pivot_floor_mount: 2,
  };
  return m[t];
}

export function durability(t: DoorHingeType): number {
  const m: Record<DoorHingeType, number> = {
    butt_mortise: 8, spring_self_close: 6, concealed_european: 7, piano_continuous: 9, pivot_floor_mount: 10,
  };
  return m[t];
}

export function hingeCost(t: DoorHingeType): number {
  const m: Record<DoorHingeType, number> = {
    butt_mortise: 2, spring_self_close: 4, concealed_european: 5, piano_continuous: 6, pivot_floor_mount: 9,
  };
  return m[t];
}

export function selfClosing(t: DoorHingeType): boolean {
  const m: Record<DoorHingeType, boolean> = {
    butt_mortise: false, spring_self_close: true, concealed_european: false, piano_continuous: false, pivot_floor_mount: false,
  };
  return m[t];
}

export function adjustable(t: DoorHingeType): boolean {
  const m: Record<DoorHingeType, boolean> = {
    butt_mortise: false, spring_self_close: true, concealed_european: true, piano_continuous: false, pivot_floor_mount: true,
  };
  return m[t];
}

export function hingeFinish(t: DoorHingeType): string {
  const m: Record<DoorHingeType, string> = {
    butt_mortise: "satin_nickel_plate",
    spring_self_close: "oil_rubbed_bronze",
    concealed_european: "nickel_plated_steel",
    piano_continuous: "stainless_steel_polished",
    pivot_floor_mount: "brushed_brass_heavy",
  };
  return m[t];
}

export function bestDoor(t: DoorHingeType): string {
  const m: Record<DoorHingeType, string> = {
    butt_mortise: "standard_interior_passage",
    spring_self_close: "fire_rated_commercial",
    concealed_european: "frameless_cabinet_overlay",
    piano_continuous: "heavy_gate_continuous",
    pivot_floor_mount: "oversized_entry_pivot",
  };
  return m[t];
}

export function doorHinges(): DoorHingeType[] {
  return ["butt_mortise", "spring_self_close", "concealed_european", "piano_continuous", "pivot_floor_mount"];
}
