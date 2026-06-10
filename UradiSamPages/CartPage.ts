import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {

    cartButton;
    checkoutButton;

    constructor(page: Page) {
        super(page);

        this.cartButton = page.locator('#topcartbutton');
        this.checkoutButton = page.locator('#usCheckoutBtn');
    }

    async openCart() {
        await this.cartButton.click();
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
}