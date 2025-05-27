import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tohavetext');
});

test('1. Проверка точного соответствия текста', async ({ page }) => {
  // Задание: Проверить точное соответствие текста
  // 1. Найти элемент #exact-text
  // 2. Проверить что его текст точно соответствует:
  //    "This text must match exactly, including punctuation! (100%)"
  // 3. Убедиться что проверка чувствительна к регистру, пробелам и знакам препинания
  // Негативные проверки
  const execrText = page.locator('#exact-text');
  await expect(execrText).toHaveText(
    'This text must match exactly, including punctuation! (100%)',
    {
      ignoreCase: true,
      useInnerText: false,
    },
  );
});

test('2. Проверка работы счетчика', async ({ page }) => {
  // Задание: Проверить точное значение счетчика
  // 1. Найти элемент #counter и проверить что его текст "0"
  // 2. Нажать кнопку #increment
  // 3. Проверить что текст стал "1"
  // 4. Нажать кнопку #reset
  // 5. Проверить что текст снова "0"
  const countEl = page.locator('#counter');
  await expect(countEl).toHaveText('0');

  const incrementButton = page.locator('#increment');
  await incrementButton.click();

  await expect(countEl).toHaveText('1');

  const resetButton = page.locator('#reset');
  await resetButton.click();

  await expect(countEl).toHaveText('0');
});

test('3. Проверка карточки пользователя', async ({ page }) => {
  // Задание: Проверить точные тексты в карточке пользователя
  // 1. Проверить что #username содержит "user_guest"
  // 2. Проверить что #user-email содержит "guest@example.com"
  // 3. Проверить что #user-status содержит "Inactive"
  // 4. Нажать кнопку #activate-user
  // 5. Проверить что все тексты изменились точно:
  //    - username: "user_active"
  //    - email: "active.user@example.com"
  //    - status: "Active"

  const username = page.locator('#username');
  const email = page.locator('#user-email');
  const status = page.locator('#user-status');

  await expect(username).toHaveText('user_guest');
  await expect(email).toHaveText('guest@example.com');
  await expect(status).toHaveText('Inactive');

  const activateButton = page.locator('#activate-user');
  await activateButton.click();

  await expect(username).toHaveText('user_active');
  await expect(email).toHaveText('active.user@example.com');
  await expect(status).toHaveText('Active');
});

test('4. Проверка форматированного текста', async ({ page }) => {
  // Задание: Проверить текст с пробелами и переносами строк
  // 1. Найти элемент #formatted-text
  // 2. Проверить что его текст точно соответствует (включая все пробелы и переносы):
  //    "Text   with   extra   spaces   and\n        line\n        breaks"

  const formatElement = page.locator('#formatted-text');
  await expect(formatElement).toHaveText(
    'Text   with   extra   spaces   and\n        line\n        breaks',
  );
});

test('5. Проверка динамического списка', async ({ page }) => {
  // Задание: Проверить точное содержание списка
  // 1. Найти элемент #items-list
  // 2. Проверить что он содержит точно:
  //    "First item\nSecond item" (для <ul> текст всех элементов объединяется с \n)
  // 3. Нажать кнопку #add-item
  // 4. Проверить что текст теперь: "First item\nSecond item\nItem 3"
  // 5. Нажать #clear-list
  // 6. Проверить что текст стал: "Empty list"

  const itemList = page.locator('#items-list');
  await expect(itemList).toHaveText('First item\nSecond item');

  const addButton = page.locator('#add-item');
  await addButton.click();
  await expect(itemList).toHaveText('First item\nSecond item\nItem 3');

  const resetButton = page.locator('#clear-list');
  await resetButton.click();

  await expect(itemList).toHaveText('Empty list');
});
