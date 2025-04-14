import { AICardsService } from '../../services/AICardsService';
import { type APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
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

        // Fetch cards from the service
        const cards = await AICardsService.getCards();

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

export const PUT: APIRoute = async ({ locals, request }) => {
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

        // Update cards using the service
        const updatedCard = await AICardsService.updateCard(body);

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
