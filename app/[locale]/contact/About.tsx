'use client';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

export default function About() {
    const t = useTranslations('Navigation');
    return (
        <>
            <div>
                <button className='btn btn--primary' onClick={() => toast.success('bor')}>
                    bor
                </button>
                <p>{t('contact')}</p>
            </div>
        </>
    );
}
