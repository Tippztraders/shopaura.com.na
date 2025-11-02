document.addEventListener('DOMContentLoaded', () => {

  // === Modal & Swiper setup ===
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

      // Initialize Swiper inside modal if not already
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
          mousewheel: {
            forceToAxis: true, // vertical only
            invert: false
          },
        });
      } else {
        swipers[modalId].update();
      }
    });
  });

  // Close modal buttons
  document.querySelectorAll('.swiper-close-button').forEach(btn => {
    btn.addEventListener('click', () => {
      if (activeModal) {
        activeModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        activeModal = null;
      }
    });
  });

  // Click outside modal (backdrop)
  modals.forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        activeModal = null;
      }
    });
  });

  // ESC key to close modal
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && activeModal) {
      activeModal.classList.remove('active');
      document.body.style.overflow = 'auto';
      activeModal = null;
    }
  });

  // === Header slideshow auto-rotation only ===
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





// === BANNERS BEFORE FOOTER ===
const bannerSlides = document.querySelectorAll('.banner .slide');
let currentBanner = 0;

setInterval(() => {
  bannerSlides[currentBanner].classList.remove('active');
  currentBanner = (currentBanner + 1) % bannerSlides.length;
  bannerSlides[currentBanner].classList.add('active');
}, 4000); // change every 4 seconds


// === End of BANNERS BEFORE FOOTER===
