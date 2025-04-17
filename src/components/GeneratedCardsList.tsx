import React from 'react';
import Card from './Card';
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
                        { id: 'accept', text: 'Accept', variant: 'default' },
                        { id: 'reject', text: 'Reject', variant: 'destructive' },
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
