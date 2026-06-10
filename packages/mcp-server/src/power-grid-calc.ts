export type GridType = "centralized" | "distributed" | "microgrid" | "smart_grid" | "island";

export function reliabilityScore(g: GridType): number {
  const m: Record<GridType, number> = {
    centralized: 8, distributed: 7, microgrid: 6, smart_grid: 9, island: 4,
  };
  return m[g];
}

export function scalability(g: GridType): number {
  const m: Record<GridType, number> = {
    centralized: 10, distributed: 7, microgrid: 4, smart_grid: 9, island: 2,
  };
  return m[g];
}

export function renewableIntegration(g: GridType): number {
  const m: Record<GridType, number> = {
    centralized: 4, distributed: 8, microgrid: 9, smart_grid: 10, island: 7,
  };
  return m[g];
}

export function transmissionLoss(g: GridType): number {
  const m: Record<GridType, number> = {
    centralized: 8, distributed: 3, microgrid: 2, smart_grid: 4, island: 1,
  };
  return m[g];
}

export function implementationCost(g: GridType): number {
  const m: Record<GridType, number> = {
    centralized: 7, distributed: 6, microgrid: 5, smart_grid: 10, island: 3,
  };
  return m[g];
}

export function selfHealing(g: GridType): boolean {
  const m: Record<GridType, boolean> = {
    centralized: false, distributed: false, microgrid: false, smart_grid: true, island: false,
  };
  return m[g];
}

export function connectedToMainGrid(g: GridType): boolean {
  const m: Record<GridType, boolean> = {
    centralized: true, distributed: true, microgrid: true, smart_grid: true, island: false,
  };
  return m[g];
}

export function bestApplication(g: GridType): string {
  const m: Record<GridType, string> = {
    centralized: "urban_areas", distributed: "suburban",
    microgrid: "campus", smart_grid: "modern_city",
    island: "remote_community",
  };
  return m[g];
}

export function controlMechanism(g: GridType): string {
  const m: Record<GridType, string> = {
    centralized: "scada", distributed: "local_controllers",
    microgrid: "energy_management_system", smart_grid: "ai_optimization",
    island: "standalone_controller",
  };
  return m[g];
}

export function gridTypes(): GridType[] {
  return ["centralized", "distributed", "microgrid", "smart_grid", "island"];
}
