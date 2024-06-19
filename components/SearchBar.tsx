'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

export default function SearchBar() {
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
        console.log('data', data);
        // console.log('url change');
        setIsLoading(true);
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('query', data?.query);
        router.replace('?' + newSearchParams.toString());
    };

    return (
        <>
            <form action='' onSubmit={handleSubmit(onSubmit)} className='flex gap-2'>
                <input
                    {...register('query', {
                        required: true,
                    })}
                    type='text'
                    placeholder='keresés'
                    className='search-input input--primary'
                />
                <button disabled={!isDirty} className='btn btn--primary'>
                    keresés
                </button>
            </form>
        </>
    );
}
