import type { ConnectorConfig } from "./index.js";

export const xeroConnector: ConnectorConfig = {
  name: "Xero",
  slug: "xero",
  authType: "oauth2",
  description: "Xero accounting software. Access invoices, contacts, payments, bank transactions, and financial reports.",
  scopes: [
    "accounting.transactions.read",
    "accounting.transactions",
    "accounting.contacts.read",
    "accounting.contacts",
    "accounting.reports.read",
    "accounting.settings.read",
  ],
  authUrl:  "https://login.xero.com/identity/connect/authorize",
  tokenUrl: "https://identity.xero.com/connect/token",
  credentialFields: [
    {
      key:         "access_token",
      label:       "Access Token",
      description: "OAuth2 bearer token from Xero. Expires after 30 minutes.",
      secret:      true,
      placeholder: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
      findGuideUrl: "https://developer.xero.com/documentation/guides/oauth2/overview/",
    },
    {
      key:         "tenant_id",
      label:       "Tenant ID",
      description: "Xero organisation UUID. Found in the Xero API response after auth.",
      secret:      false,
      placeholder: "00000000-0000-0000-0000-000000000000",
      findGuideUrl: "https://developer.xero.com/documentation/guides/oauth2/pkce-flow/#3-call-the-xero-tenants-api",
    },
  ],
  docsUrl: "https://developer.xero.com/documentation/",
};
