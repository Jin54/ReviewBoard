const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/',
        createProxyMiddleware({
            target: 'https://3.35.140.28:9000',
            changeOrigin: true,
        })
    );
};
