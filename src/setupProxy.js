const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/auth',
        createProxyMiddleware({
            target: 'http://54.88.152.249:8080',
            changeOrigin: true,
        })
    ); 
    app.use(
        ['/post', '/posts', '/blog'],
        createProxyMiddleware({
            target: 'http://3.35.166.179:8080',
            changeOrigin: true,
        })
    );
    app.use(
        '/recommendation',
        createProxyMiddleware({
            target: 'http://172.16.213.33:8080',
            changeOrigin: true,
        })
    );
};