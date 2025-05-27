const { test, expect } = require('@playwright/test');

test.describe('Тестирование видимости элементов с toBeVisible()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/assertion_tobevisible');
  });

  test('Базовый тест видимости элемента', async ({ page }) => {
    // Задание 1: Проверка видимости элемента
    // 1. Найти элемент с id "always-visible"
    // 2. Проверить что элемент видим с помощью toBeVisible()
    // 3. Проверить что элемент содержит текст "Всегда видимый элемент"
    const alwaysVisEl = page.locator('#always-visible');
    await expect(alwaysVisEl).toBeVisible();
    await expect(alwaysVisEl).toHaveText('Всегда видимый элемент');
  });

  test('Тест элементов с разными типами скрытия', async ({ page }) => {
    // Задание 2: Проверка скрытых элементов
    // 1. Найти три элемента с разными способами скрытия:
    //    - #toggle-display (display: none)
    //    - #toggle-visibility (visibility: hidden)
    //    - #toggle-opacity (opacity: 0)
    // 2. Проверить что #toggle-display и #toggle-visibility не видны с помощью not.toBeVisible()
    // 3. Проверить что #toggle-opacity виден с помощью toBeVisible()
    const elDisNone = page.locator('#toggle-display');
    await expect(elDisNone).toHaveCSS('display', 'none');

    const elVisHid = page.locator('#toggle-visibility');
    await expect(elVisHid).toHaveCSS('visibility', 'hidden');

    const elTogPoacity = page.locator('#toggle-opacity');
    await expect(elTogPoacity).toHaveCSS('opacity', '0');

    await expect(elDisNone).not.toBeVisible();
    await expect(elVisHid).not.toBeVisible();
    await expect(elTogPoacity).toBeVisible();
  });

  test('Тест изменения видимости элементов', async ({ page }) => {
    // Задание 3: Проверка изменения видимости
    // 1. Найти три кнопки для показа элементов:
    //    - #show-display
    //    - #show-visibility
    //    - #show-opacity
    // 2. Кликнуть по каждой кнопке
    // 3. После каждого клика проверить:
    //    - что соответствующий элемент стал видимым (toBeVisible())
    //    - что CSS свойства изменились на:
    //      - display: block
    //      - visibility: visible
    //      - opacity: 1

    const showDis = page.locator('#show-display');
    const showVis = page.locator('#show-visibility');
    const showOpac = page.locator('#show-opacity');

    await showDis.click();
    await showVis.click();
    await showOpac.click();

    await expect(showDis).toBeVisible();
    await expect(showVis).toBeVisible();
    await expect(showOpac).toBeVisible();

    await expect(showDis).toHaveCSS('display', 'inline-block');
    await expect(showVis).toHaveCSS('visibility', 'visible');
    await expect(showDis).toHaveCSS('opacity', '1');
  });

  test('Тест элемента с задержкой появления', async ({ page }) => {
    // Задание 4: Проверка элемента с задержкой
    // 1. Найти элемент #delayed-element
    // 2. Проверить что он не видим
    // 3. Найти кнопку #show-delayed и кликнуть по ней
    // 4. С таймаутом 3 секунды дождаться появления элемента
    // 5. Проверить что элемент содержит текст "Элемент с задержкой появления"

    const delayEl = page.locator('#delayed-element');
    await expect(delayEl).not.toBeVisible();

    const delayBut = page.locator('#show-delayed');
    await delayBut.click();
    await expect(delayEl).toBeVisible({ timeout: 3000 });
    await expect(delayEl).toHaveText('Элемент с задержкой появления');
  });
});
