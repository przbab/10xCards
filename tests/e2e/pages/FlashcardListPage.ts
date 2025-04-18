/* eslint-disable no-return-await */
import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class FlashcardListPage extends BasePage {
    readonly flashcardList: Locator;

    constructor(page: Page) {
        super(page);
        this.flashcardList = page.getByTestId('flashcard-list');
    }

    async clickDeleteButton(id: string) {
        const card = this.getFlashcard(id);
        await card.getByTestId('delete-button').click();
    }

    async clickEditButton(id: string) {
        const card = this.getFlashcard(id);
        await card.getByTestId('edit-button').click();
    }

    getFlashcard(id: string) {
        return this.page.getByTestId(`flashcard-${id}`);
    }

    async getFlashcardBack(id: string) {
        const card = this.getFlashcard(id);
        return await card.locator('.card-content p').textContent();
    }

    async getFlashcardFront(id: string) {
        const card = this.getFlashcard(id);
        return await card.locator('.card-title').textContent();
    }

    async goto() {
        await this.page.goto('/flashcards');
        await this.page.waitForTimeout(2000);
        await expect(this.flashcardList).toBeVisible();
    }

    async waitForFlashcardToBeRemoved(id: string) {
        await expect(this.getFlashcard(id)).not.toBeVisible();
    }

    async waitForFlashcardToBeVisible(id: string) {
        await expect(this.getFlashcard(id)).toBeVisible();
    }
}
