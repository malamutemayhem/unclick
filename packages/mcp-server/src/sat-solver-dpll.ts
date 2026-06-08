export type Literal = number;
export type Clause = Literal[];

export class SATSolverDPLL {
  static solve(clauses: Clause[], numVars: number): Map<number, boolean> | null {
    const assignment = new Map<number, boolean>();
    return this.dpll([...clauses.map((c) => [...c])], assignment, numVars);
  }

  private static dpll(
    clauses: Clause[],
    assignment: Map<number, boolean>,
    numVars: number
  ): Map<number, boolean> | null {
    clauses = this.simplify(clauses, assignment);

    if (clauses.length === 0) return new Map(assignment);
    if (clauses.some((c) => c.length === 0)) return null;

    const unit = clauses.find((c) => c.length === 1);
    if (unit) {
      const lit = unit[0];
      const v = Math.abs(lit);
      assignment.set(v, lit > 0);
      return this.dpll(clauses, assignment, numVars);
    }

    const pure = this.findPure(clauses, numVars, assignment);
    if (pure !== null) {
      assignment.set(Math.abs(pure), pure > 0);
      return this.dpll(clauses, assignment, numVars);
    }

    const variable = this.pickVariable(clauses, assignment);
    if (variable === null) return new Map(assignment);

    const saved = new Map(assignment);
    assignment.set(variable, true);
    const result = this.dpll(clauses.map((c) => [...c]), assignment, numVars);
    if (result) return result;

    const restored = new Map(saved);
    restored.set(variable, false);
    return this.dpll(clauses.map((c) => [...c]), restored, numVars);
  }

  private static simplify(clauses: Clause[], assignment: Map<number, boolean>): Clause[] {
    return clauses
      .filter((clause) => {
        return !clause.some((lit) => {
          const v = Math.abs(lit);
          return assignment.has(v) && ((lit > 0) === assignment.get(v));
        });
      })
      .map((clause) => {
        return clause.filter((lit) => {
          const v = Math.abs(lit);
          return !assignment.has(v);
        });
      });
  }

  private static findPure(
    clauses: Clause[],
    numVars: number,
    assignment: Map<number, boolean>
  ): Literal | null {
    const pos = new Set<number>();
    const neg = new Set<number>();
    for (const clause of clauses) {
      for (const lit of clause) {
        const v = Math.abs(lit);
        if (assignment.has(v)) continue;
        if (lit > 0) pos.add(v); else neg.add(v);
      }
    }
    for (const v of pos) {
      if (!neg.has(v)) return v;
    }
    for (const v of neg) {
      if (!pos.has(v)) return -v;
    }
    return null;
  }

  private static pickVariable(clauses: Clause[], assignment: Map<number, boolean>): number | null {
    for (const clause of clauses) {
      for (const lit of clause) {
        const v = Math.abs(lit);
        if (!assignment.has(v)) return v;
      }
    }
    return null;
  }

  static isSatisfied(clauses: Clause[], assignment: Map<number, boolean>): boolean {
    return clauses.every((clause) =>
      clause.some((lit) => {
        const v = Math.abs(lit);
        return assignment.has(v) && ((lit > 0) === assignment.get(v));
      })
    );
  }
}
