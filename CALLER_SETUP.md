# Ravlink Caller setup

## 1. Add users

Credentials live in `config/caller-users.json`. Passwords are stored as salted scrypt hashes.

```sh
npm run caller:add-user -- username password "Display Name"
```

## 2. Environment variables

Add every variable from `.env.caller.example` to Vercel Project Settings → Environment Variables.

## 3. Firebase and keyless Vercel OIDC

The app does not use a service-account private key. It exchanges Vercel's short-lived OIDC token for a Google Cloud access token.

1. In Google Cloud Console, select project `caller-3919f`.
2. Go to **IAM & Admin → Workload Identity Federation** and create a pool named/ID `vercel`.
3. Add an **OpenID Connect (OIDC)** provider named/ID `vercel`.
4. Use Vercel's team issuer: `https://oidc.vercel.com/YOUR_TEAM_SLUG`.
5. Select **Default audience**, leave the JWK field empty, and map `google.subject` to `assertion.sub`.
6. Create a service account named/ID `vercel-caller`.
7. Grant it **Storage Object Admin** and **Cloud Datastore User** roles on project `caller-3919f`.
8. On that service account, grant **Workload Identity User** to this principal (replace placeholders):

   `principal://iam.googleapis.com/projects/1007439837969/locations/global/workloadIdentityPools/vercel/subject/owner:VERCEL_TEAM_SLUG:project:VERCEL_PROJECT_NAME:environment:production`

9. Add a second principal for `environment:preview` only if preview deployments must access real recordings.
10. Add these variables in Vercel Project Settings for Production:

   - `FIREBASE_PROJECT_ID=caller-3919f`
   - `FIREBASE_STORAGE_BUCKET=caller-3919f.firebasestorage.app`
   - `GCP_PROJECT_NUMBER=1007439837969`
   - `GCP_SERVICE_ACCOUNT_EMAIL=vercel-caller@caller-3919f.iam.gserviceaccount.com`
   - `GCP_WORKLOAD_IDENTITY_POOL_ID=vercel`
   - `GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID=vercel`

Vercel injects `VERCEL_OIDC_TOKEN` automatically. For local testing, link the project and run `vercel env pull .env.local`; the local token is short-lived and must be refreshed periodically.

The server writes call metadata to the `callRecords` Firestore collection and MP3 files to `call-recordings/` in Storage.

## 4. Twilio

Buy/choose a Voice-capable Twilio number. Create an API Key and a TwiML App. Set the TwiML App Voice URL to:

`https://YOUR-DOMAIN/api/caller/twiml` (HTTP POST)

Set `TWILIO_CALLER_ID` to your Twilio number and deploy. Open `/caller` in a supported browser and allow microphone access.

## Compliance

The caller UI reminds agents to announce recording. Confirm calling hours, consent, do-not-call lists, number registration and recording rules for every jurisdiction you call. The application does not replace those operational checks.
