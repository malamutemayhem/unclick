export type DosimeterType =
  | "tld_thermoluminescent"
  | "osl_optically_stimulated"
  | "film_badge_photographic"
  | "electronic_personal_epd"
  | "ion_chamber_pen";

const DATA: Record<DosimeterType, {
  accuracy: number; range: number; realtime: number;
  reusability: number; dmCost: number; digital: boolean;
  forPersonnel: boolean; readout: string; bestUse: string;
}> = {
  tld_thermoluminescent: {
    accuracy: 8, range: 8, realtime: 1,
    reusability: 9, dmCost: 2, digital: false,
    forPersonnel: true, readout: "heat_glow_curve_analysis",
    bestUse: "occupational_whole_body_monitor",
  },
  osl_optically_stimulated: {
    accuracy: 9, range: 9, realtime: 1,
    reusability: 10, dmCost: 2, digital: false,
    forPersonnel: true, readout: "laser_stimulated_luminescence",
    bestUse: "nuclear_worker_badge_service",
  },
  film_badge_photographic: {
    accuracy: 5, range: 6, realtime: 1,
    reusability: 1, dmCost: 1, digital: false,
    forPersonnel: true, readout: "optical_density_darkening",
    bestUse: "legacy_low_cost_personnel_monitor",
  },
  electronic_personal_epd: {
    accuracy: 7, range: 7, realtime: 10,
    reusability: 8, dmCost: 4, digital: true,
    forPersonnel: true, readout: "silicon_diode_lcd_display",
    bestUse: "reactor_outage_realtime_dose_alarm",
  },
  ion_chamber_pen: {
    accuracy: 6, range: 5, realtime: 8,
    reusability: 7, dmCost: 2, digital: false,
    forPersonnel: false, readout: "quartz_fiber_electroscope",
    bestUse: "emergency_responder_pocket_check",
  },
};

const get = (t: DosimeterType) => DATA[t];

export const accuracy = (t: DosimeterType) => get(t).accuracy;
export const range = (t: DosimeterType) => get(t).range;
export const realtime = (t: DosimeterType) => get(t).realtime;
export const reusability = (t: DosimeterType) => get(t).reusability;
export const dmCost = (t: DosimeterType) => get(t).dmCost;
export const digital = (t: DosimeterType) => get(t).digital;
export const forPersonnel = (t: DosimeterType) => get(t).forPersonnel;
export const readout = (t: DosimeterType) => get(t).readout;
export const bestUse = (t: DosimeterType) => get(t).bestUse;
export const dosimeterTypes = (): DosimeterType[] => Object.keys(DATA) as DosimeterType[];
