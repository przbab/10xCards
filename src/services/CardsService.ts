import { z } from 'zod';
import { type AIGeneratedCardsResponse, type CardType } from '../types';

export const generateCardsSchema = z.object({
    text: z.string().min(500, 'Text too short').max(10000, 'Text exceeds maximum length of 10000 characters'),
});

export class CardsService {
    static async addCard(
        supabase,
        card: CardType,
        user
    ): Promise<{
        back: string;
        front: string;
        id: string;
    }> {
        const { data, error } = await supabase
            .from('cards')
            .insert({
                back: card.back,
                front: card.front,
                source: card.source,
                user_id: user.id,
            })
            .select()
            .single();

        if (error) {
            throw new Error('Failed to add card');
        }

        return data;
    }

    static async deleteCard(supabase, id: string, user): Promise<void> {
        const { error } = await supabase.from('cards').delete().eq('user_id', user.id).eq('id', id);

        if (error) {
            throw new Error('Failed to delete card');
        }
    }

    static async generateCards(text: string, options?: any): Promise<Card[]> {
        try {
            // const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
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
                    // model: 'google/gemini-2.5-pro-exp-03-25:free',
                    model: 'gpt-4.1-nano',
                }),
                headers: {
                    // Authorization: `Bearer ${import.meta.env.OPENROUTER_API_KEY}`,
                    Authorization: `Bearer ${import.meta.env.OPEN_AI_API_KEY}`,
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

            const cards = JSON.parse(data.choices[0].message.content);

            return cards.map((card, i) => ({
                ...card,
                id: (i + 1).toString(),
                source: 'ai-full',
            }));
        } catch (error) {
            console.error('Error in AICardsService.generateCards:', error);
            throw new Error('Failed to generate AI cards');
        }
    }

    static async getCard(supabase, id: string, user): Promise<CardType> {
        const { data, error } = await supabase.from('cards').select('*').eq('user_id', user.id).eq('id', id).single();

        if (error) {
            throw new Error('Failed to fetch card');
        }

        return data;
    }

    static async getCards(supabase, user): Promise<AIGeneratedCardsResponse> {
        // get user cards from supabase

        const { data, error } = await supabase.from('cards').select('*').eq('user_id', user.id);

        if (error) {
            throw new Error('Failed to fetch user cards');
        }

        return data;
    }

    static async updateCard(
        supabase,
        card,
        user
    ): Promise<{
        back: string;
        front: string;
    }> {
        const { data, error } = await supabase
            .from('cards')
            .update({
                back: card.back,
                front: card.front,
            })
            .eq('user_id', user.id)
            .eq('id', card.id);

        if (error) {
            throw new Error('Failed to update card');
        }

        return data;
    }
}
