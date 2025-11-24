// Import i18next from node_modules
import i18next from '../node_modules/i18next/dist/esm/i18next.js';
import LanguageDetector from '../node_modules/i18next-browser-languagedetector/dist/esm/i18nextBrowserLanguageDetector.js';
import HttpBackend from '../node_modules/i18next-http-backend/dist/esm/i18nextHttpBackend.js';

// Initialize i18next
i18next
  .use(HttpBackend)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'fr',
    debug: false,
    backend: {
      loadPath: '/locales/{{lng}}/translation.json'
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  }, function(err, t) {
    if (err) return console.error(err);
    updateContent();
  });

// Function to update content based on current language
function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = i18next.t(key);
    
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      element.placeholder = translation;
    } else {
      element.innerHTML = translation;
    }
  });
  
  // Update HTML lang attribute
  document.documentElement.lang = i18next.language;
  
  // Update language selector
  updateLanguageSelector();
}

// Function to update language selector active state
function updateLanguageSelector() {
  const currentLang = i18next.language;
  document.querySelectorAll('.lang-option').forEach(option => {
    option.classList.remove('active');
    if (option.getAttribute('data-lang') === currentLang) {
      option.classList.add('active');
    }
  });
}

// Function to change language
window.changeLanguage = function(lang) {
  i18next.changeLanguage(lang, (err, t) => {
    if (err) return console.error(err);
    updateContent();
    // Store language preference
    localStorage.setItem('language', lang);
  });
};

// Listen for language changes
i18next.on('languageChanged', function(lng) {
  updateContent();
});

// Export for use in other modules
export { i18next, updateContent, changeLanguage };

