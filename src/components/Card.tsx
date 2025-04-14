import React, { memo } from 'react';

type Action = {
    color: string;
    id: string;
    text: string;
};

type CardProps = {
    actions: Action[];
    back: string;
    front: string;
    id: string;
    onAction: (actionId: string) => void;
};

const Card: React.FC<CardProps> = memo(({ actions, back, front, onAction }) => {
    return (
        <div className="p-4 border border-gray-300 rounded-md shadow-sm">
            <div className="mb-2">
                <p className="font-bold">Front:</p>
                <p>{front}</p>
            </div>
            <div className="mb-2">
                <p className="font-bold">Back:</p>
                <p>{back}</p>
            </div>
            <div className="flex space-x-2">
                {actions.map((action) => (
                    <button
                        className={`px-2 py-1 text-white rounded-md hover:opacity-90 bg-${action.color}`}
                        key={action.id}
                        onClick={() => onAction(action.id)}
                    >
                        {action.text}
                    </button>
                ))}
            </div>
        </div>
    );
});

export default Card;
