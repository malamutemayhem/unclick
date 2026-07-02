# UnClick Auth Email Settings

The magic-link email body is already UnClick-branded (see `magic-link.html`:
title "Your UnClick magic link", the "Sign in to UnClick" button, and the
`unclick.world` footer). If your inbox still shows the email coming from
**"Supabase Auth" `<noreply@mail.app.supabase.io>`**, that label is NOT in the
HTML template. It is the sender name of Supabase's built-in email service, and
it is fixed. The only way to change it is to send through custom SMTP.

Do both of the steps below so the whole email reads as UnClick.

## 1. Change the sender from "Supabase Auth" to "UnClick" (custom SMTP)

The built-in Supabase email service always shows "Supabase Auth" and cannot be
renamed. Point Auth at Resend instead (UnClick already uses Resend via
`RESEND_API_KEY`, and `unclick.world` is a verified Resend sending domain).

Supabase Dashboard -> Project -> Authentication -> Emails -> SMTP Settings ->
enable "Custom SMTP":

- Sender name: `UnClick`
- Sender email: `no-reply@unclick.world`
- Host: `smtp.resend.com`
- Port: `465`
- Username: `resend`
- Password: your Resend API key (the `RESEND_API_KEY` value)

Once this is on, Gmail shows `UnClick <no-reply@unclick.world>` instead of
`Supabase Auth <noreply@mail.app.supabase.io>`.

## 2. Apply the branded template

Supabase Dashboard -> Project -> Authentication -> Emails -> Templates ->
"Magic Link":

- Subject: `Your UnClick magic link`
- Message body: paste the full contents of `magic-link.html`

The template uses `{{ .ConfirmationURL }}`, which Supabase substitutes at send
time. Keep that token intact.

## Why this lives in the dashboard, not in code

This project applies database migrations via the Management API
(`.github/workflows/apply-migrations.yml`); it does not use the Supabase CLI or
a `config.toml`, so Auth email/SMTP settings are configured by the operator in
the dashboard. `magic-link.html` and this README are the source of truth for
what to paste there.
