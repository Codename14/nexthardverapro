import { NextRequest } from 'next/server';
import { updateSession } from './lib/supabase/middleware';

export async function middleware(request: NextRequest) {
    const response = await updateSession(request);
    return response;

    // Add cache-control headers
    //  response.headers.set('Cache-Control', 's-maxage=86400, stale-while-revalidate=59');
    // s-maxage: 24 órás gyorsítótárazás a CDN-nél
    // stale-while-revalidate: Az oldal újragenerálása közbeni frissítési idő

    return response;
}
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.web (favicon file)
         * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
