export type DoorHandleType = "lever_passage" | "knob_privacy" | "pull_barn_style" | "push_plate_commercial" | "smart_keypad_entry";

export function gripComfort(t: DoorHandleType): number {
  const m: Record<DoorHandleType, number> = {
    lever_passage: 9, knob_privacy: 6, pull_barn_style: 7, push_plate_commercial: 3, smart_keypad_entry: 5,
  };
  return m[t];
}

export function accessibility(t: DoorHandleType): number {
  const m: Record<DoorHandleType, number> = {
    lever_passage: 10, knob_privacy: 4, pull_barn_style: 6, push_plate_commercial: 8, smart_keypad_entry: 7,
  };
  return m[t];
}

export function securityLevel(t: DoorHandleType): number {
  const m: Record<DoorHandleType, number> = {
    lever_passage: 2, knob_privacy: 5, pull_barn_style: 1, push_plate_commercial: 3, smart_keypad_entry: 10,
  };
  return m[t];
}

export function aestheticAppeal(t: DoorHandleType): number {
  const m: Record<DoorHandleType, number> = {
    lever_passage: 7, knob_privacy: 6, pull_barn_style: 9, push_plate_commercial: 3, smart_keypad_entry: 8,
  };
  return m[t];
}

export function handleCost(t: DoorHandleType): number {
  const m: Record<DoorHandleType, number> = {
    lever_passage: 3, knob_privacy: 2, pull_barn_style: 5, push_plate_commercial: 4, smart_keypad_entry: 9,
  };
  return m[t];
}

export function lockBuiltIn(t: DoorHandleType): boolean {
  const m: Record<DoorHandleType, boolean> = {
    lever_passage: false, knob_privacy: true, pull_barn_style: false, push_plate_commercial: false, smart_keypad_entry: true,
  };
  return m[t];
}

export function adaCompliant(t: DoorHandleType): boolean {
  const m: Record<DoorHandleType, boolean> = {
    lever_passage: true, knob_privacy: false, pull_barn_style: false, push_plate_commercial: true, smart_keypad_entry: true,
  };
  return m[t];
}

export function handleMaterial(t: DoorHandleType): string {
  const m: Record<DoorHandleType, string> = {
    lever_passage: "solid_brass_cast",
    knob_privacy: "porcelain_ceramic_round",
    pull_barn_style: "black_iron_flat_bar",
    push_plate_commercial: "stainless_steel_plate",
    smart_keypad_entry: "zinc_alloy_electronic",
  };
  return m[t];
}

export function bestDoor(t: DoorHandleType): string {
  const m: Record<DoorHandleType, string> = {
    lever_passage: "interior_hallway_passage",
    knob_privacy: "bathroom_bedroom_privacy",
    pull_barn_style: "sliding_barn_door",
    push_plate_commercial: "high_traffic_commercial",
    smart_keypad_entry: "front_entry_keyless",
  };
  return m[t];
}

export function doorHandles(): DoorHandleType[] {
  return ["lever_passage", "knob_privacy", "pull_barn_style", "push_plate_commercial", "smart_keypad_entry"];
}
