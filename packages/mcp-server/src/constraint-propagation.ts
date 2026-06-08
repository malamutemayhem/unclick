export interface Variable<T> {
  name: string;
  domain: T[];
}

export interface Constraint<T> {
  variables: string[];
  check: (assignment: Map<string, T>) => boolean;
}

export interface CSP<T> {
  variables: Variable<T>[];
  constraints: Constraint<T>[];
}

export function createCSP<T>(): CSP<T> {
  return { variables: [], constraints: [] };
}

export function addVariable<T>(csp: CSP<T>, name: string, domain: T[]): CSP<T> {
  return {
    ...csp,
    variables: [...csp.variables, { name, domain: [...domain] }],
  };
}

export function addConstraint<T>(csp: CSP<T>, variables: string[], check: (assignment: Map<string, T>) => boolean): CSP<T> {
  return {
    ...csp,
    constraints: [...csp.constraints, { variables, check }],
  };
}

export function addNotEqual<T>(csp: CSP<T>, a: string, b: string): CSP<T> {
  return addConstraint(csp, [a, b], (asgn) => asgn.get(a) !== asgn.get(b));
}

export function addAllDifferent<T>(csp: CSP<T>, vars: string[]): CSP<T> {
  let result = csp;
  for (let i = 0; i < vars.length; i++) {
    for (let j = i + 1; j < vars.length; j++) {
      result = addNotEqual(result, vars[i], vars[j]);
    }
  }
  return result;
}

function isConsistent<T>(csp: CSP<T>, assignment: Map<string, T>): boolean {
  for (const c of csp.constraints) {
    if (c.variables.every((v) => assignment.has(v))) {
      if (!c.check(assignment)) return false;
    }
  }
  return true;
}

export function solve<T>(csp: CSP<T>): Map<string, T> | null {
  const domains = new Map<string, T[]>();
  for (const v of csp.variables) {
    domains.set(v.name, [...v.domain]);
  }

  if (!ac3(csp, domains)) return null;

  return backtrack(csp, new Map(), domains);
}

function backtrack<T>(csp: CSP<T>, assignment: Map<string, T>, domains: Map<string, T[]>): Map<string, T> | null {
  if (assignment.size === csp.variables.length) return assignment;

  const unassigned = csp.variables.find((v) => !assignment.has(v.name))!;
  const domain = domains.get(unassigned.name) ?? [];

  for (const value of domain) {
    const next = new Map(assignment);
    next.set(unassigned.name, value);

    if (isConsistent(csp, next)) {
      const newDomains = new Map<string, T[]>();
      for (const [k, v] of domains) {
        newDomains.set(k, [...v]);
      }
      newDomains.set(unassigned.name, [value]);

      if (ac3(csp, newDomains)) {
        const result = backtrack(csp, next, newDomains);
        if (result) return result;
      }
    }
  }

  return null;
}

function ac3<T>(csp: CSP<T>, domains: Map<string, T[]>): boolean {
  const queue: [string, string][] = [];

  for (const c of csp.constraints) {
    if (c.variables.length === 2) {
      queue.push([c.variables[0], c.variables[1]]);
      queue.push([c.variables[1], c.variables[0]]);
    }
  }

  while (queue.length > 0) {
    const [xi, xj] = queue.shift()!;
    if (revise(csp, domains, xi, xj)) {
      const di = domains.get(xi)!;
      if (di.length === 0) return false;

      for (const c of csp.constraints) {
        if (c.variables.length === 2 && c.variables.includes(xi)) {
          const other = c.variables[0] === xi ? c.variables[1] : c.variables[0];
          if (other !== xj) {
            queue.push([other, xi]);
          }
        }
      }
    }
  }

  return true;
}

function revise<T>(csp: CSP<T>, domains: Map<string, T[]>, xi: string, xj: string): boolean {
  let revised = false;
  const di = domains.get(xi)!;
  const dj = domains.get(xj)!;
  const constraints = csp.constraints.filter(
    (c) => c.variables.length === 2 && c.variables.includes(xi) && c.variables.includes(xj),
  );

  const kept: T[] = [];
  for (const vi of di) {
    let hasSupport = false;
    for (const vj of dj) {
      const asgn = new Map<string, T>();
      asgn.set(xi, vi);
      asgn.set(xj, vj);
      if (constraints.every((c) => c.check(asgn))) {
        hasSupport = true;
        break;
      }
    }
    if (hasSupport) {
      kept.push(vi);
    } else {
      revised = true;
    }
  }

  domains.set(xi, kept);
  return revised;
}

export function solveAll<T>(csp: CSP<T>, limit = 100): Map<string, T>[] {
  const solutions: Map<string, T>[] = [];
  const domains = new Map<string, T[]>();
  for (const v of csp.variables) {
    domains.set(v.name, [...v.domain]);
  }

  function search(assignment: Map<string, T>): void {
    if (solutions.length >= limit) return;

    if (assignment.size === csp.variables.length) {
      solutions.push(new Map(assignment));
      return;
    }

    const unassigned = csp.variables.find((v) => !assignment.has(v.name))!;
    const domain = domains.get(unassigned.name) ?? [];

    for (const value of domain) {
      const next = new Map(assignment);
      next.set(unassigned.name, value);
      if (isConsistent(csp, next)) {
        search(next);
      }
    }
  }

  search(new Map());
  return solutions;
}
