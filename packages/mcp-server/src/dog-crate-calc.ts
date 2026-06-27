export type DogCrateType = "wire_folding_standard" | "plastic_airline_travel" | "soft_fabric_portable" | "furniture_end_table" | "heavy_duty_escape_proof";

export function ventilation(t: DogCrateType): number {
  const m: Record<DogCrateType, number> = {
    wire_folding_standard: 10, plastic_airline_travel: 6, soft_fabric_portable: 8, furniture_end_table: 5, heavy_duty_escape_proof: 7,
  };
  return m[t];
}

export function portability(t: DogCrateType): number {
  const m: Record<DogCrateType, number> = {
    wire_folding_standard: 7, plastic_airline_travel: 6, soft_fabric_portable: 10, furniture_end_table: 2, heavy_duty_escape_proof: 3,
  };
  return m[t];
}

export function security(t: DogCrateType): number {
  const m: Record<DogCrateType, number> = {
    wire_folding_standard: 7, plastic_airline_travel: 8, soft_fabric_portable: 3, furniture_end_table: 5, heavy_duty_escape_proof: 10,
  };
  return m[t];
}

export function aesthetics(t: DogCrateType): number {
  const m: Record<DogCrateType, number> = {
    wire_folding_standard: 3, plastic_airline_travel: 4, soft_fabric_portable: 7, furniture_end_table: 10, heavy_duty_escape_proof: 2,
  };
  return m[t];
}

export function crateCost(t: DogCrateType): number {
  const m: Record<DogCrateType, number> = {
    wire_folding_standard: 4, plastic_airline_travel: 5, soft_fabric_portable: 4, furniture_end_table: 9, heavy_duty_escape_proof: 10,
  };
  return m[t];
}

export function airlineApproved(t: DogCrateType): boolean {
  const m: Record<DogCrateType, boolean> = {
    wire_folding_standard: false, plastic_airline_travel: true, soft_fabric_portable: false, furniture_end_table: false, heavy_duty_escape_proof: false,
  };
  return m[t];
}

export function collapsible(t: DogCrateType): boolean {
  const m: Record<DogCrateType, boolean> = {
    wire_folding_standard: true, plastic_airline_travel: false, soft_fabric_portable: true, furniture_end_table: false, heavy_duty_escape_proof: false,
  };
  return m[t];
}

export function frameMaterial(t: DogCrateType): string {
  const m: Record<DogCrateType, string> = {
    wire_folding_standard: "powder_coated_steel",
    plastic_airline_travel: "hdpe_reinforced_shell",
    soft_fabric_portable: "steel_frame_mesh_fabric",
    furniture_end_table: "solid_hardwood_veneer",
    heavy_duty_escape_proof: "welded_steel_tube",
  };
  return m[t];
}

export function bestDog(t: DogCrateType): string {
  const m: Record<DogCrateType, string> = {
    wire_folding_standard: "general_training_puppy",
    plastic_airline_travel: "air_travel_vet_visit",
    soft_fabric_portable: "calm_small_camping",
    furniture_end_table: "living_room_decor",
    heavy_duty_escape_proof: "anxious_strong_chewer",
  };
  return m[t];
}

export function dogCrates(): DogCrateType[] {
  return ["wire_folding_standard", "plastic_airline_travel", "soft_fabric_portable", "furniture_end_table", "heavy_duty_escape_proof"];
}
