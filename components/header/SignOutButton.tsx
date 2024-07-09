'use client';
import { createClient } from '@/lib/supabase/client';
import { redirect, useRouter } from 'next/navigation';
import { useState } from 'react';
import { GoSignOut } from 'react-icons/go';
import LoadingIcon from '../LoadingIcon';
import { CiLogout } from 'react-icons/ci';
import { useTranslations } from 'next-intl';

export default function SignOutButton({ text, size = 25 }: { text?: string; size?: number }) {
    const t = useTranslations('Navigation');
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
        <>
            <button className='flex gap-2' onClick={() => signOut()}>
                {isLoading ? <LoadingIcon /> : <CiLogout size={size} className='icon' />} {t('logout')}
            </button>
            {/* <button onClick={() => signOut()} className={`${text ? '' : 'btn my-2  mr-2 p-2'}`}>
            {isLoading ? <LoadingIcon /> : text ? text : <GoSignOut />}
        </button> */}
        </>
    );
}
