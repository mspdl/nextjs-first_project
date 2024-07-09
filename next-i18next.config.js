module.exports = {
  i18n: {
    locales: ["en", "pt"],
    defaultLocale: "en",
    localeDetection: false,
  },
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
