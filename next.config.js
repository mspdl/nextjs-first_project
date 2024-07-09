const { i18n } = require("./i18n");

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
