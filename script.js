/* ------------------------------------------------------------
   KIET University website - assignment project
   JavaScript: welcome button, mobile navigation, and form feedback
   ------------------------------------------------------------ */

// Show a welcome message when the hero button is clicked.
const welcomeButton = document.getElementById("welcomeButton");
const welcomeMessage = document.getElementById("welcomeMessage");

welcomeButton.addEventListener("click", () => {
  welcomeMessage.hidden = false;
  welcomeMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

// Open and close the navigation menu on smaller screens.
const menuToggle = document.getElementById("menuToggle");
const primaryNav = document.getElementById("primaryNav");

menuToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

// Close the mobile menu after selecting a navigation link.
primaryNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    primaryNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

// Give a clear, local confirmation when the required inquiry fields are valid.
// This is a static demonstration: no data is sent to a server or saved.
const admissionForm = document.getElementById("admissionForm");
const formFeedback = document.getElementById("formFeedback");

admissionForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!admissionForm.checkValidity()) {
    admissionForm.reportValidity();
    return;
  }

  const studentName = document.getElementById("fullName").value.trim();
  const selectedProgram = document.getElementById("program").value;

  formFeedback.textContent = `Thank you, ${studentName}! Your inquiry about ${selectedProgram} has been completed for this demo. No information was sent or stored.`;
  formFeedback.className = "form-feedback success";
  formFeedback.hidden = false;
  formFeedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

// Highlight the current section link as the reader navigates the page.
const navLinks = [...document.querySelectorAll(".nav-link")];
const observedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-25% 0px -60% 0px", threshold: 0 });

  observedSections.forEach((section) => sectionObserver.observe(section));
}
