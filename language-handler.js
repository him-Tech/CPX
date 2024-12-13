const languageHandler = {
  // Portuguese-speaking countries ISO codes
  portugueseCountries: [
    "PT",
    "BR",
    "AO",
    "MZ",
    "CV",
    "GW",
    "ST",
    "GQ",
    "TL",
    "MO",
  ],

  // Store current language preference
  currentLanguage: null,

  // Get user's preferred language from various sources
  async detectUserPreference() {
    try {
      const savedLanguage = localStorage.getItem("preferredLanguage");
      if (savedLanguage) {
        return savedLanguage === "pt";
      }

      const browserLang = navigator.language || navigator.userLanguage;
      if (browserLang.startsWith("pt")) {
        return true;
      }

      const countryCode = await this.detectUserCountry();
      return this.portugueseCountries.includes(countryCode);
    } catch (error) {
      console.error("Error detecting language preference:", error);
      return false;
    }
  },

  // Get user's country code using geolocation
  async detectUserCountry() {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`
      );
      const data = await response.json();
      return data.countryCode;
    } catch (error) {
      console.error("Error detecting country:", error);
      return null;
    }
  },

  // Load content for both languages
  async loadBilingualContent() {
    try {
      const response = await fetch("/content.json");
      const content = await response.json();

      document.querySelectorAll("[data-content-key]").forEach((element) => {
        const key = element.getAttribute("data-content-key");
        element.setAttribute("data-en", content[key].en);
        element.setAttribute("data-pt", content[key].pt);
      });
    } catch (error) {
      console.error("Error loading bilingual content:", error);
    }
  },

  // Update all language UI elements
  updateLanguageUI(isPortuguese) {
    const language = isPortuguese ? "Português" : "English";

    // Update main dropdown text if it exists
    const mainLanguageText = document.getElementById("languageText");
    if (mainLanguageText) {
      mainLanguageText.textContent = language;
    }

    // Update sidebar dropdown text if it exists
    const sidebarLanguageText = document.getElementById("sidebarLanguageText");
    if (sidebarLanguageText) {
      sidebarLanguageText.textContent = language;
    }
  },

  // Update page content based on selected language
  updateContent(isPortuguese) {
    const lang = isPortuguese ? "pt" : "en";
    document.documentElement.lang = lang;

    // Update content
    document.querySelectorAll("[data-content-key]").forEach((element) => {
      element.textContent = element.getAttribute(`data-${lang}`);
    });

    // Update UI elements
    this.updateLanguageUI(isPortuguese);

    // Save preference
    localStorage.setItem("preferredLanguage", lang);
    this.currentLanguage = lang;

    // Update URL if needed
    const currentPath = window.location.pathname;
    if (isPortuguese && currentPath.includes("homepage.html")) {
      window.location.href = "index.html";
    } else if (!isPortuguese && !currentPath.includes("homepage.html")) {
      window.location.href = "homepage.html";
    }
  },

  // Set up dropdown event listeners
  setupDropdownListeners() {
    // Main dropdown handler
    document.addEventListener("click", (event) => {
      // Handle main dropdown
      const mainDropdown = document.getElementById("languageDropdown");
      const isMainDropdownButton = event.target.closest(
        "#languageDropdownButton"
      );

      if (isMainDropdownButton && mainDropdown) {
        mainDropdown.classList.toggle("hidden");
      } else if (!event.target.closest("#languageDropdown") && mainDropdown) {
        mainDropdown.classList.add("hidden");
      }

      // Handle sidebar dropdown
      const sidebarDropdown = document.getElementById(
        "sidebarLanguageDropdown"
      );
      const isSidebarDropdownButton = event.target.closest(
        "#sidebarLanguageDropdownButton"
      );

      if (isSidebarDropdownButton && sidebarDropdown) {
        sidebarDropdown.classList.toggle("hidden");
      } else if (
        !event.target.closest("#sidebarLanguageDropdown") &&
        sidebarDropdown
      ) {
        sidebarDropdown.classList.add("hidden");
      }

      // Handle language selection from either dropdown
      const link = event.target.closest(".language-text");
      if (link) {
        event.preventDefault();
        const isPortuguese = link.getAttribute("data-value") === "Português";
        this.updateContent(isPortuguese);

        // Hide both dropdowns
        if (mainDropdown) mainDropdown.classList.add("hidden");
        if (sidebarDropdown) sidebarDropdown.classList.add("hidden");
      }
    });
  },

  // Initialize language handling
  async init() {
    await this.loadBilingualContent();
    const isPortuguese = await this.detectUserPreference();
    this.updateContent(isPortuguese);
    this.setupDropdownListeners();
  },
};

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  languageHandler.init();
});
