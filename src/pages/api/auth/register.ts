import { createSupabaseServerInstance } from '../../../db/supabase.client';

export const POST: import('astro').APIRoute = async ({ cookies, request }) => {
    const { email, password } = await request.json();

    const supabase = createSupabaseServerInstance({ cookies, headers: request.headers });

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
        });
    }

    return new Response(JSON.stringify({ user: data.user }), {
        status: 200,
    });
};
