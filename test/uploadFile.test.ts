import { chromium } from "playwright";

describe('Upload File', () => {
    const filePath = 'videos/bc03a6ba48623e72c8210f7d7619eadf.webm';

    test('upload using input files', async () => {
        const browser = await chromium.launch({
            headless: false
        });

        const context = await browser.newContext();
        const page = await context.newPage();

        const redirect = await page.goto("https://www.sendgb.com");

        await page.setInputFiles("input[name='qqfile']", filePath);
    });
});