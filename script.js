document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.parentElement;
    const answer = item.querySelector(".faq-answer");

    const isOpen = item.classList.contains("open");

    document.querySelectorAll(".faq-item.open").forEach((openItem) => {
      openItem.classList.remove("open");
      openItem.querySelector(".faq-answer").style.maxHeight = null;
    });

    if (!isOpen) {
      item.classList.add("open");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});
document.querySelectorAll(".gallery").forEach((gallery) => {
  const images = gallery.querySelectorAll(".gallery-img");
  let currentIndex = 0;

  function showImage(index) {
    images[currentIndex].classList.remove("active");
    currentIndex = (index + images.length) % images.length;
    images[currentIndex].classList.add("active");
  }

  gallery.querySelector(".gallery-next").addEventListener("click", () => {
    showImage(currentIndex + 1);
  });

  gallery.querySelector(".gallery-prev").addEventListener("click", () => {
    showImage(currentIndex - 1);
  });
});
const bookingForm = document.getElementById("booking-form");

if (bookingForm) {
  bookingForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitButton = bookingForm.querySelector("button[type='submit']");
    const successMessage = document.getElementById("form-success");
    const formData = new FormData(bookingForm);

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {
      const response = await fetch(bookingForm.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        successMessage.textContent =
          "Thank you! Your inquiry has been received — we'll be in touch shortly.";
        successMessage.classList.remove("error");
        successMessage.classList.add("show");
        bookingForm.reset();
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      successMessage.textContent =
        "Something went wrong. Please try again or reach us on WhatsApp.";
      successMessage.classList.add("show", "error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send Inquiry";
      setTimeout(() => {
        successMessage.classList.remove("show");
      }, 6000);
    }
  });
}
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}
