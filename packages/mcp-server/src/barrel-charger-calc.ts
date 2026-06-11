export type BarrelChargerType =
  | "gravity_fill"
  | "pump_fill"
  | "vacuum_fill"
  | "metered_auto"
  | "carousel_rotary";

interface BarrelChargerData {
  fillSpeed: number;
  fillAccuracy: number;
  spillControl: number;
  automation: number;
  bcCost: number;
  automated: boolean;
  forSpirits: boolean;
  chargerConfig: string;
  bestUse: string;
}

const DATA: Record<BarrelChargerType, BarrelChargerData> = {
  gravity_fill: {
    fillSpeed: 5, fillAccuracy: 5, spillControl: 6, automation: 3, bcCost: 3,
    automated: false, forSpirits: true,
    chargerConfig: "gravity_fill_barrel_charger_tank_above_hose_manual_bung_fill",
    bestUse: "small_craft_distillery_gravity_fill_barrel_manual_bung_simple",
  },
  pump_fill: {
    fillSpeed: 7, fillAccuracy: 7, spillControl: 7, automation: 5, bcCost: 5,
    automated: false, forSpirits: true,
    chargerConfig: "pump_fill_barrel_charger_positive_displacement_hose_nozzle",
    bestUse: "mid_size_distillery_winery_pump_fill_barrel_charger_hose_nozzle",
  },
  vacuum_fill: {
    fillSpeed: 8, fillAccuracy: 9, spillControl: 10, automation: 7, bcCost: 7,
    automated: false, forSpirits: true,
    chargerConfig: "vacuum_fill_barrel_charger_no_spill_seal_bung_evacuate_fill",
    bestUse: "premium_spirit_wine_no_spill_vacuum_fill_barrel_charger_clean",
  },
  metered_auto: {
    fillSpeed: 9, fillAccuracy: 10, spillControl: 9, automation: 9, bcCost: 8,
    automated: true, forSpirits: true,
    chargerConfig: "metered_auto_fill_barrel_charger_flow_meter_plc_precise_volume",
    bestUse: "large_distillery_metered_auto_fill_precise_volume_plc_control",
  },
  carousel_rotary: {
    fillSpeed: 10, fillAccuracy: 9, spillControl: 9, automation: 10, bcCost: 10,
    automated: true, forSpirits: true,
    chargerConfig: "carousel_rotary_barrel_charger_multi_head_continuous_fill_line",
    bestUse: "high_volume_bourbon_whisky_carousel_rotary_continuous_barrel_fill",
  },
};

function get(t: BarrelChargerType): BarrelChargerData {
  return DATA[t];
}

export const fillSpeed = (t: BarrelChargerType) => get(t).fillSpeed;
export const fillAccuracy = (t: BarrelChargerType) => get(t).fillAccuracy;
export const spillControl = (t: BarrelChargerType) => get(t).spillControl;
export const automation = (t: BarrelChargerType) => get(t).automation;
export const bcCost = (t: BarrelChargerType) => get(t).bcCost;
export const automated = (t: BarrelChargerType) => get(t).automated;
export const forSpirits = (t: BarrelChargerType) => get(t).forSpirits;
export const chargerConfig = (t: BarrelChargerType) => get(t).chargerConfig;
export const bestUse = (t: BarrelChargerType) => get(t).bestUse;
export const barrelChargerTypes = (): BarrelChargerType[] =>
  Object.keys(DATA) as BarrelChargerType[];
