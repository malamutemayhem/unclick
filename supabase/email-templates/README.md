# UnClick Auth Email Settings

Use these settings in Supabase Auth for the magic-link email.

- Sender name: `UnClick`
- From email: `no-reply@unclick.world`
- Subject: `Your UnClick magic link`
- Template: `magic-link.html`

The inbox sender label comes from Supabase Auth email/SMTP settings, not from
the HTML template. For production, configure custom SMTP so Gmail shows UnClick
instead of the default Supabase Auth sender.
