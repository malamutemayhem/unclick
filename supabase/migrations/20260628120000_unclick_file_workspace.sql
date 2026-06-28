-- UnClick File Workspace ("Large-PR Room")
--
-- Why this table exists:
--   The hosted MCP github connector pushes file content INLINE as a tool
--   argument, so the model has to emit the whole file in one response. A model
--   cannot emit a ~600KB file (e.g. tool-wiring.ts) in a single turn, so large
--   files cannot be pushed at all. This table is the server-side "room" that
--   holds file content of any size: the model streams a file in small chunks
--   (one row per chunk), then a single push assembles the chunks server-side and
--   writes them to git BY REFERENCE (GitHub Git Data API) - the content never
--   passes back through the model. See api/workspace.ts and
--   docs/prd/unclick-file-workspace.md.
--
-- Loss-prevention: rows are NOT deleted on push. They keep an expires_at and are
--   pruned only after the retention window (default 21 days, inside the agreed
--   10-30 day lifecycle), so a failed or mis-targeted push never loses work.

create table if not exists public.workspace_files (
  id            uuid        primary key default gen_random_uuid(),
  -- Tenancy: scopes every chunk to one UnClick key (stable lane hash when called
  -- through the hosted endpoint). Mirrors user_credentials.api_key_hash.
  api_key_hash  text        not null,
  -- Groups the chunks of one push together. The caller reuses this id across
  -- chunks and across files for a single logical push.
  workspace_id  text        not null,
  -- Repo-relative file path the chunk belongs to.
  path          text        not null,
  -- Ordering within a file. Chunks are concatenated by seq on assemble.
  seq           integer     not null default 0,
  -- One chunk of the file's UTF-8 content.
  content       text        not null,
  pushed_at     timestamptz,
  created_at    timestamptz not null default now(),
  -- Retention horizon. Prune only runs past this; never on push.
  expires_at    timestamptz not null default (now() + interval '21 days')
);

-- Fast assembly + listing for one push, and fast prune by horizon.
create index if not exists workspace_files_lookup_idx
  on public.workspace_files (api_key_hash, workspace_id, path, seq);
create index if not exists workspace_files_expiry_idx
  on public.workspace_files (expires_at);

-- Service-role only. Like circle_link_permissions and user_credentials, this is
-- never reachable by anon/auth clients - the api/workspace.ts function holds the
-- service role key server-side and scopes every query by api_key_hash.
alter table public.workspace_files enable row level security;

comment on table public.workspace_files is
  'UnClick File Workspace: server-side staging for large/streamed files that are pushed to git by reference. Service-role only; pruned after expires_at (retention, not on push).';

notify pgrst, 'reload schema';
