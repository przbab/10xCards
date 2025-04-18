import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

type TextInputProps = {
    isLoading: boolean;
    onGenerate: (text: string) => void;
};

function TextInput({ isLoading, onGenerate }: TextInputProps) {
    const [text, setText] = useState('');

    const handleSubmit = () => {
        if (text.trim().length > 0) {
            onGenerate(text);
        }
    };

    return (
        <div className="space-y-2">
            <Textarea
                className="w-full"
                disabled={isLoading}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to generate flashcards"
                value={text}
            />
            <Button disabled={isLoading || text.trim().length === 0} onClick={handleSubmit} variant="default">
                {isLoading ? 'Generating...' : 'Generate'}
            </Button>
        </div>
    );
}

export default TextInput;
