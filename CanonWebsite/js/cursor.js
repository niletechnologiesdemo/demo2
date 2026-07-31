// CUSTOM CURSOR
const cursor = document.querySelector(".custom-cursor");
const dot = document.querySelector(".custom-cursor-dot");

document.addEventListener("mousemove", (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.4,
    ease: "power3.out"
  });

  gsap.to(dot, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.1
  });
});

// Hover Effect
document.querySelectorAll("[data-cursor]").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    cursor.classList.add("active");
    cursor.innerHTML = item.getAttribute("data-cursor");
  });

  item.addEventListener("mouseleave", () => {
    cursor.classList.remove("active");
  });
});