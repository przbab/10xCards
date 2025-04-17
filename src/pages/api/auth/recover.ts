import { createSupabaseServerInstance } from '../../../db/supabase.client';

export const POST: import('astro').APIRoute = async ({ cookies, request }) => {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return new Response(JSON.stringify({ error: 'Invalid email address' }), {
            status: 400,
        });
    }

    const supabase = createSupabaseServerInstance({ cookies, headers: request.headers });

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${import.meta.env.HOST}/auth/reset`,
    });

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
        });
    }

    return new Response(JSON.stringify({ message: 'Password reset email sent' }), {
        status: 200,
    });
};
