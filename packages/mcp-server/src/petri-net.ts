export interface PetriPlace {
  id: string;
  tokens: number;
}

export interface PetriTransition {
  id: string;
  inputs: { placeId: string; weight: number }[];
  outputs: { placeId: string; weight: number }[];
}

export class PetriNet {
  private places: Map<string, PetriPlace> = new Map();
  private transitions: Map<string, PetriTransition> = new Map();

  addPlace(id: string, tokens: number = 0): void {
    this.places.set(id, { id, tokens });
  }

  addTransition(
    id: string,
    inputs: { placeId: string; weight: number }[],
    outputs: { placeId: string; weight: number }[]
  ): void {
    this.transitions.set(id, { id, inputs, outputs });
  }

  getTokens(placeId: string): number {
    return this.places.get(placeId)?.tokens ?? 0;
  }

  setTokens(placeId: string, tokens: number): void {
    const place = this.places.get(placeId);
    if (place) place.tokens = tokens;
  }

  isEnabled(transitionId: string): boolean {
    const t = this.transitions.get(transitionId);
    if (!t) return false;
    return t.inputs.every((inp) => {
      const place = this.places.get(inp.placeId);
      return place !== undefined && place.tokens >= inp.weight;
    });
  }

  fire(transitionId: string): boolean {
    if (!this.isEnabled(transitionId)) return false;
    const t = this.transitions.get(transitionId)!;
    for (const inp of t.inputs) {
      this.places.get(inp.placeId)!.tokens -= inp.weight;
    }
    for (const out of t.outputs) {
      const place = this.places.get(out.placeId);
      if (place) place.tokens += out.weight;
    }
    return true;
  }

  enabledTransitions(): string[] {
    const result: string[] = [];
    for (const [id] of this.transitions) {
      if (this.isEnabled(id)) result.push(id);
    }
    return result;
  }

  marking(): Record<string, number> {
    const m: Record<string, number> = {};
    for (const [id, place] of this.places) {
      m[id] = place.tokens;
    }
    return m;
  }

  totalTokens(): number {
    let sum = 0;
    for (const place of this.places.values()) {
      sum += place.tokens;
    }
    return sum;
  }

  isDeadlocked(): boolean {
    for (const [id] of this.transitions) {
      if (this.isEnabled(id)) return false;
    }
    return this.transitions.size > 0;
  }

  reset(marking: Record<string, number>): void {
    for (const [id, tokens] of Object.entries(marking)) {
      const place = this.places.get(id);
      if (place) place.tokens = tokens;
    }
  }

  placeCount(): number {
    return this.places.size;
  }

  transitionCount(): number {
    return this.transitions.size;
  }
}
