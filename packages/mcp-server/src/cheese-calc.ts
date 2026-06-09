export type CheeseType = "cheddar" | "mozzarella" | "brie" | "feta" | "gouda" | "parmesan" | "ricotta" | "cream_cheese";
export type MilkType = "cow" | "goat" | "sheep" | "buffalo";

export function milkNeeded(cheeseKg: number, type: CheeseType): number {
  const litresPerKg: Record<CheeseType, number> = {
    cheddar: 10,
    mozzarella: 8,
    brie: 7,
    feta: 6,
    gouda: 10,
    parmesan: 16,
    ricotta: 4,
    cream_cheese: 3,
  };
  return parseFloat((cheeseKg * litresPerKg[type]).toFixed(1));
}

export function yieldPercent(type: CheeseType): number {
  const yields: Record<CheeseType, number> = {
    cheddar: 10,
    mozzarella: 12.5,
    brie: 14,
    feta: 17,
    gouda: 10,
    parmesan: 6,
    ricotta: 25,
    cream_cheese: 33,
  };
  return yields[type];
}

export function rennetAmount(milkLiters: number, strength: number = 200): number {
  return parseFloat((milkLiters / strength * 1000).toFixed(1));
}

export function starterCulture(milkLiters: number): number {
  return parseFloat((milkLiters * 0.02).toFixed(2));
}

export function saltAmount(cheeseKg: number, saltPercent: number = 2): number {
  return parseFloat((cheeseKg * 1000 * saltPercent / 100).toFixed(0));
}

export function brineConcentration(saltKg: number, waterLiters: number): number {
  const totalKg = saltKg + waterLiters;
  return parseFloat((saltKg / totalKg * 100).toFixed(1));
}

export function curdTemp(type: CheeseType): number {
  const temps: Record<CheeseType, number> = {
    cheddar: 38,
    mozzarella: 35,
    brie: 32,
    feta: 32,
    gouda: 36,
    parmesan: 35,
    ricotta: 85,
    cream_cheese: 32,
  };
  return temps[type];
}

export function agingTime(type: CheeseType): { minWeeks: number; maxWeeks: number } {
  const aging: Record<CheeseType, { minWeeks: number; maxWeeks: number }> = {
    cheddar: { minWeeks: 12, maxWeeks: 260 },
    mozzarella: { minWeeks: 0, maxWeeks: 0 },
    brie: { minWeeks: 4, maxWeeks: 8 },
    feta: { minWeeks: 4, maxWeeks: 12 },
    gouda: { minWeeks: 4, maxWeeks: 156 },
    parmesan: { minWeeks: 52, maxWeeks: 208 },
    ricotta: { minWeeks: 0, maxWeeks: 0 },
    cream_cheese: { minWeeks: 0, maxWeeks: 0 },
  };
  return aging[type];
}

export function agingTemp(type: CheeseType): { minC: number; maxC: number } {
  if (type === "mozzarella" || type === "ricotta" || type === "cream_cheese") {
    return { minC: 2, maxC: 4 };
  }
  return { minC: 10, maxC: 14 };
}

export function agingHumidity(type: CheeseType): number {
  const humid: Record<CheeseType, number> = {
    cheddar: 85,
    mozzarella: 0,
    brie: 95,
    feta: 80,
    gouda: 85,
    parmesan: 80,
    ricotta: 0,
    cream_cheese: 0,
  };
  return humid[type];
}

export function wheyVolume(milkLiters: number, type: CheeseType): number {
  const yield_ = yieldPercent(type);
  return parseFloat((milkLiters * (100 - yield_) / 100).toFixed(1));
}

export function milkFatContent(milkType: MilkType): number {
  const fat: Record<MilkType, number> = {
    cow: 3.5,
    goat: 4.5,
    sheep: 7.0,
    buffalo: 8.0,
  };
  return fat[milkType];
}

export function costPerKg(milkLiters: number, milkPricePerLiter: number, cheeseKg: number): number {
  return parseFloat((milkLiters * milkPricePerLiter / cheeseKg).toFixed(2));
}

export function cheeseTypes(): CheeseType[] {
  return ["cheddar", "mozzarella", "brie", "feta", "gouda", "parmesan", "ricotta", "cream_cheese"];
}
