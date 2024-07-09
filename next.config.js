const { i18n } = require("./next-i18next.config");

module.exports = {
  reactStrictMode: true,
  images: { domains: ["www.google.com.br"] },
  headers: async () => {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET" },
        ],
      },
    ];
  },
  i18n,
};
