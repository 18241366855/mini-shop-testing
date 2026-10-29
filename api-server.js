const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  // 登录接口：POST /api/login
  if (req.method === 'POST' && req.url === '/api/login') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      let data = {};
      try {
        data = JSON.parse(body);
      } catch (e) {}
      if (data.username === 'shop_user' && data.password === 'password123') {
        res.statusCode = 200;
        res.end(JSON.stringify({ token: 'abc123', user: data.username }));
      } else {
        res.statusCode = 401;
        res.end(JSON.stringify({ error: '用户名或密码错误' }));
      }
    });
    return;
  }

  // 商品列表接口：GET /api/products
  if (req.method === 'GET' && req.url === '/api/products') {
    res.statusCode = 200;
    res.end(
      JSON.stringify({
        products: [
          { id: 1, name: '键盘', price: 99 },
          { id: 2, name: '鼠标', price: 49 },
          { id: 3, name: '显示器', price: 899 },
        ],
      })
    );
    return;
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ error: 'Not Found' }));
});

server.listen(3000, () => {
  console.log('API server running at http://localhost:3000');
});
