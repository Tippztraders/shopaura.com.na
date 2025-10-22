let activeModal = null;
let swipers = {};

// === Open Modal ===
function openSwiperModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.style.display = "flex";
  activeModal = modal;

  // Initialize Swiper once
  if (!swipers[modalId]) {
    const swiperEl = modal.querySelector(".swiper-container");
    swipers[modalId] = new Swiper(swiperEl, {
      loop: true,
      pagination: {
        el: modal.querySelector(".swiper-pagination"),
        clickable: true,
      },
      mousewheel: true,
      keyboard: { enabled: true },
      grabCursor: true,
    });

    // 🔧 FIX: refresh Swiper after modal becomes visible
    setTimeout(() => {
      swipers[modalId].update();
    }, 100);
  } else {
    // If already initialized, refresh when reopening
    setTimeout(() => {
      swipers[modalId].update();
    }, 100);
  }
}

// === Close Modal ===
function closeSwiperModal() {
  if (activeModal) {
    activeModal.style.display = "none";
    activeModal = null;
  }
}

// === Click outside modal content closes it ===
document.querySelectorAll('.swiper-modal').forEach(modal => {
  modal.addEventListener('click', e => {
    if (e.target === modal) closeSwiperModal();
  });
});

// === Escape key closes modal ===
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeSwiperModal();
});

// === Banner slideshow auto-change ===
const slides = document.querySelectorAll('.slideshow .slide');
let currentSlide = 0;

setInterval(() => {
  if (slides.length > 0) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }
}, 3000); // 3 seconds per slide
