#!/usr/bin/env python3
"""
Apply Supabase migrations via the Management API.

Why this script instead of `supabase db push`:
  The CLI connects via the pooler (Supavisor), which is flaky on free-tier
  projects. The Management API hits the database directly, and authenticates
  with a personal access token rather than the DB password.

Flow:
  1. Ensure the bookkeeping table `public._claude_migrations` exists.
  2. Query it for already-applied versions.
  3. For every supabase/migrations/*.sql file whose version is unapplied:
       - Run the SQL.
       - Record the version in the bookkeeping table.
  4. Log a summary.

Idempotent: re-running with no new files is a no-op.
"""
from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
MIGRATIONS_DIR = REPO_ROOT / "supabase" / "migrations"

ACCESS_TOKEN = os.environ["SUPABASE_ACCESS_TOKEN"]
PROJECT_REF = os.environ["SUPABASE_PROJECT_REF"]

API_BASE = f"https://api.supabase.com/v1/projects/{PROJECT_REF}"


def run_sql(sql: str) -> list[dict] | None:
    """POST SQL to the Management API's database/query endpoint."""
    req = urllib.request.Request(
        f"{API_BASE}/database/query",
        data=json.dumps({"query": sql}).encode(),
        headers={
            "Authorization": f"Bearer {ACCESS_TOKEN}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            body = resp.read().decode()
            if not body:
                return None
            return json.loads(body)
    except urllib.error.HTTPError as err:
        detail = err.read().decode(errors="replace")
        raise RuntimeError(
            f"Management API returned {err.code}: {detail}"
        ) from err


def ensure_bookkeeping_table() -> None:
    run_sql(
        """
        CREATE TABLE IF NOT EXISTS public._claude_migrations (
          version    TEXT        PRIMARY KEY,
          filename   TEXT        NOT NULL,
          applied_at TIMESTAMPTZ DEFAULT NOW()
        );
        """
    )


def fetch_applied_versions() -> set[str]:
    rows = run_sql("SELECT version FROM public._claude_migrations;") or []
    return {row["version"] for row in rows}


def escape_sql_literal(value: str) -> str:
    return value.replace("'", "''")


def record_applied(version: str, filename: str) -> None:
    run_sql(
        f"""
        INSERT INTO public._claude_migrations (version, filename)
        VALUES ('{escape_sql_literal(version)}', '{escape_sql_literal(filename)}')
        ON CONFLICT (version) DO NOTHING;
        """
    )


def migration_files() -> list[tuple[str, Path]]:
    if not MIGRATIONS_DIR.is_dir():
        return []
    files: list[tuple[str, Path]] = []
    for path in sorted(MIGRATIONS_DIR.glob("*.sql")):
        # Supabase convention: first 14 chars of the filename = timestamp version.
        version = path.stem[:14]
        if not version.isdigit() or len(version) != 14:
            print(f"Skipping unrecognised migration filename: {path.name}")
            continue
        files.append((version, path))
    return files


def main() -> int:
    print(f"Project: {PROJECT_REF}")
    print(f"Migrations directory: {MIGRATIONS_DIR}")

    ensure_bookkeeping_table()
    applied = fetch_applied_versions()
    print(f"Already applied: {len(applied)} migration(s)")

    all_files = migration_files()
    pending = [(v, p) for v, p in all_files if v not in applied]
    print(f"Pending: {len(pending)} of {len(all_files)}")

    if not pending:
        print("Nothing to do.")
        return 0

    for version, path in pending:
        print(f"\nApplying {path.name} (version {version})")
        sql = path.read_text()
        try:
            run_sql(sql)
        except RuntimeError as err:
            print(f"  FAILED: {err}")
            return 1
        record_applied(version, path.name)
        print("  OK")

    print(f"\nApplied {len(pending)} new migration(s).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
