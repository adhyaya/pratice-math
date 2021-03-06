module.exports = (config, { dev, isServer }) => {
  const _config = config;
  if (dev) {
    _config.module.rules.push(
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          // eslint options (if necessary)
        },
      },
    );
  }

  if (isServer) {
    const antStyles = /antd\/.*?\/style.*?/;
    const origExternals = [..._config.externals];
    _config.externals = [
      (context, request, callback) => {
        if (request.match(antStyles)) return callback();
        if (typeof origExternals[0] === 'function') {
          origExternals[0](context, request, callback);
        } else {
          return callback();
        }
      },
      ...(typeof origExternals[0] === 'function' ? [] : origExternals),
    ];

    _config.module.rules.unshift({
      test: antStyles,
      use: 'null-loader',
    });
  }
  return _config;
};
