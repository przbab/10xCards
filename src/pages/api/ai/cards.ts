import { AICardsService, generateCardsSchema } from '../../../services/AICardsService';
import { z } from 'zod';
import { type APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ locals, request }) => {
    try {
        // Ensure the user is authenticated
        // const supabase = locals.supabase;
        // const { data: user } = await supabase.auth.getUser();
        // if (!user) {
        //     return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        //         headers: { 'Content-Type': 'application/json' },
        //         status: 401,
        //     });
        // }

        // Parse and validate the request body
        const body = await request.json();
        const parsed = generateCardsSchema.parse(body);

        // Generate cards using the service with timeout
        const controller = new AbortController();
        // const timeout = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout

        try {
            const cards = await AICardsService.generateCards(parsed.text, { signal: controller.signal });
            // clearTimeout(timeout);

            // Return the generated cards
            return new Response(JSON.stringify(cards), {
                headers: { 'Content-Type': 'application/json' },
                status: 200,
            });
        } catch (error) {
            if (controller.signal.aborted) {
                return new Response(JSON.stringify({ error: 'Request timed out' }), {
                    headers: { 'Content-Type': 'application/json' },
                    status: 504,
                });
            }
            throw error;
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify({ error: error.errors }), {
                headers: { 'Content-Type': 'application/json' },
                status: 400,
            });
        }

        console.error('Error in /ai/cards endpoint:', error);

        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
};
