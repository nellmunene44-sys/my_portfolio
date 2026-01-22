document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     Contact Form Handling
  ========================= */
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thank you for your message. I will respond promptly.");
      this.reset();
    });
  }

  /* =========================
     Blog Load More (Robust Version)
  ========================= */
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const blogCards = document.querySelectorAll(".blog-card");

  let visibleCount = 6; // blogs 1–6 visible initially
  const increment = 3; // reveal 3 at a time

  if (loadMoreBtn && blogCards.length > 0) {
    // Hide cards beyond initial count
    blogCards.forEach((card, index) => {
      if (index >= visibleCount) {
        card.style.display = "none";
      }
    });

    loadMoreBtn.addEventListener("click", () => {
      const nextVisible = visibleCount + increment;

      blogCards.forEach((card, index) => {
        if (index < nextVisible) {
          card.style.display = "block";
        }
      });

      visibleCount = nextVisible;

      if (visibleCount >= blogCards.length) {
        loadMoreBtn.style.display = "none";
      }
    });
  }

  /* =========================
     Dynamic Footer Year
  ========================= */
  const footerYear = document.getElementById("footerYear");
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

});

// Fade-in / Fade-out on scroll for work samples
document.addEventListener("DOMContentLoaded", () => {
  const workCards = document.querySelectorAll(".work-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },
    {
      threshold: 0.3, // 30% of the card visible triggers fade-in
    }
  );

  workCards.forEach((card, index) => {
    observer.observe(card);
    // Optional: stagger animations
    card.style.transitionDelay = `${index * 0.15}s`;
  });
});
