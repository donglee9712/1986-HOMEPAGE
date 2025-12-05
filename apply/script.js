(() => {
  const config = {
    itemDistance: 10,
    itemScale: 0.04,
    itemStackDistance: 30,
    lastStackDistance: 12,
    stackPosition: '10px',
    scaleEndPosition: '10px',
    baseScale: 0.82,
    rotationAmount: 0,
    blurAmount: 0
  };

  const scroller = document.querySelector('.scroll-stack-scroller');
  const inner = scroller?.querySelector('.scroll-stack-inner') || scroller;
  const cards = scroller ? Array.from(scroller.querySelectorAll('.scroll-stack-card')) : [];
  const endElement = scroller?.querySelector('.scroll-stack-end');

  if (!scroller || !inner || !cards.length || !endElement) return;

  const lastTransforms = new Map();
  let isUpdating = false;
  let animationFrame;
  let cleanupLenis;
  let lenisInstance;

  const calculateProgress = (scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  };

  const parsePercentage = (value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  };

  const getElementOffset = element => element.offsetTop;
  const getMaxScroll = () => {
    const endTop = getElementOffset(endElement);
    const containerHeight = scroller.clientHeight;
    return Math.max(0, endTop - containerHeight);
  };

  cards.forEach((card, i) => {
    if (i < cards.length - 1) {
      card.style.marginBottom = `${config.itemDistance}px`;
    }
    card.style.willChange = 'transform, filter';
    card.style.transformOrigin = 'top center';
    card.style.backfaceVisibility = 'hidden';
    card.style.transform = 'translateZ(0)';
    card.style.webkitTransform = 'translateZ(0)';
    card.style.perspective = '1000px';
    card.style.webkitPerspective = '1000px';
  });

  const updateCardTransforms = () => {
    if (isUpdating) return;
    isUpdating = true;

    const scrollTop = scroller.scrollTop;
    const containerHeight = scroller.clientHeight;
    const stackPositionPx = parsePercentage(config.stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(config.scaleEndPosition, containerHeight);
    const endElementTop = getElementOffset(endElement);

    cards.forEach((card, i) => {
      const stackOffset = i === cards.length - 1 ? config.lastStackDistance : config.itemStackDistance;
      const cardTop = getElementOffset(card);
      const triggerStart = cardTop - stackPositionPx - stackOffset * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - stackOffset * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = config.baseScale + i * config.itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = config.rotationAmount ? i * config.rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (config.blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cards.length; j++) {
          const jCardTop = getElementOffset(cards[j]);
          const jStackOffset = j === cards.length - 1 ? config.lastStackDistance : config.itemStackDistance;
          const jTriggerStart = jCardTop - stackPositionPx - jStackOffset * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * config.blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + stackOffset * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + stackOffset * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const lastTransform = lastTransforms.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        card.style.transform = transform;
        card.style.filter = filter;

        lastTransforms.set(i, newTransform);
      }
    });

    isUpdating = false;
  };

  const handleScroll = () => {
    requestAnimationFrame(updateCardTransforms);
  };

  const blockScrollPastTop = event => {
    const atTop = scroller.scrollTop <= 0 || (lenisInstance && lenisInstance.animatedScroll <= 0);
    if (atTop && event.deltaY < 0) {
      event.preventDefault();
      if (lenisInstance) {
        lenisInstance.scrollTo(0, { immediate: true });
      } else {
        scroller.scrollTop = 0;
      }
    }
  };

  const blockScrollPastBottom = event => {
    const maxScroll = getMaxScroll();
    const current = lenisInstance ? lenisInstance.animatedScroll : scroller.scrollTop;
    const atBottom = current >= maxScroll - 1;
    if (atBottom && event.deltaY > 0) {
      event.preventDefault();
      if (lenisInstance) {
        lenisInstance.scrollTo(maxScroll, { immediate: true });
      } else {
        scroller.scrollTop = maxScroll;
      }
    }
  };

  const setupLenis = () => {
    if (window.Lenis) {
      const lenis = new Lenis({
        wrapper: scroller,
        content: inner,
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        gestureOrientationHandler: true,
        normalizeWheel: true,
        wheelMultiplier: 1,
        touchInertiaMultiplier: 35,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075,
        touchInertia: 0.6
      });

      lenis.on('scroll', handleScroll);
      lenis.on('scroll', ({ scroll }) => {
        const maxScroll = getMaxScroll();
        if (scroll <= 0) lenis.scrollTo(0, { immediate: true });
        if (scroll >= maxScroll) lenis.scrollTo(maxScroll, { immediate: true });
      });

      const raf = time => {
        lenis.raf(time);
        animationFrame = requestAnimationFrame(raf);
      };
      animationFrame = requestAnimationFrame(raf);

      lenisInstance = lenis;

      return () => {
        if (animationFrame) cancelAnimationFrame(animationFrame);
        lenis.destroy();
        lenisInstance = null;
      };
    } else {
      scroller.addEventListener('scroll', handleScroll, { passive: true });
      return () => scroller.removeEventListener('scroll', handleScroll);
    }
  };

  scroller.addEventListener('wheel', blockScrollPastTop, { passive: false });
  scroller.addEventListener('wheel', blockScrollPastBottom, { passive: false });

  cleanupLenis = setupLenis();
  updateCardTransforms();

  const cleanupAll = () => {
    if (animationFrame) cancelAnimationFrame(animationFrame);
    scroller.removeEventListener('wheel', blockScrollPastTop);
    scroller.removeEventListener('wheel', blockScrollPastBottom);
    if (typeof cleanupLenis === 'function') {
      cleanupLenis();
    }
  };

  window.addEventListener('resize', () => {
    requestAnimationFrame(updateCardTransforms);
  });

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      requestAnimationFrame(updateCardTransforms);
    }
  });

  window.addEventListener('beforeunload', cleanupAll);
})();
