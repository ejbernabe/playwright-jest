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

        await page.goto("https://www.letcode.in/dropdowns");
    })

    xtest('select dropdown based on VALUE', async () => {
        const fruits = await page.$("#fruits")

        // by label
        const value = "Apple";
        // await fruits?.selectOption({label: value});

        // by value
        // await fruits?.selectOption(value);

        const msg = await page.$("div.notification.is-success");
        if (msg) {
            expect(await msg.textContent()).toContain(value)
        }
    });

    xtest('select multiple', async () => {
        const multiple = await page.$("#superheros");
        multiple?.selectOption([
            { label: "Aquaman" },
            { value: "bt" },
            { index: 5}
        ])

    });

    test('count of options', async () => {
        const language = await page.$$("#lang option");
        console.log("lang length: " + language.length);
    });

    test('validate selected text', async () => {
        const select = await page.$("#country");
        await select?.selectOption({label: "Peru"});
        const text = await page.$eval<string, HTMLSelectElement>("#country", ele => ele.value);
        console.log("text: " + text)

        expect(text).toBe("Peru");
    });

    afterAll(async () => {
        await page.pause();
        await page.close();
        await context.close();
        await browser.close();
    })
});