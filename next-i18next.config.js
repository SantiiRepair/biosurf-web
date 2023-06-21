const NextI18Next = require("next-i18next").default;
const BrowserLanguageDetector =
    require("i18next-browser-languagedetector").default;

const NextI18NextInstance = new NextI18Next({
    defaultLanguage: "en",
    otherLanguages: ["es"],
    localeSubpaths: {
        en: "en",
        es: "es",
    },
    detection: {
        order: ["cookie", "localStorage", "navigator"],
        caches: ["cookie"],
    },
});

module.exports = NextI18NextInstance;

NextI18NextInstance.i18n.use(BrowserLanguageDetector).init({
    detection: {
        order: ["cookie", "localStorage", "navigator"],
        caches: ["cookie"],
    },
});
