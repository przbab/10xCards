import { expect, test } from '@playwright/test';
import { FlashcardListPage } from './pages/FlashcardListPage';
import { FlashcardEditPage } from './pages/FlashcardEditPage';

test.describe('Flashcard editing', () => {
    let listPage: FlashcardListPage;
    let editPage: FlashcardEditPage;

    test.beforeEach(async ({ page }) => {
        listPage = new FlashcardListPage(page);
        editPage = new FlashcardEditPage(page);
    });

    test('should successfully edit a flashcard and reflect changes on the list', async () => {
        // 1. Navigate to flashcards list and click edit button
        await listPage.goto();
        const testCardId = '1'; // assuming we have a card with this ID
        await listPage.clickEditButton(testCardId);

        // 2. Wait for edit page to load
        await editPage.waitForUrl(`/flashcards/${testCardId}/edit`);

        // 3. Edit the flashcard data
        const newFront = 'Updated Front Text';
        const newBack = 'Updated Back Text';
        await editPage.updateFlashcard(newFront, newBack);

        // 4. Wait for save confirmation
        await editPage.waitForToast('Flashcard updated successfully!');

        // 5. Navigate back to list
        await listPage.goto();

        // 6. Verify changes are visible
        await listPage.waitForFlashcardToBeVisible(testCardId);
        const frontText = await listPage.getFlashcardFront(testCardId);
        const backText = await listPage.getFlashcardBack(testCardId);

        expect(frontText).toBe(newFront);
        expect(backText).toBe(newBack);
    });

    test('should handle validation and show appropriate feedback', async () => {
        await listPage.goto();
        const testCardId = '1';
        await listPage.clickEditButton(testCardId);

        // Try to save with empty values
        await editPage.updateFlashcard('', '');

        // Verify form validation
        await editPage.waitForSaveButtonDisabled();

        // Fill in valid data
        await editPage.updateFlashcard('Valid Front', 'Valid Back');
        await editPage.waitForSaveButtonEnabled();
    });
});
