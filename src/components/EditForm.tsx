import React, { useState } from 'react';
import { type CardRow } from '../types';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface EditFormProps {
    card: CardRow;
    isSaving: boolean;
    onSave: (updatedCard: CardRow) => void;
}

export function EditForm({ card, isSaving, onSave }: EditFormProps) {
    const [front, setFront] = useState(card.front);
    const [back, setBack] = useState(card.back);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...card, back, front });
    };

    return (
        <form className="space-y-4" data-test-id="edit-form" onSubmit={handleSubmit}>
            <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="front">
                    Front
                </label>
                <Input
                    className="mt-1 block w-full"
                    data-test-id="front-input"
                    id="front"
                    maxLength={200}
                    onChange={(e) => setFront(e.target.value)}
                    type="text"
                    value={front}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="back">
                    Back
                </label>
                <Input
                    as="textarea"
                    className="mt-1 block w-full"
                    data-test-id="back-input"
                    id="back"
                    maxLength={500}
                    onChange={(e) => setBack(e.target.value)}
                    value={back}
                />
            </div>
            <Button className="w-full" data-test-id="save-button" disabled={isSaving} type="submit">
                {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
        </form>
    );
}
