const { test, expect } = require('@playwright/test');

// 我们本地接口服务的地址
const BASE = 'http://localhost:3000';

test('登录接口：正确账号返回 token', async ({ request }) => {
  const response = await request.post(`${BASE}/api/login`, {
    data: { username: 'shop_user', password: 'password123' },
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.token).toBeTruthy();
  expect(body.user).toBe('shop_user');
});

test('登录接口：密码错误返回 401', async ({ request }) => {
  const response = await request.post(`${BASE}/api/login`, {
    data: { username: 'shop_user', password: 'wrong' },
  });
  expect(response.status()).toBe(401);
});

test('商品接口：返回 3 个商品', async ({ request }) => {
  const response = await request.get(`${BASE}/api/products`);
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.products).toHaveLength(3);
});
test('不存在的接口返回 404', async ({ request }) => {
  const response = await request.get(`${BASE}/api/not-exist`);
  expect(response.status()).toBe(404);
});
