export type CellId = number;

let nextCellId = 0;

export interface InputCell<T> {
  kind: "input";
  id: CellId;
  value: T;
  dependents: Set<CellId>;
}

export interface ComputedCell<T> {
  kind: "computed";
  id: CellId;
  compute: () => T;
  value: T;
  dirty: boolean;
  dependencies: Set<CellId>;
  dependents: Set<CellId>;
}

export type Cell<T> = InputCell<T> | ComputedCell<T>;

const cells = new Map<CellId, Cell<unknown>>();
let tracking: Set<CellId> | null = null;

export function resetCells(): void {
  cells.clear();
  nextCellId = 0;
  tracking = null;
}

export function input<T>(value: T): CellId {
  const id = nextCellId++;
  const cell: InputCell<T> = { kind: "input", id, value, dependents: new Set() };
  cells.set(id, cell as Cell<unknown>);
  return id;
}

export function computed<T>(compute: () => T): CellId {
  const id = nextCellId++;

  tracking = new Set();
  const value = compute();
  const deps = tracking;
  tracking = null;

  const cell: ComputedCell<T> = {
    kind: "computed",
    id,
    compute,
    value,
    dirty: false,
    dependencies: deps,
    dependents: new Set(),
  };

  for (const depId of deps) {
    const dep = cells.get(depId);
    if (dep) dep.dependents.add(id);
  }

  cells.set(id, cell as Cell<unknown>);
  return id;
}

export function get<T>(id: CellId): T {
  const cell = cells.get(id);
  if (!cell) throw new Error(`Cell ${id} not found`);

  if (tracking) tracking.add(id);

  if (cell.kind === "computed" && cell.dirty) {
    recompute(cell as ComputedCell<unknown>);
  }

  return cell.value as T;
}

export function set<T>(id: CellId, value: T): void {
  const cell = cells.get(id);
  if (!cell || cell.kind !== "input") throw new Error(`Cell ${id} is not an input cell`);

  if (cell.value === value) return;
  cell.value = value;
  markDependentsDirty(id);
}

function markDependentsDirty(id: CellId): void {
  const cell = cells.get(id);
  if (!cell) return;
  for (const depId of cell.dependents) {
    const dep = cells.get(depId);
    if (dep && dep.kind === "computed" && !dep.dirty) {
      dep.dirty = true;
      markDependentsDirty(depId);
    }
  }
}

function recompute(cell: ComputedCell<unknown>): void {
  for (const depId of cell.dependencies) {
    const dep = cells.get(depId);
    if (dep && dep.kind === "computed" && dep.dirty) {
      recompute(dep as ComputedCell<unknown>);
    }
  }

  const oldDeps = cell.dependencies;
  tracking = new Set();
  cell.value = cell.compute();
  const newDeps = tracking;
  tracking = null;

  for (const depId of oldDeps) {
    if (!newDeps.has(depId)) {
      cells.get(depId)?.dependents.delete(cell.id);
    }
  }
  for (const depId of newDeps) {
    if (!oldDeps.has(depId)) {
      cells.get(depId)?.dependents.add(cell.id);
    }
  }

  cell.dependencies = newDeps;
  cell.dirty = false;
}

export function isDirty(id: CellId): boolean {
  const cell = cells.get(id);
  if (!cell || cell.kind !== "computed") return false;
  return cell.dirty;
}

export function cellCount(): number {
  return cells.size;
}

export function batch(fn: () => void): void {
  fn();
}
