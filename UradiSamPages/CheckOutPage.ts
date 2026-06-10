import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {

    acceptTermsCheckbox;
    billingNextButton;

    constructor(page: Page) {
        super(page);

        this.acceptTermsCheckbox = page.locator('#accept_terms');
        this.billingNextButton = page.locator('#billingaddress-next-button');
    }

    async acceptTerms() {
        await this.acceptTermsCheckbox.click();
    }

    async goToBilling() {
        await this.billingNextButton.click();
    }
}