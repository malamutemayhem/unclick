export type HubBoreWheelType =
  | "straight_bore_standard"
  | "tapered_bore_axle"
  | "stepped_bore_collar"
  | "bushed_bore_bronze"
  | "precision_bore_lathe";

const specs: Record<HubBoreWheelType, {
  fitAccuracy: number; wearResist: number; speedBore: number;
  loadCapacity: number; cost: number; bushed: boolean; tapered: boolean;
  boreProfile: string; use: string;
}> = {
  straight_bore_standard: {
    fitAccuracy: 75, wearResist: 70, speedBore: 80,
    loadCapacity: 72, cost: 30, bushed: false, tapered: false,
    boreProfile: "straight_cylinder", use: "general_hub_fit",
  },
  tapered_bore_axle: {
    fitAccuracy: 88, wearResist: 78, speedBore: 65,
    loadCapacity: 85, cost: 45, bushed: false, tapered: true,
    boreProfile: "tapered_cone_fit", use: "self_lock_axle_fit",
  },
  stepped_bore_collar: {
    fitAccuracy: 82, wearResist: 75, speedBore: 60,
    loadCapacity: 80, cost: 50, bushed: false, tapered: false,
    boreProfile: "stepped_shoulder_fit", use: "collar_retain_hub",
  },
  bushed_bore_bronze: {
    fitAccuracy: 85, wearResist: 95, speedBore: 55,
    loadCapacity: 90, cost: 80, bushed: true, tapered: false,
    boreProfile: "bronze_sleeve_bore", use: "heavy_wear_hub",
  },
  precision_bore_lathe: {
    fitAccuracy: 95, wearResist: 80, speedBore: 70,
    loadCapacity: 82, cost: 120, bushed: false, tapered: false,
    boreProfile: "precision_ground_bore", use: "fine_carriage_hub",
  },
};

export function fitAccuracy(t: HubBoreWheelType): number { return specs[t].fitAccuracy; }
export function wearResist(t: HubBoreWheelType): number { return specs[t].wearResist; }
export function speedBore(t: HubBoreWheelType): number { return specs[t].speedBore; }
export function loadCapacity(t: HubBoreWheelType): number { return specs[t].loadCapacity; }
export function boreCost(t: HubBoreWheelType): number { return specs[t].cost; }
export function bushed(t: HubBoreWheelType): boolean { return specs[t].bushed; }
export function tapered(t: HubBoreWheelType): boolean { return specs[t].tapered; }
export function boreProfile(t: HubBoreWheelType): string { return specs[t].boreProfile; }
export function bestUse(t: HubBoreWheelType): string { return specs[t].use; }
export function hubBoreWheels(): HubBoreWheelType[] { return Object.keys(specs) as HubBoreWheelType[]; }
