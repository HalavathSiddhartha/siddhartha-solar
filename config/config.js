/**
 * SITE CONFIG
 * ------------------------------------------------------------
 * Edit the values below to update branding across the ENTIRE
 * website. Every page reads from this file at load time.
 * Do not rename the "SITE_CONFIG" variable — script.js depends on it.
 * ------------------------------------------------------------
 */

const SITE_CONFIG = {
  brand: {
    name: "Suryaya",
    fullName: "Suryaya Solar Advisory",
    tagline: "Helping you make better energy decisions",
    shortTagline: "India's independent solar advisor",
    logoText: "Suryaya",
    logoIcon: "images/logo.svg", // replace with your own logo file
    favicon: "images/favicon.ico",
  },

  contact: {
    phone: "+91 96529 57295",
    phoneDisplay: "+91 96529 57295",
    email: "halavathsiddhartha@gmail.com",
    whatsapp: "919652957295", // digits only, country code, no + or spaces
    address: "Mahabubabad, Telangana, India",
    mapEmbedUrl: "https://www.google.com/maps?q=Mahabubabad,+Telangana&output=embed",
  },

  social: {
    instagram: "https://instagram.com/suryaya.solar",
    linkedin: "https://linkedin.com/company/suryaya-solar",
    youtube: "https://youtube.com/@suryaya-solar",
    twitter: "https://twitter.com/suryayasolar",
    facebook: "https://facebook.com/suryayasolar",
  },

  seo: {
    siteUrl: "https://www.suryaya.in",
    defaultTitle: "Suryaya — Independent Solar Advisory for India",
    defaultDescription:
      "Suryaya helps homeowners, farmers and businesses across India understand, compare and choose the right solar solution. Free savings calculator, unbiased guidance, no hard selling.",
    twitterHandle: "@suryayasolar",
    ogImage: "images/og-cover.jpg",
  },

  calculator: {
    // Approximate blended tariff by state (INR per unit) — used only as a
    // starting estimate; always show these as estimates, not guarantees.
    stateTariffs: {
      "Telangana": 6.5,
      "Andhra Pradesh": 6.8,
      "Maharashtra": 8.5,
      "Gujarat": 7.2,
      "Karnataka": 7.6,
      "Tamil Nadu": 6.9,
      "Rajasthan": 7.0,
      "Punjab": 6.2,
      "Delhi": 7.8,
      "Other": 7.0,
    },
    costPerKwInr: 55000, // approx installed cost per kW before subsidy
    unitsPerKwPerDay: 4, // avg generation units per kW per day (India blended)
    subsidyRules: {
      residentialFlatPerKw: 18000, // simplified PM Surya Ghar style estimate
      residentialCapKw: 3,
    },
    co2KgPerUnit: 0.82,
  },

  nav: [
    { label: "Home", href: "index.html", icon: "home" },
    { label: "Energy Calculator", href: "calculator.html", icon: "bolt" },
    { label: "ROI Calculator", href: "roi-calculator.html", icon: "chart" },
    { label: "Solar Savings Report", href: "solar-report.html", icon: "report" },
    { label: "Knowledge Center", href: "knowledge-center.html", icon: "book" },
    { label: "About", href: "about.html", icon: "user" },
    { label: "Contact", href: "contact.html", icon: "mail" },
  ],

  footerLinks: {
    company: [
      { label: "About us", href: "about.html" },
      { label: "Contact", href: "contact.html" },
      { label: "Knowledge Center", href: "knowledge-center.html" },
      { label: "Blog", href: "blog.html" },
    ],
    tools: [
      { label: "Energy Calculator", href: "calculator.html" },
      { label: "ROI Calculator", href: "roi-calculator.html" },
      { label: "Solar Savings Report", href: "solar-report.html" },
    ],
    legal: [
      { label: "Privacy Policy", href: "privacy.html" },
      { label: "Terms of Use", href: "terms.html" },
    ],
  },
};

// Freeze so pages can't accidentally mutate shared config at runtime.
Object.freeze(SITE_CONFIG);

// Top-level `const` does NOT attach to `window` the way `var` does, so we
// attach it explicitly here — script.js reads window.SITE_CONFIG.
window.SITE_CONFIG = SITE_CONFIG;
