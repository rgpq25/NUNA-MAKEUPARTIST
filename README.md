# NUNA Makeup Artist

This repository is organized into two apps:

- `cms/`: the Payload CMS app.
- `web/`: the Astro frontend app.

## Setup

Install dependencies separately in each app you want to run.

## CMS Email Setup

The Payload CMS uses `@payloadcms/email-nodemailer` with SMTP for auth emails such as account recovery.

### Required CMS environment variables

Add these values to `cms/.env`:

```env
EMAIL_FROM_NAME=NUNA Makeup Artist
EMAIL_FROM_ADDRESS=no-reply@yourdomain.com
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your-brevo-login
SMTP_PASS=your-brevo-smtp-password
SMTP_SECURE=false
```

Notes:

- Use `SMTP_SECURE=false` with port `587`.
- Use `SMTP_SECURE=true` only if your provider requires port `465`.
- `EMAIL_FROM_ADDRESS` must be a real sender address you control.

### Brevo setup steps

This project was connected successfully using Brevo SMTP.

1. Create or log into a Brevo account.
2. Get the SMTP credentials from Brevo.
   - SMTP server
   - SMTP port
   - SMTP login
   - SMTP password
3. Add those values to `cms/.env`.
4. In Brevo, add and verify the sender email address you want to use.
   - Example: `no-reply@yourdomain.com`
5. Set that exact verified address as `EMAIL_FROM_ADDRESS` in `cms/.env`.
6. Restart the CMS after updating env values.
7. Test the forgot-password flow with a real CMS user.

### Common Brevo error

If Brevo logs this error:

```text
Sending has been rejected because the sender you used ... is not valid. Validate your sender or authenticate your domain
```

It means SMTP is connected, but `EMAIL_FROM_ADDRESS` is still not a verified sender in Brevo.

Fix it by:

1. Verifying the sender address in Brevo, or authenticating the domain.
2. Updating `EMAIL_FROM_ADDRESS` to that verified sender.
3. Restarting the CMS and testing again.

## Type Checking

- CMS: `cd cms && npx tsc -b`
- Web: `cd web && npx tsc -b`
