import React, { useState } from 'react';

type TextInputProps = {
    isLoading: boolean;
    onGenerate: (text: string) => void;
};

const TextInput: React.FC<TextInputProps> = ({ isLoading, onGenerate }) => {
    const [text, setText] = useState('');
    console.log('🚀 ~ text:', text);

    const handleSubmit = () => {
        if (text.trim().length > 0) {
            onGenerate(text);
        }
    };

    return (
        <div className="space-y-2">
            <textarea
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to generate flashcards"
                value={text}
            />
            <button
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-300"
                disabled={isLoading || text.trim().length === 0}
                onClick={handleSubmit}
            >
                {isLoading ? 'Generating...' : 'Generate'}
            </button>
        </div>
    );
};

export default TextInput;
