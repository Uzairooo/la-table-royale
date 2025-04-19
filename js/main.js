document.addEventListener('DOMContentLoaded', () => {
  console.log("JS connected");

  // ✅ Toggle mobile menu
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  // ✅ Filter Menu Logic
  const filterButtons = document.querySelectorAll(".filter-btn");
  const dishCards = document.querySelectorAll(".dish-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const category = button.getAttribute("data-filter");

      dishCards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");
        card.style.display = (category === "all" || category === cardCategory) ? "block" : "none";
      });
    });
  });

  // ✅ Live Search Filter
  const searchInput = document.getElementById("menuSearch");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      dishCards.forEach(card => {
        const textContent = card.textContent.toLowerCase();
        card.style.display = textContent.includes(query) ? "block" : "none";
      });
    });
  }

  // ✅ Flatpickr for datetime
  const datetimeInput = document.getElementById("datetime");
  if (datetimeInput) {
    flatpickr(datetimeInput, {
      enableTime: true,
      dateFormat: "Y-m-d H:i",
      minDate: "today",
      defaultHour: 18,
      defaultMinute: 30,
      time_24hr: false,
    });
  }

  // ✅ Reservation Modal Popup
  const form = document.getElementById("reservationForm");
  const modal = document.getElementById("confirmationModal");
  const closeModal = document.getElementById("closeModal");

  if (form && modal && closeModal) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      modal.style.display = "flex";
      form.reset();
    });

    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  // ✅ Homepage Slider Logic
  let slideIndex = 0;
  const slides = document.querySelectorAll(".homepage-slider .slide");
  const dots = document.querySelectorAll("#sliderDots .dot");
  let sliderTimeout;

  function updateDots(index) {
    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[index]) dots[index].classList.add("active");
  }

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    slideIndex = index;
    slides[slideIndex].classList.add("active");
    updateDots(slideIndex);
  }

  function autoSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
    sliderTimeout = setTimeout(autoSlide, 6000);
  }

  function resetAutoSlide() {
    clearTimeout(sliderTimeout);
    sliderTimeout = setTimeout(autoSlide, 6000);
  }

  // Initialize
  if (slides.length) {
    showSlide(slideIndex);
    sliderTimeout = setTimeout(autoSlide, 6000);
  }

  // Arrow Navigation
  window.plusSlides = function(n) {
    slideIndex = (slideIndex + n + slides.length) % slides.length;
    showSlide(slideIndex);
    resetAutoSlide();
  };

  // Dot Navigation
  window.goToSlide = function(index) {
    slideIndex = index;
    showSlide(slideIndex);
    resetAutoSlide();
  };
});

// ✅ FAQ Accordion
const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  question.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

// ✅ Contact form submission message
const contactForm = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

if (contactForm && formMsg) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formMsg.textContent = "Thank you! We'll get back to you shortly.";
    formMsg.style.display = "block";
    contactForm.reset();
  });
}

// ✅ Fade-in on scroll for awards or elements
const fadeElements = document.querySelectorAll('.fade-in');
function showOnScroll() {
  const triggerBottom = window.innerHeight * 0.9;
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', showOnScroll);
window.addEventListener('load', showOnScroll);

// ✅ Auto-scroll testimonial slider
const slider = document.querySelector('.testimonial-slider');
let isHovered = false;

if (slider) {
  slider.addEventListener('mouseenter', () => isHovered = true);
  slider.addEventListener('mouseleave', () => isHovered = false);

  function autoScrollSlider() {
    if (!isHovered) {
      slider.scrollLeft += 1.2;
      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 1) {
        slider.scrollLeft = 0;
      }
    }
    requestAnimationFrame(autoScrollSlider);
  }

  requestAnimationFrame(autoScrollSlider);
}