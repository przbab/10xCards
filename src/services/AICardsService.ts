import { z } from 'zod';
import { type AIGeneratedCardsResponse } from '../types';

export const generateCardsSchema = z.object({
    text: z.string().min(500, 'Text too short').max(10000, 'Text exceeds maximum length of 10000 characters'),
});

export class AICardsService {
    static async generateCards(text: string, options?: any): Promise<AIGeneratedCardsResponse> {
        return [
            {
                back: 'Sample Back',
                front: 'Sample Front',
                id: '1',
            },
            {
                back: 'Sample Back2',
                front: 'Sample Front2',
                id: '2',
            },
            {
                back: 'Sample Back3',
                front: 'Sample Front3',
                id: '3',
            },
            {
                back: 'Sample Back4',
                front: 'Sample Front4',
                id: '4',
            },
            {
                back: 'Sample Back5',
                front: 'Sample Front5',
                id: '5',
            },
            {
                back: 'Sample Back6',
                front: 'Sample Front6',
                id: '6',
            },
        ];

        try {
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                ...options,
                body: JSON.stringify({
                    messages: [
                        {
                            content: `You are a helpful assistant that generates flashcards from text. Each card should have a front and back. The front should be a question or prompt, and the back should be the answer or explanation. Please provide the cards in JSON format with "front" and "back" properties. Return just json, not wrapped in md tags.`,
                            role: 'system',
                        },
                        {
                            content: text,
                            role: 'user',
                        },
                    ],
                    // model: 'openai/gpt-4o',
                    model: 'google/gemini-2.5-pro-exp-03-25:free',
                }),
                headers: {
                    Authorization: `Bearer ${import.meta.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            });

            if (!response.ok) {
                const tmp = await response.text();
                console.log('🚀 ~ AICardsService ~ generateCards ~ tmp:', tmp);
                throw new Error(`OpenRouter.ai API error: ${response.statusText}`);
            }

            const data: any = await response.json();

            const aiResopnse = data.choices[0].message.content;

            return aiResopnse;
        } catch (error) {
            console.error('Error in AICardsService.generateCards:', error);
            throw new Error('Failed to generate AI cards');
        }
    }

    static async getCard(id: string): Promise<{
        back: string;
        front: string;
        id: string;
    }> {
        return {
            back: 'Sample Back',
            front: 'Sample Front',
            id,
        };
    }

    static async getCards(): Promise<AIGeneratedCardsResponse> {
        return [
            {
                back: 'Sample Back',
                front: 'Sample Front',
                id: '1',
            },
            {
                back: 'Sample Back2',
                front: 'Sample Front2',
                id: '2',
            },
            {
                back: 'Sample Back3',
                front: 'Sample Front3',
                id: '3',
            },
            {
                back: 'Sample Back4',
                front: 'Sample Front4',
                id: '4',
            },
            {
                back: 'Sample Back5',
                front: 'Sample Front5',
                id: '5',
            },
            {
                back: 'Sample Back6',
                front: 'Sample Front6',
                id: '6',
            },
        ];
    }

    static async updateCard(card: any): Promise<{
        back: string;
        front: string;
    }> {
        return {
            back: 'Sample Back',
            front: 'Sample Front',
        };
    }
}
