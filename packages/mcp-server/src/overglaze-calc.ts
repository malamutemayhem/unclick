export type OverglazeType =
  | "china_paint_standard"
  | "luster_metallic_shine"
  | "enamel_opaque_cover"
  | "gold_leaf_precious"
  | "decal_transfer_print";

const specs: Record<OverglazeType, {
  colorBright: number; surfaceSmooth: number; durability: number;
  applyEase: number; cost: number; metallic: boolean; precious: boolean;
  fireTemp: string; use: string;
}> = {
  china_paint_standard: {
    colorBright: 88, surfaceSmooth: 85, durability: 80,
    applyEase: 78, cost: 15, metallic: false, precious: false,
    fireTemp: "cone_018_low", use: "general_china_decor",
  },
  luster_metallic_shine: {
    colorBright: 82, surfaceSmooth: 92, durability: 72,
    applyEase: 70, cost: 25, metallic: true, precious: false,
    fireTemp: "cone_019_very_low", use: "metallic_shimmer_finish",
  },
  enamel_opaque_cover: {
    colorBright: 90, surfaceSmooth: 80, durability: 88,
    applyEase: 82, cost: 18, metallic: false, precious: false,
    fireTemp: "cone_017_low_mid", use: "opaque_color_cover",
  },
  gold_leaf_precious: {
    colorBright: 78, surfaceSmooth: 95, durability: 65,
    applyEase: 60, cost: 50, metallic: true, precious: true,
    fireTemp: "cone_019_very_low", use: "precious_accent_trim",
  },
  decal_transfer_print: {
    colorBright: 85, surfaceSmooth: 88, durability: 82,
    applyEase: 90, cost: 12, metallic: false, precious: false,
    fireTemp: "cone_018_low", use: "production_repeat_design",
  },
};

export function colorBright(t: OverglazeType): number { return specs[t].colorBright; }
export function surfaceSmooth(t: OverglazeType): number { return specs[t].surfaceSmooth; }
export function durability(t: OverglazeType): number { return specs[t].durability; }
export function applyEase(t: OverglazeType): number { return specs[t].applyEase; }
export function glazeCost(t: OverglazeType): number { return specs[t].cost; }
export function metallic(t: OverglazeType): boolean { return specs[t].metallic; }
export function precious(t: OverglazeType): boolean { return specs[t].precious; }
export function fireTemp(t: OverglazeType): string { return specs[t].fireTemp; }
export function bestUse(t: OverglazeType): string { return specs[t].use; }
export function overglazes(): OverglazeType[] { return Object.keys(specs) as OverglazeType[]; }
