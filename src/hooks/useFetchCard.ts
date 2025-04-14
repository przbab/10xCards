import { useEffect, useState } from 'react';

export const useFetchCard = (id: string) => {
    const [card, setCard] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchCard = async () => {
            try {
                const response = await fetch(`/api/cards/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch card');
                }
                const data = await response.json();
                setCard(data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCard();
    }, [id]);

    return { card, error, isLoading };
};
