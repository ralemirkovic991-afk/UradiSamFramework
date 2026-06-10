import { test, expect } from '@playwright/test';
import { HomePage } from '../UradiSamPages/HomePage';
import { RegisterPage } from '../UradiSamPages/RegisterPage';
import { LoginPage } from '../UradiSamPages/LoginPage';
import { CartPage } from '../UradiSamPages/CartPage';
import { CheckoutPage } from '../UradiSamPages/CheckOutPage';


//TEST SCENARIO 1 - UČITAVANJE POČETNE STRANICE
test('TC-001 Provera učitavanja glavne stranice', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.openHomePage();
});

test('TC-002 Provera prikaza glavnog menija', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.openHomePage();
    await homePage.checkMainMenu();
});

//TEST SCENARIO 2 - PRETRAGA PROIZVODA

test('TC-003 Pretraga postojećeg proizvoda', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.openHomePage();
    await homePage.searchProduct('cipelarnik');
    await homePage.checkSearchResult('Cipelarnik');
});

test('TC-004 Pretraga nepostojećeg proizvoda', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.openHomePage();
    await homePage.searchProduct('asdf');
    await expect(page.locator('.no-result')).toBeVisible();
});


//TEST SCENARIO 3 - REGISTRACIJA I PRIJAVA KORISNIKA

test('TC-005 Registracija korisnika', async ({ page }) => {
    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);
    await homePage.openHomePage();
    await registerPage.openLoginPage();
    await registerPage.openRegisterPage();
    await registerPage.fillRegistrationForm();
    await registerPage.submitRegistration();
});

test('TC-006 Login korisnika', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    await homePage.openHomePage();
    await loginPage.openLoginPage();
    await expect(page).toHaveURL(/login/);
    await loginPage.login(
        'rastkomirkovic530@gmail.com',
        'Rm34567'
    );
    await expect(page).toHaveURL(/customer\/info/);
});

test('TC-007 Login sa nevalidnim kredencijalima', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    await homePage.openHomePage();
    await loginPage.openLoginPage();
    await expect(page).toHaveURL(/login/);
    await loginPage.login(
        'pogresanmail@gmail.com',
        'pogresnaSifra'
    );
    await expect(
        page.getByText('Nalog kupca nije pronađen')
    ).toBeVisible();
});


// TEST SCENARIO 4 - DODAVANJE PROIZVODA U KORPU
test('TC-008 Dodavanje proizvoda u korpu i kupovina', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    await homePage.openHomePage();
    await homePage.searchProduct('cipelarnik');
    await expect(page).toHaveURL(/q=cipelarnik/);
    await page.locator('button.us-sc-buy-btn').click();
    await cartPage.openCart();
    await expect(page).toHaveURL(/cart/);
    await cartPage.proceedToCheckout();
});


// TEST SCENARIO 5 - PROCES KUPOVINE
test('TC-010 Kupovina proizvoda', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await homePage.openHomePage();
    await homePage.searchProduct('cipelarnik');
    await expect(page).toHaveURL(/q=cipelarnik/);
    await page.locator('button.us-sc-buy-btn').click();
    await cartPage.openCart();
    await expect(page).toHaveURL(/cart/);
    await cartPage.proceedToCheckout();
    await checkoutPage.acceptTerms();
    await checkoutPage.goToBilling();
});