const rewireAliases = require('react-app-rewire-aliases');
const { paths } = require('react-app-rewired');
const path = require('path');

/* config-overrides.js */
module.exports = function override(config, env) {
  config = rewireAliases.aliasesOptions({
    '@': path.resolve(__dirname, `${paths.appSrc}/`),
    '@pages': path.resolve(__dirname, `${paths.appSrc}/pages/`),
    '@assets': path.resolve(__dirname, `${paths.appSrc}/assets/`),
    '@components': path.resolve(__dirname, `${paths.appSrc}/components/`),
  })(config, env);
  return config;
};
