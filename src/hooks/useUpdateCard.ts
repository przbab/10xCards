import { useState } from 'react';

export const useUpdateCard = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const updateCard = async (updatedCard: any) => {
        setIsUpdating(true);
        setError(null);
        try {
            const response = await fetch(`/api/cards/${updatedCard.id}`, {
                body: JSON.stringify(updatedCard),
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'PUT',
            });

            if (!response.ok) {
                throw new Error('Failed to update card');
            }
        } catch (err) {
            setError(err as Error);
        } finally {
            setIsUpdating(false);
        }
    };

    return { error, isUpdating, updateCard };
};
