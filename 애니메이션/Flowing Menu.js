const ICONS = [
  'https://cdn.imweb.me/upload/S20200402f6a4097001dd3/8a40d73e681ac.png',
  'https://cdn.imweb.me/upload/S20200402f6a4097001dd3/40efbaf4b2b7b.png',
  'https://cdn.imweb.me/upload/S20200402f6a4097001dd3/77d0d08af1ff0.png',
  'https://cdn.imweb.me/upload/S20200402f6a4097001dd3/893085c42ea5c.png',
  'https://cdn.imweb.me/upload/S20200402f6a4097001dd3/ec6426f201921.png',
  'https://cdn.imweb.me/upload/S20200402f6a4097001dd3/a19aa6a72eacb.png',
  'https://cdn.imweb.me/upload/S20200402f6a4097001dd3/5071883d26d45.png',
  'https://cdn.imweb.me/upload/S20200402f6a4097001dd3/9f43c94a523ab.png',
  'https://cdn.imweb.me/upload/S20200402f6a4097001dd3/32ed13e12f3f5.png',
  'https://cdn.imweb.me/upload/S20200402f6a4097001dd3/fa722f7ba38cb.png',
  'https://cdn.imweb.me/upload/S20200402f6a4097001dd3/061af244388b7.png',
  'https://cdn.imweb.me/upload/S20200402f6a4097001dd3/250378451b436.png',
  'https://cdn.imweb.me/upload/S20200402f6a4097001dd3/1deffe41d5611.png',
];

const MENU_ITEMS = [
  { text: '우리의 기획이' },
  { text: '누군가의 삶을' },
  { text: '행복하게 만들 수 있을까요?' },
];

const animationDefaults = { duration: 0.6, ease: 'expo.out' };

const pickRandomIcon = () => ICONS[Math.floor(Math.random() * ICONS.length)];

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[data-menu-root]');
  if (!root) return;

  const menuWrap = document.createElement('div');
  menuWrap.className = 'menu-wrap';

  const nav = document.createElement('nav');
  nav.className = 'menu';

  let cumulativeDelay = 0;
  const CHAR_STAGGER = 0.07;
  const CHAR_DURATION = 0.25;
  const ITEM_GAP = 0; // start next line immediately after previous finishes

  MENU_ITEMS.forEach((item, idx) => {
    const el = createMenuItem({ ...item, image: pickRandomIcon(), index: idx, baseDelay: cumulativeDelay, charStagger: CHAR_STAGGER });
    nav.appendChild(el);
    const charCount = item.text.length;
    cumulativeDelay += CHAR_DURATION + Math.max(0, charCount - 1) * CHAR_STAGGER + ITEM_GAP;
  });

  menuWrap.appendChild(nav);
  root.appendChild(menuWrap);

  // Trigger load-in animation
  requestAnimationFrame(() => {
    nav.classList.add('menu--ready');
  });
});

function createMenuItem({ text, image, index = 0, baseDelay = 0, charStagger = 0.07 }) {
  const item = document.createElement('div');
  item.className = 'menu__item';
  item.style.setProperty('--item-index', index);
  item.style.setProperty('--item-delay', `${baseDelay}s`);
  item.style.setProperty('--char-stagger', `${charStagger}s`);

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'menu__item-link';
  const label = document.createElement('span');
  label.className = 'menu__item-label';
  createCharSpans(text).forEach(span => label.appendChild(span));
  trigger.appendChild(label);

  const marquee = document.createElement('div');
  marquee.className = 'marquee';

  const marqueeInnerWrap = document.createElement('div');
  marqueeInnerWrap.className = 'marquee__inner-wrap';

  const marqueeInner = document.createElement('div');
  marqueeInner.className = 'marquee__inner';
  const marqueeImages = [];

  const createSegment = () => {
    const fragment = document.createDocumentFragment();
    const span = document.createElement('span');
    span.textContent = text;
    fragment.appendChild(span);

    const imageBlock = document.createElement('div');
    imageBlock.className = 'marquee__img';
    imageBlock.style.backgroundImage = `url(${image})`;
    fragment.appendChild(imageBlock);
    marqueeImages.push(imageBlock);
    return fragment;
  };

  Array.from({ length: 8 }).forEach(() => {
    marqueeInner.appendChild(createSegment());
  });

  marqueeInnerWrap.appendChild(marqueeInner);
  marquee.appendChild(marqueeInnerWrap);

  const handleEnter = ev => {
    handlePointerEnter(ev, item, marquee, marqueeInnerWrap, marqueeImages);
  };
  const handleLeave = ev => {
    handlePointerLeave(ev, item, marquee, marqueeInnerWrap);
  };

  trigger.addEventListener('pointerenter', handleEnter);
  trigger.addEventListener('pointerleave', handleLeave);
  trigger.addEventListener('touchstart', handleEnter, { passive: true });
  trigger.addEventListener('touchend', handleLeave);
  trigger.addEventListener('touchcancel', handleLeave);

  item.appendChild(trigger);
  item.appendChild(marquee);

  return item;
}

function createCharSpans(str) {
  return str.split('').map((ch, idx) => {
    const span = document.createElement('span');
    span.className = 'char';
    span.textContent = ch === ' ' ? '\u00A0' : ch;
    span.style.setProperty('--char-index', idx);
    return span;
  });
}

function handlePointerEnter(ev, item, marquee, marqueeInnerWrap, marqueeImages) {
  if (typeof gsap === 'undefined') {
    marquee.style.transform = 'translate3d(0, 0, 0)';
    marqueeInnerWrap.style.transform = 'translate3d(0, 0, 0)';
    return;
  }

  const { x, y, width, height } = getRelativePointer(ev, item);
  const edge = findClosestEdge(x, y, width, height);

  marqueeImages.forEach(el => {
    el.style.backgroundImage = `url(${pickRandomIcon()})`;
  });

  gsap
    .timeline({ defaults: animationDefaults })
    .set(marquee, { y: edge === 'top' ? '-101%' : '101%' }, 0)
    .set(marqueeInnerWrap, { y: edge === 'top' ? '101%' : '-101%' }, 0)
    .to([marquee, marqueeInnerWrap], { y: '0%' }, 0);
}

function handlePointerLeave(ev, item, marquee, marqueeInnerWrap) {
  if (typeof gsap === 'undefined') {
    marquee.style.transform = 'translate3d(0, 101%, 0)';
    marqueeInnerWrap.style.transform = 'translate3d(0, -101%, 0)';
    return;
  }

  const { x, y, width, height } = getRelativePointer(ev, item);
  const edge = findClosestEdge(x, y, width, height);

  gsap
    .timeline({ defaults: animationDefaults })
    .to(marquee, { y: edge === 'top' ? '-101%' : '101%' }, 0)
    .to(marqueeInnerWrap, { y: edge === 'top' ? '101%' : '-101%' }, 0);
}

function getRelativePointer(ev, element) {
  const rect = element.getBoundingClientRect();
  return {
    x: ev.clientX - rect.left,
    y: ev.clientY - rect.top,
    width: rect.width,
    height: rect.height,
  };
}

function findClosestEdge(mouseX, mouseY, width, height) {
  const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
  const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
  return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
}

function distMetric(x, y, x2, y2) {
  const xDiff = x - x2;
  const yDiff = y - y2;
  return xDiff * xDiff + yDiff * yDiff;
}
