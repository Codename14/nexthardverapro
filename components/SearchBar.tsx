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
        formState: { errors },
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
        newSearchParams.set('term', data?.term);
        newSearchParams.set('limit', data?.limit);
        router.replace('?' + newSearchParams.toString());
    };

    return (
        <>
            <form action='' className='flex gap-2'>
                <input type='text' placeholder='keresés' className='search-input input--primary' />
                <button className='btn btn--primary'>keresés</button>
            </form>
        </>
    );
}
