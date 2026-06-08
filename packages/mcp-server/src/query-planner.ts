export type JoinType = "nested-loop" | "hash" | "merge";
export type ScanType = "full" | "index" | "range";

export interface TableStats {
  name: string;
  rowCount: number;
  avgRowSize: number;
  indexes: string[];
}

export interface PlanNode {
  type: "scan" | "filter" | "join" | "sort" | "project" | "limit";
  table?: string;
  scanType?: ScanType;
  joinType?: JoinType;
  column?: string;
  children: PlanNode[];
  estimatedCost: number;
  estimatedRows: number;
}

export class QueryPlanner {
  private tables = new Map<string, TableStats>();

  registerTable(stats: TableStats): void {
    this.tables.set(stats.name, stats);
  }

  planScan(table: string, filter?: { column: string; indexed: boolean }): PlanNode {
    const stats = this.tables.get(table);
    const rowCount = stats?.rowCount ?? 1000;

    if (filter && filter.indexed) {
      return {
        type: "scan",
        table,
        scanType: "index",
        column: filter.column,
        children: [],
        estimatedCost: Math.log2(rowCount) * 2,
        estimatedRows: Math.ceil(rowCount * 0.1),
      };
    }

    const baseCost = rowCount;
    const node: PlanNode = {
      type: "scan",
      table,
      scanType: "full",
      children: [],
      estimatedCost: baseCost,
      estimatedRows: rowCount,
    };

    if (filter) {
      return {
        type: "filter",
        column: filter.column,
        children: [node],
        estimatedCost: baseCost + rowCount * 0.1,
        estimatedRows: Math.ceil(rowCount * 0.3),
      };
    }

    return node;
  }

  planJoin(left: PlanNode, right: PlanNode, indexed = false): PlanNode {
    const leftRows = left.estimatedRows;
    const rightRows = right.estimatedRows;

    if (indexed && rightRows > 100) {
      return {
        type: "join",
        joinType: "hash",
        children: [left, right],
        estimatedCost: left.estimatedCost + right.estimatedCost + leftRows + rightRows,
        estimatedRows: Math.ceil(leftRows * rightRows * 0.01),
      };
    }

    if (leftRows < 100 || rightRows < 100) {
      return {
        type: "join",
        joinType: "nested-loop",
        children: [left, right],
        estimatedCost: left.estimatedCost + right.estimatedCost + leftRows * rightRows,
        estimatedRows: Math.ceil(leftRows * rightRows * 0.01),
      };
    }

    return {
      type: "join",
      joinType: "merge",
      children: [left, right],
      estimatedCost: left.estimatedCost + right.estimatedCost + (leftRows + rightRows) * Math.log2(leftRows + rightRows),
      estimatedRows: Math.ceil(leftRows * rightRows * 0.01),
    };
  }

  planSort(child: PlanNode, column: string): PlanNode {
    const n = child.estimatedRows;
    return {
      type: "sort",
      column,
      children: [child],
      estimatedCost: child.estimatedCost + n * Math.log2(Math.max(n, 2)),
      estimatedRows: n,
    };
  }

  planLimit(child: PlanNode, limit: number): PlanNode {
    return {
      type: "limit",
      children: [child],
      estimatedCost: child.estimatedCost,
      estimatedRows: Math.min(limit, child.estimatedRows),
    };
  }

  planProject(child: PlanNode, columns: string[]): PlanNode {
    return {
      type: "project",
      children: [child],
      estimatedCost: child.estimatedCost + child.estimatedRows * columns.length * 0.01,
      estimatedRows: child.estimatedRows,
    };
  }

  chooseBestJoin(left: PlanNode, right: PlanNode): PlanNode {
    const nl = this.planJoin(left, right);
    const hash = this.planJoin(left, right, true);
    return nl.estimatedCost < hash.estimatedCost ? nl : hash;
  }

  explain(plan: PlanNode, indent = 0): string {
    const prefix = "  ".repeat(indent);
    let line = `${prefix}${plan.type}`;
    if (plan.table) line += ` [${plan.table}]`;
    if (plan.scanType) line += ` (${plan.scanType})`;
    if (plan.joinType) line += ` (${plan.joinType})`;
    if (plan.column) line += ` on ${plan.column}`;
    line += ` cost=${plan.estimatedCost.toFixed(1)} rows=${plan.estimatedRows}`;
    const lines = [line];
    for (const child of plan.children) {
      lines.push(this.explain(child, indent + 1));
    }
    return lines.join("\n");
  }

  totalCost(plan: PlanNode): number {
    return plan.estimatedCost;
  }
}
