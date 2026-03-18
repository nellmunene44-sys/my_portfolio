document.addEventListener("DOMContentLoaded", () => {
  const footerYear = document.getElementById("footerYear");
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  const blogCards = Array.from(document.querySelectorAll(".blog-card"));
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const initialVisibleCount = 6;
  const increment = 3;

  if (blogCards.length > 0 && loadMoreBtn) {
    let visibleCount = initialVisibleCount;

    blogCards.forEach((card, index) => {
      card.classList.toggle("hidden", index >= visibleCount);
    });

    if (blogCards.length <= visibleCount) {
      loadMoreBtn.hidden = true;
    }

    loadMoreBtn.addEventListener("click", () => {
      visibleCount += increment;

      blogCards.forEach((card, index) => {
        if (index < visibleCount) {
          card.classList.remove("hidden");
        }
      });

      if (visibleCount >= blogCards.length) {
        loadMoreBtn.hidden = true;
      }
    });
  }

  const workCards = document.querySelectorAll(".work-card");
  if (workCards.length === 0) {
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    workCards.forEach((card) => card.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 }
  );

  workCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.12}s`;
    observer.observe(card);
  });
});
