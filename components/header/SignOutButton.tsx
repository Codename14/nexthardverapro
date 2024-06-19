'use client';
import { createClient } from '@/lib/supabase/client';
import { redirect, useRouter } from 'next/navigation';
import { useState } from 'react';
import { GoSignOut } from 'react-icons/go';
import LoadingIcon from '../LoadingIcon';

export default function SignOutButton() {
    const [isLoading, setIsLoading] = useState(false);
    const supabase = createClient();
    const router = useRouter();

    const signOut = async () => {
        setIsLoading(true);
        await supabase.auth.signOut();
        setIsLoading(false);
        router.refresh();
    };
    return (
        <button onClick={() => signOut()} className='sign-out-little-btn btn btn--ext my-2  mr-2 p-2'>
            {isLoading ? <LoadingIcon /> : <GoSignOut />}
        </button>
    );
}