// Simple slideshow logic
const slides = document.querySelectorAll('.slideshow .slide');
let current = 0;

function showNextSlide() {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
}

// Change every 5 seconds
setInterval(showNextSlide, 5000);





$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
    items: 3,
    margin: 30,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      1024: {
        items: 3
      }
    }
  });
});
