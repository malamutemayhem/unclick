export interface Element {
  number: number;
  symbol: string;
  name: string;
  mass: number;
  category: string;
  period: number;
  group: number;
}

const ELEMENTS: Element[] = [
  { number: 1, symbol: "H", name: "Hydrogen", mass: 1.008, category: "nonmetal", period: 1, group: 1 },
  { number: 2, symbol: "He", name: "Helium", mass: 4.003, category: "noble-gas", period: 1, group: 18 },
  { number: 3, symbol: "Li", name: "Lithium", mass: 6.941, category: "alkali-metal", period: 2, group: 1 },
  { number: 4, symbol: "Be", name: "Beryllium", mass: 9.012, category: "alkaline-earth", period: 2, group: 2 },
  { number: 5, symbol: "B", name: "Boron", mass: 10.81, category: "metalloid", period: 2, group: 13 },
  { number: 6, symbol: "C", name: "Carbon", mass: 12.011, category: "nonmetal", period: 2, group: 14 },
  { number: 7, symbol: "N", name: "Nitrogen", mass: 14.007, category: "nonmetal", period: 2, group: 15 },
  { number: 8, symbol: "O", name: "Oxygen", mass: 15.999, category: "nonmetal", period: 2, group: 16 },
  { number: 9, symbol: "F", name: "Fluorine", mass: 18.998, category: "halogen", period: 2, group: 17 },
  { number: 10, symbol: "Ne", name: "Neon", mass: 20.180, category: "noble-gas", period: 2, group: 18 },
  { number: 11, symbol: "Na", name: "Sodium", mass: 22.990, category: "alkali-metal", period: 3, group: 1 },
  { number: 12, symbol: "Mg", name: "Magnesium", mass: 24.305, category: "alkaline-earth", period: 3, group: 2 },
  { number: 13, symbol: "Al", name: "Aluminium", mass: 26.982, category: "post-transition", period: 3, group: 13 },
  { number: 14, symbol: "Si", name: "Silicon", mass: 28.086, category: "metalloid", period: 3, group: 14 },
  { number: 15, symbol: "P", name: "Phosphorus", mass: 30.974, category: "nonmetal", period: 3, group: 15 },
  { number: 16, symbol: "S", name: "Sulfur", mass: 32.06, category: "nonmetal", period: 3, group: 16 },
  { number: 17, symbol: "Cl", name: "Chlorine", mass: 35.45, category: "halogen", period: 3, group: 17 },
  { number: 18, symbol: "Ar", name: "Argon", mass: 39.948, category: "noble-gas", period: 3, group: 18 },
  { number: 19, symbol: "K", name: "Potassium", mass: 39.098, category: "alkali-metal", period: 4, group: 1 },
  { number: 20, symbol: "Ca", name: "Calcium", mass: 40.078, category: "alkaline-earth", period: 4, group: 2 },
  { number: 26, symbol: "Fe", name: "Iron", mass: 55.845, category: "transition-metal", period: 4, group: 8 },
  { number: 29, symbol: "Cu", name: "Copper", mass: 63.546, category: "transition-metal", period: 4, group: 11 },
  { number: 30, symbol: "Zn", name: "Zinc", mass: 65.38, category: "transition-metal", period: 4, group: 12 },
  { number: 47, symbol: "Ag", name: "Silver", mass: 107.868, category: "transition-metal", period: 5, group: 11 },
  { number: 79, symbol: "Au", name: "Gold", mass: 196.967, category: "transition-metal", period: 6, group: 11 },
];

export class PeriodicTable {
  private elements: Element[];

  constructor() {
    this.elements = [...ELEMENTS];
  }

  getByNumber(atomicNumber: number): Element | undefined {
    return this.elements.find((e) => e.number === atomicNumber);
  }

  getBySymbol(symbol: string): Element | undefined {
    return this.elements.find((e) => e.symbol === symbol);
  }

  getByName(name: string): Element | undefined {
    return this.elements.find((e) => e.name.toLowerCase() === name.toLowerCase());
  }

  getByCategory(category: string): Element[] {
    return this.elements.filter((e) => e.category === category);
  }

  getByPeriod(period: number): Element[] {
    return this.elements.filter((e) => e.period === period);
  }

  getByGroup(group: number): Element[] {
    return this.elements.filter((e) => e.group === group);
  }

  elementCount(): number {
    return this.elements.length;
  }

  molecularMass(formula: Record<string, number>): number | null {
    let total = 0;
    for (const [symbol, count] of Object.entries(formula)) {
      const element = this.getBySymbol(symbol);
      if (!element) return null;
      total += element.mass * count;
    }
    return total;
  }

  categories(): string[] {
    return [...new Set(this.elements.map((e) => e.category))];
  }

  heaviest(): Element | undefined {
    return this.elements.reduce((max, e) => (e.mass > max.mass ? e : max), this.elements[0]);
  }

  lightest(): Element | undefined {
    return this.elements.reduce((min, e) => (e.mass < min.mass ? e : min), this.elements[0]);
  }

  search(query: string): Element[] {
    const q = query.toLowerCase();
    return this.elements.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.symbol.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q),
    );
  }
}
