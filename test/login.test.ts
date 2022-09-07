import { chromium } from "playwright";

describe('Launch Browser', () => {
    test('Open Letcode', async () => {
        const browser = await chromium.launch({
            headless: false
        });
        const context = await browser.newContext();
        // const context = await browser.newContext({
        //     recordVideo: {
        //         dir: "./videos/",
        //         size: {
        //             width: 800,
        //             height: 600
        //         }
        //     }
        // });
        const page = await context.newPage();
        const redirect = await page.goto("https://www.letcode.in/");
        
        await page.click("text='Log in'");
        await page.fill("input[name='email']", 'koushik350@gmail.com');
        await page.fill("input[name='password']", 'Pass123$');

        await page.click("button:text('LOGIN')");

        await page.click("'Sign out'");

        await context.close();
        await browser.close();
    })
});