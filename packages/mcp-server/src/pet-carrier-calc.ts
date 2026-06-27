export type PetCarrierType = "hard_shell_airline" | "soft_sided_tote" | "backpack_bubble" | "rolling_wheeled" | "sling_shoulder";

export function durability(t: PetCarrierType): number {
  const m: Record<PetCarrierType, number> = {
    hard_shell_airline: 10, soft_sided_tote: 5, backpack_bubble: 7, rolling_wheeled: 9, sling_shoulder: 3,
  };
  return m[t];
}

export function ventilation(t: PetCarrierType): number {
  const m: Record<PetCarrierType, number> = {
    hard_shell_airline: 7, soft_sided_tote: 8, backpack_bubble: 6, rolling_wheeled: 7, sling_shoulder: 9,
  };
  return m[t];
}

export function portability(t: PetCarrierType): number {
  const m: Record<PetCarrierType, number> = {
    hard_shell_airline: 4, soft_sided_tote: 8, backpack_bubble: 9, rolling_wheeled: 7, sling_shoulder: 10,
  };
  return m[t];
}

export function petCapacity(t: PetCarrierType): number {
  const m: Record<PetCarrierType, number> = {
    hard_shell_airline: 8, soft_sided_tote: 5, backpack_bubble: 4, rolling_wheeled: 9, sling_shoulder: 2,
  };
  return m[t];
}

export function carrierCost(t: PetCarrierType): number {
  const m: Record<PetCarrierType, number> = {
    hard_shell_airline: 7, soft_sided_tote: 4, backpack_bubble: 6, rolling_wheeled: 8, sling_shoulder: 3,
  };
  return m[t];
}

export function airlineApproved(t: PetCarrierType): boolean {
  const m: Record<PetCarrierType, boolean> = {
    hard_shell_airline: true, soft_sided_tote: true, backpack_bubble: false, rolling_wheeled: false, sling_shoulder: false,
  };
  return m[t];
}

export function collapsible(t: PetCarrierType): boolean {
  const m: Record<PetCarrierType, boolean> = {
    hard_shell_airline: false, soft_sided_tote: true, backpack_bubble: false, rolling_wheeled: false, sling_shoulder: true,
  };
  return m[t];
}

export function shellMaterial(t: PetCarrierType): string {
  const m: Record<PetCarrierType, string> = {
    hard_shell_airline: "abs_plastic_steel_door", soft_sided_tote: "polyester_mesh_panels",
    backpack_bubble: "pc_bubble_window_frame", rolling_wheeled: "ballistic_nylon_frame",
    sling_shoulder: "cotton_canvas_fleece_lined",
  };
  return m[t];
}

export function bestTrip(t: PetCarrierType): string {
  const m: Record<PetCarrierType, string> = {
    hard_shell_airline: "flight_cargo_vet_visit", soft_sided_tote: "under_seat_cabin_flight",
    backpack_bubble: "hiking_outdoor_adventure", rolling_wheeled: "airport_terminal_long_walk",
    sling_shoulder: "quick_errand_tiny_pet",
  };
  return m[t];
}

export function petCarriers(): PetCarrierType[] {
  return ["hard_shell_airline", "soft_sided_tote", "backpack_bubble", "rolling_wheeled", "sling_shoulder"];
}
