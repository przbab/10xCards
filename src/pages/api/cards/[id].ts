import { CardsService } from '../../../services/CardsService';
import { type APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ locals, params }) => {
    try {
        const user = locals.user;
        const supabase = locals.supabase;
        const id = params.id;

        // Fetch card by ID from the service
        const card = await CardsService.getCard(supabase, id, user);

        // Return the fetched card
        return new Response(JSON.stringify(card), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        });
    } catch (error) {
        console.error('Error in /ai/cards/[id] endpoint:', error);

        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
};

export const PUT: APIRoute = async ({ locals, params, request }) => {
    try {
        const user = locals.user;
        const supabase = locals.supabase;
        const id = params.id;

        // Parse and validate the request body
        const body = await request.json();

        // Update cards using the service
        const updatedCard = await CardsService.updateCard(
            supabase,
            {
                back: body.back,
                front: body.front,
                id,
                source: 'manual',
            },
            user
        );

        // Return the updated cards
        return new Response(JSON.stringify(updatedCard), {
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

export const DELETE: APIRoute = async ({ locals, params }) => {
    try {
        const user = locals.user;
        const supabase = locals.supabase;
        const id = params.id;

        // Delete card by ID from the service
        await CardsService.deleteCard(supabase, id, user);

        // Return a success response
        return new Response(JSON.stringify({ message: 'Card deleted successfully' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        });
    } catch (error) {
        console.error('Error in /ai/cards/[id] endpoint:', error);

        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
};
