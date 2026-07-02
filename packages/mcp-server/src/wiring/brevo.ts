// wiring/brevo.ts
// Per-app MCP wiring for the brevo connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { brevoListContacts, brevoListCampaigns, brevoGetAccount } from "../brevo-tool.js";

export const brevoHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // brevo-tool.ts
  brevo_list_contacts:     (args) => brevoListContacts(args),
  brevo_list_campaigns:    (args) => brevoListCampaigns(args),
  brevo_get_account:       (args) => brevoGetAccount(args),
};
