/**
 * ============================================================================
 *  Micro Cleaning & Sanitising Solutions — Super SEO Script
 * ============================================================================
 *
 *  Drop this file onto every page with:
 *    <script src="seo.js" defer></script>
 *
 *  It will dynamically inject:
 *    ✅ Rich structured data (JSON-LD) — LocalBusiness, Service, FAQ, Breadcrumbs, WebSite
 *    ✅ Enhanced Open Graph & Twitter Card meta tags
 *    ✅ Geo / location meta tags for local SEO
 *    ✅ Resource hints (dns-prefetch, preconnect) for performance
 *    ✅ Lazy-load attributes on below-the-fold images
 *    ✅ Canonical URL & hreflang self-referencing
 *    ✅ Accessibility heading audit (console warnings in dev)
 *    ✅ Visible breadcrumb navigation (sticky, top-of-page)
 *
 *  ── Configuration ──────────────────────────────────────────────────────────
 *  Edit the `CONFIG` object below to update business details, services,
 *  FAQ entries, or social profiles. Everything else is automatic.
 * ============================================================================
 */

(function MicroCleanSEO() {
  "use strict";

  /* ─── CONFIG ─────────────────────────────────────────────────────────────── */

  const CONFIG = {
    businessName: "Micro Cleaning & Sanitising Solutions",
    legalName: "Micro Cleaning & Sanitising Solutions",
    url: "https://microcleaningsanitising.com",
    phone: "+91 9022582767",
    email: "microcleaningsanitising@gmail.com",
    logo: "https://raw.githubusercontent.com/siddharthy3/microcleaning/refs/heads/main/Logo.svg",
    image: "https://framerusercontent.com/images/ldeRpAj8NFWMV7tBYLb043OF4.png",
    description:
      "Professional home cleaning services in Ulhasnagar, Kalyan, Dombivli, Ambernath & Badlapur. Expert sofa cleaning, mattress cleaning, deep cleaning & sanitising solutions.",
    foundingYear: 2020,
    priceRange: "₹₹",

    address: {
      street: "Ulhasnagar",
      city: "Ulhasnagar",
      state: "Maharashtra",
      postalCode: "421003",
      country: "IN",
    },

    geo: {
      latitude: 19.2183,
      longitude: 73.1631,
    },

    areasServed: [
      "Ulhasnagar",
      "Kalyan",
      "Dombivli",
      "Ambernath",
      "Badlapur",
      "Titwala",
      "Shahad",
    ],

    socialProfiles: [
      "https://www.instagram.com/micro_cleaning_sanitising/",
      "https://www.facebook.com/microcleaningsanitising",
    ],

    openingHours: ["Mo-Su 08:00-20:00"],

    services: [
      {
        name: "Sofa Cleaning",
        description: "Deep extraction cleaning for fabric & leather sofas, removing stains, allergens and odours.",
        price: "400",
        url: "https://microcleaningsanitising.com/#sofa-cleaning",
      },
      {
        name: "Mattress Deep Clean",
        description: "UV sanitisation & hot-water extraction for mattresses — kills 99.9% dust mites & bacteria.",
        price: "1200",
        url: "https://microcleaningsanitising.com/#mattress-cleaning",
      },
      {
        name: "Full Home Deep Cleaning",
        description: "Complete BHK deep cleaning including kitchen, bathrooms, balconies & all rooms.",
        price: "4800",
        url: "https://microcleaningsanitising.com/#deep-cleaning",
      },
      {
        name: "Kitchen Deep Clean",
        description: "Heavy-duty degreasing, chimney cleaning, platform scrubbing & sanitisation.",
        price: "2500",
        url: "https://microcleaningsanitising.com/#kitchen-cleaning",
      },
      {
        name: "Carpet Cleaning",
        description: "Professional carpet shampooing and stain removal for homes and offices.",
        price: "1200",
        url: "https://microcleaningsanitising.com/#carpet-cleaning",
      },
      {
        name: "Car Interior Cleaning",
        description: "Full interior detailing: seats, dashboard, roof, mats, and sanitisation.",
        price: "2500",
        url: "https://microcleaningsanitising.com/#car-cleaning",
      },
      {
        name: "Dining Chair Cleaning",
        description: "Deep fabric and cushion cleaning for dining chairs, removing food stains and odours.",
        price: "350",
        url: "https://microcleaningsanitising.com/#dining-chair-cleaning",
      },
      {
        name: "Recliner Cleaning",
        description: "Specialised deep cleaning for recliner chairs including mechanism-safe sanitisation.",
        price: "700",
        url: "https://microcleaningsanitising.com/#recliner-cleaning",
      },
    ],

    faq: [
      {
        q: "What areas do you serve?",
        a: "We serve Ulhasnagar, Kalyan, Dombivli, Ambernath, Badlapur, Titwala, and Shahad in the Thane district of Maharashtra.",
      },
      {
        q: "How long does a full home deep cleaning take?",
        a: "A standard 2 BHK deep cleaning takes approximately 4–6 hours depending on the condition. Larger homes may take longer.",
      },
      {
        q: "Do you use safe and eco-friendly cleaning products?",
        a: "Yes — all our cleaning agents are non-toxic, child-safe, and pet-friendly while still being highly effective against germs and allergens.",
      },
      {
        q: "How do I book a cleaning service?",
        a: "You can book directly through our website, call us at +91 9022582767, or message us on WhatsApp for an instant quote.",
      },
      {
        q: "What is the cost of sofa cleaning?",
        a: "Sofa cleaning starts at ₹400 per seat. The final price depends on the number of seats and fabric type.",
      },
      {
        q: "Do you offer same-day cleaning services?",
        a: "Yes, we offer same-day service based on availability. Contact us early in the day for the best chance of same-day booking.",
      },
      {
        q: "Is there a warranty or guarantee on your services?",
        a: "We offer a 100% satisfaction guarantee. If you're not happy with the results, we'll re-clean the area at no extra cost.",
      },
    ],
  };

  /* ─── HELPERS ────────────────────────────────────────────────────────────── */

  /** Append a <meta> tag to <head> (skip if one with the same name/property exists) */
  function setMeta(attr, value, content) {
    if (document.querySelector(`meta[${attr}="${value}"]`)) return;
    const m = document.createElement("meta");
    m.setAttribute(attr, value);
    m.content = content;
    document.head.appendChild(m);
  }

  /** Append a <link> tag to <head> */
  function addLink(rel, href, extra) {
    const l = document.createElement("link");
    l.rel = rel;
    l.href = href;
    if (extra) Object.entries(extra).forEach(([k, v]) => l.setAttribute(k, v));
    document.head.appendChild(l);
  }

  /** Inject a JSON-LD block into the page */
  function injectJsonLd(obj) {
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(obj, null, 0);
    document.head.appendChild(s);
  }

  /** Get the current page's canonical URL (or fall back to location) */
  function pageURL() {
    const canon = document.querySelector('link[rel="canonical"]');
    return canon ? canon.href : window.location.href.split("?")[0].split("#")[0];
  }

  /* ─── 1. ENHANCED META TAGS ──────────────────────────────────────────────── */

  // Geo tags for Google local pack
  setMeta("name", "geo.region", `${CONFIG.address.country}-${CONFIG.address.state}`);
  setMeta("name", "geo.placename", CONFIG.address.city);
  setMeta("name", "geo.position", `${CONFIG.geo.latitude};${CONFIG.geo.longitude}`);
  setMeta("name", "ICBM", `${CONFIG.geo.latitude}, ${CONFIG.geo.longitude}`);

  // Reinforce existing OG / Twitter if missing
  setMeta("property", "og:url", pageURL());
  setMeta("property", "og:site_name", CONFIG.businessName);
  setMeta("property", "og:locale", "en_IN");
  setMeta("property", "og:type", "website");
  setMeta("property", "og:title", document.title);
  setMeta("property", "og:description", CONFIG.description);
  setMeta("property", "og:image", CONFIG.image);
  setMeta("property", "og:image:width", "1200");
  setMeta("property", "og:image:height", "630");

  setMeta("name", "twitter:card", "summary_large_image");
  setMeta("name", "twitter:title", document.title);
  setMeta("name", "twitter:description", CONFIG.description);
  setMeta("name", "twitter:image", CONFIG.image);

  // Mobile & theme
  setMeta("name", "theme-color", "#00B172");
  setMeta("name", "mobile-web-app-capable", "yes");
  setMeta("name", "apple-mobile-web-app-capable", "yes");
  setMeta("name", "apple-mobile-web-app-status-bar-style", "black-translucent");
  setMeta("name", "format-detection", "telephone=yes");

  // hreflang self-reference (single-language site)
  addLink("alternate", pageURL(), { hreflang: "en-in" });
  addLink("alternate", pageURL(), { hreflang: "x-default" });

  /* ─── 2. STRUCTURED DATA — LocalBusiness ─────────────────────────────────── */

  injectJsonLd({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": CONFIG.url + "/#business",
    name: CONFIG.businessName,
    legalName: CONFIG.legalName,
    url: CONFIG.url,
    telephone: CONFIG.phone,
    email: CONFIG.email,
    logo: CONFIG.logo,
    image: CONFIG.image,
    description: CONFIG.description,
    foundingDate: String(CONFIG.foundingYear),
    priceRange: CONFIG.priceRange,
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI, Bank Transfer",
    address: {
      "@type": "PostalAddress",
      streetAddress: CONFIG.address.street,
      addressLocality: CONFIG.address.city,
      addressRegion: CONFIG.address.state,
      postalCode: CONFIG.address.postalCode,
      addressCountry: CONFIG.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: CONFIG.geo.latitude,
      longitude: CONFIG.geo.longitude,
    },
    openingHoursSpecification: CONFIG.openingHours.map((h) => {
      const [days, times] = h.split(" ");
      const [opens, closes] = times.split("-");
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: days.split(",").map((d) => {
          const map = { Mo: "Monday", Tu: "Tuesday", We: "Wednesday", Th: "Thursday", Fr: "Friday", Sa: "Saturday", Su: "Sunday" };
          if (d.includes("-")) {
            const [start, end] = d.split("-");
            const keys = Object.keys(map);
            const si = keys.indexOf(start), ei = keys.indexOf(end);
            return keys.slice(si, ei + 1).map(k => map[k]);
          }
          return map[d];
        }).flat(),
        opens,
        closes,
      };
    }),
    areaServed: CONFIG.areasServed.map((name) => ({
      "@type": "City",
      name,
    })),
    sameAs: CONFIG.socialProfiles,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "200",
      bestRating: "5",
      worstRating: "1",
    },
  });

  /* ─── 3. STRUCTURED DATA — Service (one per offering) ────────────────────── */

  CONFIG.services.forEach((svc) => {
    injectJsonLd({
      "@context": "https://schema.org",
      "@type": "Service",
      name: svc.name,
      description: svc.description,
      url: svc.url,
      provider: {
        "@type": "LocalBusiness",
        name: CONFIG.businessName,
        url: CONFIG.url,
      },
      areaServed: CONFIG.areasServed.map((name) => ({
        "@type": "City",
        name,
      })),
      offers: {
        "@type": "Offer",
        price: svc.price,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url: svc.url,
      },
    });
  });

  /* ─── 4. STRUCTURED DATA — FAQPage ───────────────────────────────────────── */

  if (CONFIG.faq.length) {
    injectJsonLd({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: CONFIG.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    });
  }

  /* ─── 5. STRUCTURED DATA — BreadcrumbList ────────────────────────────────── */

  const crumbs = [{ name: "Home", url: CONFIG.url + "/" }];
  const path = window.location.pathname.replace(/\/$/, "").split("/").filter(Boolean);
  path.forEach((segment, i) => {
    crumbs.push({
      name: decodeURIComponent(segment).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      url: CONFIG.url + "/" + path.slice(0, i + 1).join("/") + "/",
    });
  });

  injectJsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  });

  /* ─── 6. STRUCTURED DATA — WebSite (enables Sitelinks Searchbox) ─────────── */

  injectJsonLd({
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: CONFIG.url,
    name: CONFIG.businessName,
    potentialAction: {
      "@type": "SearchAction",
      target: CONFIG.url + "/?s={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  });

  /* ─── 7. STRUCTURED DATA — Organization ──────────────────────────────────── */

  injectJsonLd({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": CONFIG.url + "/#organization",
    name: CONFIG.businessName,
    url: CONFIG.url,
    logo: CONFIG.logo,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONFIG.phone,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Marathi"],
    },
    sameAs: CONFIG.socialProfiles,
  });

  /* ─── 8. PERFORMANCE — Resource Hints ────────────────────────────────────── */

  const hintDomains = [
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://framerusercontent.com",
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com",
  ];

  hintDomains.forEach((domain) => {
    addLink("dns-prefetch", domain);
    addLink("preconnect", domain, { crossorigin: "" });
  });

  /* ─── 9. PERFORMANCE — Lazy-load off-screen images ───────────────────────── */

  document.addEventListener("DOMContentLoaded", () => {
    const viewportH = window.innerHeight;
    document.querySelectorAll("img:not([loading])").forEach((img) => {
      const rect = img.getBoundingClientRect();
      if (rect.top > viewportH * 1.25) {
        img.setAttribute("loading", "lazy");
        img.setAttribute("decoding", "async");
      }
    });

    /* ─── 10. ACCESSIBILITY — Add missing alt text warnings (dev only) ──────── */
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      document.querySelectorAll("img:not([alt])").forEach((img, i) => {
        console.warn(`[SEO] Image #${i + 1} is missing alt text:`, img.src?.slice(0, 80));
      });

      // Check for multiple <h1> tags
      const h1s = document.querySelectorAll("h1");
      if (h1s.length > 1) {
        console.warn(`[SEO] Found ${h1s.length} <h1> tags — best practice is exactly 1 per page.`);
      }
      if (h1s.length === 0) {
        console.warn("[SEO] No <h1> tag found — every page should have one.");
      }
    }

    /* ─── 11. AUTO EXTERNAL LINKS — noopener + noreferrer ──────────────────── */
    document.querySelectorAll('a[target="_blank"]').forEach((a) => {
      const rel = (a.getAttribute("rel") || "").split(" ").filter(Boolean);
      if (!rel.includes("noopener")) rel.push("noopener");
      if (!rel.includes("noreferrer")) rel.push("noreferrer");
      a.setAttribute("rel", rel.join(" "));
    });

    /* ─── 12. SMOOTH SCROLL for internal anchors ───────────────────────────── */
    if (!CSS.supports("scroll-behavior", "smooth")) {
      document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener("click", (e) => {
          const target = document.querySelector(a.getAttribute("href"));
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        });
      });
    }
  });

  /* ─── 13. CANONICAL URL — ensure one exists ──────────────────────────────── */

  if (!document.querySelector('link[rel="canonical"]')) {
    addLink("canonical", pageURL());
  }

  /* ─── 14. PRINT BREADCRUMB (optional visible breadcrumbs) ────────────────── */

  if (crumbs.length > 1) {
    document.addEventListener("DOMContentLoaded", () => {
      const nav = document.createElement("nav");
      nav.setAttribute("aria-label", "Breadcrumb");
      nav.style.cssText =
        "font-size:13px;padding:8px 20px;background:#f4f3ee;color:#4d6974;font-family:Inter,system-ui,sans-serif;";
      const ol = document.createElement("ol");
      ol.style.cssText = "list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:4px;";

      crumbs.forEach((c, i) => {
        const li = document.createElement("li");
        li.style.display = "inline";
        if (i < crumbs.length - 1) {
          const a = document.createElement("a");
          a.href = c.url;
          a.textContent = c.name;
          a.style.cssText = "color:#00B172;text-decoration:none;";
          li.appendChild(a);
          const sep = document.createTextNode(" › ");
          li.appendChild(sep);
        } else {
          const span = document.createElement("span");
          span.textContent = c.name;
          span.setAttribute("aria-current", "page");
          li.appendChild(span);
        }
        ol.appendChild(li);
      });

      nav.appendChild(ol);
      const main = document.getElementById("main");
      if (main) main.parentNode.insertBefore(nav, main);
    });
  }

  /* ─── Done! ──────────────────────────────────────────────────────────────── */
  console.log(
    "%c✅ Micro Clean SEO loaded",
    "color:#00B172;font-weight:bold;font-size:12px;"
  );
})();
