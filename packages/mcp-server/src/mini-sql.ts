export type SqlValue = string | number | boolean | null;

export interface Column {
  name: string;
  alias?: string;
  fn?: "COUNT" | "SUM" | "AVG" | "MIN" | "MAX";
}

export interface WhereClause {
  column: string;
  op: "=" | "!=" | "<" | ">" | "<=" | ">=" | "LIKE" | "IN" | "IS NULL" | "IS NOT NULL";
  value?: SqlValue | SqlValue[];
}

export interface OrderBy {
  column: string;
  direction: "ASC" | "DESC";
}

export class QueryBuilder {
  private _table = "";
  private _columns: Column[] = [];
  private _wheres: WhereClause[] = [];
  private _orderBy: OrderBy[] = [];
  private _limit?: number;
  private _offset?: number;
  private _groupBy: string[] = [];
  private _joins: { type: string; table: string; on: string }[] = [];
  private _distinct = false;

  static select(...columns: string[]): QueryBuilder {
    const qb = new QueryBuilder();
    qb._columns = columns.map((c) => {
      const parts = c.split(" AS ");
      return parts.length > 1 ? { name: parts[0].trim(), alias: parts[1].trim() } : { name: c };
    });
    return qb;
  }

  from(table: string): this {
    this._table = table;
    return this;
  }

  where(column: string, op: WhereClause["op"], value?: SqlValue | SqlValue[]): this {
    this._wheres.push({ column, op, value });
    return this;
  }

  whereEq(column: string, value: SqlValue): this {
    return this.where(column, "=", value);
  }

  whereIn(column: string, values: SqlValue[]): this {
    return this.where(column, "IN", values);
  }

  whereNull(column: string): this {
    return this.where(column, "IS NULL");
  }

  whereNotNull(column: string): this {
    return this.where(column, "IS NOT NULL");
  }

  orderBy(column: string, direction: "ASC" | "DESC" = "ASC"): this {
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

  groupBy(...columns: string[]): this {
    this._groupBy.push(...columns);
    return this;
  }

  join(table: string, on: string): this {
    this._joins.push({ type: "JOIN", table, on });
    return this;
  }

  leftJoin(table: string, on: string): this {
    this._joins.push({ type: "LEFT JOIN", table, on });
    return this;
  }

  distinct(): this {
    this._distinct = true;
    return this;
  }

  count(column = "*", alias?: string): this {
    this._columns.push({ name: column, fn: "COUNT", alias });
    return this;
  }

  sum(column: string, alias?: string): this {
    this._columns.push({ name: column, fn: "SUM", alias });
    return this;
  }

  avg(column: string, alias?: string): this {
    this._columns.push({ name: column, fn: "AVG", alias });
    return this;
  }

  build(): { sql: string; params: SqlValue[] } {
    const params: SqlValue[] = [];
    let paramIdx = 1;

    const cols = this._columns.length === 0
      ? "*"
      : this._columns
        .map((c) => {
          const expr = c.fn ? `${c.fn}(${c.name})` : c.name;
          return c.alias ? `${expr} AS ${c.alias}` : expr;
        })
        .join(", ");

    let sql = `SELECT ${this._distinct ? "DISTINCT " : ""}${cols} FROM ${this._table}`;

    for (const j of this._joins) {
      sql += ` ${j.type} ${j.table} ON ${j.on}`;
    }

    if (this._wheres.length > 0) {
      const conditions = this._wheres.map((w) => {
        if (w.op === "IS NULL") return `${w.column} IS NULL`;
        if (w.op === "IS NOT NULL") return `${w.column} IS NOT NULL`;
        if (w.op === "IN") {
          const values = w.value as SqlValue[];
          const placeholders = values.map(() => `$${paramIdx++}`).join(", ");
          params.push(...values);
          return `${w.column} IN (${placeholders})`;
        }
        params.push(w.value as SqlValue);
        return `${w.column} ${w.op} $${paramIdx++}`;
      });
      sql += ` WHERE ${conditions.join(" AND ")}`;
    }

    if (this._groupBy.length > 0) {
      sql += ` GROUP BY ${this._groupBy.join(", ")}`;
    }

    if (this._orderBy.length > 0) {
      sql += ` ORDER BY ${this._orderBy.map((o) => `${o.column} ${o.direction}`).join(", ")}`;
    }

    if (this._limit !== undefined) {
      sql += ` LIMIT ${this._limit}`;
    }

    if (this._offset !== undefined) {
      sql += ` OFFSET ${this._offset}`;
    }

    return { sql, params };
  }

  toString(): string {
    return this.build().sql;
  }
}

export class InsertBuilder {
  private _table = "";
  private _rows: Record<string, SqlValue>[] = [];

  static into(table: string): InsertBuilder {
    const ib = new InsertBuilder();
    ib._table = table;
    return ib;
  }

  values(row: Record<string, SqlValue>): this {
    this._rows.push(row);
    return this;
  }

  build(): { sql: string; params: SqlValue[] } {
    if (this._rows.length === 0) throw new Error("No values to insert");
    const columns = Object.keys(this._rows[0]);
    const params: SqlValue[] = [];
    let paramIdx = 1;

    const rows = this._rows.map((row) => {
      const placeholders = columns.map((col) => {
        params.push(row[col] ?? null);
        return `$${paramIdx++}`;
      });
      return `(${placeholders.join(", ")})`;
    });

    return {
      sql: `INSERT INTO ${this._table} (${columns.join(", ")}) VALUES ${rows.join(", ")}`,
      params,
    };
  }
}

export class UpdateBuilder {
  private _table = "";
  private _sets: Record<string, SqlValue> = {};
  private _wheres: WhereClause[] = [];

  static table(table: string): UpdateBuilder {
    const ub = new UpdateBuilder();
    ub._table = table;
    return ub;
  }

  set(column: string, value: SqlValue): this {
    this._sets[column] = value;
    return this;
  }

  where(column: string, op: WhereClause["op"], value: SqlValue): this {
    this._wheres.push({ column, op, value });
    return this;
  }

  build(): { sql: string; params: SqlValue[] } {
    const params: SqlValue[] = [];
    let paramIdx = 1;
    const sets = Object.entries(this._sets).map(([col, val]) => {
      params.push(val);
      return `${col} = $${paramIdx++}`;
    });

    let sql = `UPDATE ${this._table} SET ${sets.join(", ")}`;

    if (this._wheres.length > 0) {
      const conditions = this._wheres.map((w) => {
        params.push(w.value as SqlValue);
        return `${w.column} ${w.op} $${paramIdx++}`;
      });
      sql += ` WHERE ${conditions.join(" AND ")}`;
    }

    return { sql, params };
  }
}
