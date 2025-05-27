import { Locator, Page } from '@playwright/test';
import { resourceUsage } from 'process';

export class ProductsPage {
  readonly page: Page;
  readonly productCards: Locator;
  readonly cartCount: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = page.locator('.product-card');
    this.cartCount = page.locator('#cart-count');
    this.cartLink = page.locator('#cart-link');
  }

  async navigate() {
    await this.page.goto('https://osstep.github.io/products');
  }

  async getProductByName(name: string) {
    return this.page.locator(`.product-card:has-text("${name}")`);
  }

  async addProductToCart(name: string) {
    const product = await this.getProductByName(name);
    await product.locator('.add-to-cart').click();
  }

  async getCartCount() {
    return await this.cartCount.textContent();
  }

  async goToCart() {
    await this.cartLink.click();
  }
}
