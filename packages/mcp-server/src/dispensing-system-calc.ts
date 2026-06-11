export type DispensingSystemType =
  | "time_pressure_syringe"
  | "positive_displacement_pump"
  | "jetting_non_contact"
  | "auger_valve_screw"
  | "spray_conformal_coat";

interface DispensingSystemData {
  precision: number;
  speed: number;
  viscosityRange: number;
  repeatability: number;
  dsCost: number;
  contactless: boolean;
  forElectronics: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<DispensingSystemType, DispensingSystemData> = {
  time_pressure_syringe: {
    precision: 6, speed: 5, viscosityRange: 7, repeatability: 6, dsCost: 3,
    contactless: false, forElectronics: true,
    mechanism: "air_pressure_timed_pulse_syringe_barrel_needle_tip",
    bestUse: "prototype_small_batch_adhesive_sealant_rework_lab",
  },
  positive_displacement_pump: {
    precision: 9, speed: 7, viscosityRange: 8, repeatability: 9, dsCost: 7,
    contactless: false, forElectronics: true,
    mechanism: "piston_or_gear_metered_volume_consistent_bead_dot",
    bestUse: "underfill_dam_fill_potting_encapsulation_high_vol",
  },
  jetting_non_contact: {
    precision: 10, speed: 10, viscosityRange: 5, repeatability: 9, dsCost: 9,
    contactless: true, forElectronics: true,
    mechanism: "piezo_or_pneumatic_jet_non_contact_droplet_eject",
    bestUse: "smt_solder_paste_micro_dot_led_die_attach_fast",
  },
  auger_valve_screw: {
    precision: 8, speed: 6, viscosityRange: 9, repeatability: 8, dsCost: 5,
    contactless: false, forElectronics: true,
    mechanism: "rotating_auger_screw_positive_displacement_thick",
    bestUse: "thick_paste_grease_epoxy_thermal_compound_gasket",
  },
  spray_conformal_coat: {
    precision: 5, speed: 9, viscosityRange: 4, repeatability: 7, dsCost: 6,
    contactless: true, forElectronics: true,
    mechanism: "atomized_spray_fan_pattern_thin_film_area_coverage",
    bestUse: "pcb_conformal_coat_moisture_barrier_flux_spray",
  },
};

function get(t: DispensingSystemType): DispensingSystemData {
  return DATA[t];
}

export const precision = (t: DispensingSystemType) => get(t).precision;
export const speed = (t: DispensingSystemType) => get(t).speed;
export const viscosityRange = (t: DispensingSystemType) => get(t).viscosityRange;
export const repeatability = (t: DispensingSystemType) => get(t).repeatability;
export const dsCost = (t: DispensingSystemType) => get(t).dsCost;
export const contactless = (t: DispensingSystemType) => get(t).contactless;
export const forElectronics = (t: DispensingSystemType) => get(t).forElectronics;
export const mechanism = (t: DispensingSystemType) => get(t).mechanism;
export const bestUse = (t: DispensingSystemType) => get(t).bestUse;
export const dispensingSystemTypes = (): DispensingSystemType[] =>
  Object.keys(DATA) as DispensingSystemType[];
