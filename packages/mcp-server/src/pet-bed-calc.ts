export type PetBedType = "orthopedic_memory_foam" | "bolster_nest" | "elevated_cot" | "heated_electric" | "cave_hooded";

export function jointSupport(t: PetBedType): number {
  const m: Record<PetBedType, number> = {
    orthopedic_memory_foam: 10, bolster_nest: 5, elevated_cot: 7, heated_electric: 6, cave_hooded: 4,
  };
  return m[t];
}

export function warmthRetention(t: PetBedType): number {
  const m: Record<PetBedType, number> = {
    orthopedic_memory_foam: 7, bolster_nest: 8, elevated_cot: 2, heated_electric: 10, cave_hooded: 9,
  };
  return m[t];
}

export function coolingAirflow(t: PetBedType): number {
  const m: Record<PetBedType, number> = {
    orthopedic_memory_foam: 3, bolster_nest: 2, elevated_cot: 10, heated_electric: 1, cave_hooded: 1,
  };
  return m[t];
}

export function washability(t: PetBedType): number {
  const m: Record<PetBedType, number> = {
    orthopedic_memory_foam: 6, bolster_nest: 8, elevated_cot: 10, heated_electric: 4, cave_hooded: 7,
  };
  return m[t];
}

export function bedCost(t: PetBedType): number {
  const m: Record<PetBedType, number> = {
    orthopedic_memory_foam: 8, bolster_nest: 4, elevated_cot: 5, heated_electric: 7, cave_hooded: 5,
  };
  return m[t];
}

export function indoorOutdoor(t: PetBedType): boolean {
  const m: Record<PetBedType, boolean> = {
    orthopedic_memory_foam: false, bolster_nest: false, elevated_cot: true, heated_electric: false, cave_hooded: false,
  };
  return m[t];
}

export function machineWash(t: PetBedType): boolean {
  const m: Record<PetBedType, boolean> = {
    orthopedic_memory_foam: true, bolster_nest: true, elevated_cot: true, heated_electric: false, cave_hooded: true,
  };
  return m[t];
}

export function fillType(t: PetBedType): string {
  const m: Record<PetBedType, string> = {
    orthopedic_memory_foam: "high_density_memory_foam", bolster_nest: "polyester_fiber_fill",
    elevated_cot: "mesh_fabric_no_fill", heated_electric: "low_watt_heating_pad",
    cave_hooded: "sherpa_lined_poly_fill",
  };
  return m[t];
}

export function bestPet(t: PetBedType): string {
  const m: Record<PetBedType, string> = {
    orthopedic_memory_foam: "senior_large_joint_pain", bolster_nest: "small_medium_nester",
    elevated_cot: "hot_climate_outdoor_dog", heated_electric: "arthritic_cold_weather",
    cave_hooded: "anxious_burrowing_cat",
  };
  return m[t];
}

export function petBeds(): PetBedType[] {
  return ["orthopedic_memory_foam", "bolster_nest", "elevated_cot", "heated_electric", "cave_hooded"];
}
