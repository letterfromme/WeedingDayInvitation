# Kad Kahwin — Asyikin & Khalib

Digital wedding card: dark floral layers from Cloudinary, RSVP in Firestore, static host on GitHub Pages.

## Pages

- `/` — invitation, RSVP form, wishes. Optional guest name: `/?to=Ahmad`
- `/kehadiran/` — public attendance list (no phone numbers)

## Local

```bash
npm install
npm run upload:cloudinary
npm run dev
```

`upload:cloudinary` is a one-time script. It reads `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` from `.env.local` only. Do not put those values in GitHub.

Copy `.env.example` to `.env.local` and fill Firebase + Cloudinary values.

## Firestore rules

In [Firebase Console → Firestore → Rules](https://console.firebase.google.com/project/weeding-eebf4/firestore/rules), paste [`firestore.rules`](firestore.rules) and publish. Until then, test mode will still accept writes.

## GitHub Pages

1. Push this repo to GitHub.
2. **Settings → Pages → Source → GitHub Actions**.
3. **Settings → Secrets and variables → Actions** — add:

   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`

4. Push to `main`. Site URL: `https://<user>.github.io/<repo>/`

Do **not** add `CLOUDINARY_API_SECRET` as a GitHub secret.
