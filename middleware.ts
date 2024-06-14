// middleware.ts
import { type NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import createIntlMiddleware from 'next-intl/middleware';
import { updateSession } from './lib/supabase/middleware';

const handleI18nRouting = createIntlMiddleware({
    locales: ['hu', 'en', 'de'],
    defaultLocale: 'hu',
});

export async function middleware(request: NextRequest) {
    const response = handleI18nRouting(request);

    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
        cookies: {
            get(name: string) {
                return request.cookies.get(name)?.value;
            },
            set(name: string, value: string, options: CookieOptions) {
                request.cookies.set({ name, value, ...options });
                response.cookies.set({ name, value, ...options });
            },
            remove(name: string, options: CookieOptions) {
                request.cookies.set({ name, value: '', ...options });
                response.cookies.set({ name, value: '', ...options });
            },
        },
    });

    await supabase.auth.getUser();
    return response;
}

// export async function middleware(request: NextRequest) {
//     const response = await updateSession(request);
//     return response;
// }

export const config = {
    matcher: ['/', '/(hu|en|de)/:path*'],
    // matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
