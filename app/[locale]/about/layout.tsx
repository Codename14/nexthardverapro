import { NextIntlClientProvider, useMessages, useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

interface RootLayoutProps {
    children: React.ReactNode;
    params: {
        // locale: string;
        // middlewareból jön
        locale: 'hu' | 'en' | 'de';
    };
}
export default function RootLayout({ children, params: { locale } }: Readonly<RootLayoutProps>) {
    const messages = useMessages();
    unstable_setRequestLocale(locale);
    const t = useTranslations('Navigation');

    return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>;
}
