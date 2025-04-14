import { useEffect, useState } from 'react';
import { type AIGeneratedCardsResponse } from '../types';

const useFetchCards = () => {
    const [cards, setCards] = useState<AIGeneratedCardsResponse>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchCards = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/cards');
                const data = await response.json();
                setCards(data);
            } catch (err) {
                setError('error');
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, []);

    return { cards, error, loading };
};

export default useFetchCards;
