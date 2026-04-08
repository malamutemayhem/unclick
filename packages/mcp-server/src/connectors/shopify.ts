import type { ConnectorConfig } from "./index.js";

export const shopifyConnector: ConnectorConfig = {
  name: "Shopify",
  slug: "shopify",
  authType: "oauth2",
  description: "Shopify ecommerce. Manage products, orders, customers, inventory, and collections via the Admin API.",
  scopes: [
    "read_products",
    "write_products",
    "read_orders",
    "write_orders",
    "read_customers",
    "write_customers",
    "read_inventory",
    "write_inventory",
  ],
  authUrl:  "https://{store}.myshopify.com/admin/oauth/authorize",
  tokenUrl: "https://{store}.myshopify.com/admin/oauth/access_token",
  credentialFields: [
    {
      key:         "store",
      label:       "Store Name",
      description: "Your Shopify store name, e.g. 'mystore' (without .myshopify.com).",
      secret:      false,
      placeholder: "mystore",
      findGuideUrl: "https://help.shopify.com/en/manual/domains",
    },
    {
      key:         "access_token",
      label:       "Admin API Access Token",
      description: "Shopify Admin API access token from your app or custom app settings.",
      secret:      true,
      placeholder: "shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      findGuideUrl: "https://help.shopify.com/en/manual/apps/app-types/custom-apps#get-the-api-credentials-for-a-custom-app",
    },
  ],
  docsUrl: "https://shopify.dev/docs/api/admin-rest",
};
