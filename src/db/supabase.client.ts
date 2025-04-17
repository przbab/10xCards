import { createClient } from '@supabase/supabase-js';
import { type Database } from './database.types';
import { type AstroCookies } from 'astro';
import { type CookieOptionsWithName, createServerClient } from '@supabase/ssr';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.SUPABASE_KEY;

export const supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey);

export const cookieOptions: CookieOptionsWithName = {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: true,
};

function parseCookieHeader(cookieHeader: string): { name: string; value: string }[] {
    return cookieHeader.split(';').map((cookie) => {
        const [name, ...rest] = cookie.trim().split('=');
        return { name, value: rest.join('=') };
    });
}

export const createSupabaseServerInstance = (context: { cookies: AstroCookies; headers: Headers }) => {
    const supabase = createServerClient<Database>(import.meta.env.SUPABASE_URL, import.meta.env.SUPABASE_KEY, {
        cookieOptions,
        cookies: {
            getAll() {
                return parseCookieHeader(context.headers.get('Cookie') ?? '');
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, options, value }) => context.cookies.set(name, value, options));
            },
        },
    });

    return supabase;
};
