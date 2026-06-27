// Truss hoop calculator - coopering barrel hoop tools

export type TrussHoopType =
  | "galvanized_steel_standard"
  | "riveted_iron_traditional"
  | "spring_steel_tension"
  | "wooden_withy_woven"
  | "stainless_steel_wine";

const HOOP_DATA: Record<
  TrussHoopType,
  {
    holdForce: number;
    corrosionResist: number;
    adjustEase: number;
    durability: number;
    cost: number;
    reusable: boolean;
    forWine: boolean;
    hoopMaterial: string;
    bestUse: string;
  }
> = {
  galvanized_steel_standard: {
    holdForce: 9,
    corrosionResist: 8,
    adjustEase: 7,
    durability: 9,
    cost: 4,
    reusable: true,
    forWine: false,
    hoopMaterial: "galvanized_flat",
    bestUse: "general_barrel_hoop",
  },
  riveted_iron_traditional: {
    holdForce: 8,
    corrosionResist: 5,
    adjustEase: 6,
    durability: 7,
    cost: 5,
    reusable: true,
    forWine: false,
    hoopMaterial: "wrought_iron_flat",
    bestUse: "traditional_craft_hoop",
  },
  spring_steel_tension: {
    holdForce: 10,
    corrosionResist: 7,
    adjustEase: 8,
    durability: 9,
    cost: 6,
    reusable: true,
    forWine: false,
    hoopMaterial: "spring_tempered",
    bestUse: "tight_pressure_hoop",
  },
  wooden_withy_woven: {
    holdForce: 5,
    corrosionResist: 6,
    adjustEase: 9,
    durability: 4,
    cost: 2,
    reusable: false,
    forWine: false,
    hoopMaterial: "woven_hazel_withy",
    bestUse: "temporary_work_hoop",
  },
  stainless_steel_wine: {
    holdForce: 9,
    corrosionResist: 10,
    adjustEase: 7,
    durability: 10,
    cost: 8,
    reusable: true,
    forWine: true,
    hoopMaterial: "stainless_polished",
    bestUse: "wine_barrel_finish",
  },
};

export function holdForce(type: TrussHoopType): number {
  return HOOP_DATA[type].holdForce;
}
export function corrosionResist(type: TrussHoopType): number {
  return HOOP_DATA[type].corrosionResist;
}
export function adjustEase(type: TrussHoopType): number {
  return HOOP_DATA[type].adjustEase;
}
export function durability(type: TrussHoopType): number {
  return HOOP_DATA[type].durability;
}
export function hoopCost(type: TrussHoopType): number {
  return HOOP_DATA[type].cost;
}
export function reusable(type: TrussHoopType): boolean {
  return HOOP_DATA[type].reusable;
}
export function forWine(type: TrussHoopType): boolean {
  return HOOP_DATA[type].forWine;
}
export function hoopMaterial(type: TrussHoopType): string {
  return HOOP_DATA[type].hoopMaterial;
}
export function bestUse(type: TrussHoopType): string {
  return HOOP_DATA[type].bestUse;
}
export function trussHoops(): TrussHoopType[] {
  return Object.keys(HOOP_DATA) as TrussHoopType[];
}
