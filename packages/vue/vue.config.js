const path = require("path");

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@example/domain-cart": path.resolve(
          __dirname,
          "../../node_modules/@example/domain-cart/dist"
        )
      }
    }
  }
};
