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

## Run locally

```bash
cd Valentine
npx serve .
# or: python3 -m http.server 8080
```

Open the URL on your phone (same Wi‑Fi) to test Add to Home Screen.
