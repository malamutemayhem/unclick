export interface RoiResult {
  roi: number;
  annualizedRoi: number;
  netProfit: number;
  totalReturn: number;
  paybackPeriod: number | null;
}

export class RoiCalc {
  static simple(investment: number, returns: number): RoiResult {
    const netProfit = returns - investment;
    const roi = investment === 0 ? 0 : Math.round((netProfit / investment) * 10000) / 100;
    return {
      roi,
      annualizedRoi: roi,
      netProfit: Math.round(netProfit * 100) / 100,
      totalReturn: Math.round(returns * 100) / 100,
      paybackPeriod: null,
    };
  }

  static withTime(investment: number, returns: number, years: number): RoiResult {
    const netProfit = returns - investment;
    const roi = investment === 0 ? 0 : Math.round((netProfit / investment) * 10000) / 100;
    const annualizedRoi = years <= 0 ? 0 :
      Math.round((Math.pow(returns / investment, 1 / years) - 1) * 10000) / 100;
    const paybackPeriod = netProfit <= 0 ? null :
      Math.round((investment / (netProfit / years)) * 100) / 100;
    return {
      roi,
      annualizedRoi,
      netProfit: Math.round(netProfit * 100) / 100,
      totalReturn: Math.round(returns * 100) / 100,
      paybackPeriod,
    };
  }

  static cashFlow(investment: number, cashFlows: number[]): RoiResult {
    const totalReturns = cashFlows.reduce((s, c) => s + c, 0);
    const netProfit = totalReturns - investment;
    const roi = investment === 0 ? 0 : Math.round((netProfit / investment) * 10000) / 100;
    let cumulative = -investment;
    let paybackPeriod: number | null = null;
    for (let i = 0; i < cashFlows.length; i++) {
      cumulative += cashFlows[i];
      if (cumulative >= 0 && paybackPeriod === null) {
        const prevCum = cumulative - cashFlows[i];
        paybackPeriod = Math.round((i + (-prevCum / cashFlows[i])) * 100) / 100;
      }
    }
    const years = cashFlows.length;
    const annualizedRoi = years <= 0 || totalReturns <= 0 ? 0 :
      Math.round((Math.pow(totalReturns / investment, 1 / years) - 1) * 10000) / 100;
    return {
      roi,
      annualizedRoi,
      netProfit: Math.round(netProfit * 100) / 100,
      totalReturn: Math.round(totalReturns * 100) / 100,
      paybackPeriod,
    };
  }

  static npv(rate: number, cashFlows: number[], initialInvestment: number = 0): number {
    let npv = -initialInvestment;
    for (let i = 0; i < cashFlows.length; i++) {
      npv += cashFlows[i] / Math.pow(1 + rate, i + 1);
    }
    return Math.round(npv * 100) / 100;
  }

  static irr(cashFlows: number[], initialInvestment: number, maxIterations: number = 100): number {
    let low = -0.99;
    let high = 10;
    for (let i = 0; i < maxIterations; i++) {
      const mid = (low + high) / 2;
      const npv = RoiCalc.npv(mid, cashFlows, initialInvestment);
      if (Math.abs(npv) < 0.01) return Math.round(mid * 10000) / 100;
      if (npv > 0) low = mid;
      else high = mid;
    }
    return Math.round(((low + high) / 2) * 10000) / 100;
  }

  static compare(
    investments: Array<{ name: string; cost: number; returns: number; years: number }>,
  ): Array<{ name: string; roi: number; annualizedRoi: number; rank: number }> {
    const results = investments.map((inv) => ({
      name: inv.name,
      ...RoiCalc.withTime(inv.cost, inv.returns, inv.years),
    }));
    return results
      .sort((a, b) => b.annualizedRoi - a.annualizedRoi)
      .map((r, i) => ({
        name: r.name,
        roi: r.roi,
        annualizedRoi: r.annualizedRoi,
        rank: i + 1,
      }));
  }
}
