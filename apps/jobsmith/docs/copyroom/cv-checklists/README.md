# JobSmith CV Checklist CopyRoom Receipt

This folder is the exact source handoff for UnClick todo `848eb8db-dfbb-4411-a332-05096b5bf1fb`.

CopyRoom rule: workers must copy these files from source and cite this receipt before deriving JobSmith rule text. Do not retype these checklists.

## Copied Sources

| File | Original source | SHA256 | Bytes | Lines |
|---|---|---:|---:|---:|
| `cv-checklists_1.md` | `C:/Temp/unclick temp/cv-checklists_1.md` | `36e1bd88b5eaa6bbe7374681231c5a29a66676b5813bc59cf04ccd429c27fea4` | 27174 | 329 |
| `cv-checklists_1a.md` | `C:/Temp/unclick temp/cv-checklists_1a.md` | `5a8f0593e8052f075ae7280c566bab5eef3a7415d72504caa8c6bd1e2257bf9a` | 42467 | 951 |
| `cv-checklists_1b.md` | `C:/Temp/unclick temp/cv-checklists_1b.md` | `2616ec5a4858f63b35ce8b0b0cab1ad86b72e4e88e51430bb046a245ebb8b22f` | 43176 | 916 |
| `cv-checklists_2.md` | `C:/Temp/unclick temp/cv-checklists_2.md` | `bffd24c5663d120c3c86957819bf6c0bdc4e5a46fee7ee0fb89bc1aba2c7577c` | 24907 | 313 |
| `cv-checklists_3.md` | `C:/Temp/unclick temp/cv-checklists_3.md` | `9f651dec06874771523d41f4fe7d296998ee9beeba09051fcbeb2a1c457bf3d5` | 24500 | 266 |

## Receipts

- User source-file handoff saved to Orchestrator receipt `f1df980a-7c3a-437c-8a9c-5d4eef84720f`.
- Boardroom target job: `848eb8db-dfbb-4411-a332-05096b5bf1fb`.
- Codex source-manifest claim: `91906cb9-435b-4ae4-aa99-f4de3aa35fbe`.
- FYI rule-pack handoff: `0bad9e59-03cf-44e9-83e2-33f4473a9209`.
- Expanded Cowork rule-pack feed: `4438301e-bdd7-4573-98f6-289ffe40941b`.
- Chris-specified ScopePack fields: `b1b49c8f-c3af-44bb-a2d4-363148b4d763`.

## Build Use

The matching machine manifest lives at `apps/jobsmith/src/lib/cvChecklistSources.ts`.

Before a builder claims that all rules are encoded, they must reconcile the first handoff's count mismatch: it says 40 rules, but the listed severities are `12 ERROR + 19 WARN + 8 INFO = 39`.
