/* Shared site scripts (mobile nav + footer year)
   Keep JS small, dependency-free, and accessible.
*/

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Mobile nav
const header = document.querySelector("[data-header]");
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("site-nav");

function setNav(open) {
  if (!toggle || !header) return;
  toggle.setAttribute("aria-expanded", String(open));
  header.classList.toggle("is-open", open);
  document.body.classList.toggle("no-scroll", open);
}

if (toggle) {
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    setNav(open);
  });
}

if (nav) {
  nav.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link && toggle && toggle.getAttribute("aria-expanded") === "true") setNav(false);
  });
}

// Close menu on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && toggle && toggle.getAttribute("aria-expanded") === "true") setNav(false);
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!toggle) return;
  if (toggle.getAttribute("aria-expanded") !== "true") return;

  const isClickInsideNav = nav?.contains(e.target);
  const isClickOnToggle = toggle.contains(e.target);
  if (!isClickInsideNav && !isClickOnToggle) setNav(false);
});
