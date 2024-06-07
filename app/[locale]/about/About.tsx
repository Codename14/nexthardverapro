'use client';

import { useTranslations } from 'next-intl';

export default function About() {
    const t = useTranslations('Navigation');
    return (
        <>
            <div>
                <p>{t('contact')}</p>
            </div>
        </>
    );
}
