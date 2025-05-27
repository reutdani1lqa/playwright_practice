import { test, expect } from '@playwright/test';

test.describe('Тестирование формы регистрации', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/steps');
  });

  test('Проверка полного цикла регистрации', async ({ page }) => {
    // Тест проверяет полный цикл работы с формой:
    // 1. Начальное состояние
    // 2. Негативные сценарии
    // 3. Успешную регистрацию
    // 4. Проверку профиля
    // 5. Выход из системы

    // Создай test.step ПРЕДУСЛОВИЯ: Проверить начальное состояние формы
    // В рамках шага выполни проверки
    // Что проверяем:
    // - Все поля формы пустые
    // - Сообщения об ошибке и успехе скрыты
    // - Секция профиля не отображается
    const usernameField = page.locator('#username');
    const emailField = page.locator('#email');
    const passwordField = page.locator('#password');
    const submitButton = page.locator('#register-btn');
    const errorMessage = page.locator('#error-message');
    const successMessage = page.locator('#success-message');
    const profileSection = page.locator('.profile-section');

    await test.step('Проверка на начальное состояние', async () => {
      await expect(usernameField).toBeVisible();
      await expect(usernameField).toBeEmpty();

      await expect(passwordField).toBeVisible();
      await expect(passwordField).toBeEmpty();

      await expect(emailField).toBeVisible();
      await expect(emailField).toBeEmpty();

      await expect(submitButton).toBeVisible();

      await expect(successMessage).toBeHidden();
      await expect(errorMessage).toBeHidden();

      await expect(profileSection).toHaveClass(/hidden/);
    });

    // Создай test.step ШАГ 1: Попытка регистрации с пустыми полями
    // В рамках шага выполни проверки
    // Что выполняем:
    // - Нажимаем кнопку без заполнения полей
    // Что проверяем:
    // - Появилось сообщение о необходимости заполнить все поля
    // - Сообщение об успехе осталось скрытым

    await test.step('Регистрация с пустыми полями', async () => {
      await submitButton.click();

      await expect(errorMessage).not.toHaveClass(/hidden/);
      await expect(successMessage).toHaveClass(/hidden/);
    });

    // Создай test.step ШАГ 2: Попытка регистрации с некорректными данными
    // В рамках шага выполни проверки
    // Что выполняем:
    // - Заполняем имя пользователя
    // - Вводим email без @
    // - Вводим слишком короткий пароль
    // Что проверяем:
    // - Соответствующие сообщения об ошибках

    await test.step('Регистрация с некорректными данными', async () => {
      await usernameField.fill('John Doe');
      await expect(usernameField).toHaveValue('John Doe');

      await emailField.fill('johndoegmail.com');
      await expect(emailField).toHaveValue('johndoegmail.com');

      await passwordField.fill('123');
      await expect(passwordField).toHaveValue('123');

      await submitButton.click();

      await expect(errorMessage).toHaveText('Пароль должен быть не менее 6 символов');
      await expect(errorMessage).toBeVisible();
    });

    // Создай test.step ШАГ 3: Успешная регистрация
    // В рамках шага выполни проверки
    // Что выполняем:
    // - Заполняем все поля корректными данными
    // Что проверяем:
    // - Исчезло сообщение об ошибке
    // - Появилось сообщение об успехе
    // - Отобразилась секция профиля

    await test.step('Регистрация с валидными данными', async () => {
      await usernameField.fill('Ivan Ivanovich');
      await expect(usernameField).toHaveValue('Ivan Ivanovich');

      await emailField.fill('ivan2ivanovich@gmail.com');
      await expect(emailField).toHaveValue('ivan2ivanovich@gmail.com');

      await passwordField.fill('010180');
      await expect(passwordField).toHaveValue('010180');

      await submitButton.click();

      await expect(successMessage).toContainText('Регистрация завершена!');
      await expect(errorMessage).not.toBeVisible();

      await expect(profileSection).toBeVisible({ timeout: 15000 });
      await expect(profileSection).not.toHaveClass(/hidden/, { timeout: 1500 });
    });

    // Создай test.step ШАГ 4: Проверка данных профиля
    // В рамках шага выполни проверки
    // Что проверяем:
    // - Данные в профиле соответствуют введенным при регистрации

    await test.step('Проверка данных учетной записи в профиле', async () => {
      const profileUsername = page.locator('#profile-username');
      const profileEmail = page.locator('#profile-email');

      await expect(profileUsername).toContainText('Ivan Ivanovich');
      await expect(profileEmail).toContainText('ivan2ivanovich@gmail.com');
    });

    // Создай test.step ШАГ 5: Выход из системы
    // В рамках шага выполни проверки
    // Что выполняем:
    // - Нажимаем кнопку выхода
    // Что проверяем:
    // - Форма регистрации сброшена
    // - Секция профиля скрыта

    await test.step('Выход из системы(профиля)', async () => {
      const logoutButton = page.locator('#logout-btn');
      await logoutButton.click();

      await expect(profileSection).not.toBeVisible();
      await expect(profileSection).toHaveClass(/hidden/);
    });
  });

  // Демонстрационный тест
  test.describe('Параметризованные тесты регистрации', () => {
    const testCases = [
      {
        title: 'Короткий пароль (5 символов)',
        data: { username: 'user1', email: 'user1@test.com', password: '12345' },
        expectedError: 'Пароль должен быть не менее 6 символов',
      },
    ];

    for (const testCase of testCases) {
      test(testCase.title, async ({ page }) => {
        await test.step('ЗАПОЛНЕНИЕ: Ввести тестовые данные', async () => {
          await page.locator('#username').fill(testCase.data.username);
          await page.locator('#email').fill(testCase.data.email);
          await page.locator('#password').fill(testCase.data.password);
        });

        await test.step('ДЕЙСТВИЕ: Отправить форму', async () => {
          await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
        });

        await test.step('ПРОВЕРКА: Сообщение об ошибке', async () => {
          await expect(page.locator('#error-message')).toBeVisible();
          await expect(page.locator('#error-message')).toContainText(testCase.expectedError);
        });
      });
    }
  });

  // Демонстрационный тест
  test('Вложенные шаги с группами проверок', async ({ page }) => {
    await test.step('ГРУППА: Проверки валидации формы', async () => {
      await test.step('ПУСТЫЕ ПОЛЯ: Отправка пустой формы', async () => {
        await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
        await expect(page.locator('#error-message')).toHaveText(/Все поля обязательны/);
      });

      await test.step('ЧАСТИЧНО ЗАПОЛНЕННАЯ: Только имя пользователя', async () => {
        await page.locator('#username').fill('partialuser');
        await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
        await expect(page.locator('#error-message')).toHaveText(/Все поля обязательны/);
      });
    });

    await test.step('ГРУППА: Проверки успешных сценариев', async () => {
      await test.step('КОРРЕКТНЫЕ ДАННЫЕ: Полное заполнение формы', async () => {
        await page.locator('#username').fill('validuser');
        await page.locator('#email').fill('valid@example.com');
        await page.locator('#password').fill('validpassword123');
        await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
        await expect(page.locator('#success-message')).toBeVisible();
      });
    });
  });
});
