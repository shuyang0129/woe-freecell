const rewireAliases = require('react-app-rewire-aliases');
const { paths } = require('react-app-rewired');
const path = require('path');

/* config-overrides.js */
module.exports = function override(config, env) {
  config = rewireAliases.aliasesOptions({
    '@': path.resolve(__dirname, `${paths.appSrc}/`),
    '@assets': path.resolve(__dirname, `${paths.appSrc}/assets/`),
    '@img': path.resolve(__dirname, `${paths.appSrc}/img/`),
    '@data': path.resolve(__dirname, `${paths.appSrc}/data/`),
    '@constants': path.resolve(__dirname, `${paths.appSrc}/constants/`),
    '@pages': path.resolve(__dirname, `${paths.appSrc}/pages/`),
    '@components': path.resolve(__dirname, `${paths.appSrc}/components/`),
    '@reducers': path.resolve(__dirname, `${paths.appSrc}/reducers/`),
    '@actions': path.resolve(__dirname, `${paths.appSrc}/actions/`),
    '@utils': path.resolve(__dirname, `${paths.appSrc}/utils/`),
  })(config, env);
  return config;
};
