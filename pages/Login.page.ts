import { Page } from "playwright";

export default class LoginPage {
    
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    emailField = async () => await this.page.$("input[name='email1']");

    // public get emailField() {
    //     const ele = this.page.$("input[name='email']")

    //     return ele;
    // }

    passwordField = async () => await this.page.$("input[name='password']");

    // public get passwordField() {
    //     const ele = this.page.$("input[name='password']")

    //     return ele;
    // }

    loginBtn = async() => await this.page.$("//button[text()='LOGIN']");

    // public get loginBtn() {
    //     const ele = this.page.$("//button[text()='LOGIN']")

    //     return ele;
    // }

    public async enterUsername(name: string) {
        const ele = await this.emailField()
        if (ele != null)
            await ele.fill(name)
        else 
            throw new Error("No element found.")
    }

    public async enterPass(pass: string) {
        const ele = await this.passwordField()
        await ele?.fill(pass)
    }

    public async clickLogin() {
        await Promise.all([
            this.page.waitForNavigation(),
            this.page.click("text=Log in")
        ])
        const ele = await this.loginBtn()
        await ele?.click()
    }
}
