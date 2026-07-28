/**
 * SURYAYA — SHARED SCRIPT
 * Loaded on every page. Reads window.SITE_CONFIG (config/config.js) and
 * renders nav/footer/contact details, then wires up shared UI behaviour.
 * Page-specific logic (calculator, roi-calculator, knowledge center search)
 * lives in its own guarded block at the bottom — safe to include everywhere.
 */

(function () {
  "use strict";

  const CFG = window.SITE_CONFIG;
  if (!CFG) {
    console.warn("SITE_CONFIG not found — did you include config/config.js before script.js?");
    return;
  }

  const ICONS = {
    home: '<path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9h12v-9"/>',
    bolt: '<path d="M13 3 5 14h6l-1 7 9-12h-6l1-6Z"/>',
    chart: '<path d="M4 20V10M12 20V4M20 20v-7"/>',
    report: '<path d="M6 3h9l3 3v15H6z"/><path d="M14 3v4h4"/>',
    book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5Z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4.5 5-6 8-6s6.5 1.5 8 6"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
  };

  /* ---------------- THEME ---------------- */
  function initTheme() {
    const saved = localStorage.getItem("suryaya-theme");
    const theme = saved || "light";
    document.documentElement.setAttribute("data-theme", theme);
    document.querySelectorAll(".theme-toggle").forEach((btn) => {
      btn.textContent = theme === "dark" ? "☀️" : "🌙";
      btn.setAttribute("aria-label", "Toggle dark mode");
      btn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("suryaya-theme", next);
        btn.textContent = next === "dark" ? "☀️" : "🌙";
      });
    });
  }

  /* ---------------- NAV RENDER ---------------- */
  function renderNav() {
    const mount = document.getElementById("site-nav");
    if (!mount) return;
    const current = document.body.getAttribute("data-page") || "";
    const links = CFG.nav
      .map((item) => {
        const isActive = item.href.replace(".html", "") === current ? " active" : "";
        return `<a href="${item.href}" class="${isActive}">${item.label}</a>`;
      })
      .join("");

    mount.innerHTML = `
      <div class="container">
        <a href="index.html" class="nav-logo"><span class="dot"></span>${CFG.brand.logoText}</a>
        <nav class="nav-links" id="nav-links" aria-label="Primary">${links}</nav>
        <div class="nav-actions">
          <button class="theme-toggle" type="button">🌙</button>
          <a href="contact.html" class="btn btn-primary btn-sm nav-cta-desktop">Book Consultation</a>
          <button class="nav-burger" id="nav-burger" aria-label="Open menu" aria-expanded="false">☰</button>
        </div>
      </div>`;

    const burger = document.getElementById("nav-burger");
    const navLinks = document.getElementById("nav-links");
    burger.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      burger.textContent = open ? "✕" : "☰";
      burger.setAttribute("aria-expanded", String(open));
    });
    navLinks.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        navLinks.classList.remove("open");
        burger.textContent = "☰";
      })
    );
  }

  /* ---------------- FOOTER RENDER ---------------- */
  function renderFooter() {
    const mount = document.getElementById("site-footer");
    if (!mount) return;
    const year = new Date().getFullYear();
    const col = (title, items) => `
      <div>
        <h5>${title}</h5>
        <ul>${items.map((i) => `<li><a href="${i.href}">${i.label}</a></li>`).join("")}</ul>
      </div>`;

    mount.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div>
            <a href="index.html" class="nav-logo"><span class="dot"></span>${CFG.brand.logoText}</a>
            <p style="margin-top:14px;max-width:32ch;">${CFG.brand.tagline}.</p>
            <div class="social-row">
              <a href="${CFG.social.instagram}" aria-label="Instagram" target="_blank" rel="noopener">IG</a>
              <a href="${CFG.social.linkedin}" aria-label="LinkedIn" target="_blank" rel="noopener">IN</a>
              <a href="${CFG.social.youtube}" aria-label="YouTube" target="_blank" rel="noopener">YT</a>
            </div>
          </div>
          ${col("Company", CFG.footerLinks.company)}
          ${col("Tools", CFG.footerLinks.tools)}
          ${col("Get in touch", [
            { label: CFG.contact.phoneDisplay, href: "tel:" + CFG.contact.phone.replace(/\s/g, "") },
            { label: CFG.contact.email, href: "mailto:" + CFG.contact.email },
            { label: CFG.contact.address, href: "contact.html" },
          ])}
        </div>
        <div class="footer-bottom">
          <span>© ${year} ${CFG.brand.fullName}. All rights reserved.</span>
          <span>${CFG.footerLinks.legal.map((l) => `<a href="${l.href}">${l.label}</a>`).join(" · ")}</span>
        </div>
      </div>`;
  }

  /* ---------------- FLOATING UI ---------------- */
  function renderFloatingUI() {
    const wa = document.createElement("a");
    wa.href = `https://wa.me/${CFG.contact.whatsapp}?text=${encodeURIComponent("Hi Suryaya, I'd like to know more about solar for my property.")}`;
    wa.className = "whatsapp-float";
    wa.target = "_blank";
    wa.rel = "noopener";
    wa.setAttribute("aria-label", "Chat on WhatsApp");
    wa.innerHTML = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M4 20l1.4-4.2A8 8 0 1 1 8 19L4 20Z"/></svg>`;
    document.body.appendChild(wa);

    const top = document.createElement("button");
    top.className = "back-to-top";
    top.setAttribute("aria-label", "Back to top");
    top.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>`;
    top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    document.body.appendChild(top);

    window.addEventListener("scroll", () => {
      top.classList.toggle("visible", window.scrollY > 500);
    });
  }

  /* ---------------- PAGE LOADER ---------------- */
  function initLoader() {
    const loader = document.querySelector(".page-loader");
    if (!loader) return;
    window.addEventListener("load", () => {
      setTimeout(() => loader.classList.add("hidden"), 250);
    });
  }

  /* ---------------- SCROLL REVEAL ---------------- */
  function initReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((el) => io.observe(el));
  }

  /* ---------------- FAQ ACCORDION ---------------- */
  function initFAQ() {
    document.querySelectorAll(".faq-item").forEach((item) => {
      const q = item.querySelector(".faq-q");
      const a = item.querySelector(".faq-a");
      if (!q || !a) return;
      q.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        item.parentElement.querySelectorAll(".faq-item.open").forEach((other) => {
          other.classList.remove("open");
          other.querySelector(".faq-a").style.maxHeight = null;
        });
        if (!isOpen) {
          item.classList.add("open");
          a.style.maxHeight = a.scrollHeight + "px";
        }
      });
    });
  }

  /* ---------------- CONTACT DETAILS AUTO-FILL ---------------- */
  function fillContactDetails() {
    document.querySelectorAll("[data-fill='phone']").forEach((el) => (el.textContent = CFG.contact.phoneDisplay));
    document.querySelectorAll("[data-fill='email']").forEach((el) => (el.textContent = CFG.contact.email));
    document.querySelectorAll("[data-fill='address']").forEach((el) => (el.textContent = CFG.contact.address));
    document.querySelectorAll("[data-href='tel']").forEach((el) => (el.href = "tel:" + CFG.contact.phone.replace(/\s/g, "")));
    document.querySelectorAll("[data-href='mailto']").forEach((el) => (el.href = "mailto:" + CFG.contact.email));
    document.querySelectorAll("[data-href='map']").forEach((el) => (el.src = CFG.contact.mapEmbedUrl));
  }

  /* ---------------- INIT ---------------- */
  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    renderNav();
    renderFooter();
    renderFloatingUI();
    initLoader();
    initReveal();
    initFAQ();
    fillContactDetails();
    initEnergyCalculator();
    initRoiCalculator();
    initKnowledgeCenter();
    initSolarReport();
  });

  /* ==========================================================================
     ENERGY CALCULATOR  (calculator.html)
     ========================================================================== */
  function initEnergyCalculator() {
    const form = document.getElementById("energy-calc-form");
    if (!form) return;

    const out = {
      capacity: document.getElementById("out-capacity"),
      annualSavings: document.getElementById("out-annual-savings"),
      monthlySavings: document.getElementById("out-monthly-savings"),
      installCost: document.getElementById("out-install-cost"),
      subsidy: document.getElementById("out-subsidy"),
      lifetimeSavings: document.getElementById("out-lifetime-savings"),
      co2: document.getElementById("out-co2"),
    };

    function inr(n) {
      return "₹" + Math.round(n).toLocaleString("en-IN");
    }

    function calculate() {
      const bill = parseFloat(form.bill.value) || 0;
      const state = form.state.value;
      const roofType = form.roofType.value;
      const custType = form.custType.value;

      const tariff = CFG.calculator.stateTariffs[state] || CFG.calculator.stateTariffs["Other"];
      const unitsPerMonth = bill / tariff;
      const unitsPerDay = unitsPerMonth / 30;
      let capacityKw = unitsPerDay / CFG.calculator.unitsPerKwPerDay;

      // ground-mounted farm setups tend to run larger, rooftop tin/shed slightly less efficient
      if (roofType === "ground") capacityKw *= 1.05;
      if (roofType === "tin") capacityKw *= 0.95;
      capacityKw = Math.max(1, Math.round(capacityKw * 10) / 10);

      const installCost = capacityKw * CFG.calculator.costPerKwInr;
      const subsidyCap = CFG.calculator.subsidyRules.residentialCapKw;
      const subsidy =
        custType === "residential"
          ? Math.min(capacityKw, subsidyCap) * CFG.calculator.subsidyRules.residentialFlatPerKw
          : 0;

      const annualUnits = capacityKw * CFG.calculator.unitsPerKwPerDay * 365;
      const annualSavings = annualUnits * tariff;
      const monthlySavings = annualSavings / 12;
      const lifetimeSavings = annualSavings * 25 * 0.9; // 0.9 accounts for gradual panel degradation
      const co2Tonnes = (annualUnits * CFG.calculator.co2KgPerUnit * 25) / 1000;

      out.capacity.textContent = capacityKw.toFixed(1) + " kW";
      out.annualSavings.textContent = inr(annualSavings);
      out.monthlySavings.textContent = inr(monthlySavings);
      out.installCost.textContent = inr(installCost);
      out.subsidy.textContent = subsidy > 0 ? inr(subsidy) : "Not applicable";
      out.lifetimeSavings.textContent = inr(lifetimeSavings);
      out.co2.textContent = co2Tonnes.toFixed(1) + " tonnes";
    }

    form.addEventListener("input", calculate);
    calculate();

    const reportBtn = document.getElementById("send-to-report");
    if (reportBtn) {
      reportBtn.addEventListener("click", () => {
        const payload = {
          bill: form.bill.value,
          state: form.state.value,
          custType: form.custType.value,
          roofType: form.roofType.value,
          capacity: out.capacity.textContent,
          annualSavings: out.annualSavings.textContent,
          installCost: out.installCost.textContent,
          subsidy: out.subsidy.textContent,
          lifetimeSavings: out.lifetimeSavings.textContent,
          co2: out.co2.textContent,
        };
        sessionStorage.setItem("suryaya-calc-result", JSON.stringify(payload));
        window.location.href = "solar-report.html";
      });
    }
  }

  /* ==========================================================================
     ROI CALCULATOR  (roi-calculator.html)
     ========================================================================== */
  function initRoiCalculator() {
    const form = document.getElementById("roi-calc-form");
    if (!form) return;

    const out = {
      payback: document.getElementById("roi-payback"),
      lifetime: document.getElementById("roi-lifetime"),
      annualRoi: document.getElementById("roi-annual"),
    };

    function inr(n) {
      return "₹" + Math.round(n).toLocaleString("en-IN");
    }

    function calc() {
      const bill = parseFloat(form.bill.value) || 0;
      const size = parseFloat(form.size.value) || 0;
      const cost = parseFloat(form.cost.value) || 0;
      const subsidy = parseFloat(form.subsidy.value) || 0;
      const genPerKwYear = parseFloat(form.generation.value) || CFG.calculator.unitsPerKwPerDay * 365;
      const tariff = bill > 0 && size > 0 ? bill / (size * CFG.calculator.unitsPerKwPerDay * 30) : 7;

      const netCost = Math.max(cost - subsidy, 0);
      const annualGeneration = size * genPerKwYear;
      const annualSavings = annualGeneration * tariff;
      const paybackYears = annualSavings > 0 ? netCost / annualSavings : 0;
      const lifetimeSavings = annualSavings * 25 * 0.9 - netCost;
      const annualRoiPct = netCost > 0 ? (annualSavings / netCost) * 100 : 0;

      out.payback.textContent = paybackYears > 0 ? paybackYears.toFixed(1) + " years" : "—";
      out.lifetime.textContent = inr(Math.max(lifetimeSavings, 0));
      out.annualRoi.textContent = annualRoiPct.toFixed(1) + "%";
    }

    form.addEventListener("input", calc);
    calc();
  }

  /* ==========================================================================
     KNOWLEDGE CENTER  (knowledge-center.html)
     ========================================================================== */
  function initKnowledgeCenter() {
    const grid = document.getElementById("kc-grid");
    if (!grid) return;
    const search = document.getElementById("kc-search");
    const pills = document.querySelectorAll(".category-pill");
    const cards = Array.from(grid.querySelectorAll(".article-card"));

    function filter() {
      const term = (search.value || "").toLowerCase();
      const active = document.querySelector(".category-pill.active");
      const cat = active ? active.dataset.category : "all";
      cards.forEach((card) => {
        const matchesCat = cat === "all" || card.dataset.category === cat;
        const matchesTerm = card.textContent.toLowerCase().includes(term);
        card.style.display = matchesCat && matchesTerm ? "" : "none";
      });
    }

    if (search) search.addEventListener("input", filter);
    pills.forEach((pill) =>
      pill.addEventListener("click", () => {
        pills.forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        filter();
      })
    );
  }

  /* ==========================================================================
     SOLAR SAVINGS REPORT  (solar-report.html)
     ========================================================================== */
  function initSolarReport() {
    const mount = document.getElementById("report-results");
    if (!mount) return;
    const raw = sessionStorage.getItem("suryaya-calc-result");
    if (!raw) return;
    try {
      const d = JSON.parse(raw);
      mount.innerHTML = `
        <div class="result-grid">
          <div class="result-card highlight"><div class="label">Recommended capacity</div><div class="value">${d.capacity}</div></div>
          <div class="result-card highlight"><div class="label">Annual savings</div><div class="value">${d.annualSavings}</div></div>
          <div class="result-card"><div class="label">Monthly savings</div><div class="value">${d.monthlySavings}</div></div>
          <div class="result-card"><div class="label">Installation cost</div><div class="value">${d.installCost}</div></div>
          <div class="result-card"><div class="label">Govt. subsidy</div><div class="value">${d.subsidy}</div></div>
          <div class="result-card"><div class="label">25-year savings</div><div class="value">${d.lifetimeSavings}</div></div>
          <div class="result-card"><div class="label">CO₂ avoided (25 yrs)</div><div class="value">${d.co2}</div></div>
          <div class="result-card"><div class="label">Customer type</div><div class="value" style="font-size:1.1rem;">${d.custType} · ${d.state}</div></div>
        </div>`;
      const empty = document.getElementById("report-empty");
      if (empty) empty.style.display = "none";
    } catch (e) {
      console.warn("Could not parse stored calculator result", e);
    }
  }
})();
