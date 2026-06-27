export type LifeJacketType = "offshore_type_1" | "nearshore_type_2" | "flotation_aid_type_3" | "throwable_type_4" | "inflatable_belt";

export function buoyancyForce(t: LifeJacketType): number {
  const m: Record<LifeJacketType, number> = {
    offshore_type_1: 10, nearshore_type_2: 8, flotation_aid_type_3: 6, throwable_type_4: 5, inflatable_belt: 7,
  };
  return m[t];
}

export function mobilityRange(t: LifeJacketType): number {
  const m: Record<LifeJacketType, number> = {
    offshore_type_1: 3, nearshore_type_2: 5, flotation_aid_type_3: 8, throwable_type_4: 10, inflatable_belt: 10,
  };
  return m[t];
}

export function wearComfort(t: LifeJacketType): number {
  const m: Record<LifeJacketType, number> = {
    offshore_type_1: 3, nearshore_type_2: 5, flotation_aid_type_3: 8, throwable_type_4: 1, inflatable_belt: 9,
  };
  return m[t];
}

export function turnFaceUp(t: LifeJacketType): number {
  const m: Record<LifeJacketType, number> = {
    offshore_type_1: 10, nearshore_type_2: 8, flotation_aid_type_3: 3, throwable_type_4: 1, inflatable_belt: 6,
  };
  return m[t];
}

export function jacketCost(t: LifeJacketType): number {
  const m: Record<LifeJacketType, number> = {
    offshore_type_1: 7, nearshore_type_2: 5, flotation_aid_type_3: 4, throwable_type_4: 2, inflatable_belt: 8,
  };
  return m[t];
}

export function uscgApproved(t: LifeJacketType): boolean {
  const m: Record<LifeJacketType, boolean> = {
    offshore_type_1: true, nearshore_type_2: true, flotation_aid_type_3: true, throwable_type_4: true, inflatable_belt: true,
  };
  return m[t];
}

export function inherentFloat(t: LifeJacketType): boolean {
  const m: Record<LifeJacketType, boolean> = {
    offshore_type_1: true, nearshore_type_2: true, flotation_aid_type_3: true, throwable_type_4: true, inflatable_belt: false,
  };
  return m[t];
}

export function closureType(t: LifeJacketType): string {
  const m: Record<LifeJacketType, string> = {
    offshore_type_1: "buckle_strap_cinch",
    nearshore_type_2: "zipper_buckle_combo",
    flotation_aid_type_3: "front_zip_snap",
    throwable_type_4: "grab_strap_ring",
    inflatable_belt: "waist_clip_pull_tab",
  };
  return m[t];
}

export function bestWater(t: LifeJacketType): string {
  const m: Record<LifeJacketType, string> = {
    offshore_type_1: "open_ocean_rough_sea",
    nearshore_type_2: "coastal_bay_inlet",
    flotation_aid_type_3: "calm_lake_river_sport",
    throwable_type_4: "emergency_overboard_rescue",
    inflatable_belt: "paddleboard_kayak_active",
  };
  return m[t];
}

export function lifeJackets(): LifeJacketType[] {
  return ["offshore_type_1", "nearshore_type_2", "flotation_aid_type_3", "throwable_type_4", "inflatable_belt"];
}
