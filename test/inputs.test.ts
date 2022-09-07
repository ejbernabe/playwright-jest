import { Browser, BrowserContext, chromium, Page } from "playwright";


describe('input fields', () => {
    
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    beforeAll(async() => {
        browser = await chromium.launch({
            headless: false
        });

        context = await browser.newContext();

        page = await context.newPage();

        await page.goto("https://www.letcode.in/edit");
    })

    xtest('full name', async () => {
        // option 1

        const fullName = await page.$("#fullName");
        await fullName?.type("Ej Bernabe");


        // option 2
        // page.type("id=fullName", "Ej Bernabe 2")
    });

    xtest('focus + type', async () => {
        const join = await page.$("#join");
        await join?.focus();
        await join?.type("Human");
    })

    xtest('focus + fill', async () => {
        const join = await page.$("#join");
        await join?.focus();
        await join?.fill("Human Fill");
        
    });

    xtest('append text', async () => {
        const join = await page.$("#join");
        await join?.focus();

        page.keyboard.press("End");
        await join?.type(" Human");
    });

    afterAll(async () => {
        await page.pause();
        await page.close();
        await context.close();
        await browser.close();
    })
});

// const headless = false;

// let browser: Browser;
// let context: BrowserContext;
// let page: Page;

// let redirect;

// test('', async () => {
//     browser = await chromium.launch({
//         headless: headless
//     });

//     context = await browser.newContext({
//         recordVideo: {
//             dir: "../../videos"
//         }
//     });
//     page = await context.newPage();

//     page.goto("https://www.letcode.in/edit");

//     page.waitForNavigation();
// })

// describe('handling input fields', () => {

//     beforeEach(() => {
//         page.waitForLoadState('domcontentloaded')
//     })

//     test('Full Name', async () => {
//         // await page.type("id=fullName", "Ej Bernabe");
//         const fullNameField = await page.$("#fullName");

//         await fullNameField?.type("Ej Bernabe");

//     });

//     test('Test then Tab', async () => {
//         const join = await page.$("#join");

//         await join?.type("Human");
//         await join?.fill("Human");
//     })

    

// });

// // afterAll(() => {
// //     browser.close();
// // })