# Valentines PWA

A tiny **PWA** that works like a mini iPhone app: fullscreen, no Safari chrome, own icon. Send the link via iMessage and tell them **“Open and Add to Home Screen”**.

## What’s included

- **index.html** – PWA meta (`apple-mobile-web-app-capable`), fullscreen layout
- **style.css** – No scroll, full viewport, 3D flip card + floating hearts
- **app.js** – Tap to open card, confetti
- **manifest.json** – `"display": "standalone"`, theme color, icons
- **icon-512.png** – 512×512 app icon (from `icon.svg`)
- **icon.svg** – Source for the icon (edit and re-run `convert icon.svg -resize 512x512 icon-512.png` to refresh)

## Deploy (this repo)

Repo: **https://github.com/connilefleur/valentines**

1. On GitHub: **Settings → Pages**
2. Under “Build and deployment”, set **Source** to **GitHub Actions** (or “Deploy from a branch”)
3. If using a branch: choose branch **main**, folder **/ (root)**, Save
4. After a minute, the site is live at: **https://connilefleur.github.io/valentines/**

Other options: **Vercel** (drag folder or `vercel`), **Netlify** (drag folder or `netlify deploy`).

## What to send

1. Send the URL in **iMessage**.
2. Say: **“Open and Add to Home Screen”**.

On their iPhone it will open fullscreen, use your icon, and feel like a small native app.

## One-person link + password (secure, no spam)

The card is protected so **only one person** can use it, and only they can trigger a Discord message when they open the card. No one else can open the card or spam you.

- **Password:** Only people who know the password (default **elli**) can see the card. You can change it in **app.js** (search for `PASSWORD`).
- **Secret link:** Only the link that contains your secret token works. Without that token, visitors see “This link isn’t valid.” Send the full link (with `?t=...`) only to that one person.
- **Discord:** Your webhook URL stays on the server (Vercel), so no one can see it or spam your channel.

### 1. Deploy the API to Vercel (free)

1. Go to [vercel.com](https://vercel.com), sign in with GitHub, and **Import** the **valentines** repo.
2. Leave **Root Directory** as `.` and deploy.
3. After deploy, open your project → **Settings → Environment Variables**. Add:

   | Name | Value |
   |------|--------|
   | `VALENTINES_TOKEN` | A secret string (e.g. run: `node -e "console.log('val_'+require('crypto').randomBytes(12).toString('hex'))"` and use the output) |
   | `DISCORD_WEBHOOK_URL` | Your Discord webhook URL (Channel → Edit → Integrations → Webhooks → New Webhook → Copy URL) |

4. **Redeploy** the project (Deployments → … → Redeploy) so the new env vars are used.

### 2. Point the site at the API

In **index.html**, set your Vercel API URL (the same project is fine; it serves both the site and the API):

```html
window.VALENTINES_API_URL = 'https://your-project.vercel.app';
```

Use the URL Vercel gave you (e.g. `https://valentines-xxx.vercel.app`).

### 3. Create the one-person link

Your link for that one person is:

```
https://connilefleur.github.io/valentines/?t=YOUR_VALENTINES_TOKEN
```

Use the **same** value as `VALENTINES_TOKEN` in Vercel (e.g. `val_389c3deb1e7e3a8b496bf7a7`). Send this link only to them and tell them the password is **elli**.

### 4. Flow for them

1. They open the link (with `?t=...`).
2. They enter the password **elli**.
3. They tap the card to open it.
4. You get “Someone opened your Valentines card” in your Discord channel.

Anyone without the token sees “This link isn’t valid.” Anyone with the token but without the password can’t see the card. Your Discord webhook is never exposed, so no one can spam you.

## Run locally

```bash
cd Valentine
npx serve .
# or: python3 -m http.server 8080
```

Open the URL on your phone (same Wi‑Fi) to test Add to Home Screen.
