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

        await page.goto("https://www.letcode.in/windows");
    })

    xtest('Single Page handling', async () => {
        const [newWindow] = await Promise.all([
            context.waitForEvent("page"), 
            await page.click("#home")
        ])

        await newWindow.waitForLoadState()
        expect(newWindow.url()).toContain("test")

        await newWindow.click("'Log in'");
        await newWindow.waitForNavigation();
        expect(newWindow.url()).toContain("signin");

        await newWindow.close();
        await page.click("'LetXPath'")
    });

    test('Multiple Pages handling', async () => {
        const [multipage] = await Promise.all([
            context.waitForEvent("page"),
            await page.click("#multi")
        ])

        await multipage.waitForLoadState();
        const pages = multipage.context().pages();

        console.log("length: " + pages.length);

        pages.forEach(page => {
            console.log(page.url());
        })

        

    });

    // afterAll(async () => {
    //     await page.pause();
    //     await page.close();
    //     await context.close();
    //     await browser.close();
    // })
});