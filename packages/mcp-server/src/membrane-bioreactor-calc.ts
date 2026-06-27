export type MembraneBioreactorType =
  | "submerged_hollow_fiber"
  | "submerged_flat_sheet"
  | "sidestream_tubular"
  | "anaerobic_mbr"
  | "hybrid_mbbr_mbr";

interface MembraneBioreactorData {
  effluentQuality: number;
  flux: number;
  foulingResist: number;
  energyUse: number;
  mbCost: number;
  anaerobic: boolean;
  forReuse: boolean;
  membrane: string;
  bestUse: string;
}

const DATA: Record<MembraneBioreactorType, MembraneBioreactorData> = {
  submerged_hollow_fiber: {
    effluentQuality: 9, flux: 7, foulingResist: 7, energyUse: 7, mbCost: 7,
    anaerobic: false, forReuse: true,
    membrane: "pvdf_hollow_fiber_outside_in_submerged_air",
    bestUse: "municipal_reuse_compact_plant_high_quality",
  },
  submerged_flat_sheet: {
    effluentQuality: 9, flux: 6, foulingResist: 8, energyUse: 6, mbCost: 8,
    anaerobic: false, forReuse: true,
    membrane: "chlorinated_pe_flat_sheet_cassette_submerged",
    bestUse: "industrial_wastewater_high_solids_food_process",
  },
  sidestream_tubular: {
    effluentQuality: 10, flux: 10, foulingResist: 9, energyUse: 4, mbCost: 9,
    anaerobic: false, forReuse: true,
    membrane: "tubular_pvdf_cross_flow_high_velocity_pump",
    bestUse: "high_strength_industrial_landfill_leachate",
  },
  anaerobic_mbr: {
    effluentQuality: 8, flux: 5, foulingResist: 5, energyUse: 9, mbCost: 8,
    anaerobic: true, forReuse: false,
    membrane: "hollow_fiber_submerged_anaerobic_biogas_recov",
    bestUse: "high_cod_wastewater_biogas_recovery_brewery",
  },
  hybrid_mbbr_mbr: {
    effluentQuality: 9, flux: 8, foulingResist: 8, energyUse: 6, mbCost: 8,
    anaerobic: false, forReuse: true,
    membrane: "mbbr_biofilm_carrier_plus_uf_membrane_hybrid",
    bestUse: "nutrient_removal_retrofit_existing_plant_upgrade",
  },
};

function get(t: MembraneBioreactorType): MembraneBioreactorData {
  return DATA[t];
}

export const effluentQuality = (t: MembraneBioreactorType) => get(t).effluentQuality;
export const flux = (t: MembraneBioreactorType) => get(t).flux;
export const foulingResist = (t: MembraneBioreactorType) => get(t).foulingResist;
export const energyUse = (t: MembraneBioreactorType) => get(t).energyUse;
export const mbCost = (t: MembraneBioreactorType) => get(t).mbCost;
export const anaerobic = (t: MembraneBioreactorType) => get(t).anaerobic;
export const forReuse = (t: MembraneBioreactorType) => get(t).forReuse;
export const membrane = (t: MembraneBioreactorType) => get(t).membrane;
export const bestUse = (t: MembraneBioreactorType) => get(t).bestUse;
export const membraneBioreactorTypes = (): MembraneBioreactorType[] =>
  Object.keys(DATA) as MembraneBioreactorType[];
