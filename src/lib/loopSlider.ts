// Mobile infinite-loop slider shared by TreatmentOptions and PediatricConditions.
// Mirrors the old React state machine: slides are [last, ...items, first],
// index starts at 1, swipe past a quarter width to move, clones snap back.
//
// Markup inside `root`:
//   [data-slider-viewport]  overflow container (measured for slide width)
//   [data-slider-track]     flex row that gets translated
//   [data-slider-dot]       one button per real item
export function initLoopSlider(root: HTMLElement) {
  const container = root.querySelector<HTMLElement>("[data-slider-viewport]");
  const wrapper = root.querySelector<HTMLElement>("[data-slider-track]");
  if (!container || !wrapper) return;
  const dots = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-slider-dot]"));
  const count = dots.length;
  const slidesLength = count > 0 ? count + 2 : 0;

  let index = 1;
  let slideWidth = 0;
  let isDragging = false;
  let startX = 0;

  const renderDots = () => {
    dots.forEach((dot, i) => {
      const isActive =
        index === i + 1 ||
        (index === 0 && i === count - 1) ||
        (index === slidesLength - 1 && i === 0);
      dot.classList.toggle("bg-[#6B5AED]", isActive);
      dot.classList.toggle("bg-white", !isActive);
    });
  };

  // Same as the React effect on [index, slideWidth].
  const applyPosition = () => {
    wrapper.style.transition = "transform 0.5s ease-in-out";
    wrapper.style.transform = `translateX(${-index * slideWidth}px)`;
  };

  const setIndex = (next: number) => {
    if (next === index) return;
    index = next;
    renderDots();
    applyPosition();
  };

  const updateWidth = () => {
    const w = container.offsetWidth;
    if (w === slideWidth) return;
    slideWidth = w;
    applyPosition();
  };

  wrapper.addEventListener("transitionend", () => {
    if (index === 0) {
      wrapper.style.transition = "none";
      setIndex(count);
      requestAnimationFrame(() => {
        wrapper.style.transform = `translateX(${-count * slideWidth}px)`;
      });
    } else if (index === slidesLength - 1) {
      wrapper.style.transition = "none";
      setIndex(1);
      requestAnimationFrame(() => {
        wrapper.style.transform = `translateX(${-slideWidth}px)`;
      });
    }
  });

  container.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
  });

  container.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - startX;
    wrapper.style.transition = "none";
    wrapper.style.transform = `translateX(${-index * slideWidth + diff}px)`;
  });

  container.addEventListener("touchend", (e) => {
    if (!isDragging) return;
    const diff = e.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > slideWidth / 4) {
      setIndex(diff < 0 ? index + 1 : index - 1);
    } else {
      wrapper.style.transition = "transform 0.3s ease-in-out";
      wrapper.style.transform = `translateX(${-index * slideWidth}px)`;
    }
    isDragging = false;
  });

  dots.forEach((dot, i) => dot.addEventListener("click", () => setIndex(i + 1)));

  // Initial mount: effect runs once with width 0, then again with the real width.
  applyPosition();
  updateWidth();
  window.addEventListener("resize", updateWidth);
}
