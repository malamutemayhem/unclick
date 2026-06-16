# Managed Connections

Managed Connections let customers connect apps once and use them from any PC signed into UnClick, without UnClick storing raw app keys or tokens.

## Runtime Switches

- `NANGO_SECRET_KEY`: enables the managed connection broker.
- `NANGO_WEBHOOK_SECRET`: verifies broker webhooks sent to `/api/managed-connection-webhook`.
- `NANGO_PROVIDER_CONFIG_HIGGSFIELD`: enables the customer-facing one-click Higgsfield connection path.
- `NANGO_MANAGED_PLATFORMS`: optional comma-separated allowlist for broker-backed apps, for example `higgsfield,github`.
- `NANGO_MANAGED_PLATFORMS=*`: enables the broker path for every auth-required app. Use only after provider configs exist for every app.
- `NANGO_PROVIDER_CONFIG_PREFIX`: optional prefix used when deriving provider config names from app slugs.

## Data Boundary

The `managed_app_connections` table stores tenant scope, app slug, provider config, external connection id, status, and non-secret metadata. Raw customer app access stays with the managed connection provider and is fetched only at tool-call time.

## Rollout Shape

Start with one app, such as Higgsfield:

1. Configure the broker provider for Higgsfield.
2. Set `NANGO_PROVIDER_CONFIG_HIGGSFIELD`.
3. Apply the `managed_app_connections` migration.
4. Point broker webhooks at `/api/managed-connection-webhook`.
5. Verify the admin Apps row shows `Connect`, then `Connected`, and offers `Disconnect`.

