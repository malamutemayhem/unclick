export type ResinDomeType =
  | "round_cabochon_standard"
  | "oval_bezel_pendant"
  | "square_tile_flat"
  | "heart_shape_craft"
  | "custom_silicone_form";

const specs: Record<ResinDomeType, {
  clarityDome: number; bubbleFree: number; demoldEase: number;
  sizeRange: number; cost: number; flexible: boolean; custom: boolean;
  moldShape: string; use: string;
}> = {
  round_cabochon_standard: {
    clarityDome: 90, bubbleFree: 88, demoldEase: 85,
    sizeRange: 82, cost: 5, flexible: false, custom: false,
    moldShape: "half_sphere_cavity", use: "jewelry_cabochon_cast",
  },
  oval_bezel_pendant: {
    clarityDome: 88, bubbleFree: 85, demoldEase: 82,
    sizeRange: 80, cost: 6, flexible: false, custom: false,
    moldShape: "oval_bezel_tray", use: "pendant_bezel_fill",
  },
  square_tile_flat: {
    clarityDome: 85, bubbleFree: 90, demoldEase: 88,
    sizeRange: 85, cost: 5, flexible: false, custom: false,
    moldShape: "flat_square_well", use: "tile_coaster_pour",
  },
  heart_shape_craft: {
    clarityDome: 82, bubbleFree: 82, demoldEase: 80,
    sizeRange: 78, cost: 4, flexible: true, custom: false,
    moldShape: "heart_indent_form", use: "decorative_craft_shape",
  },
  custom_silicone_form: {
    clarityDome: 92, bubbleFree: 80, demoldEase: 92,
    sizeRange: 95, cost: 10, flexible: true, custom: true,
    moldShape: "custom_poured_silicone", use: "bespoke_shape_creation",
  },
};

export function clarityDome(t: ResinDomeType): number { return specs[t].clarityDome; }
export function bubbleFree(t: ResinDomeType): number { return specs[t].bubbleFree; }
export function demoldEase(t: ResinDomeType): number { return specs[t].demoldEase; }
export function sizeRange(t: ResinDomeType): number { return specs[t].sizeRange; }
export function domeCost(t: ResinDomeType): number { return specs[t].cost; }
export function flexible(t: ResinDomeType): boolean { return specs[t].flexible; }
export function custom(t: ResinDomeType): boolean { return specs[t].custom; }
export function moldShape(t: ResinDomeType): string { return specs[t].moldShape; }
export function bestUse(t: ResinDomeType): string { return specs[t].use; }
export function resinDomes(): ResinDomeType[] { return Object.keys(specs) as ResinDomeType[]; }
