// Parallax effect to slow down the scroll-reveal line
window.addEventListener("scroll", function () {
  const scrollPosition = window.scrollY; // Get how much the user has scrolled
  const revealLine = document.querySelector(".scroll-reveal-line");
  const diagonalLine2 = document.querySelector(".diagonal-line-2");

  // Create a parallax effect where the line scrolls more slowly than the rest of the page
  const parallaxSpeed = 0.4; // Slow the line down
  const offset = scrollPosition * parallaxSpeed;
  // Adjust the perspective shift based on scroll position
  const perspectiveShift = scrollPosition * 0.1; // Adjust for perspective effect scaling

  diagonalLine2.style.transform = `rotate(-4.5deg) translateY(${perspectiveShift}px) rotateX(${
    perspectiveShift * 0.5
  }deg)`;
  scrollRevealLine.style.transform = `translateY(${perspectiveShift}px)`;
});
