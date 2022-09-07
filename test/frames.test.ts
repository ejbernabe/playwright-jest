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

        await page.goto("https://www.letcode.in/frame");
    })

    test("frames testing", async () => {
        const firstFr = await page.frame({
            name: "firstFr"
        })

        if (firstFr != null) {
           await firstFr?.fill("input[name='fname']", "first name")
            await firstFr?.fill("input[name='lname']", "last name")

            const frames = firstFr.childFrames();

            if(frames != null){
                await frames[0].fill("input[name='email']", "test@.com") 
            }
                
        } else {
            console.log("no such frame")
        }
        
    })

   
    afterAll(async () => {
        await page.pause();
        await page.close();
        await context.close();
        await browser.close();
    })
});