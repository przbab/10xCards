import { CardsService } from '../../services/CardsService';
import { type APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
    try {
        const user = locals.user;
        const supabase = locals.supabase;

        // Fetch cards from the service
        const cards = await CardsService.getCards(supabase, user);

        // Return the fetched cards
        return new Response(JSON.stringify(cards), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        });
    } catch (error) {
        console.error('Error in /ai/cards endpoint:', error);

        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
};

export const POST: APIRoute = async ({ locals, request }) => {
    try {
        const user = locals.user;
        const supabase = locals.supabase;

        // Parse and validate the request body
        const body = await request.json();

        // Add a new card using the service
        const newCard = await CardsService.addCard(supabase, body, user);

        // Return the newly added card
        return new Response(JSON.stringify(newCard), {
            headers: { 'Content-Type': 'application/json' },
            status: 201,
        });
    } catch (error) {
        console.error('Error in /ai/cards endpoint:', error);

        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
};
