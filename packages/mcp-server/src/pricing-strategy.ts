export interface PricingResult {
  price: number;
  revenue: number;
  profit: number;
  margin: number;
}

export class PricingStrategy {
  static costPlus(cost: number, markupPercent: number): PricingResult {
    const price = cost * (1 + markupPercent / 100);
    const profit = price - cost;
    return {
      price: Math.round(price * 100) / 100,
      revenue: Math.round(price * 100) / 100,
      profit: Math.round(profit * 100) / 100,
      margin: Math.round((profit / price) * 10000) / 100,
    };
  }

  static targetReturn(cost: number, investedCapital: number, targetReturnRate: number, expectedUnits: number): PricingResult {
    const totalCost = cost * expectedUnits;
    const targetProfit = investedCapital * (targetReturnRate / 100);
    const price = (totalCost + targetProfit) / expectedUnits;
    const profit = price - cost;
    return {
      price: Math.round(price * 100) / 100,
      revenue: Math.round(price * expectedUnits * 100) / 100,
      profit: Math.round(profit * 100) / 100,
      margin: Math.round((profit / price) * 10000) / 100,
    };
  }

  static psychological(basePrice: number): { charm: number; prestige: number; anchor: number } {
    const charm = Math.floor(basePrice) - 0.01;
    const prestige = Math.ceil(basePrice / 10) * 10;
    const anchor = Math.round(basePrice * 1.5 * 100) / 100;
    return {
      charm: Math.round(charm * 100) / 100,
      prestige,
      anchor,
    };
  }

  static tiered(
    tiers: Array<{ name: string; features: string[]; basePrice: number }>,
    multiplier: number = 2,
  ): Array<{ name: string; price: number; features: string[]; valueRatio: number }> {
    return tiers.map((tier, i) => {
      const price = Math.round(tier.basePrice * Math.pow(multiplier, i) * 100) / 100;
      return {
        name: tier.name,
        price,
        features: tier.features,
        valueRatio: Math.round((tier.features.length / price) * 10000) / 100,
      };
    });
  }

  static bundleDiscount(
    items: Array<{ name: string; price: number }>,
    discountPercent: number,
  ): { individualTotal: number; bundlePrice: number; savings: number; savingsPercent: number } {
    const total = items.reduce((s, item) => s + item.price, 0);
    const bundlePrice = total * (1 - discountPercent / 100);
    const savings = total - bundlePrice;
    return {
      individualTotal: Math.round(total * 100) / 100,
      bundlePrice: Math.round(bundlePrice * 100) / 100,
      savings: Math.round(savings * 100) / 100,
      savingsPercent: discountPercent,
    };
  }

  static elasticity(
    priceOld: number,
    priceNew: number,
    quantityOld: number,
    quantityNew: number,
  ): number {
    const priceChange = (priceNew - priceOld) / priceOld;
    const quantityChange = (quantityNew - quantityOld) / quantityOld;
    if (priceChange === 0) return 0;
    return Math.round((quantityChange / priceChange) * 100) / 100;
  }

  static competitivePosition(
    ourPrice: number,
    competitorPrices: number[],
  ): { position: string; percentile: number; avgCompetitor: number; priceDiff: number } {
    const sorted = [...competitorPrices].sort((a, b) => a - b);
    const avg = sorted.reduce((s, p) => s + p, 0) / sorted.length;
    const below = sorted.filter((p) => p < ourPrice).length;
    const percentile = Math.round((below / sorted.length) * 100);
    const position = ourPrice < avg * 0.9 ? "budget" :
      ourPrice > avg * 1.1 ? "premium" : "competitive";
    return {
      position,
      percentile,
      avgCompetitor: Math.round(avg * 100) / 100,
      priceDiff: Math.round((ourPrice - avg) * 100) / 100,
    };
  }

  static margin(sellingPrice: number, cost: number): { grossMargin: number; markup: number } {
    const grossMargin = sellingPrice === 0 ? 0 : Math.round(((sellingPrice - cost) / sellingPrice) * 10000) / 100;
    const markup = cost === 0 ? 0 : Math.round(((sellingPrice - cost) / cost) * 10000) / 100;
    return { grossMargin, markup };
  }
}
