export type EdgeRollUpholstType =
  | "fiber_roll_standard"
  | "foam_roll_soft"
  | "cotton_roll_firm"
  | "spring_edge_wire"
  | "synthetic_roll_durable";

const specs: Record<EdgeRollUpholstType, {
  edgeFirm: number; shapeHold: number; durability: number;
  installEase: number; cost: number; synthetic: boolean; hasWire: boolean;
  coreMaterial: string; use: string;
}> = {
  fiber_roll_standard: {
    edgeFirm: 78, shapeHold: 75, durability: 72,
    installEase: 85, cost: 10, synthetic: false, hasWire: false,
    coreMaterial: "compressed_fiber_roll", use: "general_edge_build",
  },
  foam_roll_soft: {
    edgeFirm: 60, shapeHold: 70, durability: 65,
    installEase: 92, cost: 8, synthetic: true, hasWire: false,
    coreMaterial: "closed_cell_foam_tube", use: "soft_edge_round",
  },
  cotton_roll_firm: {
    edgeFirm: 85, shapeHold: 82, durability: 68,
    installEase: 78, cost: 12, synthetic: false, hasWire: false,
    coreMaterial: "dense_cotton_roll", use: "firm_traditional_edge",
  },
  spring_edge_wire: {
    edgeFirm: 92, shapeHold: 90, durability: 88,
    installEase: 60, cost: 25, synthetic: false, hasWire: true,
    coreMaterial: "steel_wire_spring", use: "durable_spring_edge",
  },
  synthetic_roll_durable: {
    edgeFirm: 80, shapeHold: 78, durability: 90,
    installEase: 82, cost: 15, synthetic: true, hasWire: false,
    coreMaterial: "polyester_fiber_tube", use: "long_life_edge",
  },
};

export function edgeFirm(t: EdgeRollUpholstType): number { return specs[t].edgeFirm; }
export function shapeHold(t: EdgeRollUpholstType): number { return specs[t].shapeHold; }
export function durability(t: EdgeRollUpholstType): number { return specs[t].durability; }
export function installEase(t: EdgeRollUpholstType): number { return specs[t].installEase; }
export function rollCost(t: EdgeRollUpholstType): number { return specs[t].cost; }
export function synthetic(t: EdgeRollUpholstType): boolean { return specs[t].synthetic; }
export function hasWire(t: EdgeRollUpholstType): boolean { return specs[t].hasWire; }
export function coreMaterial(t: EdgeRollUpholstType): string { return specs[t].coreMaterial; }
export function bestUse(t: EdgeRollUpholstType): string { return specs[t].use; }
export function edgeRollUpholsts(): EdgeRollUpholstType[] { return Object.keys(specs) as EdgeRollUpholstType[]; }
