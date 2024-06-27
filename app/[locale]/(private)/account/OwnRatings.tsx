import { useTranslations } from 'next-intl';
import React from 'react';
import { FaStar } from 'react-icons/fa6';

export default function OwnRatings() {
    const t = useTranslations('Profile');

    return (
        <div>
            <div>
                <div className='mt-10 mb-6'>
                    <div className='flex mb-2 mt-4'>
                        <FaStar size={50} color={'var(--primary)'} />
                    </div>
                    <h2 className='small-title'>{t('noratings_title')}</h2>
                    <p className='mx-auto'>{t('noratings_text')}</p>
                </div>
            </div>
        </div>
    );
}
