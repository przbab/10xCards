import { AICardsService } from '../../../services/AICardsService';
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
        const card = await AICardsService.getCard('1');

        // Return the fetched cards
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
