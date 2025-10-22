document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll
  document.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Back to top
  const backTop = document.getElementById("backTop");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) backTop.classList.add("show");
    else backTop.classList.remove("show");
  });
  backTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );

  // BaseURL dynamic update
  const baseInput = document.getElementById("baseUrl");
  const curls = document.querySelectorAll(".curl");
  curls.forEach((c) => (c.dataset.original = c.textContent));

  const updateCurl = () => {
    const base = baseInput.value.trim().replace(/\/$/, "");
    curls.forEach((c) => {
      c.textContent = c.dataset.original.replace(
        /\$BASE/g,
        base || "http://localhost:3000"
      );
    });
  };
  baseInput.addEventListener("input", updateCurl);
  updateCurl();

  // REVEAL ANIMATION
  const revealElements = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("show");
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => observer.observe(el));
});
