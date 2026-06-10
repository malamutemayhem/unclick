export type TowelWarmerType = "wall_mount_electric" | "freestanding_plug" | "hydronic_radiator" | "bucket_style" | "drawer_cabinet";

export function heatOutput(t: TowelWarmerType): number {
  const m: Record<TowelWarmerType, number> = {
    wall_mount_electric: 7, freestanding_plug: 6, hydronic_radiator: 10, bucket_style: 8, drawer_cabinet: 5,
  };
  return m[t];
}

export function towelCapacity(t: TowelWarmerType): number {
  const m: Record<TowelWarmerType, number> = {
    wall_mount_electric: 6, freestanding_plug: 5, hydronic_radiator: 8, bucket_style: 4, drawer_cabinet: 10,
  };
  return m[t];
}

export function installEase(t: TowelWarmerType): number {
  const m: Record<TowelWarmerType, number> = {
    wall_mount_electric: 5, freestanding_plug: 10, hydronic_radiator: 1, bucket_style: 10, drawer_cabinet: 3,
  };
  return m[t];
}

export function energyUse(t: TowelWarmerType): number {
  const m: Record<TowelWarmerType, number> = {
    wall_mount_electric: 5, freestanding_plug: 4, hydronic_radiator: 7, bucket_style: 6, drawer_cabinet: 5,
  };
  return m[t];
}

export function warmerCost(t: TowelWarmerType): number {
  const m: Record<TowelWarmerType, number> = {
    wall_mount_electric: 5, freestanding_plug: 3, hydronic_radiator: 9, bucket_style: 4, drawer_cabinet: 10,
  };
  return m[t];
}

export function plugAndPlay(t: TowelWarmerType): boolean {
  const m: Record<TowelWarmerType, boolean> = {
    wall_mount_electric: false, freestanding_plug: true, hydronic_radiator: false, bucket_style: true, drawer_cabinet: true,
  };
  return m[t];
}

export function roomHeater(t: TowelWarmerType): boolean {
  const m: Record<TowelWarmerType, boolean> = {
    wall_mount_electric: true, freestanding_plug: false, hydronic_radiator: true, bucket_style: false, drawer_cabinet: false,
  };
  return m[t];
}

export function heatingMethod(t: TowelWarmerType): string {
  const m: Record<TowelWarmerType, string> = {
    wall_mount_electric: "dry_element_bar_rail",
    freestanding_plug: "oil_filled_radiant_bar",
    hydronic_radiator: "hot_water_loop_pipe",
    bucket_style: "enclosed_element_chamber",
    drawer_cabinet: "fan_forced_warm_air",
  };
  return m[t];
}

export function bestBath(t: TowelWarmerType): string {
  const m: Record<TowelWarmerType, string> = {
    wall_mount_electric: "master_bath_permanent",
    freestanding_plug: "rental_portable_warmth",
    hydronic_radiator: "whole_home_renovation",
    bucket_style: "spa_salon_facial_towel",
    drawer_cabinet: "luxury_built_in_vanity",
  };
  return m[t];
}

export function towelWarmers(): TowelWarmerType[] {
  return ["wall_mount_electric", "freestanding_plug", "hydronic_radiator", "bucket_style", "drawer_cabinet"];
}
