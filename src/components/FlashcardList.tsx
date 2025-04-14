import React from 'react';
import Card from './Card.tsx';
import useFetchCards from '../hooks/useFetchCards';

const FlashcardList = () => {
    const { cards, error, loading } = useFetchCards(); // Fetch cards using the custom hook

    const handleAction = (id: string, actionId: string) => {
        if (actionId === 'edit') {
            console.log(`Card ${id} edited`);
        } else if (actionId === 'delete') {
            console.log(`Card ${id} deleted`);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading cards: {error.message}</p>;

    return (
        <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {cards.map((card) => (
                    <Card
                        actions={[
                            { color: 'yellow-500', id: 'edit', text: 'Edit' },
                            { color: 'red-500', id: 'delete', text: 'Delete' },
                        ]}
                        back={card.back || 'No back text available'}
                        front={card.front}
                        id={card.id}
                        key={card.id}
                        onAction={(actionId) => handleAction(card.id, actionId)}
                    />
                ))}
            </div>
        </div>
    );
};

export default FlashcardList;
