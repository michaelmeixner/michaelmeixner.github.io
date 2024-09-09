// Parallax effect to slow down the scroll-reveal line
window.addEventListener("scroll", function () {
  const scrollPosition = window.scrollY; // Get how much the user has scrolled
  const revealLine = document.querySelector(".scroll-reveal-line");

  // Create a parallax effect where the line scrolls more slowly than the rest of the page
  const parallaxSpeed = 0.4; // Slow the line down
  const offset = scrollPosition * parallaxSpeed;

  // Move the line based on the scroll position but still allow it to scroll off-screen
  revealLine.style.transform = `translateY(${offset}px)`;
});
