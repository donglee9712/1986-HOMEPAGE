(() => {
  const SCROLL_LOCK_CLASS = "hamburger-scroll-lock";

  const getFocusableElements = (panel) =>
    panel
      ? panel.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      : [];

  const trapFocus = (event, panel) => {
    const focusable = Array.from(getFocusableElements(panel));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const initHamburgerNav = (nav) => {
    const toggle = nav.querySelector("[data-hamburger-toggle]");
    const panel = nav.querySelector("[data-hamburger-panel]");
    const backdrop = nav.querySelector("[data-hamburger-backdrop]");

    if (!toggle || !panel) return;

    const openMenu = () => {
      nav.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      panel.removeAttribute("inert");
      document.body.classList.add(SCROLL_LOCK_CLASS);
      const focusable = getFocusableElements(panel);
      (focusable[0] || toggle).focus();
    };

    const closeMenu = () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      panel.setAttribute("inert", "true");
      document.body.classList.remove(SCROLL_LOCK_CLASS);
      toggle.focus();
    };

    const toggleMenu = () => {
      if (nav.classList.contains("is-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    };

    const handleKeydown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      } else if (event.key === "Tab" && nav.classList.contains("is-open")) {
        trapFocus(event, panel);
      }
    };

    toggle.addEventListener("click", toggleMenu);
    document.addEventListener("keydown", handleKeydown);
    backdrop?.addEventListener("click", closeMenu);
    panel.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    panel.setAttribute("inert", "true");
  };

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-hamburger-nav]").forEach(initHamburgerNav);
  });
})();
