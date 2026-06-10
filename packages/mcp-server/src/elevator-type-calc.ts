export type ElevatorType = "traction" | "hydraulic" | "machine_roomless" | "pneumatic" | "freight";

export function speedRating(e: ElevatorType): number {
  const m: Record<ElevatorType, number> = {
    traction: 9, hydraulic: 4, machine_roomless: 8, pneumatic: 3, freight: 2,
  };
  return m[e];
}

export function maxFloors(e: ElevatorType): number {
  const m: Record<ElevatorType, number> = {
    traction: 10, hydraulic: 3, machine_roomless: 8, pneumatic: 2, freight: 5,
  };
  return m[e];
}

export function energyEfficiency(e: ElevatorType): number {
  const m: Record<ElevatorType, number> = {
    traction: 8, hydraulic: 4, machine_roomless: 9, pneumatic: 6, freight: 3,
  };
  return m[e];
}

export function installCost(e: ElevatorType): number {
  const m: Record<ElevatorType, number> = {
    traction: 8, hydraulic: 5, machine_roomless: 7, pneumatic: 9, freight: 6,
  };
  return m[e];
}

export function loadCapacity(e: ElevatorType): number {
  const m: Record<ElevatorType, number> = {
    traction: 7, hydraulic: 6, machine_roomless: 6, pneumatic: 2, freight: 10,
  };
  return m[e];
}

export function requiresMachineRoom(e: ElevatorType): boolean {
  const m: Record<ElevatorType, boolean> = {
    traction: true, hydraulic: true, machine_roomless: false, pneumatic: false, freight: true,
  };
  return m[e];
}

export function residentialUse(e: ElevatorType): boolean {
  const m: Record<ElevatorType, boolean> = {
    traction: false, hydraulic: true, machine_roomless: false, pneumatic: true, freight: false,
  };
  return m[e];
}

export function driveSystem(e: ElevatorType): string {
  const m: Record<ElevatorType, string> = {
    traction: "steel_ropes_counterweight", hydraulic: "fluid_piston",
    machine_roomless: "gearless_motor_in_shaft", pneumatic: "vacuum_air_pressure",
    freight: "heavy_duty_traction",
  };
  return m[e];
}

export function typicalBuilding(e: ElevatorType): string {
  const m: Record<ElevatorType, string> = {
    traction: "high_rise_commercial", hydraulic: "low_rise_office",
    machine_roomless: "mid_rise_modern", pneumatic: "residential_home",
    freight: "warehouse_industrial",
  };
  return m[e];
}

export function elevatorTypes(): ElevatorType[] {
  return ["traction", "hydraulic", "machine_roomless", "pneumatic", "freight"];
}
