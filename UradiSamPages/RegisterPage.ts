import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegisterPage extends BasePage {

    accountButton;
    registerLink;
    firstName;
    lastName;
    email;
    password;
    confirmPassword;
    registerButton;

    constructor(page: Page) {
        super(page);

        this.accountButton = page.locator('button.us-acc-btn');
        this.registerLink = page.getByText('ovde');

        this.firstName = page.locator('#FirstName');
        this.lastName = page.locator('#LastName');
        this.email = page.locator('#Email');
        this.password = page.locator('#Password');
        this.confirmPassword = page.locator('#ConfirmPassword');
        this.registerButton = page.locator('#register-button');
    }

    async openLoginPage() {
        await this.accountButton.click();
    }

    async openRegisterPage() {
        await this.registerLink.click();
    }

    async fillRegistrationForm() {
        await this.firstName.fill('Test');
        await this.lastName.fill('User');
        await this.email.fill(`test${Date.now()}@mail.com`);
        await this.password.fill('Test1234');
        await this.confirmPassword.fill('Test1234');
    }

    async submitRegistration() {
        await this.registerButton.click();
    }
}