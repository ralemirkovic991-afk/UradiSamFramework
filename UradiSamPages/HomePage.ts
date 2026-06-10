import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {

    searchInput;
    searchButton;
    logo;
    cartButton;
    searchResult;

    constructor(page: Page) {
        super(page);

        this.searchInput = page.locator('#small-searchterms');
        this.searchButton = page.locator('#usSearchBtn');
        this.logo = page.locator('img[alt="logo"]');
        this.cartButton = page.locator('#topcartbutton');
        this.searchResult = page.locator('.us-sc-title');
    }

    async openHomePage() {
        await this.page.goto('https://www.uradi-sam.rs/');
    }

    async checkMainMenu() {
        await expect(this.searchInput).toBeVisible();
        await expect(this.searchButton).toBeVisible();
        await expect(this.logo).toBeVisible();
        await expect(this.cartButton).toBeVisible();
    }

    async searchProduct(product: string) {
        await this.searchInput.fill(product);
        await this.searchButton.click();
    }

    async checkSearchResult(text: string) {
        await expect(this.searchResult).toContainText(text);
    }
}