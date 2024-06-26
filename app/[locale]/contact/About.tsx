'use client';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

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
