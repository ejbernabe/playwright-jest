import { Page } from "playwright";

export default class LoginPage {
    
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public get emailField() {
        const ele = this.page.$("input[name='email']")

        return ele;
    }

    public get passwordField() {
        const ele = this.page.$("input[name='password']")

        return ele;
    }

    public get loginBtn() {
        const ele = this.page.$("//button[text()='LOGIN']")

        return ele;
    }

    public async enterUsername(name: string) {
        const ele = await this.emailField
        await ele?.fill(name)
    }

    public async enterPass(pass: string) {
        const ele = await this.passwordField
        await ele?.fill(pass)
    }

    public async clickLogin() {
        const ele = await this.loginBtn
        await ele?.click()
    }
}
