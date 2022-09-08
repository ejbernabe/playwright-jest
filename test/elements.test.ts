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

        const header = await page.$("nav[role='navigation']");
        header?.screenshot({ path: "images/header.png" })

        const username = await page.$("input[name='username']");

        await username?.fill("ejbernabe");
        await username?.press("Enter");
    });

    test('Print all repos', async () => {
        await page.waitForSelector("app-gitrepos ol li");
        const repos = await page.$$("app-gitrepos ol li");
    
        console.log("no of repos: " + repos.length);

        // for await
        for await (const repo of repos) {
            console.log("text: " + await repo.innerText());
        }

        // map to 1 array
        const allUrls = await Promise.all(repos.map(async (repo, i) => {
            return await repo.innerText()
        }));

        console.log("allUrls: " + allUrls);
        console.log("allUrls index 0: " + allUrls[0]);

        await page.screenshot({
            path: "images/full.png",
            fullPage: true
        })
    });

    afterEach( async () => {
        await page.screenshot({
            path: "images/" + Date.now() + "_screenshot1.png"
            // path: "../images/screenshot1.png"
        })
    })

   
    afterAll(async () => {
        // await page.pause();
        await page.close();
        await context.close();
        await browser.close();
    })
});