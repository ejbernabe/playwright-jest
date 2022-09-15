import { Browser, BrowserContext, chromium, Page } from "playwright";
import Common from "../pages/common.page";
import HeaderPage from "../pages/Header.page";
import LoginPage from "../pages/Login.page";
import Env from "../utils/environment";



describe('POM testing', () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    let header: HeaderPage;
    let login: LoginPage;
    let common: Common;

    beforeAll(async() => {
        browser = await chromium.launch({
            headless: false
        });

        context = await browser.newContext();
        page = await context.newPage();
        
        // page.goto(Env.test);

        page.goto(Env.test, {
            timeout: 100000, 
            waitUntil: "load"
        });

        // page.setDefaultTimeout(1000000)

        // page.waitForNavigation()
        // page.waitForLoadState("domcontentloaded")
        await page.waitForURL(Env.test, {
            waitUntil: "load"
        })

        // pages
        header = new HeaderPage(page);
        login = new LoginPage(page);
        common= new Common(page);
    })

    test('Login positive', async () => {
        expect(page.url()).toBe("https://letcode.in/");

        await header.clickLogin();

        expect(page.url()).toBe("https://letcode.in/signin");

        await login.enterUsername("koushik1@letcode.in");
        await login.enterPass("Pass123$");
        await login.clickLogin();

        const toaster = await common.toaster;
        expect( await toaster?.textContent()).toContain("Welcome");
        await common.closeToaster();

        await header.clickSignout();
        await page.pause();

    });
    
    afterAll(async () => {
        // await page.pause();
        await page.close();
        await context.close();
        await browser.close();
    })
})