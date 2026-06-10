export type VerticalFarm = "container_farm" | "warehouse" | "greenhouse_hybrid" | "modular_rack" | "building_integrated";

export function yieldPerSqFt(v: VerticalFarm): number {
  const m: Record<VerticalFarm, number> = {
    container_farm: 6, warehouse: 10, greenhouse_hybrid: 7, modular_rack: 5, building_integrated: 4,
  };
  return m[v];
}

export function startupCost(v: VerticalFarm): number {
  const m: Record<VerticalFarm, number> = {
    container_farm: 4, warehouse: 10, greenhouse_hybrid: 7, modular_rack: 3, building_integrated: 9,
  };
  return m[v];
}

export function energyUsage(v: VerticalFarm): number {
  const m: Record<VerticalFarm, number> = {
    container_farm: 7, warehouse: 10, greenhouse_hybrid: 4, modular_rack: 6, building_integrated: 5,
  };
  return m[v];
}

export function scalability(v: VerticalFarm): number {
  const m: Record<VerticalFarm, number> = {
    container_farm: 8, warehouse: 10, greenhouse_hybrid: 6, modular_rack: 9, building_integrated: 3,
  };
  return m[v];
}

export function automationLevel(v: VerticalFarm): number {
  const m: Record<VerticalFarm, number> = {
    container_farm: 7, warehouse: 10, greenhouse_hybrid: 6, modular_rack: 5, building_integrated: 4,
  };
  return m[v];
}

export function usesSunlight(v: VerticalFarm): boolean {
  const m: Record<VerticalFarm, boolean> = {
    container_farm: false, warehouse: false, greenhouse_hybrid: true, modular_rack: false, building_integrated: true,
  };
  return m[v];
}

export function relocatable(v: VerticalFarm): boolean {
  const m: Record<VerticalFarm, boolean> = {
    container_farm: true, warehouse: false, greenhouse_hybrid: false, modular_rack: true, building_integrated: false,
  };
  return m[v];
}

export function climateSystem(v: VerticalFarm): string {
  const m: Record<VerticalFarm, string> = {
    container_farm: "self_contained_hvac", warehouse: "industrial_hvac_dehumidify",
    greenhouse_hybrid: "passive_solar_supplemental", modular_rack: "room_ambient_fan",
    building_integrated: "shared_building_hvac",
  };
  return m[v];
}

export function bestCrop(v: VerticalFarm): string {
  const m: Record<VerticalFarm, string> = {
    container_farm: "leafy_green_herb_local", warehouse: "mass_production_lettuce",
    greenhouse_hybrid: "tomato_berry_vine", modular_rack: "microgreen_sprout",
    building_integrated: "restaurant_rooftop_herb",
  };
  return m[v];
}

export function verticalFarms(): VerticalFarm[] {
  return ["container_farm", "warehouse", "greenhouse_hybrid", "modular_rack", "building_integrated"];
}
