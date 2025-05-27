import { test, expect } from '@playwright/test';
import { compileFunction } from 'vm';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tohaveurl');
});

test('1. Проверка изменения URL при навигации', async ({ page }) => {
  // Задание: Проверить изменение URL при клике по ссылкам
  // 1. Нажать на ссылку "О нас"
  // 2. Проверить что URL изменился и содержит "#about"
  // 3. Нажать на ссылку "Контакты"
  // 4. Проверить что URL изменился и содержит "#contacts"
  // 5. Нажать на ссылку "Главная"
  // 6. Проверить что URL снова содержит "#home"

  const aboutLink = page.locator('#about-link');
  await aboutLink.click();
  await expect(page).toHaveURL(/.*#about$/);

  const contactsLink = page.locator('#contacts-link');
  await contactsLink.click();
  await expect(page).toHaveURL(/.*#contacts$/);

  const mainLink = page.locator('#home-link');
  await mainLink.click();
  await expect(page).toHaveURL(/.*#home$/);
});

test('2. Проверка URL при программной навигации', async ({ page }) => {
  // Задание: Проверить URL после программного перехода
  // 1. Нажать кнопку "Перейти в раздел"
  // 2. Проверить что URL изменился на "#contacts"
  // 3. Нажать кнопку "Вернуться назад" (back() в истории)
  // 4. Проверить что URL вернулся к "#home"

  const redirectButton = page.locator('#redirect-btn');
  const backButton = page.locator('#back-btn');
  await redirectButton.click();

  await expect(page).toHaveURL(/.*#contacts$/);
  await backButton.click();

  await expect(page).toHaveURL(/.*#home$/);
});

test('3. Проверка URL после ручного ввода', async ({ page }) => {
  // Задание: Проверить обработку ручного ввода URL
  // 1. Перейти напрямую по URL с хешем "#about"
  // 2. Проверить что страница отображает раздел "О нас"
  // 3. Проверить что URL содержит "#about"
  // 4. Обновить страницу
  // 5. Проверить что URL сохранился с "#about"

  await page.goto('https://osstep.github.io/assertion_tohaveurl#about');

  const aboutLink = page.locator('#about-link');
  await expect(aboutLink).toBeVisible();

  await expect(page).toHaveURL(/.*#about$/);
  await page.reload();
  await expect(page).toHaveURL(/.*#about$/);
});
