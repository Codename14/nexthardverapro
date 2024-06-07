import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
const locales = ['hu', 'en', 'de'];

export default getRequestConfig(async ({ locale }) => {
    //másik tutorial :  https://www.youtube.com/watch?v=7C3l4wIq8vQ&t=134s
    // const baseLocale = new Intl.Locale(locale).baseName;
    //  if (!locales.includes(baseLocale)) notFound();
    // return {
    //   messages: (await import(`./messages/${baseLocale}.json`)).default
    // };
    try {
        const baseLocale = new Intl.Locale(locale).baseName;
        if (!locales.includes(baseLocale)) notFound();
        return {
            messages: (await import(`./messages/${baseLocale}.json`)).default,
        };
    } catch (error) {
        console.error('Error:', error);
        notFound();
    }
});
