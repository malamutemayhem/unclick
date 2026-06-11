export type AntiStaticMatType =
  | "bench_mat_two_layer"
  | "floor_mat_standing"
  | "portable_field_kit"
  | "table_runner_roll"
  | "dissipative_tray_liner";

const DATA: Record<AntiStaticMatType, {
  surfaceResist: number; durability: number; chemResist: number;
  sizeRange: number; matCost: number; grounded: boolean;
  portable: boolean; material: string; bestUse: string;
}> = {
  bench_mat_two_layer: { surfaceResist: 9, durability: 8, chemResist: 7, sizeRange: 7, matCost: 5, grounded: true, portable: false, material: "rubber_two_layer_esd", bestUse: "electronics_assembly_bench" },
  floor_mat_standing: { surfaceResist: 7, durability: 9, chemResist: 6, sizeRange: 8, matCost: 6, grounded: true, portable: false, material: "vinyl_conductive_foam", bestUse: "esd_workstation_floor" },
  portable_field_kit: { surfaceResist: 8, durability: 5, chemResist: 5, sizeRange: 4, matCost: 4, grounded: true, portable: true, material: "foldable_dissipative", bestUse: "field_service_repair" },
  table_runner_roll: { surfaceResist: 8, durability: 7, chemResist: 7, sizeRange: 10, matCost: 4, grounded: true, portable: false, material: "vinyl_roll_continuous", bestUse: "long_bench_coverage" },
  dissipative_tray_liner: { surfaceResist: 6, durability: 4, chemResist: 4, sizeRange: 5, matCost: 2, grounded: false, portable: true, material: "pe_foam_dissipative", bestUse: "component_tray_storage" },
};

const get = (t: AntiStaticMatType) => DATA[t];

export const surfaceResist = (t: AntiStaticMatType) => get(t).surfaceResist;
export const durability = (t: AntiStaticMatType) => get(t).durability;
export const chemResist = (t: AntiStaticMatType) => get(t).chemResist;
export const sizeRange = (t: AntiStaticMatType) => get(t).sizeRange;
export const matCost = (t: AntiStaticMatType) => get(t).matCost;
export const grounded = (t: AntiStaticMatType) => get(t).grounded;
export const portable = (t: AntiStaticMatType) => get(t).portable;
export const material = (t: AntiStaticMatType) => get(t).material;
export const bestUse = (t: AntiStaticMatType) => get(t).bestUse;
export const antiStaticMats = (): AntiStaticMatType[] => Object.keys(DATA) as AntiStaticMatType[];
