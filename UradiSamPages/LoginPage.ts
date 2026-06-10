import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

    accountButton;
    emailInput;
    passwordInput;
    acceptButton;
    loginButton;

    constructor(page: Page) {
        super(page);

        this.accountButton = page.locator('button.us-acc-btn');

        this.emailInput = page.locator('#Email');
        this.passwordInput = page.locator('#Password');

        this.acceptButton = page.locator('button:has-text("Prihvati")');
        this.loginButton = page.locator('button.us-btn-reg-submit');
    }

    async openLoginPage() {
        await this.accountButton.click();
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);

        await this.acceptButton.click();
        await this.loginButton.click();
    }
}