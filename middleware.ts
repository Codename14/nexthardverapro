import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const nextIntMiddleware = createMiddleware({
    // A list of all locales that are supported
    locales: ['hu', 'en', 'de'],
    // Used when no locale matches
    defaultLocale: 'hu',
});

export default function (req: NextRequest): NextResponse {
    return nextIntMiddleware(req);
}

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(hu|en)/:path*'],
};
