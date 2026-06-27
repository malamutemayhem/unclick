export interface BreakEvenResult {
  units: number;
  revenue: number;
  contributionMargin: number;
  contributionMarginRatio: number;
}

export class BreakEvenCalc {
  static units(fixedCosts: number, pricePerUnit: number, variableCostPerUnit: number): BreakEvenResult {
    const contributionMargin = pricePerUnit - variableCostPerUnit;
    if (contributionMargin <= 0) {
      return { units: Infinity, revenue: Infinity, contributionMargin, contributionMarginRatio: 0 };
    }
    const units = Math.ceil(fixedCosts / contributionMargin);
    return {
      units,
      revenue: Math.round(units * pricePerUnit * 100) / 100,
      contributionMargin: Math.round(contributionMargin * 100) / 100,
      contributionMarginRatio: Math.round((contributionMargin / pricePerUnit) * 10000) / 100,
    };
  }

  static revenue(fixedCosts: number, contributionMarginRatio: number): number {
    if (contributionMarginRatio <= 0) return Infinity;
    return Math.round((fixedCosts / contributionMarginRatio) * 100) / 100;
  }

  static targetProfit(
    fixedCosts: number,
    pricePerUnit: number,
    variableCostPerUnit: number,
    targetProfit: number,
  ): number {
    const contributionMargin = pricePerUnit - variableCostPerUnit;
    if (contributionMargin <= 0) return Infinity;
    return Math.ceil((fixedCosts + targetProfit) / contributionMargin);
  }

  static marginOfSafety(actualSales: number, breakEvenSales: number): number {
    if (actualSales === 0) return 0;
    return Math.round(((actualSales - breakEvenSales) / actualSales) * 10000) / 100;
  }

  static operatingLeverage(contributionMargin: number, operatingIncome: number): number {
    if (operatingIncome === 0) return Infinity;
    return Math.round((contributionMargin / operatingIncome) * 100) / 100;
  }

  static multiProduct(
    products: Array<{ name: string; price: number; variableCost: number; salesMix: number }>,
    fixedCosts: number,
  ): { totalUnits: number; perProduct: Array<{ name: string; units: number; revenue: number }> } {
    const weightedCM = products.reduce(
      (s, p) => s + (p.price - p.variableCost) * p.salesMix,
      0,
    );
    if (weightedCM <= 0) {
      return { totalUnits: Infinity, perProduct: products.map((p) => ({ name: p.name, units: Infinity, revenue: Infinity })) };
    }
    const totalUnits = Math.ceil(fixedCosts / weightedCM);
    const perProduct = products.map((p) => ({
      name: p.name,
      units: Math.ceil(totalUnits * p.salesMix),
      revenue: Math.round(Math.ceil(totalUnits * p.salesMix) * p.price * 100) / 100,
    }));
    return { totalUnits, perProduct };
  }

  static sensitivity(
    fixedCosts: number,
    pricePerUnit: number,
    variableCostPerUnit: number,
    variations: number[] = [-20, -10, 0, 10, 20],
  ): Array<{ priceChange: number; newPrice: number; breakEvenUnits: number }> {
    return variations.map((pct) => {
      const newPrice = pricePerUnit * (1 + pct / 100);
      const result = BreakEvenCalc.units(fixedCosts, newPrice, variableCostPerUnit);
      return {
        priceChange: pct,
        newPrice: Math.round(newPrice * 100) / 100,
        breakEvenUnits: result.units,
      };
    });
  }

  static whatIf(
    fixedCosts: number,
    pricePerUnit: number,
    variableCostPerUnit: number,
    unitsSold: number,
  ): { profit: number; aboveBreakEven: boolean; unitsAbove: number } {
    const be = BreakEvenCalc.units(fixedCosts, pricePerUnit, variableCostPerUnit);
    const totalRevenue = unitsSold * pricePerUnit;
    const totalCost = fixedCosts + unitsSold * variableCostPerUnit;
    const profit = Math.round((totalRevenue - totalCost) * 100) / 100;
    return {
      profit,
      aboveBreakEven: unitsSold >= be.units,
      unitsAbove: unitsSold - be.units,
    };
  }
}
