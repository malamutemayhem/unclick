export class QueryBuilder {
  private table = "";
  private selectCols: string[] = [];
  private whereClauses: string[] = [];
  private orderClauses: string[] = [];
  private limitVal?: number;
  private offsetVal?: number;
  private joinClauses: string[] = [];
  private groupCols: string[] = [];
  private havingClauses: string[] = [];

  from(table: string): this {
    this.table = table;
    return this;
  }

  select(...cols: string[]): this {
    this.selectCols.push(...cols);
    return this;
  }

  where(condition: string): this {
    this.whereClauses.push(condition);
    return this;
  }

  andWhere(condition: string): this {
    return this.where(condition);
  }

  orWhere(condition: string): this {
    if (this.whereClauses.length > 0) {
      const last = this.whereClauses.pop()!;
      this.whereClauses.push(`(${last} OR ${condition})`);
    } else {
      this.whereClauses.push(condition);
    }
    return this;
  }

  join(table: string, on: string): this {
    this.joinClauses.push(`JOIN ${table} ON ${on}`);
    return this;
  }

  leftJoin(table: string, on: string): this {
    this.joinClauses.push(`LEFT JOIN ${table} ON ${on}`);
    return this;
  }

  groupBy(...cols: string[]): this {
    this.groupCols.push(...cols);
    return this;
  }

  having(condition: string): this {
    this.havingClauses.push(condition);
    return this;
  }

  orderBy(col: string, dir: "ASC" | "DESC" = "ASC"): this {
    this.orderClauses.push(`${col} ${dir}`);
    return this;
  }

  limit(n: number): this {
    this.limitVal = n;
    return this;
  }

  offset(n: number): this {
    this.offsetVal = n;
    return this;
  }

  build(): string {
    const parts: string[] = [];
    parts.push(`SELECT ${this.selectCols.length > 0 ? this.selectCols.join(", ") : "*"}`);
    parts.push(`FROM ${this.table}`);
    if (this.joinClauses.length > 0) parts.push(this.joinClauses.join(" "));
    if (this.whereClauses.length > 0) parts.push(`WHERE ${this.whereClauses.join(" AND ")}`);
    if (this.groupCols.length > 0) parts.push(`GROUP BY ${this.groupCols.join(", ")}`);
    if (this.havingClauses.length > 0) parts.push(`HAVING ${this.havingClauses.join(" AND ")}`);
    if (this.orderClauses.length > 0) parts.push(`ORDER BY ${this.orderClauses.join(", ")}`);
    if (this.limitVal !== undefined) parts.push(`LIMIT ${this.limitVal}`);
    if (this.offsetVal !== undefined) parts.push(`OFFSET ${this.offsetVal}`);
    return parts.join(" ");
  }

  clone(): QueryBuilder {
    const q = new QueryBuilder();
    q.table = this.table;
    q.selectCols = [...this.selectCols];
    q.whereClauses = [...this.whereClauses];
    q.orderClauses = [...this.orderClauses];
    q.limitVal = this.limitVal;
    q.offsetVal = this.offsetVal;
    q.joinClauses = [...this.joinClauses];
    q.groupCols = [...this.groupCols];
    q.havingClauses = [...this.havingClauses];
    return q;
  }
}

export function query(): QueryBuilder {
  return new QueryBuilder();
}
