const withLess = require('@zeit/next-less');
const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');
const getWebpackConfig = require('./webpackConfig');
const runtimeConfig = require('./.env.json');

module.exports = () => {
  const themeVariables = lessToJS(
    fs.readFileSync(path.resolve(__dirname, './assets/styles/variables.less'), 'utf8'),
  );

  // fix: prevents error when .less files are required by node
  if (typeof require !== 'undefined') {
    require.extensions['.less'] = () => {};
  }

  let config = {
    webpack: getWebpackConfig,
    publicRuntimeConfig: runtimeConfig,
  };
  // console.log('====>', config);

  config = withLess({
    ...config,
    lessLoaderOptions: {
      modifyVars: themeVariables,
      javascriptEnabled: true,
    },
  });
  return config;
};
