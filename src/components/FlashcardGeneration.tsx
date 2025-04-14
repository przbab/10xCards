import React, { useCallback, useState } from 'react';
import TextInput from './TextInput';
import GeneratedCardsList from './GeneratedCardsList.tsx';
import { type AIGeneratedCardsResponse } from '../types';
import useGenerateCards from '../hooks/useGenerateCards';

/**
 * FlashcardGeneration Component
 *
 * This is the main component for the Flashcard Generation View. It manages the state and logic
 * for generating flashcards using AI. It integrates the TextInput and GeneratedCardsList components.
 *
 * Features:
 * - Accepts user input to generate flashcards.
 * - Displays a list of generated flashcards.
 * - Handles user actions like accepting, editing, or rejecting flashcards.
 */
const FlashcardGeneration: React.FC = () => {
    const [generatedCards, setGeneratedCards] = useState<AIGeneratedCardsResponse>([]);
    const { error, generateCards, isLoading } = useGenerateCards();

    const handleGenerate = async (text: string) => {
        const cards = await generateCards(text);
        if (cards) {
            setGeneratedCards(cards);
        }
    };

    const handleAction = useCallback((id: string, action: string) => {
        if (action === 'reject') {
            console.log(`Card ${id} edited`);
            // setGeneratedCards((prevCards) => prevCards.filter((_, index) => index.toString() !== id));
        }
        if (action === 'accept') {
            console.log(`Card ${id} accepted`);
            // Logic to accept the card can be implemented here
        }
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-4">
            <TextInput isLoading={isLoading} onGenerate={handleGenerate} />
            {error && (
                <div className="p-4 text-red-700 bg-red-100 border border-red-300 rounded-md">
                    <p>Error: {error}</p>
                </div>
            )}
            {isLoading && (
                <div className="p-4 text-blue-700 bg-blue-100 border border-blue-300 rounded-md">
                    <p>Loading...</p>
                </div>
            )}
            <GeneratedCardsList cards={generatedCards} onAction={handleAction} />
        </div>
    );
};

export default FlashcardGeneration;
