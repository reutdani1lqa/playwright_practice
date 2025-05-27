import { test, expect } from '@playwright/test';
import { before } from 'node:test';

// Тесты для формы входа
test.describe('Параметризованные тесты формы входа', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/parametrize');
  });
  // Нужно реализовать параметризованный тест на основе массива loginTestCases
  // Шаги теста:
  // 1. Перейти на страницу формы входа
  // 2. Заполнить поле имени пользователя (если не пустое)
  // 3. Заполнить поле пароля
  // 4. Нажать кнопку "Войти"
  // 5. Проверить сообщение системы
  // 6. Проверить класс сообщения (success/error)

  const loginTestCases = [
    {
      username: 'admin',
      password: 'admin123',
      expected: 'Успешный вход!',
    },
    {
      username: '',
      password: 'anypassword',
      expected: 'Все поля обязательны',
    },
    {
      username: 'testuser',
      password: '123',
      expected: 'Пароль должен быть не менее 6 символов',
    },
  ].forEach(({ username, password, expected }) => {
    test(`Тест с данными: ${username || 'пусто'}/${password} → ${expected}`, async ({ page }) => {
      await test.step('Заполнение формы', async () => {
        if (username) {
          await page.getByRole('textbox', { name: 'Имя пользователя' }).fill(username);
        }
        await page.getByRole('textbox', { name: 'Пароль' }).fill(password);

        await page.getByRole('button', { name: 'Войти' }).click();

        const message = page.locator('#message');
        await expect(message).toBeVisible();
        await expect(message).toHaveText(expected);

        const expectedClass = expected === 'Успешный вход!' ? 'success' : 'error';
        await expect(message).toHaveClass(expectedClass);
      });
    });

    // loginTestCases.forEach(({ username, password, expected }) => {
    //   test(`Тест с данными: ${username || 'пусто'}/${password} → ${expected}`, async ({ page }) => {
    //     await test.step('Заполнение формы', async () => {
    //       if (username) {
    //         await page.getByRole('textbox', { name: 'Имя пользователя' }).fill(username);
    //       }
    //       await page.getByRole('textbox', { name: 'Пароль' }).fill(password);

    //       await page.getByRole('button', { name: 'Войти' }).click();

    //       const message = page.locator('#message');
    //       await expect(message).toBeVisible();
    //       await expect(message).toHaveText(expected);

    //       const expectedClass = expected === 'Успешный вход!' ? 'success' : 'error';
    //       await expect(message).toHaveClass(expectedClass);
    //     });
    //   });
  });
});

// Тесты для калькулятора
test.describe('Параметризованные тесты калькулятора', () => {
  const calculatorTestCases = [
    { a: 5, b: 3, operation: 'add', expected: 8 },
    { a: 10, b: 0, operation: 'add', expected: 10 },
    { a: 4, b: 5, operation: 'multiply', expected: 20 },
  ];
  // Нужно реализовать параметризованный тест на основе массива calculatorTestCases
  // Шаги теста:
  // 1. Перейти на страницу калькулятора
  // 2. Ввести первое число
  // 3. Ввести второе число
  // 4. Нажать кнопку операции (сложение/умножение)
  // 5. Проверить результат вычисления

  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/parametrize');
  });

  calculatorTestCases.forEach(({ a, b, operation, expected }) => {
    test(`Тест с данными: ${a}/${b}/${operation} => ${expected}`, async ({ page }) => {
      await test.step('Ввод чисел a и b', async () => {
        await page.fill('#num1', a.toString());
        await page.fill('#num2', b.toString());
      });

      await test.step('Выбор операции', async () => {
        const button = operation === 'add' ? '#add-btn' : '#multiply-btn';
        await page.locator(button).click();
        const result = page.locator('#result');
        await expect(result).toContainText(expected.toString());
      });
    });
  });
});
