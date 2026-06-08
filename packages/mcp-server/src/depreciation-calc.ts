export interface DepreciationScheduleEntry {
  year: number;
  depreciation: number;
  accumulatedDepreciation: number;
  bookValue: number;
}

export class DepreciationCalc {
  static straightLine(cost: number, salvage: number, life: number): DepreciationScheduleEntry[] {
    const annualDepreciation = (cost - salvage) / life;
    const schedule: DepreciationScheduleEntry[] = [];
    let accumulated = 0;
    for (let year = 1; year <= life; year++) {
      accumulated += annualDepreciation;
      schedule.push({
        year,
        depreciation: Math.round(annualDepreciation * 100) / 100,
        accumulatedDepreciation: Math.round(accumulated * 100) / 100,
        bookValue: Math.round((cost - accumulated) * 100) / 100,
      });
    }
    return schedule;
  }

  static decliningBalance(cost: number, salvage: number, life: number, rate?: number): DepreciationScheduleEntry[] {
    const depRate = rate || (2 / life);
    const schedule: DepreciationScheduleEntry[] = [];
    let bookValue = cost;
    let accumulated = 0;
    for (let year = 1; year <= life; year++) {
      let depreciation = bookValue * depRate;
      if (bookValue - depreciation < salvage) {
        depreciation = bookValue - salvage;
      }
      if (depreciation < 0) depreciation = 0;
      accumulated += depreciation;
      bookValue -= depreciation;
      schedule.push({
        year,
        depreciation: Math.round(depreciation * 100) / 100,
        accumulatedDepreciation: Math.round(accumulated * 100) / 100,
        bookValue: Math.round(bookValue * 100) / 100,
      });
    }
    return schedule;
  }

  static sumOfYearsDigits(cost: number, salvage: number, life: number): DepreciationScheduleEntry[] {
    const depreciable = cost - salvage;
    const sumDigits = (life * (life + 1)) / 2;
    const schedule: DepreciationScheduleEntry[] = [];
    let accumulated = 0;
    for (let year = 1; year <= life; year++) {
      const fraction = (life - year + 1) / sumDigits;
      const depreciation = depreciable * fraction;
      accumulated += depreciation;
      schedule.push({
        year,
        depreciation: Math.round(depreciation * 100) / 100,
        accumulatedDepreciation: Math.round(accumulated * 100) / 100,
        bookValue: Math.round((cost - accumulated) * 100) / 100,
      });
    }
    return schedule;
  }

  static unitsOfProduction(
    cost: number,
    salvage: number,
    totalUnits: number,
    unitsPerYear: number[],
  ): DepreciationScheduleEntry[] {
    const depreciable = cost - salvage;
    const ratePerUnit = depreciable / totalUnits;
    const schedule: DepreciationScheduleEntry[] = [];
    let accumulated = 0;
    for (let i = 0; i < unitsPerYear.length; i++) {
      let depreciation = unitsPerYear[i] * ratePerUnit;
      if (accumulated + depreciation > depreciable) {
        depreciation = depreciable - accumulated;
      }
      accumulated += depreciation;
      schedule.push({
        year: i + 1,
        depreciation: Math.round(depreciation * 100) / 100,
        accumulatedDepreciation: Math.round(accumulated * 100) / 100,
        bookValue: Math.round((cost - accumulated) * 100) / 100,
      });
    }
    return schedule;
  }

  static totalDepreciation(cost: number, salvage: number): number {
    return Math.round((cost - salvage) * 100) / 100;
  }

  static annualRate(cost: number, salvage: number, life: number): number {
    return Math.round(((cost - salvage) / life / cost) * 10000) / 100;
  }
}
