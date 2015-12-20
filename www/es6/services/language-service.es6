class LanguageService {
    constructor () {
        this.selectedLanguage = localStorage.getItem('tandemApp_selectedLanguage') ? localStorage.getItem('tandemApp_selectedLanguage') : 'en';
    }

    resetLanguage (newLang) {
        this.selectedLanguage = newLang;
        localStorage.setItem('tandemApp_selectedLanguage', newLang);
    }
}

LanguageService.$inject = [];

export { LanguageService };
