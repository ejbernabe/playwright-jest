import { Page } from "playwright";

export default class Common {

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    toaster = async () => await this.page.waitForSelector("div[role='alertdialog']");

    public async verifyToast() {
        
    }

    public get closeButton() {
        return this.page.$("//button[@aria-label='Close']");
    }

    public async closeToaster() { 
        const ele = await this.closeButton;
        await ele?.click();
    }
}