export type DoorKnockerType = "ring_pull_classic" | "lion_head_cast" | "bar_lever_modern" | "urn_shape_colonial" | "smart_video_combo";

export function loudness(t: DoorKnockerType): number {
  const m: Record<DoorKnockerType, number> = {
    ring_pull_classic: 7, lion_head_cast: 9, bar_lever_modern: 6, urn_shape_colonial: 8, smart_video_combo: 10,
  };
  return m[t];
}

export function aestheticAppeal(t: DoorKnockerType): number {
  const m: Record<DoorKnockerType, number> = {
    ring_pull_classic: 7, lion_head_cast: 10, bar_lever_modern: 8, urn_shape_colonial: 9, smart_video_combo: 6,
  };
  return m[t];
}

export function durability(t: DoorKnockerType): number {
  const m: Record<DoorKnockerType, number> = {
    ring_pull_classic: 8, lion_head_cast: 9, bar_lever_modern: 7, urn_shape_colonial: 8, smart_video_combo: 5,
  };
  return m[t];
}

export function installEase(t: DoorKnockerType): number {
  const m: Record<DoorKnockerType, number> = {
    ring_pull_classic: 8, lion_head_cast: 6, bar_lever_modern: 9, urn_shape_colonial: 7, smart_video_combo: 4,
  };
  return m[t];
}

export function knockerCost(t: DoorKnockerType): number {
  const m: Record<DoorKnockerType, number> = {
    ring_pull_classic: 3, lion_head_cast: 7, bar_lever_modern: 4, urn_shape_colonial: 6, smart_video_combo: 9,
  };
  return m[t];
}

export function hasCamera(t: DoorKnockerType): boolean {
  const m: Record<DoorKnockerType, boolean> = {
    ring_pull_classic: false, lion_head_cast: false, bar_lever_modern: false, urn_shape_colonial: false, smart_video_combo: true,
  };
  return m[t];
}

export function solidMetal(t: DoorKnockerType): boolean {
  const m: Record<DoorKnockerType, boolean> = {
    ring_pull_classic: true, lion_head_cast: true, bar_lever_modern: true, urn_shape_colonial: true, smart_video_combo: false,
  };
  return m[t];
}

export function knockerFinish(t: DoorKnockerType): string {
  const m: Record<DoorKnockerType, string> = {
    ring_pull_classic: "antique_brass_patina",
    lion_head_cast: "polished_bronze_cast",
    bar_lever_modern: "brushed_nickel_flat",
    urn_shape_colonial: "dark_iron_oil_rubbed",
    smart_video_combo: "matte_black_plastic",
  };
  return m[t];
}

export function bestDoor(t: DoorKnockerType): string {
  const m: Record<DoorKnockerType, string> = {
    ring_pull_classic: "cottage_rustic_entry",
    lion_head_cast: "formal_grand_entrance",
    bar_lever_modern: "contemporary_minimalist",
    urn_shape_colonial: "historic_period_home",
    smart_video_combo: "security_conscious_urban",
  };
  return m[t];
}

export function doorKnockers(): DoorKnockerType[] {
  return ["ring_pull_classic", "lion_head_cast", "bar_lever_modern", "urn_shape_colonial", "smart_video_combo"];
}
