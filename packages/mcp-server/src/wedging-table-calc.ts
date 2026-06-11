export type WedgingTableType =
  | "plaster_slab_standard"
  | "canvas_top_grip"
  | "concrete_slab_heavy"
  | "wire_cut_wedge"
  | "portable_board_light";

const specs: Record<WedgingTableType, {
  surfaceGrip: number; moistureAbsorb: number; durability: number;
  heightComfort: number; cost: number; portable: boolean; absorbent: boolean;
  surfaceType: string; use: string;
}> = {
  plaster_slab_standard: {
    surfaceGrip: 85, moistureAbsorb: 92, durability: 70,
    heightComfort: 80, cost: 40, portable: false, absorbent: true,
    surfaceType: "plaster_paris_slab", use: "general_clay_wedge",
  },
  canvas_top_grip: {
    surfaceGrip: 92, moistureAbsorb: 75, durability: 78,
    heightComfort: 82, cost: 50, portable: false, absorbent: false,
    surfaceType: "stretched_canvas_top", use: "high_grip_wedge",
  },
  concrete_slab_heavy: {
    surfaceGrip: 80, moistureAbsorb: 78, durability: 95,
    heightComfort: 75, cost: 60, portable: false, absorbent: true,
    surfaceType: "sealed_concrete_slab", use: "heavy_duty_studio",
  },
  wire_cut_wedge: {
    surfaceGrip: 82, moistureAbsorb: 88, durability: 72,
    heightComfort: 85, cost: 55, portable: false, absorbent: true,
    surfaceType: "plaster_with_wire", use: "cut_and_stack_wedge",
  },
  portable_board_light: {
    surfaceGrip: 78, moistureAbsorb: 70, durability: 80,
    heightComfort: 88, cost: 25, portable: true, absorbent: false,
    surfaceType: "laminate_board_top", use: "portable_class_wedge",
  },
};

export function surfaceGrip(t: WedgingTableType): number { return specs[t].surfaceGrip; }
export function moistureAbsorb(t: WedgingTableType): number { return specs[t].moistureAbsorb; }
export function durability(t: WedgingTableType): number { return specs[t].durability; }
export function heightComfort(t: WedgingTableType): number { return specs[t].heightComfort; }
export function tableCost(t: WedgingTableType): number { return specs[t].cost; }
export function portable(t: WedgingTableType): boolean { return specs[t].portable; }
export function absorbent(t: WedgingTableType): boolean { return specs[t].absorbent; }
export function surfaceType(t: WedgingTableType): string { return specs[t].surfaceType; }
export function bestUse(t: WedgingTableType): string { return specs[t].use; }
export function wedgingTables(): WedgingTableType[] { return Object.keys(specs) as WedgingTableType[]; }
