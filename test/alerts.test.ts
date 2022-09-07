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

        await page.goto("https://www.letcode.in/alert");
    })

    test('test 1', async () => {
        const element = await page.$("#prompt");

        // question: why listener first before trigger

        page.on("dialog", (dialog) => {
            console.log("Message: " + dialog.message());
            console.log("Default Value: " + dialog.defaultValue());
            console.log("Type:", dialog.type());
            dialog.accept("TEST DIALOG BOX");
            // const defaultValue = dialog.defaultValue()
        })

        await element?.click();
    });

    afterAll(async () => {
        await page.pause();
        await page.close();
        await context.close();
        await browser.close();
    })
});