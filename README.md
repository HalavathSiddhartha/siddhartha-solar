# Suryaya — Solar Advisory Website

A static, framework-free (HTML5 + CSS3 + vanilla JS) website for an independent
solar advisory business. No build step — open `index.html` in a browser and
it works.

## Project structure

```
/
├── index.html              Homepage
├── about.html
├── calculator.html          Energy Calculator (bill → savings)
├── roi-calculator.html       Payback / ROI calculator
├── solar-report.html         Printable savings report
├── knowledge-center.html      Searchable article hub
│   └── knowledge-center/      Individual article pages
├── blog.html
├── contact.html               Booking form + contact details
├── privacy.html
├── terms.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── css/style.css              All styling (design tokens + components)
├── js/script.js               Shared behaviour + calculators
├── config/config.js           ALL editable branding & business data
└── images/, assets/           Your logo, photos, icons
```

## 1. Edit text on a page

Open the relevant `.html` file in any text editor and change the words
between tags directly, e.g.:

```html
<h1>Helping you make better energy decisions.</h1>
```

Most page copy lives directly in the HTML, section by section, so you can
find and edit it without touching CSS or JS.

## 2. Change branding (name, tagline, phone, email, WhatsApp, socials)

Open **`config/config.js`**. Every page reads from this one file, so a
change here updates the whole site automatically — no need to edit each
page.

```js
brand: {
  name: "Suryaya",
  tagline: "Helping you make better energy decisions",
  ...
},
contact: {
  phone: "+91 90000 12345",
  whatsapp: "919000012345",
  ...
}
```

## 3. Replace the logo

1. Add your logo file to `/images` (SVG or PNG recommended).
2. Update `brand.logoIcon` in `config/config.js` to point to it.
3. If you want an image logo instead of text, replace the `.nav-logo`
   markup generated in `js/script.js` (`renderNav()` function) with an
   `<img>` tag.

## 4. Change colours

All colours are CSS variables at the top of `css/style.css` under `:root`
(light mode) and `[data-theme="dark"]` (dark mode):

```css
--sun: #F5A623;      /* primary accent */
--growth: #2E8B57;   /* savings/eco accent */
--ink: #10202E;      /* main text colour */
--paper: #F4F7F6;    /* background colour */
```

Change these hex values and every button, badge and highlight updates
across the whole site.

## 5. Add a new Knowledge Center article

1. Duplicate `knowledge-center/how-many-panels-do-you-need.html`.
2. Rename it, e.g. `knowledge-center/net-metering-basics.html`.
3. Edit the title, meta description, JSON-LD `Article` schema and body copy.
4. Add a matching card to `knowledge-center.html`'s `#kc-grid`, with a
   `data-category` attribute matching one of the existing category pills
   (or add a new pill).
5. Add the new URL to `sitemap.xml`.

## 6. Add a new page

1. Copy an existing page closest in structure to what you need (e.g.
   `about.html` for a simple content page).
2. Update the `<title>`, meta description and canonical URL in the `<head>`.
3. Add the page to `SITE_CONFIG.nav` or `SITE_CONFIG.footerLinks` in
   `config/config.js` so it appears in navigation/footer automatically.
4. Add its URL to `sitemap.xml`.

## 7. Deploy to GitHub Pages

1. Create a new GitHub repository and push this project to it:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo>.git
   git push -u origin main
   ```
2. In the repo, go to **Settings → Pages**.
3. Under **Source**, choose the `main` branch and `/ (root)` folder.
4. Save — your site will be live at `https://<your-username>.github.io/<repo>/`.

## 8. Deploy to Cloudflare Pages

1. Push the project to a GitHub (or GitLab) repository as above.
2. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages →
   Connect to Git**.
3. Select your repository.
4. Build settings: leave **Build command** empty and set **Build output
   directory** to `/` (this is a static site, no build step needed).
5. Click **Save and Deploy**.

## 9. Connect a custom domain

- **GitHub Pages:** Settings → Pages → Custom domain → enter your domain,
  then add the DNS records GitHub shows you (usually a `CNAME` record
  pointing to `<your-username>.github.io`).
- **Cloudflare Pages:** Your Pages project → Custom domains → Add a domain.
  If your domain's DNS is already on Cloudflare, this is a one-click setup.

After connecting a domain, update `seo.siteUrl` in `config/config.js` and
the `<link rel="canonical">` / `sitemap.xml` URLs to match your real domain.

## 10. Notes on the calculators

- All calculator logic lives in `js/script.js` inside
  `initEnergyCalculator()` and `initRoiCalculator()`.
- Assumptions (cost per kW, tariff by state, subsidy rules, generation per
  kW/day) are all configurable in `config/config.js` under `calculator`.
- These are **estimates**, not quotes — see `terms.html`.

## Bonus / future placeholders

The following are intentionally **not built** (frontend-only placeholders
exist where relevant, e.g. the "AI-generated recommendation" box on
`solar-report.html`):

- AI Chatbot
- Customer / Admin / Vendor dashboards
- Referral system, CRM, appointment system, lead management
- Online payments, project tracking

Building these will require a backend and is out of scope for this static
front end.
