import { createSupabaseServerInstance } from '../../../db/supabase.client';

export const POST: import('astro').APIRoute = async ({ cookies, request }) => {
    const { newPassword, token } = await request.json();

    if (!token || !newPassword || newPassword.length < 8) {
        return new Response(JSON.stringify({ error: 'Invalid input' }), {
            status: 400,
        });
    }

    const supabase = createSupabaseServerInstance({ cookies, headers: request.headers });

    // Exchange the token for a session
    const { data: session, error: sessionError } = await supabase.auth.exchangeCodeForSession(token);

    if (sessionError || !session) {
        return new Response(JSON.stringify({ error: sessionError?.message || 'Failed to initialize session' }), {
            status: 400,
        });
    }

    const { error } = await supabase.auth.updateUser({
        password: newPassword,
    });

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
        });
    }

    return new Response(JSON.stringify({ message: 'Password updated successfully' }), {
        status: 200,
    });
};
