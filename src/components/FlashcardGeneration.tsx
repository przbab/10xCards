import React, { useCallback, useState } from 'react';
import TextInput from './TextInput';
import GeneratedCardsList from './GeneratedCardsList';
import { type AIGeneratedCardsResponse } from '../types';
import useGenerateCards from '../hooks/useGenerateCards';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function FlashcardGeneration() {
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
            console.log(`Card ${id} rejected`);
        }
        if (action === 'accept') {
            console.log(`Card ${id} accepted`);
        }
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-4">
            <TextInput isLoading={isLoading} onGenerate={handleGenerate} />
            {error && (
                <Card>
                    <CardHeader>
                        <CardTitle>Error</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-red-700">{error}</p>
                    </CardContent>
                </Card>
            )}
            {isLoading && (
                <Card>
                    <CardHeader>
                        <CardTitle>Loading</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-blue-700">Please wait...</p>
                    </CardContent>
                </Card>
            )}
            <GeneratedCardsList cards={generatedCards} onAction={handleAction} />
        </div>
    );
}

export default FlashcardGeneration;
