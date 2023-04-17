
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://fractltest-env.eba-mpaszmqa.us-east-1.elasticbeanstalk.com',
      changeOrigin: true,
      secure: false
    })
  );
};