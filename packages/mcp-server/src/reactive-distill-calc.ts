export type ReactiveDistillType =
  | "catalytic_distill_fixed"
  | "catalytic_distill_structured"
  | "reactive_absorb_column"
  | "catalytic_distill_slurry"
  | "hybrid_react_extract";

interface ReactiveDistillData {
  conversion: number;
  selectivity: number;
  energySaving: number;
  complexity: number;
  rdCost: number;
  catalytic: boolean;
  forEquilib: boolean;
  internals: string;
  bestUse: string;
}

const DATA: Record<ReactiveDistillType, ReactiveDistillData> = {
  catalytic_distill_fixed: {
    conversion: 9, selectivity: 8, energySaving: 9, complexity: 7, rdCost: 7,
    catalytic: true, forEquilib: true,
    internals: "catalyst_bale_fixed_bed_tray_section",
    bestUse: "mtbe_etbe_ether_fuel_additive_synth",
  },
  catalytic_distill_structured: {
    conversion: 9, selectivity: 9, energySaving: 9, complexity: 8, rdCost: 8,
    catalytic: true, forEquilib: true,
    internals: "catalyst_envelop_structured_pack_layer",
    bestUse: "esterify_acetic_acid_high_select_yield",
  },
  reactive_absorb_column: {
    conversion: 8, selectivity: 7, energySaving: 7, complexity: 5, rdCost: 5,
    catalytic: false, forEquilib: false,
    internals: "packed_absorb_column_react_liquid_gas",
    bestUse: "acid_gas_removal_sulfur_recovery_scrub",
  },
  catalytic_distill_slurry: {
    conversion: 8, selectivity: 7, energySaving: 8, complexity: 9, rdCost: 9,
    catalytic: true, forEquilib: true,
    internals: "suspended_catalyst_liquid_phase_react",
    bestUse: "hydrogenation_fine_chem_slow_reaction",
  },
  hybrid_react_extract: {
    conversion: 10, selectivity: 10, energySaving: 8, complexity: 10, rdCost: 10,
    catalytic: true, forEquilib: true,
    internals: "reaction_zone_plus_extract_solvent_loop",
    bestUse: "azeotrope_break_react_extract_combine",
  },
};

function get(t: ReactiveDistillType): ReactiveDistillData {
  return DATA[t];
}

export const conversion = (t: ReactiveDistillType) => get(t).conversion;
export const selectivity = (t: ReactiveDistillType) => get(t).selectivity;
export const energySaving = (t: ReactiveDistillType) => get(t).energySaving;
export const complexity = (t: ReactiveDistillType) => get(t).complexity;
export const rdCost = (t: ReactiveDistillType) => get(t).rdCost;
export const catalytic = (t: ReactiveDistillType) => get(t).catalytic;
export const forEquilib = (t: ReactiveDistillType) => get(t).forEquilib;
export const internals = (t: ReactiveDistillType) => get(t).internals;
export const bestUse = (t: ReactiveDistillType) => get(t).bestUse;
export const reactiveDistillTypes = (): ReactiveDistillType[] =>
  Object.keys(DATA) as ReactiveDistillType[];
