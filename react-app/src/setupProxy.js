const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/tm',{
            "target": "http://34.125.253.188:38080",
            changeOrigin: true,
        })
    );
};