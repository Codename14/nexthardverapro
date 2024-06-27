'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import LoadingIcon from './LoadingIcon';
import { useTranslations } from 'next-intl';
// import { useTranslations } from 'next-intl';

export default function SearchBar() {
    const t = useTranslations('form');

    const searchParams = useSearchParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(false);
    }, [searchParams]);

    //Form
    const {
        handleSubmit,
        register,
        formState: { errors, isDirty },
        watch,
        setValue,
        setError,
    } = useForm();
    // const limitValue = watch('limit');

    const onSubmit = async (data: FieldValues) => {
        // console.log('url change');
        if (data?.query !== searchParams.get('query')) {
            setIsLoading(true);
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set('query', data?.query);
            router.replace('?' + newSearchParams.toString());
        }
    };

    return (
        <>
            <form action='' onSubmit={handleSubmit(onSubmit)} className='flex gap-2'>
                <input
                    {...register('query', {
                        required: true,
                    })}
                    type='text'
                    placeholder={t('search') + '...'}
                    className='search-input input--primary'
                />
                <button disabled={!isDirty || isLoading} className='btn btn--primary flex gap-2'>
                    {t('search')} {isLoading && <LoadingIcon />}
                </button>
            </form>
        </>
    );
}
