export type Literal = number;
export type Clause = Literal[];
export type Formula = Clause[];
export type Assignment = Map<number, boolean>;

export function solve(formula: Formula): Assignment | null {
  return dpll(formula, new Map());
}

function dpll(formula: Formula, assignment: Assignment): Assignment | null {
  const simplified = unitPropagate(formula, assignment);
  if (!simplified) return null;
  const [f, a] = simplified;

  if (f.length === 0) return a;
  if (f.some((c) => c.length === 0)) return null;

  const lit = chooseLiteral(f);
  if (lit === null) return null;

  const varId = Math.abs(lit);

  const tryTrue = new Map(a);
  tryTrue.set(varId, true);
  const result = dpll(assign(f, lit), tryTrue);
  if (result) return result;

  const tryFalse = new Map(a);
  tryFalse.set(varId, false);
  return dpll(assign(f, -lit), tryFalse);
}

function unitPropagate(formula: Formula, assignment: Assignment): [Formula, Assignment] | null {
  let f = formula;
  const a = new Map(assignment);

  let changed = true;
  while (changed) {
    changed = false;
    for (const clause of f) {
      if (clause.length === 1) {
        const lit = clause[0];
        const varId = Math.abs(lit);
        const val = lit > 0;
        if (a.has(varId)) {
          if (a.get(varId) !== val) return null;
          continue;
        }
        a.set(varId, val);
        f = assign(f, lit);
        changed = true;
        break;
      }
    }
  }

  return [f, a];
}

function assign(formula: Formula, lit: Literal): Formula {
  const result: Formula = [];
  for (const clause of formula) {
    if (clause.includes(lit)) continue;
    const filtered = clause.filter((l) => l !== -lit);
    result.push(filtered);
  }
  return result;
}

function chooseLiteral(formula: Formula): Literal | null {
  for (const clause of formula) {
    if (clause.length > 0) return clause[0];
  }
  return null;
}

export function verify(formula: Formula, assignment: Assignment): boolean {
  for (const clause of formula) {
    let satisfied = false;
    for (const lit of clause) {
      const varId = Math.abs(lit);
      const val = assignment.get(varId);
      if (val === undefined) continue;
      if ((lit > 0 && val) || (lit < 0 && !val)) {
        satisfied = true;
        break;
      }
    }
    if (!satisfied) return false;
  }
  return true;
}

export function isSatisfiable(formula: Formula): boolean {
  return solve(formula) !== null;
}

export function allSolutions(formula: Formula, limit = 100): Assignment[] {
  const solutions: Assignment[] = [];
  findAll(formula, new Map(), solutions, limit);
  return solutions;
}

function findAll(formula: Formula, assignment: Assignment, solutions: Assignment[], limit: number): void {
  if (solutions.length >= limit) return;

  const simplified = unitPropagate(formula, assignment);
  if (!simplified) return;
  const [f, a] = simplified;

  if (f.length === 0) {
    solutions.push(new Map(a));
    return;
  }
  if (f.some((c) => c.length === 0)) return;

  const lit = chooseLiteral(f);
  if (lit === null) return;
  const varId = Math.abs(lit);

  const tryTrue = new Map(a);
  tryTrue.set(varId, true);
  findAll(assign(f, lit), tryTrue, solutions, limit);

  const tryFalse = new Map(a);
  tryFalse.set(varId, false);
  findAll(assign(f, -lit), tryFalse, solutions, limit);
}

export function formulaToString(formula: Formula): string {
  return formula.map((c) => `(${c.map((l) => (l < 0 ? `~${Math.abs(l)}` : String(l))).join(" | ")})`).join(" & ");
}

export function clauseCount(formula: Formula): number {
  return formula.length;
}

export function variableCount(formula: Formula): number {
  const vars = new Set<number>();
  for (const clause of formula) {
    for (const lit of clause) {
      vars.add(Math.abs(lit));
    }
  }
  return vars.size;
}
