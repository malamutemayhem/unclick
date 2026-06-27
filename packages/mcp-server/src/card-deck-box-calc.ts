export type CardDeckBoxType = "plastic_snap_basic" | "magnetic_flip_premium" | "leather_sideload_pro" | "boulder_hard_shell" | "tower_multi_compartment";

export function capacity(t: CardDeckBoxType): number {
  const m: Record<CardDeckBoxType, number> = {
    plastic_snap_basic: 4, magnetic_flip_premium: 5, leather_sideload_pro: 5, boulder_hard_shell: 5, tower_multi_compartment: 10,
  };
  return m[t];
}

export function protection(t: CardDeckBoxType): number {
  const m: Record<CardDeckBoxType, number> = {
    plastic_snap_basic: 5, magnetic_flip_premium: 7, leather_sideload_pro: 8, boulder_hard_shell: 10, tower_multi_compartment: 9,
  };
  return m[t];
}

export function cardAccess(t: CardDeckBoxType): number {
  const m: Record<CardDeckBoxType, number> = {
    plastic_snap_basic: 7, magnetic_flip_premium: 8, leather_sideload_pro: 9, boulder_hard_shell: 7, tower_multi_compartment: 6,
  };
  return m[t];
}

export function styleAppeal(t: CardDeckBoxType): number {
  const m: Record<CardDeckBoxType, number> = {
    plastic_snap_basic: 3, magnetic_flip_premium: 8, leather_sideload_pro: 9, boulder_hard_shell: 7, tower_multi_compartment: 8,
  };
  return m[t];
}

export function boxCost(t: CardDeckBoxType): number {
  const m: Record<CardDeckBoxType, number> = {
    plastic_snap_basic: 1, magnetic_flip_premium: 4, leather_sideload_pro: 6, boulder_hard_shell: 5, tower_multi_compartment: 7,
  };
  return m[t];
}

export function holdsSleeves(t: CardDeckBoxType): boolean {
  const m: Record<CardDeckBoxType, boolean> = {
    plastic_snap_basic: false, magnetic_flip_premium: true, leather_sideload_pro: true, boulder_hard_shell: true, tower_multi_compartment: true,
  };
  return m[t];
}

export function multiDeck(t: CardDeckBoxType): boolean {
  const m: Record<CardDeckBoxType, boolean> = {
    plastic_snap_basic: false, magnetic_flip_premium: false, leather_sideload_pro: false, boulder_hard_shell: false, tower_multi_compartment: true,
  };
  return m[t];
}

export function shellMaterial(t: CardDeckBoxType): string {
  const m: Record<CardDeckBoxType, string> = {
    plastic_snap_basic: "polypropylene_clear_snap",
    magnetic_flip_premium: "leatherette_magnet_flap",
    leather_sideload_pro: "genuine_leather_side",
    boulder_hard_shell: "rigid_polycarbonate_foam",
    tower_multi_compartment: "wood_composite_tower",
  };
  return m[t];
}

export function bestGame(t: CardDeckBoxType): string {
  const m: Record<CardDeckBoxType, string> = {
    plastic_snap_basic: "casual_starter_deck",
    magnetic_flip_premium: "standard_tcg_60_card",
    leather_sideload_pro: "tournament_commander",
    boulder_hard_shell: "travel_protect_valuable",
    tower_multi_compartment: "multi_format_collection",
  };
  return m[t];
}

export function cardDeckBoxes(): CardDeckBoxType[] {
  return ["plastic_snap_basic", "magnetic_flip_premium", "leather_sideload_pro", "boulder_hard_shell", "tower_multi_compartment"];
}
