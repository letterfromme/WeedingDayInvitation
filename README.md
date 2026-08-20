# Kad Kahwin — Asyikin & Khalib

Digital wedding card: dark floral layers from Cloudinary, RSVP in Firestore, static host on GitHub Pages.

## Pages

- `/` — invitation, RSVP form, and ucapan form. Optional guest name: `/?to=Ahmad`
- `/kehadiran/` — submitted RSVP list and ucapan list (one private URL; not linked from the kad)

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
3. **Settings → Secrets and variables → Actions** — add **one** secret:

   - **Name:** `INVITE_ENV`
   - **Value:** the `NEXT_PUBLIC_*` lines from `.env.local` (Firebase + Cloudinary cloud name only)

4. Push to `main`. Site URL: `https://<user>.github.io/<repo>/`

Do **not** put `CLOUDINARY_API_KEY` or `CLOUDINARY_API_SECRET` in that secret.
