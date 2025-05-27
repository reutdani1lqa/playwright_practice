import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tocontaintext');
});

test('1. Проверка статического текста', async ({ page }) => {
  // Задание: Проверить, что статический текстовый блок содержит определенные подстроки
  // 1. Найти элемент #static-text
  // 2. Проверить что он содержит текст "static text block"
  // 3. Проверить что он содержит текст "important information"
  // 4. Проверить что он НЕ содержит текст "dynamic content"

  const statEl = page.locator('#static-text');
  await expect(statEl).toContainText('static text block');
  await expect(statEl).toContainText('important information');
  await expect(statEl).not.toContainText('dynamic content');
});

test('2. Проверка динамически изменяемого текста', async ({ page }) => {
  // Задание: Проверить изменение динамического текста
  // 1. Найти элемент #dynamic-text и проверить что он содержит "Initial dynamic text"
  // 2. Нажать кнопку #change-text
  // 3. Проверить что текст теперь содержит "Text was changed at"
  // 4. Нажать кнопку #add-part
  // 5. Проверить что текст теперь содержит "(additional part)"

  const dynText = page.locator('#dynamic-text');
  await expect(dynText).toContainText('Initial dynamic text');

  const changeBut = page.locator('#change-text');
  await changeBut.click();
  await expect(dynText).toContainText('Text was changed at');

  const addBut = page.locator('#add-part');
  await addBut.click();
  await expect(dynText).toContainText('additional part');
});

test('3. Проверка списка элементов', async ({ page }) => {
  // Задание: Проверить содержимое списка
  // 1. Найти элемент #item-list
  // 2. Проверить что он содержит текст "Item 1: Basic"
  // 3. Проверить что он содержит текст "Intermediate"
  // 4. Нажать кнопку #add-item
  // 5. Проверить что список теперь содержит текст "New added item"

  const itemList = page.locator('#item-list');
  await expect(itemList).toContainText('Item 1: Basic');
  await expect(itemList).toContainText('Intermediate');

  const addItemBut = page.locator('#add-item');
  await addItemBut.click();
  await expect(itemList).toContainText('New added item');
});

test('4. Проверка скрытого/отображаемого текста', async ({ page }) => {
  // Задание: Проверить отображение скрытого текста
  // 1. Найти элемент #hidden-content и проверить что он не видим
  // 2. Нажать кнопку #toggle-text
  // 3. Проверить что элемент теперь содержит текст "special content"
  // 4. Проверить что элемент содержит текст "hidden but now is visible"

  const hidCont = page.locator('#hidden-content');
  await expect(hidCont).toBeHidden();

  const startBut = page.locator('#toggle-text');
  await startBut.click();

  await expect(hidCont).toContainText('special content');
  await expect(hidCont).toContainText('hidden but now is visible');
});

test('5. Проверка частичного совпадения в длинном тексте', async ({ page }) => {
  // Задание: Проверить частичные совпадения в длинном тексте
  // 1. Найти элемент #partial-text
  // 2. Проверить что он содержит "quick brown fox"
  // 3. Проверить что он содержит "lazy dog"
  // 4. Проверить что он содержит "all letters of the English alphabet"
  // 5. Проверить что он НЕ содержит "all letters of the Russian alphabet"

  const longText = page.locator('#partial-text');
  await expect(longText).toContainText('quick brown fox');
  await expect(longText).toContainText('lazy dog');
  await expect(longText).toContainText('all letters of the English alphabet');
  await expect(longText).not.toContainText('all letters of the Russian alphabet');
});
