document.addEventListener('DOMContentLoaded', () => {

  // === your existing modal JS here ===
  const modals = document.querySelectorAll('.swiper-modal');
  const openButtons = document.querySelectorAll('.featured-item');
  let activeModal = null;
  let swipers = {};

  // Open modal
  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
      if (!modalId) return;
      const modal = document.getElementById(modalId);
      if (!modal) return;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      activeModal = modal;

      if (!swipers[modalId]) {
        swipers[modalId] = new Swiper(`#${modalId} .swiper-container`, {
          loop: true,
          pagination: {
            el: `#${modalId} .swiper-pagination`,
            clickable: true,
          },
          navigation: {
            nextEl: `#${modalId} .swiper-button-next`,
            prevEl: `#${modalId} .swiper-button-prev`,
          },
        });
      } else {
        swipers[modalId].update();
      }
    });
  });

  // Close modal
  document.querySelectorAll('.swiper-close-button').forEach(btn => {
    btn.addEventListener('click', () => {
      if (activeModal) {
        activeModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        activeModal = null;
      }
    });
  });

  // Backdrop + ESC close
  modals.forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        activeModal = null;
      }
    });
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && activeModal) {
      activeModal.classList.remove('active');
      document.body.style.overflow = 'auto';
      activeModal = null;
    }
  });

  // === Banner slideshow auto-change ===
  const slides = document.querySelectorAll('.slideshow .slide');
  let currentSlide = 0;
  let autoSlideInterval = null;

  if (slides.length > 0) {
    autoSlideInterval = setInterval(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, 3000);
  }

  // === Mousewheel navigation for slideshow (throttled) ===
  const slideshowEl = document.querySelector('.slideshow');
  if (slideshowEl && slides.length > 0) {
    let lastWheel = 0;
    const wheelDelay = 300; // ms between wheel-advances

    slideshowEl.addEventListener('wheel', (e) => {
      // only handle vertical wheel gestures
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;

      const now = Date.now();
      if (now - lastWheel < wheelDelay) {
        e.preventDefault();
        return; // throttle: ignore rapid wheel events
      }
      lastWheel = now;

      e.preventDefault();

      // pause auto-rotation briefly when user manually navigates
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
        // restart auto-rotation after 5s of inactivity
        setTimeout(() => {
          if (!autoSlideInterval) {
            autoSlideInterval = setInterval(() => {
              slides[currentSlide].classList.remove('active');
              currentSlide = (currentSlide + 1) % slides.length;
              slides[currentSlide].classList.add('active');
            }, 3000);
          }
        }, 5000);
      }

      slides[currentSlide].classList.remove('active');
      if (e.deltaY > 0) {
        // scroll down → next
        currentSlide = (currentSlide + 1) % slides.length;
      } else {
        // scroll up → previous
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      }
      slides[currentSlide].classList.add('active');
    }, { passive: false });
  }

}); // end DOMContentLoaded
