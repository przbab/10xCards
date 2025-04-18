import { expect, Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async waitForToast(message: string) {
        const toast = this.page.getByText(message);
        await expect(toast).toBeVisible();
    }

    async waitForUrl(path: string) {
        await expect(this.page).toHaveURL(new RegExp(path));
    }
}
