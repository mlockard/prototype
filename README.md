
# Higher Ed Registration & Subscription — Prototype

An accessible, mobile-friendly prototype of a registration form with tiered plans (Basic, Standard, Premium). Built with **plain HTML, CSS, and JavaScript** — no frameworks or build tools. Ready to deploy as a GitHub Pages microsite.

## ▶️ Quick Start

- Open `index.html` in any modern browser.
- Or host via a simple static server (optional): `python3 -m http.server` from this folder and visit `http://localhost:8000`.

## 🌐 Deploy to GitHub Pages

1. Create a new GitHub repo and add these files to the root.
2. Commit & push.
3. In **Settings → Pages**, set **Source** to **Deploy from a branch**, select `main` and `/root`.
4. Your microsite will be live at `https://<your-username>.github.io/<repo-name>/`.

## 🎨 Design Tokens & Figma

- Design tokens are provided in `tokens.json` and mirrored in `styles.css` as CSS custom properties (`:root {{ --brand-500: ... }}`).
- In Figma, you can use any of these routes:
  - **Tokens Studio for Figma**: import `tokens.json` to create color, radius, and typography tokens.
  - **HTML.to.Figma** or **Convertify** plugins: import `index.html` to bootstrap a layout frame for refinement.
  - **Copy-Paste**: Take components (e.g., button, radio cards) as references and rebuild using tokens.

**Note:** Exact 1:1 fidelity from HTML → Figma is not guaranteed by any plugin. This prototype is structured (semantic markup, clear layers, comments) to accelerate re-creation in Figma using tokens.

## ♿ Accessibility

- Semantic inputs with `<label for>` for all fields.
- Keyboard-friendly: radio cards are native radios inside labels; focus outlines are visible.
- `aria-describedby` for hints and errors; `role="alert"` on error nodes; `aria-live="polite"` on confirmation status.
- Color contrast meets WCAG AA using the chosen palette.
- Respects `prefers-reduced-motion`.

## 🌗 Light/Dark Mode

- Uses `prefers-color-scheme` and a user toggle (persisted in `localStorage`).
- Theme state is applied pre-paint to avoid FOUC.

## 🔒 Validation (Client-side only)

- HTML5 + custom checks for: required fields, email format, password length, and matching passwords.
- On success, form swaps to a confirmation screen showing the name, email, and selected plan.
- No network calls or storage — prototype only.

## 🗂 Project Structure

```
subscription-prototype/
├─ index.html
├─ styles.css
├─ script.js
├─ tokens.json
├─ assets/
│  └─ icons/
│     └─ favicon.svg
└─ LICENSE
```

## 📄 License

MIT — see `LICENSE`.
