export type RopeBraiderType =
  | "maypole_braider"
  | "rotary_braider"
  | "horn_gear"
  | "carrier_braider"
  | "3d_braider";

interface RopeBraiderData {
  braidQuality: number;
  throughput: number;
  patternRange: number;
  tensionControl: number;
  rbCost: number;
  automated: boolean;
  forComposite: boolean;
  braiderConfig: string;
  bestUse: string;
}

const DATA: Record<RopeBraiderType, RopeBraiderData> = {
  maypole_braider: {
    braidQuality: 8, throughput: 7, patternRange: 7, tensionControl: 7, rbCost: 6,
    automated: true, forComposite: false,
    braiderConfig: "maypole_braider_bobbin_carrier_track_interweave_tubular_braid",
    bestUse: "rope_cord_maypole_braider_tubular_flat_braid_textile_lace",
  },
  rotary_braider: {
    braidQuality: 9, throughput: 9, patternRange: 8, tensionControl: 9, rbCost: 8,
    automated: true, forComposite: false,
    braiderConfig: "rotary_braider_high_speed_bobbin_rotate_interlock_uniform_braid",
    bestUse: "industrial_rope_rotary_braider_high_speed_uniform_marine_rope",
  },
  horn_gear: {
    braidQuality: 7, throughput: 6, patternRange: 9, tensionControl: 6, rbCost: 5,
    automated: false, forComposite: false,
    braiderConfig: "horn_gear_braider_gear_driven_carrier_complex_pattern_flexible",
    bestUse: "specialty_braid_horn_gear_braider_complex_pattern_elastic_cord",
  },
  carrier_braider: {
    braidQuality: 8, throughput: 8, patternRange: 8, tensionControl: 8, rbCost: 7,
    automated: true, forComposite: false,
    braiderConfig: "carrier_braider_multi_carrier_track_over_under_weave_sheath",
    bestUse: "cable_sheath_carrier_braider_protective_sleeve_wire_harness",
  },
  "3d_braider": {
    braidQuality: 10, throughput: 4, patternRange: 10, tensionControl: 10, rbCost: 10,
    automated: true, forComposite: true,
    braiderConfig: "3d_braider_multi_axis_carrier_interlocking_preform_composite",
    bestUse: "aerospace_3d_braider_composite_preform_structural_reinforcement",
  },
};

function get(t: RopeBraiderType): RopeBraiderData {
  return DATA[t];
}

export const braidQuality = (t: RopeBraiderType) => get(t).braidQuality;
export const throughput = (t: RopeBraiderType) => get(t).throughput;
export const patternRange = (t: RopeBraiderType) => get(t).patternRange;
export const tensionControl = (t: RopeBraiderType) => get(t).tensionControl;
export const rbCost = (t: RopeBraiderType) => get(t).rbCost;
export const automated = (t: RopeBraiderType) => get(t).automated;
export const forComposite = (t: RopeBraiderType) => get(t).forComposite;
export const braiderConfig = (t: RopeBraiderType) => get(t).braiderConfig;
export const bestUse = (t: RopeBraiderType) => get(t).bestUse;
export const ropeBraiderTypes = (): RopeBraiderType[] =>
  Object.keys(DATA) as RopeBraiderType[];
