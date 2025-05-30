import React from 'react';
import { EditForm } from './EditForm';
import { useFetchCard } from '../hooks/useFetchCard';
import { useUpdateCard } from '../hooks/useUpdateCard';
import { type CardRow } from '../types';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function FlashcardEdit({ id }: { id: string }) {
    const { card, error, isLoading } = useFetchCard(id);
    const { isUpdating, updateCard } = useUpdateCard();

    const handleSave = async (updatedCard: CardRow) => {
        try {
            await updateCard(updatedCard);
            toast.success('Flashcard updated successfully!');
        } catch (err) {
            toast.error('Failed to update flashcard. Please try again.');
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading card: {error.message}</p>;

    return (
        <Card className="max-w-xl mx-auto" data-test-id="flashcard-edit">
            <CardHeader>
                <CardTitle>Edit Flashcard</CardTitle>
            </CardHeader>
            <CardContent>{card && <EditForm card={card} isSaving={isUpdating} onSave={handleSave} />}</CardContent>
        </Card>
    );
}
