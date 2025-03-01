const path = require("path");

module.exports = {
  webpack: (config) => {
    config.resolve.alias["@shared"] = path.resolve(__dirname, "../packages/shared");
    return config;
  },
};
