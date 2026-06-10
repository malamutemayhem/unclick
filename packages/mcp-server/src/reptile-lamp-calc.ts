export type ReptileLampType = "basking_spot" | "ceramic_heat_emitter" | "uvb_fluorescent" | "mercury_vapor" | "led_plant_grow";

export function heatOutput(t: ReptileLampType): number {
  const m: Record<ReptileLampType, number> = {
    basking_spot: 9, ceramic_heat_emitter: 10, uvb_fluorescent: 2, mercury_vapor: 8, led_plant_grow: 1,
  };
  return m[t];
}

export function uvbOutput(t: ReptileLampType): number {
  const m: Record<ReptileLampType, number> = {
    basking_spot: 1, ceramic_heat_emitter: 0, uvb_fluorescent: 10, mercury_vapor: 9, led_plant_grow: 2,
  };
  return m[t];
}

export function bulbLifespan(t: ReptileLampType): number {
  const m: Record<ReptileLampType, number> = {
    basking_spot: 3, ceramic_heat_emitter: 10, uvb_fluorescent: 5, mercury_vapor: 4, led_plant_grow: 9,
  };
  return m[t];
}

export function energyEfficiency(t: ReptileLampType): number {
  const m: Record<ReptileLampType, number> = {
    basking_spot: 4, ceramic_heat_emitter: 6, uvb_fluorescent: 7, mercury_vapor: 3, led_plant_grow: 10,
  };
  return m[t];
}

export function lampCost(t: ReptileLampType): number {
  const m: Record<ReptileLampType, number> = {
    basking_spot: 2, ceramic_heat_emitter: 4, uvb_fluorescent: 5, mercury_vapor: 8, led_plant_grow: 6,
  };
  return m[t];
}

export function nightSafe(t: ReptileLampType): boolean {
  const m: Record<ReptileLampType, boolean> = {
    basking_spot: false, ceramic_heat_emitter: true, uvb_fluorescent: false, mercury_vapor: false, led_plant_grow: false,
  };
  return m[t];
}

export function visibleLight(t: ReptileLampType): boolean {
  const m: Record<ReptileLampType, boolean> = {
    basking_spot: true, ceramic_heat_emitter: false, uvb_fluorescent: true, mercury_vapor: true, led_plant_grow: true,
  };
  return m[t];
}

export function bulbType(t: ReptileLampType): string {
  const m: Record<ReptileLampType, string> = {
    basking_spot: "incandescent_reflector",
    ceramic_heat_emitter: "ceramic_infrared_element",
    uvb_fluorescent: "compact_tube_phosphor",
    mercury_vapor: "self_ballasted_arc",
    led_plant_grow: "full_spectrum_led_array",
  };
  return m[t];
}

export function bestReptile(t: ReptileLampType): string {
  const m: Record<ReptileLampType, string> = {
    basking_spot: "bearded_dragon_basking",
    ceramic_heat_emitter: "nocturnal_snake_heat",
    uvb_fluorescent: "tortoise_bone_health",
    mercury_vapor: "large_iguana_all_in_one",
    led_plant_grow: "bioactive_vivarium_plants",
  };
  return m[t];
}

export function reptileLamps(): ReptileLampType[] {
  return ["basking_spot", "ceramic_heat_emitter", "uvb_fluorescent", "mercury_vapor", "led_plant_grow"];
}
