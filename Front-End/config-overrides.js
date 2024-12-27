const path = require('path');

module.exports = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@layouts': path.resolve(__dirname, 'src/app/layouts'),
      '@pages': path.resolve(__dirname, 'src/app/pages'),
      '@components': path.resolve(__dirname, 'src/app/components'),
      '@contexts': path.resolve(__dirname, 'src/app/contexts'),
      '@routes': path.resolve(__dirname, 'src/app/routes'),
      '@store': path.resolve(__dirname, 'src/app/store'),
      '@styles': path.resolve(__dirname, 'src/app/styles'),
      '@utils': path.resolve(__dirname, 'src/app/utils'),
    };

    config.ignoreWarnings = [
      /Failed to parse source map/
    ]

    return config;
  },

  devServer: (configFunction) => {
    return (proxy, allowedHost) => {
      const config = configFunction(proxy, allowedHost);

      config.setupMiddlewares = (middlewares, devServer) => {
        if (devServer) {
          devServer.app.use((req, res, next) => {
            next();
          });
        }
        return middlewares;
      };

      return config;
    };
  },
};