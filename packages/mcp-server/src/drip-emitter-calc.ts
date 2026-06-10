export type DripEmitterType = "button_dripper_adjustable" | "inline_pressure_compensate" | "micro_sprayer_fan" | "drip_stake_potted" | "bubbler_flood_basin";

export function flowPrecision(t: DripEmitterType): number {
  const m: Record<DripEmitterType, number> = {
    button_dripper_adjustable: 8, inline_pressure_compensate: 10, micro_sprayer_fan: 5, drip_stake_potted: 7, bubbler_flood_basin: 4,
  };
  return m[t];
}

export function coverageArea(t: DripEmitterType): number {
  const m: Record<DripEmitterType, number> = {
    button_dripper_adjustable: 3, inline_pressure_compensate: 6, micro_sprayer_fan: 9, drip_stake_potted: 2, bubbler_flood_basin: 7,
  };
  return m[t];
}

export function clogResist(t: DripEmitterType): number {
  const m: Record<DripEmitterType, number> = {
    button_dripper_adjustable: 6, inline_pressure_compensate: 9, micro_sprayer_fan: 5, drip_stake_potted: 7, bubbler_flood_basin: 8,
  };
  return m[t];
}

export function installEase(t: DripEmitterType): number {
  const m: Record<DripEmitterType, number> = {
    button_dripper_adjustable: 8, inline_pressure_compensate: 5, micro_sprayer_fan: 7, drip_stake_potted: 9, bubbler_flood_basin: 7,
  };
  return m[t];
}

export function emitterCost(t: DripEmitterType): number {
  const m: Record<DripEmitterType, number> = {
    button_dripper_adjustable: 1, inline_pressure_compensate: 3, micro_sprayer_fan: 2, drip_stake_potted: 2, bubbler_flood_basin: 2,
  };
  return m[t];
}

export function adjustableRate(t: DripEmitterType): boolean {
  const m: Record<DripEmitterType, boolean> = {
    button_dripper_adjustable: true, inline_pressure_compensate: false, micro_sprayer_fan: true, drip_stake_potted: false, bubbler_flood_basin: true,
  };
  return m[t];
}

export function pressureCompensating(t: DripEmitterType): boolean {
  const m: Record<DripEmitterType, boolean> = {
    button_dripper_adjustable: false, inline_pressure_compensate: true, micro_sprayer_fan: false, drip_stake_potted: false, bubbler_flood_basin: false,
  };
  return m[t];
}

export function emitterDesign(t: DripEmitterType): string {
  const m: Record<DripEmitterType, string> = {
    button_dripper_adjustable: "barbed_insert_cap",
    inline_pressure_compensate: "diaphragm_labyrinth",
    micro_sprayer_fan: "spinner_deflector_head",
    drip_stake_potted: "tube_stake_gravity",
    bubbler_flood_basin: "open_basin_flood_ring",
  };
  return m[t];
}

export function bestPlant(t: DripEmitterType): string {
  const m: Record<DripEmitterType, string> = {
    button_dripper_adjustable: "shrub_individual_spot",
    inline_pressure_compensate: "row_crop_uniform",
    micro_sprayer_fan: "ground_cover_spread",
    drip_stake_potted: "container_pot_single",
    bubbler_flood_basin: "tree_deep_root_soak",
  };
  return m[t];
}

export function dripEmitters(): DripEmitterType[] {
  return ["button_dripper_adjustable", "inline_pressure_compensate", "micro_sprayer_fan", "drip_stake_potted", "bubbler_flood_basin"];
}
