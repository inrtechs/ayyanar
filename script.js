const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const year = document.getElementById("year");
const contactForm = document.querySelector(".contact-form");
const heroCarousel = document.getElementById("heroCarousel");
const heroDots = document.getElementById("heroDots");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("show");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name")?.value.trim();
    const phone = document.getElementById("phone")?.value.trim();
    const message = document.getElementById("message")?.value.trim();

    if (!name || !phone || !message) {
      return;
    }

    const whatsappText = `New Enquiry - INR TECHS
Name: ${name}
Phone: ${phone}
Message: ${message}`;
    const whatsappUrl = `https://wa.me/919944573893?text=${encodeURIComponent(whatsappText)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    contactForm.reset();
  });
}

if (heroCarousel && heroDots) {
  const slides = Array.from(heroCarousel.querySelectorAll(".hero-slide"));
  let currentSlide = 0;
  let intervalId;

  const dots = slides.map((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "hero-dot";
    dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
    dot.addEventListener("click", () => {
      showSlide(index);
      restartAutoplay();
    });
    heroDots.appendChild(dot);
    return dot;
  });

  const showSlide = (index) => {
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === index);
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === index);
    });
    currentSlide = index;
  };

  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  };

  const startAutoplay = () => {
    intervalId = window.setInterval(nextSlide, 3500);
  };

  const stopAutoplay = () => {
    if (intervalId) {
      window.clearInterval(intervalId);
    }
  };

  const restartAutoplay = () => {
    stopAutoplay();
    startAutoplay();
  };

  showSlide(0);

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReducedMotion && slides.length > 1) {
    startAutoplay();
    heroCarousel.addEventListener("mouseenter", stopAutoplay);
    heroCarousel.addEventListener("mouseleave", startAutoplay);
  }
}
