const navButtons = Array.from(
  document.querySelectorAll(".nav-item[data-target]")
);
const sections = Array.from(document.querySelectorAll("main section[id]"));
const progressCircle = document.querySelector(".progress .indicator");
const sideNav = document.querySelector(".side-nav");
const footer = document.querySelector(".site-footer");
const circleLength = progressCircle?.getTotalLength?.() ?? 314;
let layoutStickTop = 0;

const toNumber = (value) => {
  const parsed = parseFloat(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const refreshLayoutVars = () => {
  const styles = getComputedStyle(document.documentElement);
  layoutStickTop = toNumber(styles.getPropertyValue("--side-nav-stick-top"));
};

refreshLayoutVars();

if (progressCircle) {
  progressCircle.style.strokeDasharray = circleLength;
  progressCircle.style.strokeDashoffset = circleLength;
}

const setActiveNav = (targetId) => {
  navButtons.forEach((button) => {
    const matches = button.dataset.target === `#${targetId}`;
    button.classList.toggle("is-active", matches);
    button.setAttribute("aria-current", matches ? "true" : "false");
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        entry.target.classList.add("is-visible");
        setActiveNav(sectionId);
        if (progressCircle) {
          const progressValue = parseFloat(entry.target.dataset.progress ?? "0");
          const offset = circleLength - circleLength * progressValue;
          progressCircle.style.strokeDashoffset = offset;
        }
      } else {
        entry.target.classList.remove("is-visible");
      }
    });
  },
  {
    threshold: 0.3,
  }
);

sections.forEach((section) => observer.observe(section));

const updateActiveByScroll = () => {
  const focusLine = window.scrollY + window.innerHeight * 0.35;
  let currentId = null;
  for (const section of sections) {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (focusLine >= top && focusLine < bottom) {
      currentId = section.id;
      break;
    }
  }
  if (currentId) {
    setActiveNav(currentId);
  }
};

const scrollToSection = (section) => {
  if (!section) return;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const mobileOffset = window.innerWidth <= 768 ? 20 : 60;
  const y = section.getBoundingClientRect().top + window.scrollY - mobileOffset;
  window.scrollTo({
    top: y,
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
};

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetSection = document.querySelector(button.dataset.target);
    if (targetSection?.id) {
      setActiveNav(targetSection.id);
    }
    scrollToSection(targetSection);
  });
});

const isDesktopLayout = () => window.matchMedia("(min-width: 1025px)").matches;

const updateSideNavFixState = () => {
  if (!sideNav) return;
  if (!isDesktopLayout()) {
    sideNav.classList.remove("is-fixed");
    sideNav.style.transform = "";
    return;
  }
  const shouldFix = window.scrollY >= layoutStickTop;
  sideNav.classList.toggle("is-fixed", shouldFix);
  if (!shouldFix) {
    sideNav.style.transform = "";
  }
};

const updateScrollProgress = () => {
  if (!progressCircle) return;
  const scrollTop = window.scrollY;
  const scrollHeight = document.body.scrollHeight - innerHeight;
  const progress = scrollHeight ? Math.min(scrollTop / scrollHeight, 1) : 0;
  progressCircle.style.strokeDashoffset =
    circleLength - circleLength * progress;
};

const clampSideNavToFooter = () => {
  if (!sideNav || !footer) return;
  if (!isDesktopLayout()) {
    sideNav.style.transform = "";
    return;
  }
  if (!sideNav.classList.contains("is-fixed")) {
    sideNav.style.transform = "";
    return;
  }
  const safeGap = 140;
  const footerTop = footer.getBoundingClientRect().top + window.scrollY;
  const windowBottom = window.scrollY + window.innerHeight;
  const limit = footerTop - safeGap;
  const overlap = windowBottom - limit;
  if (overlap > 0) {
    sideNav.style.transform = `translateY(-${overlap}px)`;
  } else {
    sideNav.style.transform = "";
  }
};

const handleScroll = () => {
  updateScrollProgress();
  updateSideNavFixState();
  clampSideNavToFooter();
  updateActiveByScroll();
};

const handleResize = () => {
  refreshLayoutVars();
  updateSideNavFixState();
  clampSideNavToFooter();
  updateActiveByScroll();
};

window.addEventListener("scroll", handleScroll);
window.addEventListener("resize", handleResize);
window.addEventListener("load", () => {
  updateSideNavFixState();
  clampSideNavToFooter();
  updateActiveByScroll();
});
