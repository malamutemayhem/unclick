export interface Variable<T> {
  name: string;
  domain: T[];
}

export interface Constraint<T> {
  variables: string[];
  check: (values: Map<string, T>) => boolean;
}

export interface CSPResult<T> {
  solution: Map<string, T> | null;
  explored: number;
}

export function solve<T>(
  variables: Variable<T>[],
  constraints: Constraint<T>[],
): CSPResult<T> {
  const assignment = new Map<string, T>();
  let explored = 0;

  const varMap = new Map<string, Variable<T>>();
  for (const v of variables) varMap.set(v.name, v);

  const constraintMap = new Map<string, Constraint<T>[]>();
  for (const v of variables) {
    constraintMap.set(v.name, []);
  }
  for (const c of constraints) {
    for (const vName of c.variables) {
      constraintMap.get(vName)?.push(c);
    }
  }

  function isConsistent(name: string): boolean {
    const relevant = constraintMap.get(name) ?? [];
    for (const c of relevant) {
      const allAssigned = c.variables.every((v) => assignment.has(v));
      if (!allAssigned) continue;
      if (!c.check(assignment)) return false;
    }
    return true;
  }

  function backtrack(index: number): boolean {
    if (index === variables.length) return true;

    const variable = variables[index];
    for (const value of variable.domain) {
      explored++;
      assignment.set(variable.name, value);
      if (isConsistent(variable.name)) {
        if (backtrack(index + 1)) return true;
      }
      assignment.delete(variable.name);
    }
    return false;
  }

  const found = backtrack(0);
  return {
    solution: found ? new Map(assignment) : null,
    explored,
  };
}

export function solveAll<T>(
  variables: Variable<T>[],
  constraints: Constraint<T>[],
  maxSolutions = Infinity,
): { solutions: Map<string, T>[]; explored: number } {
  const solutions: Map<string, T>[] = [];
  const assignment = new Map<string, T>();
  let explored = 0;

  const constraintMap = new Map<string, Constraint<T>[]>();
  for (const v of variables) {
    constraintMap.set(v.name, []);
  }
  for (const c of constraints) {
    for (const vName of c.variables) {
      constraintMap.get(vName)?.push(c);
    }
  }

  function isConsistent(name: string): boolean {
    const relevant = constraintMap.get(name) ?? [];
    for (const c of relevant) {
      if (!c.variables.every((v) => assignment.has(v))) continue;
      if (!c.check(assignment)) return false;
    }
    return true;
  }

  function backtrack(index: number): void {
    if (solutions.length >= maxSolutions) return;
    if (index === variables.length) {
      solutions.push(new Map(assignment));
      return;
    }

    const variable = variables[index];
    for (const value of variable.domain) {
      explored++;
      assignment.set(variable.name, value);
      if (isConsistent(variable.name)) {
        backtrack(index + 1);
      }
      assignment.delete(variable.name);
    }
  }

  backtrack(0);
  return { solutions, explored };
}

export function allDifferent<T>(variableNames: string[]): Constraint<T> {
  return {
    variables: variableNames,
    check: (values) => {
      const assigned = variableNames
        .filter((v) => values.has(v))
        .map((v) => values.get(v));
      return new Set(assigned).size === assigned.length;
    },
  };
}
