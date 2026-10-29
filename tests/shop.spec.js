const { test, expect } = require('@playwright/test');

// 本地靶场地址：用 file:// 打开本地 HTML 文件（不依赖网络）
const URL = 'file:///C:/Users/Administrator/playwright-learning/app/index.html';

test('正常用户能登录并看到 3 个商品', async ({ page }) => {
  await page.goto(URL);
  await page.locator('#username').fill('shop_user');
  await page.locator('#password').fill('password123');
  await page.locator('#login-btn').click();
  await expect(page.locator('#shop-page')).toBeVisible();
  await expect(page.locator('.product')).toHaveCount(3);
});

test('密码错误时提示"用户名或密码错误"', async ({ page }) => {
  await page.goto(URL);
  await page.locator('#username').fill('shop_user');
  await page.locator('#password').fill('wrong');
  await page.locator('#login-btn').click();
  await expect(page.locator('#error')).toHaveText('用户名或密码错误');
});
test('加入购物车后数量变成 1', async ({ page }) => {
  await page.goto(URL);
  await page.locator('#username').fill('shop_user');
  await page.locator('#password').fill('password123');
  await page.locator('#login-btn').click();
  await page.locator('.add-btn').first().click();
  await expect(page.locator('#cart-count')).toHaveText('1');
});
test('给所有商品加入购物车，数量应等于商品数', async ({ page }) => {
  await page.goto(URL);
  await page.locator('#username').fill('shop_user');
  await page.locator('#password').fill('password123');
  await page.locator('#login-btn').click();

  const addButtons = page.locator('.add-btn');
  const productCount = await addButtons.count();

  for (let i = 0; i < productCount; i++) {
    await addButtons.nth(i).click();
  }

  await expect(page.locator('#cart-count')).toHaveText(String(productCount));
});
test('单独给显示器加入购物车，数量应变 1', async ({ page }) => {
  await page.goto(URL);
  await page.locator('#username').fill('shop_user');
  await page.locator('#password').fill('password123');
  await page.locator('#login-btn').click();
  await page.locator('.add-btn').nth(2).click();
  await expect(page.locator('#cart-count')).toHaveText('1');
});
