document.addEventListener('DOMContentLoaded', () => {
  const modals = document.querySelectorAll('.swiper-modal');
  const openButtons = document.querySelectorAll('.featured-item');
  let activeModal = null;
  let swipers = {};

  // === Open modal function ===
  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('onclick')
        ?.match(/'([^']+)'/)?.[1]; // grabs the id from onclick('modal-name')
      if (!modalId) return;
      const modal = document.getElementById(modalId);
      if (!modal) return;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      activeModal = modal;

      // Init Swiper only once per modal
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

  // === Close modal ===
  document.querySelectorAll('.swiper-close-button').forEach(btn => {
    btn.addEventListener('click', () => {
      if (activeModal) {
        activeModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        activeModal = null;
      }
    });
  });

  // Close on backdrop click
  modals.forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        activeModal = null;
      }
    });
  });

  // Close on ESC key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && activeModal) {
      activeModal.classList.remove('active');
      document.body.style.overflow = 'auto';
      activeModal = null;
    }
  });
});
