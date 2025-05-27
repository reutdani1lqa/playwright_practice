import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly cartTotal: Locator;
  readonly backLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart-item');
    this.cartTotal = page.locator('#cart-total');
    this.backLink = page.locator('.back-link');
  }

  async navigate() {
    this.page.goto('https://osstep.github.io/cart');
  }

  async getItemCount(cartItems): Promise<number> {
    return this.cartItems.count();
  }

  async getItemByName(name: string): Promise<Locator> {
    return this.page.locator(`.cart-item:has-text("${name}")`);
  }

  async removeItem(name: string): Promise<void> {
    const product = await this.getItemByName(name);
    await product.locator('.remove-item').click();
  }

  async getTotalPrice(): Promise<string | null> {
    return this.cartTotal.textContent();
  }

  async goBackToProducts(): Promise<void> {
    await this.backLink.click();
  }

  async isItemInCart(name: string): Promise<boolean> {
    const item = this.getItemByName(name);
    return (await item).isVisible();
  }
}
