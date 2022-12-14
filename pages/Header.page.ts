import { Page } from "playwright";

export default class HeaderPage {

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // locators

    public get loginButton() {
        const ele = this.page.$("text='Log in'")
        
        if (ele != null) {
            return ele;
        } else {
            throw new Error("No Login Button Found")
        }
    }

    public get signoutButton() {
        const ele = this.page.$("//div[@class='navbar-item']")

        this.page.waitForSelector("//div[@class='navbar-item']")

        if (ele != null) {
            return ele;
        } else {
            throw new Error("No Login Button Found")
        }
    }

    public async clickLogin() {
        const ele = await this.loginButton
        await ele?.click()
    }

    public async clickSignout() {
        const ele = await this.signoutButton
        await ele?.click()
    }

}