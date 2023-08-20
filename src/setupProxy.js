const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // Replace with your API endpoint
    createProxyMiddleware({
      target: 'https://openlibrary.org', // Replace with API's domain
      changeOrigin: true,
    })
  );
};
