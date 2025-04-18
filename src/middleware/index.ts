/* eslint-disable no-param-reassign */
import { createSupabaseServerInstance } from '../db/supabase.client';
import { defineMiddleware } from 'astro:middleware';

// Public paths - Auth API endpoints & Server-Rendered Astro Pages
const PUBLIC_PATHS = [
    '/',
    '/auth/login',
    '/auth/register',
    '/auth/recover',
    '/auth/reset',
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/recover',
    '/api/auth/reset',
];

export const onRequest = defineMiddleware(async ({ cookies, locals, redirect, request, url }, next) => {
    // Skip auth check for public paths
    if (PUBLIC_PATHS.includes(url.pathname)) {
        return next();
    }

    const supabase = createSupabaseServerInstance({
        cookies,
        headers: request.headers,
    });

    if (import.meta.env.MODE === 'test') {
        locals.user = { ...locals.user, email: 'user@example.com', id: import.meta.env.TEST_USER_ID };
        locals.supabase = supabase;

        return next();
    }

    // Get user session
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        locals.user = { ...locals.user, email: user.email, id: user.id };
        locals.supabase = supabase;
    } else {
        // Redirect to login for protected routes
        return redirect('/auth/login');
    }

    return next();
});
