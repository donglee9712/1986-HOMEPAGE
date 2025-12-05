(function () {
  const BUSINESS_INQUIRY_URL =
    "https://1986.imweb.me/?preview_mode=1&modal_menu=m202312121200775a0ce8d";
  const WORK_URL = "https://1986.imweb.me/WORK?preview_mode=1";

  const ensureNavFonts = () => {
    const kitId = "yqm6tla";
    if (document.querySelector(`link[data-coco-nav-kit="${kitId}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://use.typekit.net/${kitId}.css`;
    link.setAttribute("data-coco-nav-kit", kitId);
    document.head.appendChild(link);
  };

  const normalizePath = (path) => {
    if (!path) return "/";
    const cleaned = path.toLowerCase();
    return cleaned.endsWith("/") ? cleaned.replace(/\/+$/, "/") : cleaned;
  };

  const resolveKey = (href) => {
    try {
      const url = new URL(href, window.location.href);
      const path = normalizePath(url.pathname);
      if (!path || path === "") return "/";
      return path;
    } catch (_) {
      return href.toLowerCase();
    }
  };

  const ensureBusinessInquiryLinks = () => {
    const normalize = (text) => (text || "").replace(/\s+/g, "");
    document.querySelectorAll("a").forEach((link) => {
      if (normalize(link.textContent) !== "비즈니스문의") return;
      link.href = BUSINESS_INQUIRY_URL;
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    });
  };

  const ensureWorkLinks = () => {
    const normalize = (text) => (text || "").replace(/\s+/g, "").toLowerCase();
    document.querySelectorAll("a").forEach((link) => {
      const label = normalize(link.textContent);
      if (label !== "work" && label !== "워크") return;
      link.href = WORK_URL;
      link.removeAttribute("target");
      link.removeAttribute("rel");
    });
  };

  const initNav = (container) => {
    const navPill = container.querySelector(".nav-pill");
    const navLinks = container.querySelectorAll(".nav-pill__link");
    const indicator = container.querySelector(".nav-pill__indicator");
    const navToggle = container.querySelector(".nav-toggle");
    const backdrop = container.querySelector(".mobile-nav-backdrop");
    const navClose = container.querySelector(".nav-close");

    if (!navPill || !navLinks.length || !indicator) return;

    const rootAttr = container.getAttribute("data-nav-root") || "./";
    const normalizedRoot = rootAttr.endsWith("/") ? rootAttr : `${rootAttr}/`;

    container.querySelectorAll("[data-page]").forEach((node) => {
      const page = node.getAttribute("data-page");
      if (!page || node.hasAttribute("data-external")) return;
      const trimmed = page.replace(/^\/+/, "");
      node.setAttribute("href", `${normalizedRoot}${trimmed}`);
    });

    const moveIndicator = (target) => {
      const targetRect = target.getBoundingClientRect();
      const parentRect = navPill.getBoundingClientRect();
      const offsetX = targetRect.left - parentRect.left;
      indicator.style.setProperty("--indicator-width", `${targetRect.width}px`);
      indicator.style.setProperty("--indicator-x", `${offsetX}px`);
      indicator.style.setProperty("--indicator-opacity", "1");
    };

    const clearActiveLinks = () => {
      navLinks.forEach((node) => node.classList.remove("is-active"));
      indicator.style.setProperty("--indicator-opacity", "0");
    };

    const setActiveLink = (link) => {
      clearActiveLinks();
      if (!link) return;
      link.classList.add("is-active");
      moveIndicator(link);
    };

    const syncActiveToLocation = () => {
      const currentKey = resolveKey(window.location.href);
      const active = Array.from(navLinks).find(
        (link) =>
          !link.hasAttribute("data-external") &&
          resolveKey(link.href) === currentKey
      );
      if (active) setActiveLink(active);
      else clearActiveLinks();
    };

    const isMobileLayout = () =>
      window.matchMedia("(max-width: 680px)").matches;

    const closeMobileMenu = () => {
      navPill.classList.remove("is-mobile-open");
      navToggle?.classList.remove("is-open");
      navToggle?.setAttribute("aria-expanded", "false");
      backdrop?.classList.remove("is-visible");
      document.body.classList.remove("nav-locked");
    };

    const openMobileMenu = () => {
      navPill.classList.add("is-mobile-open");
      navToggle?.classList.add("is-open");
      navToggle?.setAttribute("aria-expanded", "true");
      backdrop?.classList.add("is-visible");
      document.body.classList.add("nav-locked");
    };

    const mobileClose = () => closeMobileMenu();

    navToggle?.addEventListener("click", () => {
      const willOpen = !navPill.classList.contains("is-mobile-open");
      if (willOpen) openMobileMenu();
      else closeMobileMenu();
    });

    backdrop?.addEventListener("click", closeMobileMenu);
    navClose?.addEventListener("click", mobileClose);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navPill.classList.contains("is-mobile-open")) {
        closeMobileMenu();
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        setActiveLink(link);
        if (isMobileLayout()) {
          closeMobileMenu();
        }
      });
    });

    syncActiveToLocation();

    window.addEventListener("resize", () => {
      const currentActive = container.querySelector(".nav-pill__link.is-active");
      if (currentActive) moveIndicator(currentActive);
      if (!isMobileLayout()) {
        closeMobileMenu();
      }
    });

    window.addEventListener("load", () => {
      const currentActive = container.querySelector(".nav-pill__link.is-active");
      if (currentActive) moveIndicator(currentActive);
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    const containers = document.querySelectorAll("[data-coco-nav]");
    if (containers.length) {
      ensureNavFonts();
      containers.forEach(initNav);
    }
    ensureBusinessInquiryLinks();
    ensureWorkLinks();
  });
})();
