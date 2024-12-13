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

  // Update UI elements
  updateLanguageUI(isPortuguese) {
    const language = isPortuguese ? "Português" : "English";
    document.querySelectorAll(".language-display").forEach((element) => {
      element.textContent = language;
    });
  },

  // Save history to localStorage
  saveToHistory(page, language, timestamp) {
    try {
      // Get existing history or initialize new array
      const history = JSON.parse(
        localStorage.getItem("languageHistory") || "[]"
      );

      // Add new entry
      history.push({
        page,
        language,
        timestamp,
        countryCode: localStorage.getItem("userCountry") || "unknown",
      });

      // Keep only last 10 entries
      if (history.length > 10) {
        history.shift();
      }

      // Save back to localStorage
      localStorage.setItem("languageHistory", JSON.stringify(history));
    } catch (error) {
      console.error("Error saving history:", error);
    }
  },

  // Set default page based on country
  async setDefaultPage() {
    // Only proceed if we're on the root path
    if (window.location.pathname === "/" || window.location.pathname === "") {
      try {
        const countryCode = await this.detectUserCountry();
        // Save country code to localStorage
        localStorage.setItem("userCountry", countryCode);

        const isPortugueseCountry =
          this.portugueseCountries.includes(countryCode);

        // Save initial visit to history
        const defaultPage = isPortugueseCountry
          ? "index.html"
          : "homepage.html";
        const defaultLanguage = isPortugueseCountry ? "pt" : "en";
        this.saveToHistory(
          defaultPage,
          defaultLanguage,
          new Date().toISOString()
        );

        // Redirect based on country
        if (isPortugueseCountry) {
          window.location.href = "/index.html"; // Portuguese version
        } else {
          window.location.href = "/homepage.html"; // English version
        }
      } catch (error) {
        console.error("Error setting default page:", error);
        // Default to English version if there's an error
        this.saveToHistory("homepage.html", "en", new Date().toISOString());
        window.location.href = "/homepage.html";
      }
    }
  },

  // Get current page name from path
  getCurrentPage() {
    const path = window.location.pathname;
    return path.split("/").pop() || "index.html";
  },

  // Update content based on selected language
  updateContent(isPortuguese) {
    const lang = isPortuguese ? "pt" : "en";
    document.documentElement.lang = lang;

    // Update content
    document.querySelectorAll("[data-content-key]").forEach((element) => {
      element.textContent = element.getAttribute(`data-${lang}`);
    });

    // Update UI elements
    this.updateLanguageUI(isPortuguese);

    // Save language preference
    localStorage.setItem("preferredLanguage", lang);

    // Handle redirects and save history
    const currentPath = window.location.pathname;
    if (isPortuguese && currentPath === "/homepage.html") {
      this.saveToHistory("index.html", "pt", new Date().toISOString());
      window.location.href = "/index.html";
    } else if (!isPortuguese && currentPath === "/index.html") {
      this.saveToHistory("homepage.html", "en", new Date().toISOString());
      window.location.href = "/homepage.html";
    } else {
      // Save history even if no redirect
      this.saveToHistory(this.getCurrentPage(), lang, new Date().toISOString());
    }
  },

  // Get language history
  getHistory() {
    try {
      return JSON.parse(localStorage.getItem("languageHistory") || "[]");
    } catch (error) {
      console.error("Error getting history:", error);
      return [];
    }
  },

  // Initialize language handling
  async init() {
    await this.setDefaultPage();
    await this.loadBilingualContent();
  },
};

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  languageHandler.init();
});
