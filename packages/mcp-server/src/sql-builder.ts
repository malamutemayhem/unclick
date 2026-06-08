export type SqlOrder = "ASC" | "DESC";
export type SqlJoinType = "INNER" | "LEFT" | "RIGHT" | "FULL";

export class SqlBuilder {
  private _select: string[] = [];
  private _from = "";
  private _joins: string[] = [];
  private _where: string[] = [];
  private _groupBy: string[] = [];
  private _having: string[] = [];
  private _orderBy: Array<{ column: string; direction: SqlOrder }> = [];
  private _limit: number | null = null;
  private _offset: number | null = null;
  private _params: unknown[] = [];

  select(...columns: string[]): this {
    this._select.push(...columns);
    return this;
  }

  from(table: string): this {
    this._from = table;
    return this;
  }

  join(table: string, condition: string, type: SqlJoinType = "INNER"): this {
    this._joins.push(`${type} JOIN ${table} ON ${condition}`);
    return this;
  }

  where(condition: string, ...params: unknown[]): this {
    this._where.push(condition);
    this._params.push(...params);
    return this;
  }

  andWhere(condition: string, ...params: unknown[]): this {
    return this.where(condition, ...params);
  }

  orWhere(condition: string, ...params: unknown[]): this {
    if (this._where.length > 0) {
      const last = this._where.pop()!;
      this._where.push(`(${last} OR ${condition})`);
    } else {
      this._where.push(condition);
    }
    this._params.push(...params);
    return this;
  }

  groupBy(...columns: string[]): this {
    this._groupBy.push(...columns);
    return this;
  }

  having(condition: string): this {
    this._having.push(condition);
    return this;
  }

  orderBy(column: string, direction: SqlOrder = "ASC"): this {
    this._orderBy.push({ column, direction });
    return this;
  }

  limit(n: number): this {
    this._limit = n;
    return this;
  }

  offset(n: number): this {
    this._offset = n;
    return this;
  }

  build(): { sql: string; params: unknown[] } {
    const parts: string[] = [];

    const selectCols = this._select.length > 0 ? this._select.join(", ") : "*";
    parts.push(`SELECT ${selectCols}`);

    if (this._from) parts.push(`FROM ${this._from}`);

    for (const join of this._joins) {
      parts.push(join);
    }

    if (this._where.length > 0) {
      parts.push(`WHERE ${this._where.join(" AND ")}`);
    }

    if (this._groupBy.length > 0) {
      parts.push(`GROUP BY ${this._groupBy.join(", ")}`);
    }

    if (this._having.length > 0) {
      parts.push(`HAVING ${this._having.join(" AND ")}`);
    }

    if (this._orderBy.length > 0) {
      const order = this._orderBy
        .map((o) => `${o.column} ${o.direction}`)
        .join(", ");
      parts.push(`ORDER BY ${order}`);
    }

    if (this._limit !== null) parts.push(`LIMIT ${this._limit}`);
    if (this._offset !== null) parts.push(`OFFSET ${this._offset}`);

    return { sql: parts.join(" "), params: [...this._params] };
  }

  toSQL(): string {
    return this.build().sql;
  }

  static insert(table: string, data: Record<string, unknown>): { sql: string; params: unknown[] } {
    const columns = Object.keys(data);
    const placeholders = columns.map((_, i) => `$${i + 1}`);
    const sql = `INSERT INTO ${table} (${columns.join(", ")}) VALUES (${placeholders.join(", ")})`;
    return { sql, params: Object.values(data) };
  }

  static update(table: string, data: Record<string, unknown>, whereClause: string, whereParams: unknown[] = []): { sql: string; params: unknown[] } {
    const sets = Object.keys(data).map((k, i) => `${k} = $${i + 1}`);
    const params = [...Object.values(data), ...whereParams];
    const sql = `UPDATE ${table} SET ${sets.join(", ")} WHERE ${whereClause}`;
    return { sql, params };
  }

  static deleteFrom(table: string, whereClause: string, whereParams: unknown[] = []): { sql: string; params: unknown[] } {
    return { sql: `DELETE FROM ${table} WHERE ${whereClause}`, params: whereParams };
  }
}
