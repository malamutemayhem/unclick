export interface DepreciationEntry {
  year: number;
  depreciation: number;
  accumulatedDepreciation: number;
  bookValue: number;
}

export class DepreciationCalculator {
  static straightLine(
    cost: number,
    salvageValue: number,
    usefulLife: number,
  ): DepreciationEntry[] {
    const annual = (cost - salvageValue) / usefulLife;
    const schedule: DepreciationEntry[] = [];
    let accumulated = 0;

    for (let year = 1; year <= usefulLife; year++) {
      accumulated += annual;
      schedule.push({
        year,
        depreciation: annual,
        accumulatedDepreciation: accumulated,
        bookValue: cost - accumulated,
      });
    }

    return schedule;
  }

  static decliningBalance(
    cost: number,
    salvageValue: number,
    usefulLife: number,
    rate?: number,
  ): DepreciationEntry[] {
    const r = rate ?? 2 / usefulLife;
    const schedule: DepreciationEntry[] = [];
    let bookValue = cost;
    let accumulated = 0;

    for (let year = 1; year <= usefulLife; year++) {
      let depreciation = bookValue * r;
      if (bookValue - depreciation < salvageValue) {
        depreciation = bookValue - salvageValue;
      }
      if (depreciation < 0) depreciation = 0;
      accumulated += depreciation;
      bookValue -= depreciation;
      schedule.push({
        year,
        depreciation,
        accumulatedDepreciation: accumulated,
        bookValue,
      });
    }

    return schedule;
  }

  static sumOfYearsDigits(
    cost: number,
    salvageValue: number,
    usefulLife: number,
  ): DepreciationEntry[] {
    const depreciableBase = cost - salvageValue;
    const sumOfYears = (usefulLife * (usefulLife + 1)) / 2;
    const schedule: DepreciationEntry[] = [];
    let accumulated = 0;

    for (let year = 1; year <= usefulLife; year++) {
      const fraction = (usefulLife - year + 1) / sumOfYears;
      const depreciation = depreciableBase * fraction;
      accumulated += depreciation;
      schedule.push({
        year,
        depreciation,
        accumulatedDepreciation: accumulated,
        bookValue: cost - accumulated,
      });
    }

    return schedule;
  }

  static unitsOfProduction(
    cost: number,
    salvageValue: number,
    totalUnits: number,
    unitsPerYear: number[],
  ): DepreciationEntry[] {
    const depreciableBase = cost - salvageValue;
    const ratePerUnit = depreciableBase / totalUnits;
    const schedule: DepreciationEntry[] = [];
    let accumulated = 0;

    for (let i = 0; i < unitsPerYear.length; i++) {
      const depreciation = Math.min(
        unitsPerYear[i] * ratePerUnit,
        cost - salvageValue - accumulated,
      );
      accumulated += depreciation;
      schedule.push({
        year: i + 1,
        depreciation,
        accumulatedDepreciation: accumulated,
        bookValue: cost - accumulated,
      });
    }

    return schedule;
  }

  static annualRate(cost: number, salvageValue: number, usefulLife: number): number {
    return (cost - salvageValue) / (cost * usefulLife);
  }

  static totalDepreciation(cost: number, salvageValue: number): number {
    return cost - salvageValue;
  }
}
