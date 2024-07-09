import { useTranslations } from 'next-intl';
import React from 'react';
import { FaSearch } from 'react-icons/fa';

export default function SearchResultCounter({ length }: { length: number }) {
    const t = useTranslations('Products');

    return (
        <>
            {length === 0 ? (
                <div className='flex flex-col'>
                    <FaSearch size={40} className='mb-2 mt-6' />
                    <p className='font-bold'>{t('no_search_result')}</p>
                </div>
            ) : (
                <p className='text--light mx-auto text-center'>
                    {t('search_count')}: {length}
                </p>
            )}
        </>
    );
}
