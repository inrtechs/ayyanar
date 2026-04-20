const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const year = document.getElementById("year");
const contactForm = document.querySelector(".contact-form");

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
