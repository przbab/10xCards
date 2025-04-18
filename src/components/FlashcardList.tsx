import React from 'react';
import Card from './Card';
import useFetchCards from '../hooks/useFetchCards';
import { navigate } from 'astro:transitions/client';

function FlashcardList() {
    const { cards, error, loading } = useFetchCards(); // Fetch cards using the custom hook

    const handleAction = (id: string, actionId: string) => {
        if (actionId === 'edit') {
            navigate(`/flashcards/${id}/edit`);
        } else if (actionId === 'delete') {
            // Handle delete action
            fetch(`/api/cards/${id}`, {
                method: 'DELETE',
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to delete card');
                    }
                    return response.json();
                })
                .then(() => {
                    // Optionally, refresh the card list or show a success message
                    window.location.reload();
                })
                .catch((e) => {
                    console.error('Error deleting card:', e);
                });
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
                            { id: 'edit', text: 'Edit', variant: 'default' },
                            { id: 'delete', text: 'Delete', variant: 'destructive' },
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
}

export default FlashcardList;
