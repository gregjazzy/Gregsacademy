// Language Detection and Redirect Script
(function() {
    // Get current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const isEnglishVersion = currentPage.includes('-en.html');
    const isFrenchVersion = !isEnglishVersion;
    
    // Check if user has a stored language preference
    const storedLang = localStorage.getItem('preferredLanguage');
    
    // Get browser language
    const browserLang = navigator.language || navigator.userLanguage;
    const isEnglishBrowser = browserLang.startsWith('en');
    
    // Determine which language to use
    let targetLang = storedLang || (isEnglishBrowser ? 'en' : 'fr');
    
    // Redirect if necessary (only on first load or language change)
    if (!storedLang && targetLang === 'en' && isFrenchVersion && !sessionStorage.getItem('languageChecked')) {
        sessionStorage.setItem('languageChecked', 'true');
        const englishPage = currentPage.replace('.html', '-en.html');
        window.location.href = englishPage;
    }
    
    // Function to switch language
    window.switchLanguage = function(lang) {
        localStorage.setItem('preferredLanguage', lang);
        
        const currentPath = window.location.pathname;
        const currentFile = currentPath.split('/').pop();
        
        let targetFile;
        if (lang === 'en') {
            targetFile = currentFile.includes('-en.html') ? currentFile : currentFile.replace('.html', '-en.html');
        } else {
            targetFile = currentFile.replace('-en.html', '.html');
        }
        
        if (targetFile !== currentFile) {
            window.location.href = targetFile;
        }
    };
    
    // Update active language indicator
    function updateLanguageIndicator() {
        const currentLang = isEnglishVersion ? 'en' : 'fr';
        document.querySelectorAll('.lang-option').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === currentLang) {
                btn.classList.add('active');
            }
        });
    }
    
    // Update on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateLanguageIndicator);
    } else {
        updateLanguageIndicator();
    }
})();


