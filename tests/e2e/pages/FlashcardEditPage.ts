/* eslint-disable no-return-await */
import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class FlashcardEditPage extends BasePage {
    readonly backInput: Locator;

    readonly editForm: Locator;

    readonly frontInput: Locator;

    readonly saveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.editForm = page.getByTestId('edit-form');
        this.frontInput = page.getByTestId('front-input');
        this.backInput = page.getByTestId('back-input');
        this.saveButton = page.getByTestId('save-button');
    }

    async getBackValue() {
        return await this.backInput.inputValue();
    }

    async getFrontValue() {
        return await this.frontInput.inputValue();
    }

    async goto(id: string) {
        await this.page.goto(`/flashcards/${id}/edit`);
        await expect(this.editForm).toBeVisible();
    }

    async updateFlashcard(front: string, back: string) {
        await this.frontInput.clear();
        await this.frontInput.fill(front);
        await this.backInput.clear();
        await this.backInput.fill(back);
        await this.saveButton.click();
    }

    async waitForSaveButtonDisabled() {
        await expect(this.saveButton).toBeDisabled();
    }

    async waitForSaveButtonEnabled() {
        await expect(this.saveButton).toBeEnabled();
    }
}
