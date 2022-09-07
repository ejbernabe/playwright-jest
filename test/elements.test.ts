import { Browser, BrowserContext, chromium, Page } from "playwright";


describe('handling alerts', () => {
    
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    beforeAll(async() => {
        browser = await chromium.launch({
            headless: false
        });

        context = await browser.newContext();

        page = await context.newPage();

        await page.goto("https://www.letcode.in/elements");
    })

    test('Enter Git username', async () => {
        const username = await page.$("input[name='username']");

        await username?.fill("ejbernabe");
        await username?.press("Enter");
    });

    test('Print all repos', async () => {
        await page.waitForSelector("app-gitrepos ol li");
        const repos = await page.$$("app-gitrepos ol li");
    
        console.log("no of repos: " + repos.length);
    });

   
    afterAll(async () => {
        await page.pause();
        await page.close();
        await context.close();
        await browser.close();
    })
});