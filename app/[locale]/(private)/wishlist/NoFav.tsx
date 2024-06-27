import React from 'react';
import { Link, redirect } from '@/navigation';
import FavoriteIcon from './FavoriteIcon';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
export default function NoFav() {
    const t = useTranslations('Wishlist');

    return (
        <>
            <div className='mt-10 mb-6'>
                <div className='flex mb-2 mt-4'>
                    <FavoriteIcon />
                </div>
                <h2 className='small-title'>{t('wishlist_not_found_title')}</h2>
                <p className='mx-auto'>{t('wishlist_not_found_description')}</p>
            </div>
            <Link href={'/'} className='btn btn--primary mt-4'>
                {t('wishlist_not_found_button')}
            </Link>
        </>
    );
}
