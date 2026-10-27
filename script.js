const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-nav");

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute("aria-label", isExpanded ? "Menu openen" : "Menu sluiten");
    navigation.classList.toggle("is-open", !isExpanded);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Menu openen");
      navigation.classList.remove("is-open");
    }
  });
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

const contactForm = document.querySelector("[data-contact-form]");

if (contactForm instanceof HTMLFormElement) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const name = String(formData.get("name")).trim();
    const email = String(formData.get("email")).trim();
    const phone = String(formData.get("phone")).trim();
    const service = String(formData.get("service")).trim();
    const message = String(formData.get("message")).trim();
    const subject = `Bericht via de website van ${name}`;
    const body = [
      `Naam: ${name}`,
      `E-mailadres: ${email}`,
      `Telefoonnummer: ${phone || "Niet opgegeven"}`,
      `Onderwerp: ${service || "Niet opgegeven"}`,
      "",
      message,
    ].join("\n");
    const mailto = `mailto:info@voltmaat.nl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const status = document.querySelector("[data-form-status]");

    contactForm.reset();

    if (status) {
      status.textContent = "Je gegevens zijn overgenomen in je e-mailconcept. Verstuur je bericht daar om contact op te nemen.";
    }

    window.location.href = mailto;
  });
}
