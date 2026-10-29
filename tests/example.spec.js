const { test, expect } = require('@playwright/test');

test('本地 todo 页面：添加一条待办并检查它出现', async ({ page }) => {
  await page.setContent(`
    <html>
      <body>
        <h1>我的待办</h1>
        <input id="i" placeholder="要做什么？">
        <button id="b">添加</button>
        <ul id="l"></ul>
        <script>
          document.getElementById("b").addEventListener("click", function () {
            var t = document.getElementById("i");
            var li = document.createElement("li");
            li.textContent = t.value;
            document.getElementById("l").appendChild(li);
            t.value = "";
          });
        </script>
      </body>
    </html>
  `);

  // 1. 用"角色"定位标题，断言文字
  await expect(page.getByRole('heading')).toHaveText('我的待办');

  // 2. 在输入框里输入待办内容
  await page.getByPlaceholder('要做什么？').fill('复习测试');

  // 3. 点"添加"按钮
  await page.getByRole('button', { name: '添加' }).click();

  // 4. 断言列表里出现了这条待办
  await expect(page.getByText('复习测试')).toBeVisible();
});
