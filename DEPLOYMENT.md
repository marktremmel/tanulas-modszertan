# Telepítési Útmutató (Deployment Guide)

Ez az útmutató segít abban, hogyan tegye elérhetővé az alkalmazást az interneten. A legegyszerűbb és ingyenes megoldás a **GitHub Pages** használata.

## 1. GitHub Pages Telepítés (Ajánlott)

### Előkészületek
1.  Győződjön meg róla, hogy a projekt fel van töltve a GitHub-ra.
2.  Nyissa meg a `vite.config.js` fájlt a projekt gyökérmappájában.

### Konfiguráció
Adja hozzá a `base` paramétert a konfigurációhoz. A `REPO_NEVE` helyére írja be a GitHub repository nevét (pl. ha a repo neve `learning-app`, akkor `/learning-app/`).

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/REPO_NEVE/', // <--- Ezt a sort adja hozzá!
})
```

### Telepítés (Deploy)

A legegyszerűbb módszer a `gh-pages` csomag használata.

1.  **Telepítse a csomagot:**
    ```bash
    npm install gh-pages --save-dev
    ```

2.  **Adja hozzá a deploy scriptet a `package.json` fájlhoz:**
    Nyissa meg a `package.json`-t, és a `"scripts"` részhez adja hozzá a következő két sort:

    ```json
    "scripts": {
      // ... egyéb scriptek ...
      "predeploy": "npm run build",
      "deploy": "gh-pages -d dist"
    }
    ```

3.  **Futtassa a deploy parancsot:**
    ```bash
    npm run deploy
    ```

Ez a parancs automatikusan elkészíti a build-et és feltölti a GitHub `gh-pages` ágára. Néhány perc múlva az alkalmazás elérhető lesz a `https://FELHASZNALONEV.github.io/REPO_NEVE/` címen.

---

## 2. Alternatívák (Vercel, Netlify)

Ha nem GitHub Pages-t szeretne használni, a Vercel vagy Netlify is kiváló opciók.

### Vercel
1.  Regisztráljon a [Vercel.com](https://vercel.com) oldalon.
2.  Kösse össze a GitHub fiókjával.
3.  Válassza ki a repository-t ("Import Project").
4.  A Vercel automatikusan felismeri, hogy ez egy Vite projekt, és beállítja a build parancsokat.
5.  Kattintson a "Deploy" gombra.

Ebben az esetben **NEM** kell módosítani a `vite.config.js` fájlt (a `base` paramétert törölje vagy hagyja üresen).
