import React from 'react';
import Card from './Card.tsx';
import { type AIGeneratedCardsResponse } from '../types';

type GeneratedCardsListProps = {
    cards: AIGeneratedCardsResponse;
    onAction: (id: string, actionId: string) => void;
};

const GeneratedCardsList: React.FC<GeneratedCardsListProps> = ({ cards, onAction }) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
                <Card
                    actions={[
                        { color: 'green-500', id: 'accept', text: 'Accept' },
                        { color: 'red-500', id: 'reject', text: 'Reject' },
                    ]}
                    back={card.back || 'No back text available'}
                    front={card.front}
                    id={card.id}
                    key={card.id}
                    onAction={(actionId) => onAction(card.id, actionId)}
                />
            ))}
        </div>
    );
};

export default GeneratedCardsList;
