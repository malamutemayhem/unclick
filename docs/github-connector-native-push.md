# Native git push through the UnClick GitHub connector

UnClick lets any account run genuine `git push` and `git fetch` through its
GitHub connector. Git talks to an UnClick endpoint; UnClick injects your own
connected GitHub login on the server side and forwards the real git protocol to
GitHub. There is no file pasting and no size ceiling beyond the platform request
limit below, so pushing branches and opening PRs works the normal way.

This is the native-push path. It is different from the connector's `push_files`
action, which writes one commit by sending file contents through a tool call
(handy for a quick one-file change, but it has to carry the bytes inline).

## Why this is safe and public-facing

- Your UnClick API key authenticates the request. UnClick looks up the GitHub
  token that **your** account connected, so every user pushes as themselves.
- The GitHub token never leaves UnClick. Git only ever sees your UnClick key,
  and UnClick only ever sends the GitHub token to github.com.
- You can reach only the repositories your own connected GitHub login can reach.
  One account cannot push to another account's repositories.
- Self-hosted or fleet deployments can pin an allowlist with the
  `UNCLICK_GIT_PROXY_REPOS` environment variable (comma-separated `owner/repo`).
  When it is empty, every repo your GitHub login can reach is allowed.

## Prerequisites

1. Connect GitHub in UnClick (the same connect flow the connector uses).
2. Have your UnClick API key (`uc_...` or an agent key `agt_...`).

## Quick start

From inside a clone of the repository:

```bash
export UNCLICK_API_KEY=uc_your_key
node scripts/unclick-git-remote.mjs        # adds a remote named "unclick"
git push unclick HEAD                       # native push through UnClick
```

`scripts/unclick-git-remote.mjs` reads `origin` to detect `owner/repo`, then
configures the `unclick` remote for you. Useful flags:

- `--print` prints the remote URL and push command without writing anything.
- `--repo owner/name` sets the repository explicitly.
- `--remote NAME` uses a different remote name (default `unclick`).
- `--base https://your.host` targets a self-hosted UnClick deployment.

## Manual setup

The remote URL form is:

```
https://unclick:<UNCLICK_API_KEY>@unclick.world/api/git-proxy/<owner>/<repo>.git
```

The repository segment must end with `.git`. The username portion is ignored;
only the password (your UnClick key) is read. Example:

```bash
git remote add unclick \
  "https://unclick:${UNCLICK_API_KEY}@unclick.world/api/git-proxy/malamutemayhem/unclick.git"
git push unclick HEAD:my-branch
```

The key is stored in local `.git/config`. If you would rather not write it to
disk, use `--print` to get the URL and wire it through your own git credential
helper or `GIT_ASKPASS`.

## Verify it works

A clone is the fastest proof, because it exercises discovery and `upload-pack`:

```bash
git clone "https://unclick:${UNCLICK_API_KEY}@unclick.world/api/git-proxy/<owner>/<repo>.git" /tmp/unclick-proxy-check
```

To prove push end to end, push a throwaway branch and delete it:

```bash
git push unclick HEAD:unclick-proxy-check
git push unclick :unclick-proxy-check
```

## What the proxy accepts

Only git smart-HTTP endpoints pass through:

- `GET  /info/refs?service=git-upload-pack` and `?service=git-receive-pack`
- `POST /git-upload-pack` (fetch/clone)
- `POST /git-receive-pack` (push)

Anything else returns `400`.

## Limits

- Vercel serverless request bodies are capped (about 4.5 MB per request), so a
  single very large pack can be rejected. Normal commits and PR-sized pushes are
  far under this. For an unusually large first push, push history in smaller
  batches.
- This path covers HTTPS git operations. It does not replace SSH remotes.

## Troubleshooting

| Response | Meaning | Fix |
|----------|---------|-----|
| `401 UnClick API key required` | No `uc_`/`agt_` key was sent | Put your key in the URL password, a `Bearer` header, or `?key=` |
| `401 Saved UnClick GitHub login is missing` | GitHub is not connected for this account | Connect GitHub in UnClick, then retry |
| `403 Repository is not allowed` | A `UNCLICK_GIT_PROXY_REPOS` allowlist is set and excludes this repo | Add `owner/repo` to the allowlist or clear it |
| `400 Repository segment must end with .git` | The URL is missing the `.git` suffix | Append `.git` to the repo in the URL |

## Where this lives in the code

- `api/git-proxy.ts` - the request handler (auth, per-account token lookup, forwarding).
- `api/lib/git-proxy.ts` - pure helpers (auth parsing, path validation, URL building).
- `api/git-proxy.test.ts` - contract tests for the helpers.
- `vercel.json` - the `/api/git-proxy/:path*` route.
- `scripts/unclick-git-remote.mjs` - the setup helper described above.
