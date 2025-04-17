import React, { memo } from 'react';
import { CardContent, CardFooter, CardHeader, CardTitle, Card as ShadcnCard } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Action = {
    id: string;
    text: string;
    variant: 'destructive' | 'default' | 'secondary';
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
        <ShadcnCard>
            <CardHeader>
                <CardTitle>{front}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mb-4">{back}</p>
            </CardContent>
            <CardFooter className="flex space-x-2">
                {actions.map((action) => (
                    <Button key={action.id} onClick={() => onAction(action.id)} variant={action.variant}>
                        {action.text}
                    </Button>
                ))}
            </CardFooter>
        </ShadcnCard>
    );
});

export default Card;
