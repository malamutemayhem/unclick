export type TrainType = "steam" | "diesel" | "electric" | "maglev" | "high_speed";

export function topSpeedKmh(train: TrainType): number {
  const m: Record<TrainType, number> = {
    steam: 120, diesel: 160, electric: 200, maglev: 600, high_speed: 350,
  };
  return m[train];
}

export function passengerCapacity(train: TrainType): number {
  const m: Record<TrainType, number> = {
    steam: 300, diesel: 500, electric: 800, maglev: 600, high_speed: 700,
  };
  return m[train];
}

export function energyEfficiency(train: TrainType): number {
  const m: Record<TrainType, number> = {
    steam: 2, diesel: 5, electric: 9, maglev: 7, high_speed: 8,
  };
  return m[train];
}

export function infrastructureCost(train: TrainType): number {
  const m: Record<TrainType, number> = {
    steam: 3, diesel: 4, electric: 7, maglev: 10, high_speed: 9,
  };
  return m[train];
}

export function noiseLevel(train: TrainType): number {
  const m: Record<TrainType, number> = {
    steam: 9, diesel: 8, electric: 4, maglev: 2, high_speed: 5,
  };
  return m[train];
}

export function zeroCarbonOperation(train: TrainType): boolean {
  const m: Record<TrainType, boolean> = {
    steam: false, diesel: false, electric: true, maglev: true, high_speed: true,
  };
  return m[train];
}

export function contactlessTrack(train: TrainType): boolean {
  const m: Record<TrainType, boolean> = {
    steam: false, diesel: false, electric: false, maglev: true, high_speed: false,
  };
  return m[train];
}

export function bestApplication(train: TrainType): string {
  const m: Record<TrainType, string> = {
    steam: "heritage", diesel: "freight", electric: "commuter",
    maglev: "intercity", high_speed: "intercity",
  };
  return m[train];
}

export function maintenanceCost(train: TrainType): number {
  const m: Record<TrainType, number> = {
    steam: 9, diesel: 6, electric: 4, maglev: 8, high_speed: 5,
  };
  return m[train];
}

export function trainTypes(): TrainType[] {
  return ["steam", "diesel", "electric", "maglev", "high_speed"];
}
