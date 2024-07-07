const path = require("path");

module.exports = {
  i18n: {
    locales: ["en", "pt"],
    defaultLocale: "en",
    localeDetection: false,
    localePath: path.resolver("./public/locales"),
  },
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
