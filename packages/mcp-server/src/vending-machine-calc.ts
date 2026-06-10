export type VendingMachine = "snack_beverage" | "fresh_food" | "micro_market" | "smart_locker" | "robot_barista";

export function productVariety(v: VendingMachine): number {
  const m: Record<VendingMachine, number> = {
    snack_beverage: 6, fresh_food: 5, micro_market: 10, smart_locker: 8, robot_barista: 3,
  };
  return m[v];
}

export function maintenanceFrequency(v: VendingMachine): number {
  const m: Record<VendingMachine, number> = {
    snack_beverage: 3, fresh_food: 8, micro_market: 5, smart_locker: 4, robot_barista: 9,
  };
  return m[v];
}

export function revenuePerUnit(v: VendingMachine): number {
  const m: Record<VendingMachine, number> = {
    snack_beverage: 4, fresh_food: 7, micro_market: 10, smart_locker: 6, robot_barista: 9,
  };
  return m[v];
}

export function footprintSqFt(v: VendingMachine): number {
  const m: Record<VendingMachine, number> = {
    snack_beverage: 3, fresh_food: 4, micro_market: 10, smart_locker: 6, robot_barista: 5,
  };
  return m[v];
}

export function purchaseCost(v: VendingMachine): number {
  const m: Record<VendingMachine, number> = {
    snack_beverage: 3, fresh_food: 6, micro_market: 8, smart_locker: 5, robot_barista: 10,
  };
  return m[v];
}

export function requiresRefrigeration(v: VendingMachine): boolean {
  const m: Record<VendingMachine, boolean> = {
    snack_beverage: true, fresh_food: true, micro_market: true, smart_locker: false, robot_barista: true,
  };
  return m[v];
}

export function cashless(v: VendingMachine): boolean {
  const m: Record<VendingMachine, boolean> = {
    snack_beverage: false, fresh_food: true, micro_market: true, smart_locker: true, robot_barista: true,
  };
  return m[v];
}

export function dispensingMethod(v: VendingMachine): string {
  const m: Record<VendingMachine, string> = {
    snack_beverage: "spiral_coil_drop", fresh_food: "elevator_shelf_convey",
    micro_market: "open_shelf_self_serve", smart_locker: "compartment_unlock",
    robot_barista: "robotic_arm_brew",
  };
  return m[v];
}

export function bestLocation(v: VendingMachine): string {
  const m: Record<VendingMachine, string> = {
    snack_beverage: "break_room_lobby", fresh_food: "hospital_campus",
    micro_market: "large_office_100plus", smart_locker: "apartment_ecommerce",
    robot_barista: "airport_transit_hub",
  };
  return m[v];
}

export function vendingMachines(): VendingMachine[] {
  return ["snack_beverage", "fresh_food", "micro_market", "smart_locker", "robot_barista"];
}
