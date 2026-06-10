import { Page } from '@playwright/test';

import { HomePage } from '../UradiSamPages/HomePage';
import { RegisterPage } from '../UradiSamPages/RegisterPage';
import { LoginPage } from '../UradiSamPages/LoginPage';
import { CartPage } from '../UradiSamPages/CartPage';
import { CheckoutPage } from '../UradiSamPages/CheckOutPage';

export class BaseTest {

    homePage;
    registerPage;
    loginPage;
    cartPage;
    checkoutPage;

    constructor(page: Page) {

        this.homePage = new HomePage(page);
        this.registerPage = new RegisterPage(page);
        this.loginPage = new LoginPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutPage = new CheckoutPage(page);
    }
}