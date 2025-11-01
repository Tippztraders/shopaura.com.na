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

  if (slides.length > 0) {
    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, 3000);
  }

});



  // === Mousewheel navigation for slideshow ===
  if (slides.length > 0) {
    document.querySelector('.slideshow').addEventListener('wheel', (e) => {
      e.preventDefault();
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
