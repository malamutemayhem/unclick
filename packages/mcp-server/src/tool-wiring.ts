// tool-wiring.ts
// Auto-generated wiring for all tool files, plus the project-owned Gitea
// maintenance bridge. The bridge stays outside generated indexes so a rebuild
// cannot silently drop Superuser access.

import { ADDITIONAL_HANDLERS as generatedHandlers } from "./additional-handlers.js";
import { ADDITIONAL_TOOLS as generatedTools } from "./additional-tools.js";
import { GITEA_HANDLERS, GITEA_TOOLS } from "./gitea-wiring.js";

export const ADDITIONAL_HANDLERS = { ...generatedHandlers, ...GITEA_HANDLERS };
export const ADDITIONAL_TOOLS = [...generatedTools, ...GITEA_TOOLS];
