/**
 * useGenerateCards Hook
 *
 * This custom hook handles the API call to generate flashcards using AI. It manages the loading
 * and error states and provides a function to trigger the API call.
 *
 * Features:
 * - Sends a POST request to the `/api/ai/cards` endpoint with user input.
 * - Returns the generated flashcards or an error message.
 * - Tracks the loading state during the API call.
 */

import { useState } from 'react';
import { type AIGeneratedCardsResponse } from '../types';

const useGenerateCards = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateCards = async (text: string): Promise<AIGeneratedCardsResponse | null> => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/ai/cards', {
                body: JSON.stringify({ text }),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Failed to generate cards');
            }

            const data: AIGeneratedCardsResponse = await response.json();
            return data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');

            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return { error, generateCards, isLoading };
};

export default useGenerateCards;
